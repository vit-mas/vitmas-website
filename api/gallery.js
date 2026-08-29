/**
 * Vercel Serverless Function: GET /api/gallery
 * Uses Cloudinary Node SDK v2 Search API (Option A - secure server-side).
 *
 * Required ENV (Vercel -> Settings -> Environment Variables):
 *  - CLOUDINARY_CLOUD_NAME
 *  - CLOUDINARY_API_KEY
 *  - CLOUDINARY_API_SECRET
 *  - CLOUDINARY_FOLDER (optional, default: "VITMASGallery")
 *
 * Query params (optional):
 *  - ?folder=custom/folder  (overrides env)
 *  - ?limit=100
 *  - ?next_cursor=xxx
 *  - ?debug=1  (returns diagnostics)
 */

import { v2 as cloudinary } from 'cloudinary';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const rawFolder = (req.query?.folder || process.env.CLOUDINARY_FOLDER || 'VITMASGallery').toString().trim();
  // normalize: remove leading/trailing slashes
  const folder = rawFolder.replace(/^\/+|\/+$/g, '');
  const limit = Math.min(parseInt(req.query?.limit?.toString() || '100', 10) || 100, 500);
  const nextCursor = req.query?.next_cursor?.toString() || undefined;
  const debug = req.query?.debug === '1' || req.query?.debug === 'true';

  if (!cloudName || !apiKey || !apiSecret) {
    return res.status(500).json({
      error: 'Cloudinary not configured',
      hint: 'Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET in Vercel -> Settings -> Environment Variables and Redeploy. Also set CLOUDINARY_FOLDER=VITMASGallery to match your Media Library folder name (case-sensitive).',
      folder,
      rawFolder,
      hasCloudName: !!cloudName,
      hasApiKey: !!apiKey,
      hasApiSecret: !!apiSecret,
    });
  }

  // 1. Configure cloudinary SDK (matches user snippet)
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });

  const diagnostics = {
    cloudName,
    folder,
    rawFolder,
    limit,
    nextCursor: nextCursor || null,
    expression: `folder="${folder}/*"`,
    tried: [],
  };

  try {
    // 2. Query folder using search expression provided by user
    // Include "/*" to scan contents, sort by public_id desc, max_results 100 (configurable via limit)
    const getImagesFromFolder = async () => {
      const search = cloudinary.search
        .expression(`folder="${folder}/*"`)
        .sort_by('public_id', 'desc')
        .max_results(limit);

      if (nextCursor) {
        search.next_cursor(nextCursor);
      }

      return await search.execute();
    };

    let result;
    try {
      result = await getImagesFromFolder();
      diagnostics.tried.push({
        strategy: 'cloudinary_search_sdk',
        expression: `folder="${folder}/*"`,
        sort_by: 'public_id desc',
        max_results: limit,
        next_cursor: nextCursor || null,
        count: result.resources?.length || 0,
        next_cursor_response: result.next_cursor || null,
        success: true,
      });
    } catch (searchError) {
      diagnostics.tried.push({
        strategy: 'cloudinary_search_sdk',
        expression: `folder="${folder}/*"`,
        error: { message: searchError.message, http_code: searchError.http_code || null, error: searchError.error || String(searchError).slice(0, 800) },
      });
      throw searchError;
    }

    const resources = result.resources || [];
    const next_cursor = result.next_cursor || null;

    // Normalize to shape expected by Gallery2.jsx
    const normalized = resources.map((r) => ({
      id: r.public_id,
      public_id: r.public_id,
      src: r.secure_url,
      optimized_src: `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${r.public_id}.${r.format}`,
      thumb_src: `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto,w_600/${r.public_id}.${r.format}`,
      width: r.width,
      height: r.height,
      format: r.format,
      bytes: r.bytes,
      createdAt: r.created_at,
      folder: r.folder || folder,
      asset_folder: r.asset_folder || undefined,
    }));

    // Keep existing Gallery2 sort: newest -> oldest via createdAt, fallback to public_id desc already applied
    normalized.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=600');

    if (normalized.length === 0) {
      return res.status(200).json({
        folder,
        count: 0,
        next_cursor: null,
        resources: [],
        warning: `No images found in Cloudinary folder "${folder}". Check: 1) Folder name case-sensitive (you created "VITMASGallery" under Home) -> set CLOUDINARY_FOLDER=VITMASGallery exactly, 2) Images were uploaded to that folder (public_id should start with VITMASGallery/), 3) Search expression used: folder="${folder}/*", 4) Try /api/gallery?debug=1&folder=VITMASGallery.`,
        diagnostics,
        strategyUsed: 'cloudinary_search_sdk',
      });
    }

    return res.status(200).json({
      folder,
      count: normalized.length,
      next_cursor,
      resources: normalized,
      strategyUsed: 'cloudinary_search_sdk',
      diagnostics: debug ? diagnostics : undefined,
    });
  } catch (err) {
    console.error('api/gallery handler error', err);
    return res.status(500).json({
      error: 'Internal server error',
      details: String(err?.message || err),
      errorObj: err?.error || undefined,
      diagnostics: debug ? diagnostics : undefined,
    });
  }
}
