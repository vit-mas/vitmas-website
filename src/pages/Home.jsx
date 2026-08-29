import logo from '../assets/vitmas_logo.png';
import circleImg from '../assets/circle.png';
import wormy from '../assets/wormhole.png';

export default function Home() {
  return (
    
    <div className="relative flex flex-1 min-h-[85vh] items-center justify-center overflow-hidden bg-transparent">
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Jockey+One&display=swap');`}
      </style>
      {/* No solid background — lets Layout's About backdrop (blur + dot grid) show through seamlessly to footer */}
      <img src={circleImg} alt="Circle" className="absolute right-0 bottom-0 w-64 pointer-events-none select-none" />
      <img src={wormy} alt="Wormhole" className="absolute left-0 bottom-0 w-64 pointer-events-none select-none" />

      <main className="flex flex-col items-center text-center px-6">
        <h1
          className="text-white font-bold tracking-[4px] sm:tracking-[8px] text-6xl sm:text-8xl md:text-[10rem]"
          style={{
            //textShadow: '1px 9px 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.6), 0 0 40px rgba(255,255,255,0.4)',
            textShadow: '6px 9px 17.7px rgba(212,204,204,0.5)',
            fontFamily: '"Jockey One", sans-serif',
            letterSpacing: '50.08px',
            textIndent: '50.08px',
            fontSize: '200px'
          }}
        >
          VITMAS
        </h1>
        <br />
        <p
          className="max-w-3xl text-white uppercase tracking-[2px] text-base leading-7 sm:text-xl sm:tracking-[4px] md:text-2xl"
          style={{
            textShadow: '6px 9px 17.7px rgba(212,204,204,0.8)',
            fontFamily: '"Jockey One", sans-serif',
            //textShadow: '1px 9px 17.7px 0px rgba(212, 204, 204, 0.74)'
          }}
        >
          BRIDGING THE GAP BETWEEN MATHEMATICAL THEORY
          AND TECHNOLOGICAL INNOVATION
        </p>
      </main>
    </div>
  );
}
