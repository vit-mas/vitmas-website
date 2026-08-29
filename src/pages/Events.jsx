import { useEffect, useState } from 'react';
import { ArrowUpRight, CalendarDays, MapPin, X } from 'lucide-react';
import eventPlaceholder from '../assets/images/events.png';

const events = [
  {
    id: 1,
    title: "<ZERO TO VIBE/>",
    glowColor: "fuchsia",
    bgGradient: "from-[#0f0826] to-[#1c0f42]",
    cardType: "code",
    date: "12 September 2026",
    location: "VIT Vellore",
    description: "A fast-paced introduction to creative coding, problem solving, and the ideas that turn a blank screen into a working prototype.",
    image: eventPlaceholder,
  },
  {
    id: 2,
    title: "The Rational Game",
    subtitle: "An Outreach Event",
    glowColor: "fuchsia",
    bgGradient: "from-black to-gray-900",
    cardType: "game",
    date: "24 September 2026",
    location: "Online",
    description: "A collaborative outreach challenge where logic, strategy, and a little healthy competition meet.",
    image: eventPlaceholder,
  },
  {
    id: 3,
    title: "Beyond Boundaries:\nWomen in Science",
    glowColor: "green",
    bgGradient: "from-[#0a1f10] to-[#12381c]",
    cardType: "science",
    date: "3 October 2026",
    location: "VIT Vellore",
    description: "An open conversation about the women shaping scientific discovery and the boundaries still waiting to be crossed.",
    image: eventPlaceholder,
  },
  {
    id: 4,
    title: "GREEN COMPUTING:",
    glowColor: "green",
    bgGradient: "from-black to-gray-900",
    cardType: "green",
    date: "18 October 2026",
    location: "VIT Vellore",
    description: "Explore how mathematical thinking can help us design computing systems that are more efficient and more responsible.",
    image: eventPlaceholder,
  }
];

