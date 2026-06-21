export default function Team() {
  const teamMembers = [
    {
      id: 1,
      name: "Team Member 1",
      position: "Chairperson",
      image: "/placeholder.png"
    },
    {
      id: 2,
      name: "Team Member 2",
      position: "Vice Chairperson",
      image: "/placeholder.png"
    },
    {
      id: 3,
      name: "Team Member 3",
      position: "Secretary",
      image: "/placeholder.png"
    }
  ];

  return (
    <div className="min-h-screen">
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-12">Our Team</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map(member => (
            <div key={member.id} className="bg-white rounded-lg shadow-lg overflow-hidden text-center">
              <div className="bg-gray-200 h-48 flex items-center justify-center">
                <span className="text-gray-400">Image</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-blue-600">{member.position}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
