import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { X, ImageOff, RefreshCw, CalendarDays } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

/**
 * Gallery2 - Cloudinary-powered random collage
 * - Fetches from /api/gallery (Vercel proxy -> Cloudinary Admin API)
 * - Sorted newest -> oldest via createdAt
 * - Random collage via CSS columns + deterministic variant per image
 * - Infinite scroll (batch 12) via IntersectionObserver
 * - Lightbox on click
 *
 * Env required (Vercel):
 *  CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_FOLDER
 *
 * Folder behavior: just upload to Cloudinary folder (default vitmas/gallery) and it appears top-first.
 */

// ---------- helpers ----------

function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

// deterministic visual variant so collage looks random but stable across reloads
function getVariant(id, createdAt) {
  const h = hashString(id + (createdAt || ''));
  const variants = [
    { aspect: 'aspect-[4/3]', span: '', rotate: 'rotate-[-0.7deg]' },
    { aspect: 'aspect-square', span: '', rotate: 'rotate-[0.6deg]' },
    { aspect: 'aspect-[3/4]', span: '', rotate: 'rotate-[-0.4deg]' },
    { aspect: 'aspect-[16/10]', span: '', rotate: 'rotate-[0.9deg]' },
    { aspect: 'aspect-[5/4]', span: '', rotate: 'rotate-[-0.9deg]' },
    { aspect: 'aspect-[4/5]', span: '', rotate: 'rotate-[0.3deg]' },
  ];
  return variants[h % variants.length];
}

function formatDate(iso) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch {
    return iso;
  }
}

// Mock fallback when Cloudinary not configured (so UI is testable locally without env)
const MOCK_IMAGES = [
  { id: 'mock/1', public_id: 'mock/1', src: 'https://res.cloudinary.com/demo/image/upload/w_800/sample.jpg', thumb_src: 'https://res.cloudinary.com/demo/image/upload/w_600/sample.jpg', width: 800, height: 600, createdAt: '2026-08-28T10:00:00Z' },
  { id: 'mock/2', public_id: 'mock/2', src: 'https://picsum.photos/seed/vitmas2/800/1000', thumb_src: 'https://picsum.photos/seed/vitmas2/600/750', width: 800, height: 1000, createdAt: '2026-08-20T10:00:00Z' },
  { id: 'mock/3', public_id: 'mock/3', src: 'https://picsum.photos/seed/vitmas3/800/600', thumb_src: 'https://picsum.photos/seed/vitmas3/600/450', width: 800, height: 600, createdAt: '2026-08-15T10:00:00Z' },
  { id: 'mock/4', public_id: 'mock/4', src: 'https://picsum.photos/seed/vitmas4/600/800', thumb_src: 'https://picsum.photos/seed/vitmas4/600/800', width: 600, height: 800, createdAt: '2026-08-10T10:00:00Z' },
  { id: 'mock/5', public_id: 'mock/5', src: 'https://picsum.photos/seed/vitmas5/800/500', thumb_src: 'https://picsum.photos/seed/vitmas5/600/375', width: 800, height: 500, createdAt: '2026-08-01T10:00:00Z' },
  { id: 'mock/6', public_id: 'mock/6', src: 'https://picsum.photos/seed/vitmas6/700/700', thumb_src: 'https://picsum.photos/seed/vitmas6/600/600', width: 700, height: 700, createdAt: '2026-07-22T10:00:00Z' },
];

const BATCH = 12;