const EventCard = ({ event, onOpen }) => {
  const borderColor = event.glowColor === 'fuchsia' ? 'border-fuchsia-500' : 'border-green-500';
  const shadowColor = event.glowColor === 'fuchsia' ? 'shadow-[0_0_20px_rgba(217,70,239,0.6)]' : 'shadow-[0_0_20px_rgba(34,197,94,0.6)]';
  const hoverShadowColor = event.glowColor === 'fuchsia' ? 'hover:shadow-[0_0_32px_rgba(217,70,239,0.8)]' : 'hover:shadow-[0_0_32px_rgba(34,197,94,0.8)]';
  const buttonColor = event.glowColor === 'fuchsia' ? 'bg-fuchsia-600' : 'bg-green-600';

  return (
    <div
      className={`relative group border-2 ${borderColor} ${shadowColor} ${hoverShadowColor} rounded-xl overflow-hidden aspect-video transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02]`}
      onClick={() => onOpen(event)}
      onKeyDown={(eventKey) => { if (eventKey.key === 'Enter' || eventKey.key === ' ') onOpen(event); }}
      role="button"
      tabIndex="0"
      aria-label={`View details for ${event.title}`}
    >
      <div className="absolute inset-0">
        <div className={`absolute inset-0 bg-gradient-to-br ${event.bgGradient}`}></div>

        {/* Abstract Patterns for each card to simulate images */}
        {event.cardType === 'code' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
            <h3 className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-400 tracking-wider text-center drop-shadow-[0_0_10px_rgba(217,70,239,0.8)]">
              {event.title}
            </h3>
            <div className="mt-8 text-6xl sm:text-8xl text-cyan-400 opacity-80 drop-shadow-[0_0_15px_rgba(34,211,238,0.6)] font-mono">
              {'</>'}
            </div>
          </div>
        )}

        {event.cardType === 'game' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
            <h3 className="text-4xl font-black text-cyan-100 tracking-wider text-center z-10 drop-shadow-md">
              {event.title}
            </h3>
            <p className="text-xl text-cyan-200 mt-2 z-10 italic font-medium">{event.subtitle}</p>
          </div>
        )}

        {event.cardType === 'science' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
            <h3 className="text-3xl font-black text-yellow-400 tracking-wider text-center whitespace-pre-line drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]">
              {event.title}
            </h3>
            <div className="absolute bottom-0 w-full h-1/2 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          </div>
        )}

        {event.cardType === 'green' && (
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 p-8">
            <h3 className="text-4xl font-black text-green-400 tracking-wider text-center drop-shadow-[0_0_15px_rgba(74,222,128,0.8)]">
              {event.title}
            </h3>
          </div>
        )}
      </div>

      <button onClick={(clickEvent) => { clickEvent.stopPropagation(); onOpen(event); }} className={`absolute bottom-4 right-4 ${buttonColor} text-white text-xs font-bold px-6 py-2 rounded-full hover:brightness-110 transition-all uppercase tracking-wider`}>
        Know More
      </button>
    </div>
  );
};

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    document.body.style.overflow = selectedEvent ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedEvent]);

  return (
    <div className="min-h-screen bg-[#070511] relative">
      {/* Background Purple Glow */}
      <div className="absolute top-[-20%] right-[-10%] w-[1000px] h-[1000px] bg-fuchsia-600/20 blur-[150px] rounded-full pointer-events-none z-0"></div>

      {/* Static Dotted Background matching DotField configuration */}
      <div
        className="absolute inset-0 z-0 opacity-100 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at center, #ffffff 1.5px, transparent 1.5px)',
          backgroundSize: '50px 50px'
        }}
      ></div>

      <div className="relative z-10 max-w-6xl px-6 pt-36 pb-24 mx-auto pointer-events-none">
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-white text-center mb-12 sm:mb-16 tracking-[0.12em] sm:tracking-[0.2em] drop-shadow-[6px_9px_17.75px_rgba(212,204,204,0.5)] pointer-events-auto">
          EVENTS
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pointer-events-auto">
          {events.map((event) => (
            <EventCard key={event.id} event={event} onOpen={setSelectedEvent} />
          ))}
        </div>
      </div>

      {selectedEvent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-5" role="dialog" aria-modal="true" aria-labelledby="event-dialog-title">
          <button aria-label="Close event details" className="absolute inset-0 cursor-default bg-black/75 backdrop-blur-sm" onClick={() => setSelectedEvent(null)} />
          <article className="relative z-10 max-h-[90vh] w-full max-w-xl overflow-y-auto border border-fuchsia-400/50 bg-[#150a23] p-5 shadow-[0_0_60px_rgba(217,70,239,0.35)] sm:p-7">
            <button aria-label="Close event details" onClick={() => setSelectedEvent(null)} className="absolute right-4 top-4 rounded-full p-2 text-white/60 transition hover:bg-white/10 hover:text-white"><X size={20} /></button>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-fuchsia-300">VITMAS EVENT</p>
            <h2 id="event-dialog-title" className="pr-8 text-3xl font-black uppercase tracking-wide text-white">{selectedEvent.title}</h2>
            <img src={selectedEvent.image} alt={`${selectedEvent.title} placeholder`} className="mt-6 h-48 w-full object-cover object-center opacity-85" />
            <p className="mt-4 leading-7 text-white/70">{selectedEvent.description}</p>
            <div className="mt-6 grid gap-3 border-y border-white/10 py-5 text-sm text-white/70 sm:grid-cols-2">
              <span className="flex items-center gap-2"><CalendarDays size={16} className="text-fuchsia-300" />{selectedEvent.date}</span>
              <span className="flex items-center gap-2"><MapPin size={16} className="text-fuchsia-300" />{selectedEvent.location}</span>
            </div>
            <button onClick={() => setSelectedEvent(null)} className="mt-6 inline-flex items-center gap-2 bg-fuchsia-600 px-5 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-fuchsia-500">Close <ArrowUpRight size={16} /></button>
          </article>
        </div>
      )}
    </div>
  );
};

export default Events;