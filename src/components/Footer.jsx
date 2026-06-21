export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4">VITMAS</h3>
            <p>Music and Arts Society of VIT Vellore</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-blue-400">Home</a></li>
              <li><a href="/about" className="hover:text-blue-400">About</a></li>
              <li><a href="/events" className="hover:text-blue-400">Events</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <p>Email: vitmas@vit.ac.in</p>
            <p>Phone: +91-XXX-XXXX-XXXX</p>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-4 text-center">
          <p>&copy; 2024 VITMAS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
