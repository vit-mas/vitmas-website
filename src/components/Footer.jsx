import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-gray-700 bg-gray-800 text-white py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 gap-8 mb-8 sm:grid-cols-3">
          <div>
            <h3 className="text-lg font-bold mb-4">VITMAS</h3>
            <p className="text-white/60">Mathematical Society of VIT Vellore</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-white/60 transition hover:text-fuchsia-300">Home</Link></li>
              <li><Link to="/about" className="text-white/60 transition hover:text-fuchsia-300">About</Link></li>
              <li><Link to="/events" className="text-white/60 transition hover:text-fuchsia-300">Events</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <p className="text-white/60">Email: vitmas@vit.ac.in</p>
            <p className="text-white/60">Phone: +91 81779 55735</p>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-4 text-center">
          <p className="text-sm text-white/40">&copy; 2026 VIT Mathematical Association VIT Vellore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}