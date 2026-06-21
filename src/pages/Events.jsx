export default function Events() {
  const events = [
    {
      id: 1,
      title: "Monthly Music Meetup",
      date: "Coming Soon",
      description: "A casual gathering for musicians to jam and collaborate"
    },
    {
      id: 2,
      title: "Art Exhibition",
      date: "Coming Soon",
      description: "Showcase of student artwork and creative projects"
    },
    {
      id: 3,
      title: "Annual Concert",
      date: "Coming Soon",
      description: "Grand music performance featuring our talented members"
    }
  ];

  return (
    <div className="min-h-screen">
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-12">Events</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
            <div key={event.id} className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-2">{event.title}</h3>
              <p className="text-blue-600 font-semibold mb-3">{event.date}</p>
              <p className="text-gray-700">{event.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
