export default function About() {
  return (
    <div className="min-h-screen">
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">About VITMAS</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-700">
              VITMAS aims to promote music, arts, and cultural activities within the VIT community.
              We provide a platform for talented individuals to showcase their skills and collaborate.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
            <p className="text-gray-700">
              To create an inclusive and vibrant community where artistic expression is celebrated
              and nurtured, inspiring innovation and creativity.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
