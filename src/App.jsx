import logo from './assets/logo.png';
import circleImg from  './assets/circle.png';
import wormy from './assets/wormhole.png';
function App() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'radial-gradient(500px circle at top left, #6B0884 0%, transparent 75%), radial-gradient(500px circle at bottom right, #6B0884 0%, transparent 65%), #11001B'
      }}>

      {/* Logo */}
      <img src={logo} className="absolute top-5 left-[60px] w-[100px]" />
      <img
        src={circleImg}
        alt="Circle"
        className="absolute right-0  bottom-0 w-64"
      />
      <img
        src={wormy}
        alt="Wormhole"
        className="absolute left-0 bottom-0 w-64"
      />
      {/* Navbar */}
      <nav className="absolute top-8 left-1/2 -translate-x-1/2">
        <div className="flex gap-8 px-8 py-4 bg-white/[0.08] backdrop-blur-xl border border-white/15 rounded-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.1)]">
          {['ABOUT', 'PROJECTS', 'EVENTS', 'BLOGS', 'TEAM', 'FAQ'].map(link => (
            <span
              key={link}
              className="text-xs text-white cursor-pointer transition-colors duration-300 hover:text-[#d28cff]"
            >
              {link}
            </span>
          ))}
        </div>
      </nav>

      {/* Contact Button */}
      <button className="absolute top-8 right-[3%] px-10 py-4 text-white text-sm font-medium border-none rounded-xl cursor-pointer bg-gradient-to-r from-[#8500EB] to-[#780994] shadow-[0_0_20px_rgba(133,0,235,0.5)] hover:shadow-[0_0_30px_rgba(133,0,235,0.7)] transition-shadow duration-300">
        CONTACT
      </button>

      {/* Hero */}
      <main className="flex flex-col items-center text-center">
        <h1
          className="text-white font-bold tracking-[8px]"
          style={{
            fontSize: '10rem',
            textShadow: '0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.6), 0 0 40px rgba(255,255,255,0.4)'
          }}
        >
          VITMAS
        </h1>
        <p
          className="text-white uppercase tracking-[4px] text-2xl"
          style={{
            textShadow: '0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.6), 0 0 40px rgba(255,255,255,0.4)'
          }}
        >
          BRIDGING THE GAP BETWEEN MATHEMATICAL THEORY
          <br />
          AND TECHNOLOGICAL INNOVATION
        </p>
      </main>
    </div>
  );
}

export default App;