export default function Gallery2() {
  const [images, setImages] = useState([]);
  const [visibleCount, setVisibleCount] = useState(BATCH);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notConfigured, setNotConfigured] = useState(false);
  const [selected, setSelected] = useState(null);
  const sentinelRef = useRef(null);

  const fetchGallery = useCallback(async () => {
    setLoading(true);
    setError(null);
    setNotConfigured(false);
    try {
      const res = await fetch('/api/gallery?limit=100');
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        // If 500 with "not configured" -> fallback to mock so dev can see layout
        if (res.status === 500 && body?.error?.includes('not configured')) {
          setNotConfigured(true);
          // sort mock newest -> oldest
          const sortedMock = [...MOCK_IMAGES].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setImages(sortedMock);
          return;
        }
        throw new Error(body?.error || body?.details || `Fetch failed ${res.status}`);
      }
      const data = await res.json();
      const list = (data.resources || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setImages(list);
      // reset infinite scroll
      setVisibleCount(BATCH);
    } catch (e) {
      console.error(e);
      setError(e.message || String(e));
      // fallback to mock for preview when API unreachable (e.g. vite dev without api)
      if (images.length === 0) {
        const sortedMock = [...MOCK_IMAGES].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setImages(sortedMock);
        setNotConfigured(true);
      }
    } finally {
      setLoading(false);
    }
  }, []); // eslint-disable-line

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  // lock body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  // infinite scroll observer
  useEffect(() => {
    if (!sentinelRef.current) return;
    const el = sentinelRef.current;
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisibleCount((c) => Math.min(c + BATCH, images.length));
      }
    }, { rootMargin: '600px' });
    io.observe(el);
    return () => io.disconnect();
  }, [images.length, visibleCount]);

  const visibleImages = useMemo(() => images.slice(0, visibleCount), [images, visibleCount]);
  const hasMore = visibleCount < images.length;

  return (
    <div className="min-h-screen px-6 pb-24 pt-40 text-white">
      <section className="mx-auto max-w-6xl">
        {/* Header */}
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-cyan-300">Snapshots from the community</p>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h1 className="text-5xl font-black uppercase tracking-[0.12em] text-glow-white md:text-7xl">GALLERY</h1>
          <div className="flex items-center gap-3">
            <span className="hidden text-xs uppercase tracking-[0.2em] text-white/50 sm:inline">
              {loading ? 'Loading…' : `${images.length} photos • newest → oldest`}
            </span>
            <button
              onClick={fetchGallery}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white/80 backdrop-blur hover:bg-white/10 hover:text-white transition"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh
            </button>
          </div>
        </div>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/60">
          Random collage • masonry layout • auto-sorted by upload date. Just upload to{' '}
          <code className="rounded bg-white/10 px-1.5 py-0.5 text-cyan-200">Cloudinary / {import.meta.env.VITE_CLOUDINARY_FOLDER || 'VITMASGallery'}</code> and it appears here.
        </p>

        {/* Not configured banner */}
        {notConfigured && (
          <div className="mt-6 rounded-xl border border-amber-400/30 bg-amber-500/10 px-5 py-4 text-sm leading-6 text-amber-200">
            <p className="font-bold uppercase tracking-widest text-amber-300">Preview mode — Cloudinary not configured</p>
            <p className="mt-1 text-amber-200/80">
              Set <code className="bg-black/30 px-1 py-0.5 rounded">CLOUDINARY_CLOUD_NAME</code>,{' '}
              <code className="bg-black/30 px-1 py-0.5 rounded">CLOUDINARY_API_KEY</code>,{' '}
              <code className="bg-black/30 px-1 py-0.5 rounded">CLOUDINARY_API_SECRET</code> in Vercel env (and <code className="bg-black/30 px-1 py-0.5 rounded">CLOUDINARY_FOLDER</code> if custom).{' '}
              Showing mock images so you can see the random collage layout. See <code className="bg-black/30 px-1 py-0.5 rounded">.env.example</code>.
            </p>
          </div>
        )}

        {/* Error */}
        {error && !notConfigured && (
          <div className="mt-6 rounded-xl border border-red-400/30 bg-red-500/10 px-5 py-4 text-sm text-red-200">
            <p className="font-bold">Failed to load gallery</p>
            <p className="mt-1 opacity-80">{error}</p>
            <button onClick={fetchGallery} className="mt-3 rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-black">Retry</button>
          </div>
        )}

        {/* Loading skeleton */}
        {loading && images.length === 0 && (
          <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="mb-4 h-64 animate-pulse break-inside-avoid rounded-xl bg-white/5 border border-white/10" />
            ))}
          </div>
        )}

        {/* Masonry collage */}
        {visibleImages.length > 0 && (
          <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [column-fill:_balance]">
            {visibleImages.map((img, idx) => {
              const v = getVariant(img.id || img.public_id, img.createdAt);
              const displaySrc = img.thumb_src || img.optimized_src || img.src;
              const fullSrc = img.optimized_src || img.src;
              return (
                <motion.div
                  key={img.id || img.public_id || idx}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.35, delay: Math.min(idx * 0.02, 0.3) }}
                  className={`group relative mb-4 break-inside-avoid overflow-hidden rounded-xl border border-white/10 bg-[#130a20] ${v.rotate} transition-all duration-300 hover:rotate-0 hover:scale-[1.015] hover:border-fuchsia-400/40 hover:shadow-[0_0_30px_rgba(217,70,239,0.25)]`}
                  onClick={() => setSelected({ ...img, fullSrc, displaySrc })}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelected({ ...img, fullSrc, displaySrc }); }}
                  aria-label={`View ${img.public_id}`}
                >
                  <div className={`${v.aspect} relative w-full overflow-hidden`}>
                    <img
                      src={displaySrc}
                      alt={img.public_id || 'Gallery image'}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                      onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.remove('hidden'); }}
                    />
                    <div className="hidden absolute inset-0 grid place-items-center bg-[#1a0b2e] text-white/40">
                      <span className="flex flex-col items-center gap-2 text-xs uppercase tracking-widest"><ImageOff size={20} /> load failed</span>
                    </div>
                    {/* subtle vignette */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition" />
                  </div>
                  {/* caption bar */}
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-black/80 to-transparent px-3 pb-3 pt-8">
                    <span className="truncate text-[11px] font-bold uppercase tracking-[0.16em] text-white/90">{img.public_id?.split('/').pop()?.replace(/[-_]/g, ' ')}</span>
                    {img.createdAt && (
                      <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold tracking-widest text-white/70 backdrop-blur">
                        <CalendarDays size={10} /> {formatDate(img.createdAt)}
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Infinite scroll sentinel + status */}
        <div ref={sentinelRef} className="h-1" aria-hidden />
        <div className="mt-8 flex flex-col items-center gap-3">
          {hasMore ? (
            <>
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/20 border-t-white/80" />
              <p className="text-xs uppercase tracking-[0.2em] text-white/40">Loading more • {visibleImages.length} / {images.length}</p>
              <button onClick={() => setVisibleCount((c) => Math.min(c + BATCH, images.length))} className="rounded-full border border-white/15 bg-white/5 px-5 py-2 text-xs font-bold uppercase tracking-widest text-white/70 hover:bg-white/10">Load more</button>
            </>
          ) : images.length > 0 ? (
            <p className="text-xs uppercase tracking-[0.2em] text-white/30">— End • {images.length} photos —</p>
          ) : !loading ? (
            <p className="rounded-xl border border-white/10 bg-white/5 px-6 py-8 text-center text-sm text-white/50">
              No images yet. Upload to Cloudinary folder <code className="text-cyan-300">vitmas/gallery</code> and refresh.
            </p>
          ) : null}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label="Image preview"
          >
            <button aria-label="Close preview" className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelected(null)} />
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ type: 'spring', damping: 22, stiffness: 260 }}
              className="relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#0f0a1a] shadow-[0_0_60px_rgba(168,85,247,0.25)]"
            >
              <button
                aria-label="Close"
                onClick={() => setSelected(null)}
                className="absolute right-3 top-3 z-20 rounded-full bg-black/60 p-2 text-white/80 backdrop-blur transition hover:bg-white hover:text-black"
              >
                <X size={18} />
              </button>
              <div className="flex-1 overflow-auto bg-black">
                <img src={selected.fullSrc || selected.src} alt={selected.public_id} className="h-auto max-h-[78vh] w-full object-contain" />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-[#130a20] px-4 py-3 sm:px-6">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/80">{selected.public_id}</p>
                <span className="text-xs text-white/50">{selected.width} × {selected.height} • {formatDate(selected.createdAt)}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
