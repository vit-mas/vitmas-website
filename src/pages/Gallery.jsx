import eventsImage from '../assets/images/events.png';
import techImage from '../assets/images/tech.png';
import projectsImage from '../assets/images/projects.png';
import editorialImage from '../assets/images/editorial.png';
import designImage from '../assets/images/design.png';
import outreachImage from '../assets/images/outreach.png';

export default function Gallery() {
  const images = [
    { id: 1, title: "Events", image: eventsImage },
    { id: 2, title: "Technology", image: techImage },
    { id: 3, title: "Projects", image: projectsImage },
    { id: 4, title: "Editorial", image: editorialImage },
    { id: 5, title: "Design", image: designImage },
    { id: 6, title: "Outreach", image: outreachImage }
  ];

  return (
    <div className="min-h-screen px-6 pb-24 pt-40 text-white">
      <section className="mx-auto max-w-6xl">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-cyan-300">Snapshots from the community</p>
        <h1 className="text-5xl font-black uppercase tracking-[0.12em] text-glow-white md:text-7xl">GALLERY</h1>
        
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {images.map(image => (
            <div key={image.id} className="group relative aspect-square overflow-hidden border border-white/15 bg-[#130a20]">
              <img src={image.image} alt={image.title} className="h-full w-full object-cover opacity-75 transition duration-500 group-hover:scale-105 group-hover:opacity-100" />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-5 pb-5 pt-12 text-sm font-bold uppercase tracking-[0.2em]">{image.title}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
