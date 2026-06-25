export default function Gallery() {
  const images = [
    { id: 1, title: "Event 1" },
    { id: 2, title: "Event 2" },
    { id: 3, title: "Event 3" },
    { id: 4, title: "Event 4" },
    { id: 5, title: "Event 5" },
    { id: 6, title: "Event 6" }
  ];

  return (
    <div className="min-h-screen">
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-12">Gallery</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map(image => (
            <div key={image.id} className="bg-gray-200 aspect-square rounded-lg flex items-center justify-center hover:shadow-lg transition">
              <span className="text-gray-400">{image.title}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
