import logo from '../assets/vitmas_logo.png';
import circleImg from '../assets/circle.png';
import wormy from '../assets/wormhole.png';

export default function Home() {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background:
          'radial-gradient(500px circle at top left, #6B0884 0%, transparent 75%), radial-gradient(500px circle at bottom right, #6B0884 0%, transparent 65%), #11001B',
      }}
    >
      <img src={circleImg} alt="Circle" className="absolute right-0 bottom-0 w-64" />
      <img src={wormy} alt="Wormhole" className="absolute left-0 bottom-0 w-64" />

      <main className="flex flex-col items-center text-center px-6">
        <h1
          className="text-white font-bold tracking-[8px]"
          style={{
            fontSize: '10rem',
            textShadow: '0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.6), 0 0 40px rgba(255,255,255,0.4)',
          }}
        >
          VITMAS
        </h1>
        <p
          className="text-white uppercase tracking-[4px] text-2xl"
          style={{
            textShadow: '0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.6), 0 0 40px rgba(255,255,255,0.4)',
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
