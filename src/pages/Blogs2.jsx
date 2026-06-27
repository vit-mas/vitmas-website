import { useEffect, useRef, useState } from "react";

const FONT_IMPORT_HREF =
  "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700&family=Anton&family=Jomhuria&family=Jockey+One&display=swap";

/* const blogPosts = [
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
]; */

export default function VitMasBlogs2() {
const [blogPosts, setBlogPosts] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(false);
  const cardRefs = useRef([]);
  cardRefs.current = [];

  const addCardRef = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  useEffect(() => {
  // Google Fonts
  if (!document.querySelector(`link[href="${FONT_IMPORT_HREF}"]`)) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = FONT_IMPORT_HREF;
    document.head.appendChild(link);
  }

  async function fetchMediumPosts() {
    try {
      const response = await fetch(
        "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@vitmas"
      );

      const data = await response.json();

      const posts = data.items.slice(0, 4).map((item, index) => ({
  image: getImage(item.description),
  author: getStudentAuthor(item.description),
  title: item.title,
  text: getExcerpt(item.description),
  date: new Date(item.pubDate).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }),
  link: item.link,
  alt: item.title,
  flip: index % 2 === 1,
}));

      setBlogPosts(posts);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  fetchMediumPosts();

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
}, [blogPosts]);

  const stripHtml = (html) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

const getImage = (html) => {
  const match = html.match(/<img[^>]+src="([^"]+)"/i);
  return match ? match[1] : null;
};

const getStudentAuthor = (description) => {
  const match = description.match(/<h4>(.*?)<\/h4>/i);
  return match ? match[1].trim() : "";
};

const getExcerpt = (description) => {
  const div = document.createElement("div");

  div.innerHTML = description;

  // Remove author
  div.querySelector("h4")?.remove();

  // Remove image
  div.querySelector("figure")?.remove();
  div.querySelector("img")?.remove();

  return div.textContent
    .replace(/\s+/g, " ")
    .trim()
    .substring(0, 220) + "...";
};

  return (
    <div className="vit-mas-blogs relative z-10">
      <style>{`

      .vit-mas-blogs .blog-title {
        font-size: 28px;
        color: white;
        margin-bottom: 12px;
        font-weight: 700;
        line-height: 1.2;
        word-break: break-word;
      }

      .vit-mas-blogs .blog-date {
        color: #b19ccf;
        margin-bottom: 20px;
        font-size: 14px;
        letter-spacing: 1px;
      }

      .vit-mas-blogs .read-btn {
        margin-top: 24px;
        display: inline-block;
        color: white;
        text-decoration: none;
        padding: 12px 24px;
        border: 1px solid #a855f7;
        border-radius: 8px;
        transition: .3s;
        width: fit-content;
        max-width: 100%;
      }

      .vit-mas-blogs .read-btn:hover {
        background: #a855f7;
      }
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
          padding-bottom: 60px;
        }

        .vit-mas-blogs::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 70% 60% at 105% -5%, rgb(221, 48, 252) 0%, rgba(180, 0, 220, 0.7) 30%, transparent 60%),
            radial-gradient(ellipse 70% 60% at -5% 105%, rgba(220, 30, 255, 1) 0%, rgba(180, 0, 220, 0.7) 30%, transparent 60%);
          z-index: 0;
          pointer-events: none;
        }

        .vit-mas-blogs > * {
          position: relative;
          z-index: 1;
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
          grid-template-columns: minmax(260px, 320px) minmax(0, 1fr);
          align-items: center;
          gap: 40px;
          padding: 60px 50px;
          border-bottom: 1px solid rgba(42, 26, 74, 0.4);
          box-sizing: border-box;
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
          width: 100%;
          max-width: 320px;
          box-sizing: border-box;
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
          width: 100%;
          aspect-ratio: 4 / 3;
          min-height: 240px;
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
          min-width: 0;
          max-width: 100%;
          overflow-wrap: anywhere;
          word-break: break-word;
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
          margin: 0;
          overflow-wrap: anywhere;
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
            gap: 28px;
            padding: 40px 24px;
          }

          .vit-mas-blogs .blog-thumb-wrapper {
            max-width: 100%;
            padding-left: 8px;
            padding-bottom: 8px;
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

          .vit-mas-blogs .blog-author {
            color: #c9b8e7;
            font-size: 15px;
            margin-bottom: 18px;
            font-style: italic;
            letter-spacing: .5px;
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

      <section className="hero">
        <h1>BLOGS</h1>
      </section>

      <section className="blogs-section">
        <div className="blogs-container">
          {loading ? (
  <div
    style={{
      padding: "60px",
      textAlign: "center",
      color: "white",
    }}
  >
    Loading Medium articles...
  </div>
) : error ? (
  <div
    style={{
      padding: "60px",
      textAlign: "center",
      color: "white",
    }}
  >
    Unable to load Medium articles.
  </div>
) : (
  blogPosts.map((post, index) => (
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
                <h2 className="blog-title">{post.title}</h2>

                <div className="blog-author">
                    By {post.author}
                </div>

                <div className="blog-date">
                    {post.date}
                </div>
                <p>{post.text}</p>
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="read-btn"
                >
                  Read on Medium →
                </a>
              </div>
            </article>
          )))}
        </div>
      </section>
    </div>
  );
}