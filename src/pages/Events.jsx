const events = [
  {
    id: 1,
    title: "<ZERO TO VIBE/>",
    glowColor: "fuchsia",
    bgGradient: "from-[#0f0826] to-[#1c0f42]",
    cardType: "code",
  },
  {
    id: 2,
    title: "The Rational Game",
    subtitle: "An Outreach Event",
    glowColor: "fuchsia",
    bgGradient: "from-black to-gray-900",
    cardType: "game",
  },
  {
    id: 3,
    title: "Beyond Boundaries:\nWomen in Science",
    glowColor: "green",
    bgGradient: "from-[#0a1f10] to-[#12381c]",
    cardType: "science",
  },
  {
    id: 4,
    title: "GREEN COMPUTING:",
    glowColor: "green",
    bgGradient: "from-black to-gray-900",
    cardType: "green",
  }
];

const EventCard = ({ event }) => {
  const borderColor = event.glowColor === 'fuchsia' ? 'border-fuchsia-500' : 'border-green-500';
  const shadowColor = event.glowColor === 'fuchsia' ? 'shadow-[0_0_20px_rgba(217,70,239,0.6)]' : 'shadow-[0_0_20px_rgba(34,197,94,0.6)]';
  const buttonColor = event.glowColor === 'fuchsia' ? 'bg-fuchsia-600' : 'bg-green-600';

  return (
    <div className={`relative group border-2 ${borderColor} ${shadowColor} rounded-xl overflow-hidden aspect-video`}>
      <div className="absolute inset-0">
        <div className={`absolute inset-0 bg-gradient-to-br ${event.bgGradient}`}></div>

        {/* Abstract Patterns for each card to simulate images */}
        {event.cardType === 'code' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
            <h3 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-400 tracking-wider text-center drop-shadow-[0_0_10px_rgba(217,70,239,0.8)]">
              {event.title}
            </h3>
            <div className="mt-8 text-8xl text-cyan-400 opacity-80 drop-shadow-[0_0_15px_rgba(34,211,238,0.6)] font-mono">
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

      <button className={`absolute bottom-4 right-4 ${buttonColor} text-white text-xs font-bold px-6 py-2 rounded-full hover:brightness-110 transition-all uppercase tracking-wider`}>
        Know More
      </button>
    </div>
  );
};

const Events = () => {
  return (
    <div className="h-[130vh] bg-[#070511] relative overflow-hidden">
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

      <div className="relative z-10 max-w-6xl mt-32 mx-auto pointer-events-none">
        <h1 className="text-7xl md:text-8xl font-black text-white text-center mb-16 tracking-[0.2em] drop-shadow-[0_0_25px_rgba(255,255,255,0.7)] pointer-events-auto">
          EVENTS
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pointer-events-auto">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
