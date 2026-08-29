/**
 * Vercel Serverless Function: GET /api/gallery
 * Proxies Cloudinary Admin API to safely list images in a folder.
 *
 * Required ENV (set in Vercel dashboard -> Settings -> Environment Variables):
 *  - CLOUDINARY_CLOUD_NAME
 *  - CLOUDINARY_API_KEY
 *  - CLOUDINARY_API_SECRET
 *  - CLOUDINARY_FOLDER (optional, default: "vitmas/gallery")
 *
 * Query params (optional):
 *  - ?folder=custom/folder
 *  - ?limit=100  (max 500, default 100)
 *  - ?next_cursor=xxx (for pagination)
 */

export default async function handler(req, res) {
  // CORS + cache headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const folder = (req.query?.folder || process.env.CLOUDINARY_FOLDER || 'VITMASGallery').toString();
  const limit = Math.min(parseInt(req.query?.limit?.toString() || '100', 10) || 100, 500);
  const nextCursor = req.query?.next_cursor?.toString() || undefined;

  if (!cloudName || !apiKey || !apiSecret) {
    return res.status(500).json({
      error: 'Cloudinary not configured',
      hint: 'Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET in Vercel env. See .env.example',
      folder,
    });
  }

  try {
    // Cloudinary Admin API: list resources by prefix
    // Docs: https://cloudinary.com/documentation/admin_api#list_resources
    const params = new URLSearchParams({
      prefix: folder,
      max_results: String(limit),
      resource_type: 'image',
      type: 'upload',
    });
    if (nextCursor) params.set('next_cursor', nextCursor);

    // Alternative richer search via /resources/search is also valid, but prefix is simplest
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/image?${params.toString()}`;

    const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

    const cloudRes = await fetch(url, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    if (!cloudRes.ok) {
      const text = await cloudRes.text();
      console.error('Cloudinary error', cloudRes.status, text);
      return res.status(cloudRes.status).json({ error: 'Cloudinary API error', details: text });
    }

    const data = await cloudRes.json();

    // Normalize to frontend shape
    // Cloudinary resource fields: public_id, secure_url, width, height, format, created_at, bytes, etc.
    const resources = (data.resources || []).map((r) => ({
      id: r.public_id,
      public_id: r.public_id,
      // Use optimized URL: auto format + quality, will be further transformed client-side if needed
      src: r.secure_url,
      // Cloudinary delivery URL with f_auto,q_auto for optimization
      optimized_src: `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${r.public_id}.${r.format}`,
      // Thumbnail variant (smaller)
      thumb_src: `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto,w_600/${r.public_id}.${r.format}`,
      width: r.width,
      height: r.height,
      format: r.format,
      bytes: r.bytes,
      createdAt: r.created_at, // ISO string, used for sorting newest -> oldest
      folder: r.folder || folder,
    }));

    // Sort newest -> oldest (Cloudinary returns roughly sorted but we enforce)
    resources.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Cache at edge for 1 hour, stale-while-revalidate 1 day (Vercel)
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');

    return res.status(200).json({
      folder,
      count: resources.length,
      next_cursor: data.next_cursor || null,
      resources,
    });
  } catch (err) {
    console.error('api/gallery handler error', err);
    return res.status(500).json({ error: 'Internal server error', details: String(err?.message || err) });
  }
}
