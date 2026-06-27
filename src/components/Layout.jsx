import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="relative min-h-screen bg-[#070511] overflow-hidden">
      {/* Shared Events-style background for all pages */}
      <div className="absolute top-[-20%] right-[-10%] w-[1000px] h-[1000px] bg-fuchsia-600/20 blur-[150px] rounded-full pointer-events-none z-0" />
      <div
        className="absolute inset-0 z-0 opacity-100 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at center, #ffffff 1.5px, transparent 1.5px)',
          backgroundSize: '50px 50px'
        }}
      />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
