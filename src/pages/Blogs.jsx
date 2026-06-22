import { useEffect, useRef } from "react";

const FONT_IMPORT_HREF =
  "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700&family=Anton&family=Jomhuria&family=Jockey+One&display=swap";

const blogPosts = [
  {
    image: "/fotu.jpeg",
    alt: "photo 1",
    flip: false,
    text: "If you've ever wondered how your phone knows exactly where you are — even as you zip through a city with spotty GPS — or how a self-driving car stays on course, you've already brushed up against the magic of Kalman filters. These humble algorithms are the unsung heroes behind much of our modern technology, powering everything from sensor data fusion in robotics to reliable navigation in our devices",
  },
  {
    image: "/fotu 2.jpeg",
    alt: "photo 2",
    flip: true,
    text: "If you've ever wondered how your phone knows exactly where you are — even as you zip through a city with spotty GPS — or how a self-driving car stays on course, you've already brushed up against the magic of Kalman filters. These humble algorithms are the unsung heroes behind much of our modern technology, powering everything from sensor data fusion in robotics to reliable navigation in our devices",
  },
  {
    image: null,
    alt: "",
    flip: false,
    text: "Every time your phone predicts the next word you're about to type, or a streaming service guesses what you'll watch next, there's a good chance a Markov chain is quietly working behind the scenes. These models capture how systems move from one state to another based purely on the present, not the past, making them deceptively simple yet remarkably powerful. From weather forecasting to detecting anomalies in user behavior, Markov chains turn uncertainty into something we can actually reason about",
  },
  {
    image: null,
    alt: "",
    flip: true,
    text: "In a world generating data every second, the real challenge isn't collecting information, it's knowing which signals actually matter. Anomaly detection systems are built to spot the unusual amid oceans of the ordinary, flagging fraudulent transactions, unexpected network intrusions, or sudden shifts in user behavior before they escalate into real problems. The best systems blend statistical rigor with practical intuition, learning what normal looks like so they can reliably tell us when something isn't",
  },
];

