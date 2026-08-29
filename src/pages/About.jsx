export default function About() {
  return (
    <div className="min-h-screen px-6 pb-24 pt-40 text-white">
      <section className="mx-auto max-w-6xl">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-fuchsia-300">The society behind the signal</p>
        <h1 className="text-5xl font-black uppercase tracking-[0.12em] text-glow-white md:text-7xl" style={{textShadow: '6px 9px 17.7px rgba(212,204,204,0.5)'}}>ABOUT VITMAS</h1>
        <div className="mt-16 grid gap-5 md:grid-cols-2">
          <article className="border border-fuchsia-300/30 bg-[#130a20]/80 p-8">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-fuchsia-300">01 / Mission</p>
            <h2 className="mt-8 text-3xl font-bold">Make mathematics feel alive.</h2>
            <p className="mt-5 leading-8 text-white/60">VITMAS brings students together through events, projects, and conversations that turn mathematical curiosity into practical momentum.</p>
          </article>
          <article className="border border-cyan-300/25 bg-[#0b1420]/80 p-8">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">02 / Vision</p>
            <h2 className="mt-8 text-3xl font-bold">Think clearly. Build boldly.</h2>
            <p className="mt-5 leading-8 text-white/60">We are building an inclusive community where theory, technology, and creative problem solving belong in the same room.</p>
          </article>
        </div>
        <div className="mt-5 grid gap-5 border-y border-white/10 py-8 text-center sm:grid-cols-3">
          <div><strong className="block text-3xl text-white">1</strong><span className="text-sm text-white/50">curious community</span></div>
          <div><strong className="block text-3xl text-white">∞</strong><span className="text-sm text-white/50">questions to explore</span></div>
          <div><strong className="block text-3xl text-white">VIT</strong><span className="text-sm text-white/50">Vellore, India</span></div>
        </div>
      </section>
    </div>
  );
}
