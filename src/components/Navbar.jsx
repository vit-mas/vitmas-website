export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold text-blue-600">VITMAS</div>
          <ul className="flex gap-8">
            <li><a href="/" className="hover:text-blue-600">Home</a></li>
            <li><a href="/about" className="hover:text-blue-600">About</a></li>
            <li><a href="/events" className="hover:text-blue-600">Events</a></li>
            <li><a href="/team" className="hover:text-blue-600">Team</a></li>
            <li><a href="/gallery" className="hover:text-blue-600">Gallery</a></li>
            <li><a href="/contact" className="hover:text-blue-600">Contact</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