export default function VitMasBlogs() {
  const cardRefs = useRef([]);
  cardRefs.current = [];

  const addCardRef = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  useEffect(() => {
    // ── Google Fonts ──
    if (!document.querySelector(`link[href="${FONT_IMPORT_HREF}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = FONT_IMPORT_HREF;
      document.head.appendChild(link);
    }

    // ── Global body + background styles (replaces index.css) ──
    if (!document.querySelector("#vit-mas-global-styles")) {
      const styleTag = document.createElement("style");
      styleTag.id = "vit-mas-global-styles";
      styleTag.innerHTML = `
        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        html, body, #root {
          min-height: 100vh;
          width: 100%;
        }
        body {
          background: #0d0018;
          position: relative;
          overflow-x: hidden;
        }
        body::before {
          content: "";
          position: fixed;
          inset: 0;
          background:
            radial-gradient(ellipse 70% 60% at 105% -5%, rgb(221, 48, 252) 0%, rgba(180, 0, 220, 0.7) 30%, transparent 60%),
            radial-gradient(ellipse 70% 60% at -5% 105%, rgba(220, 30, 255, 1) 0%, rgba(180, 0, 220, 0.7) 30%, transparent 60%);
          z-index: -1;
        }
      `;
      document.head.appendChild(styleTag);
    }

    // ── Scroll bulge observer ──
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("in-view", entry.isIntersecting);
        });
      },
      { threshold: 0.35 }
    );

    cardRefs.current.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="vit-mas-blogs">
      <style>{`
        .vit-mas-blogs {
          --purple: #a855f7;
          --magenta: #c026d3;
          --text: #e8e0f0;
          --muted: #9580aa;
          --surface: rgba(20, 14, 38, 0.3);
          --card-border: #2a1a4a;

          font-family: 'Space Grotesk', sans-serif;
          background: transparent;
          color: var(--text);
          min-height: 100vh;
          overflow-x: hidden;
          position: relative;
          scroll-behavior: smooth;
        }

        /* ── NAVIGATION ── */
        .vit-mas-blogs nav {
          position: static;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 40px;
          background: transparent;
        }

        .vit-mas-blogs .nav-logo {
          width: 123px;
          height: 123px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          flex-shrink: 0;
        }

        .vit-mas-blogs .nav-logo img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
        }

        .vit-mas-blogs .nav-links {
          display: flex;
          align-items: center;
          justify-content: space-evenly;
          width: 786px;
          height: 73px;
          gap: 4px;
          background: rgba(20, 16, 31, 0.85);
          border: 1px solid #ffffff;
          border-radius: 31px;
          padding: 6px 12px;
          list-style: none;
          flex-shrink: 0;
        }

        .vit-mas-blogs .nav-links a {
          text-decoration: none;
          color: var(--muted);
          font-size: 22px;
          font-weight: 700;
          letter-spacing: 0.5px;
          padding: 10px 18px;
          border-radius: 999px;
          transition: all 0.2s ease;
          text-transform: uppercase;
        }

        .vit-mas-blogs .nav-links a:hover,
        .vit-mas-blogs .nav-links a.active {
          color: #fff;
          background: rgba(168, 85, 247, 0.15);
        }

        .vit-mas-blogs .nav-links a.active {
          text-decoration: underline;
          text-underline-offset: 4px;
          text-decoration-color: var(--purple);
        }

        .vit-mas-blogs .nav-cta {
          background: linear-gradient(135deg, var(--purple) 0%, var(--magenta) 100%);
          color: #fff;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 17px;
          font-weight: 700;
          letter-spacing: 0.5px;
          width: 200.06px;
          height: 63.68px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 15px;
          text-decoration: none;
          text-transform: uppercase;
          transition: all 0.2s ease;
          box-shadow: 0 0 24px rgba(168, 85, 247, 0.45);
          flex-shrink: 0;
        }

        .vit-mas-blogs .nav-cta:hover {
          background: linear-gradient(135deg, var(--magenta) 0%, var(--purple) 100%);
          box-shadow: 0 0 32px rgba(192, 38, 211, 0.6);
        }

        /* ── HERO ── */
        .vit-mas-blogs .hero {
          text-align: center;
          padding: 80px 20px 40px;
        }

        .vit-mas-blogs .hero h1 {
          font-family: "Jomhuria", "Anton", "Arial Narrow Bold", "Arial Black", sans-serif;
          font-size: 260px;
          line-height: 1;
          font-weight: 400;
          color: #ffffff;
          text-transform: uppercase;
          text-shadow: 6px 9px 17.7px rgba(212, 204, 204, 0.74);
        }

        /* ── BLOG SECTION ── */
        .vit-mas-blogs .blogs-section {
          max-width: 1240px;
          width: 95%;
          margin: 0 auto 80px;
        }

        .vit-mas-blogs .blogs-container {
          border: 1px solid var(--card-border);
          border-radius: 12px;
          background: var(--surface);
          overflow: hidden;
        }

        /* ── BLOG CARD ── */
        .vit-mas-blogs .blog-card {
          display: grid;
          grid-template-columns: auto 1fr;
          align-items: center;
          gap: 50px;
          padding: 60px 50px;
          border-bottom: 1px solid rgba(42, 26, 74, 0.4);
        }

        .vit-mas-blogs .blog-card:last-child {
          border-bottom: none;
        }

        .vit-mas-blogs .blog-card.flip {
          grid-template-columns: 1fr auto;
        }

        .vit-mas-blogs .blog-card.flip .blog-thumb-wrapper {
          order: 2;
        }

        .vit-mas-blogs .blog-card.flip .blog-text {
          order: 1;
        }

        /* ── THUMBNAIL ── */
        .vit-mas-blogs .blog-thumb-wrapper {
          position: relative;
          padding-left: 12px;
          padding-bottom: 12px;
        }

        .vit-mas-blogs .blog-thumb-wrapper::before {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: calc(100% - 12px);
          height: calc(100% - 12px);
          background: #501394;
          border-radius: 10px;
          z-index: 1;
        }

        .vit-mas-blogs .blog-thumb {
          position: relative;
          overflow: hidden;
          width: 320px;
          height: 240px;
          border-radius: 10px;
          z-index: 2;
          background: #1a1228;
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .vit-mas-blogs .blog-thumb.blog-thumb--full img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .vit-mas-blogs .blog-thumb .no-image-text {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: var(--muted);
          letter-spacing: 0.5px;
          text-align: center;
          padding: 0 20px;
        }

        /* ── BULGE SCROLL EFFECT ── */
        .vit-mas-blogs .blog-thumb-wrapper,
        .vit-mas-blogs .blog-text {
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
          transform: scale(0.94);
          will-change: transform;
        }

        .vit-mas-blogs .blog-card.in-view .blog-thumb-wrapper,
        .vit-mas-blogs .blog-card.in-view .blog-text {
          transform: scale(1.06);
        }

        /* ── TEXT SIDE ── */
        .vit-mas-blogs .blog-text {
          display: flex;
          flex-direction: column;
        }

        .vit-mas-blogs .blog-text p {
          font-family: "Jockey One", sans-serif;
          font-size: 16px;
          font-weight: 500;
          color: #ffffff;
          line-height: 1.9;
          letter-spacing: 1.8px;
          text-transform: uppercase;
          text-align: justify;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 950px) {
          .vit-mas-blogs nav {
            padding: 12px 20px;
          }
          .vit-mas-blogs .nav-logo {
            width: 64px;
            height: 64px;
          }
          .vit-mas-blogs .nav-cta {
            width: 130px;
            height: 44px;
            font-size: 10px;
          }
          .vit-mas-blogs .nav-links {
            display: none;
          }
          .vit-mas-blogs .hero h1 {
            font-size: 90px;
          }
          .vit-mas-blogs .blog-card,
          .vit-mas-blogs .blog-card.flip {
            grid-template-columns: 1fr;
            gap: 40px;
            padding: 40px 24px;
          }
          .vit-mas-blogs .blog-card .blog-thumb-wrapper,
          .vit-mas-blogs .blog-card.flip .blog-thumb-wrapper {
            order: 1;
            justify-self: center;
          }
          .vit-mas-blogs .blog-card .blog-text,
          .vit-mas-blogs .blog-card.flip .blog-text {
            order: 2;
          }
          .vit-mas-blogs .blog-text p {
            text-align: left;
            font-size: 14px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .vit-mas-blogs .blog-thumb-wrapper,
          .vit-mas-blogs .blog-text {
            transition: none;
            transform: none !important;
          }
        }
      `}</style>

      <nav>
        <a href="#" className="nav-logo">
          <img src="/logo.png" alt="VIT MAS logo" />
        </a>
        <ul className="nav-links">
          <li><a href="#">About</a></li>
          <li><a href="#">Projects</a></li>
          <li><a href="#">Events</a></li>
          <li><a href="#" className="active">Blogs</a></li>
          <li><a href="#">Team</a></li>
          <li><a href="#">FAQ</a></li>
        </ul>
        <a href="#" className="nav-cta">Contact</a>
      </nav>

      <section className="hero">
        <h1>BLOGS</h1>
      </section>

      <section className="blogs-section">
        <div className="blogs-container">
          {blogPosts.map((post, index) => (
            <article
              key={index}
              ref={addCardRef}
              className={`blog-card${post.flip ? " flip" : ""}`}
            >
              <div className="blog-thumb-wrapper">
                {post.image ? (
                  <div className="blog-thumb blog-thumb--full">
                    <img src={post.image} alt={post.alt} />
                  </div>
                ) : (
                  <div className="blog-thumb">
                    <span className="no-image-text">No image available</span>
                  </div>
                )}
              </div>
              <div className="blog-text">
                <p>{post.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
