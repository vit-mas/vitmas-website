import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen px-6 pb-24 pt-40 text-white">
      <section className="mx-auto max-w-6xl">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-fuchsia-300">Open channel</p>
        <h1 className="text-5xl font-black uppercase tracking-[0.12em] text-glow-white md:text-7xl">CONTACT</h1>
        
        <div className="mt-16 grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold mb-4">Let&apos;s talk.</h2>
            <p className="mb-8 leading-8 text-white/60">
              Have questions or want to join VITMAS? We'd love to hear from you!
            </p>
            <div className="space-y-4">
              <p className="text-white/70"><strong className="text-white">Email:</strong> vitmas@vit.ac.in</p>
              <p className="text-white/70"><strong className="text-white">Phone:</strong> +91 81779 55735</p>
              <p className="text-white/70"><strong className="text-white">Location:</strong> VIT Vellore Campus</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5 border border-fuchsia-300/25 bg-[#130a20]/80 p-7">
            <div>
                <label className="mb-2 block text-sm font-semibold uppercase tracking-wider text-white/70">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-white/15 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-fuchsia-300"
                required
              />
            </div>
            <div>
                <label className="mb-2 block text-sm font-semibold uppercase tracking-wider text-white/70">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-white/15 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-fuchsia-300"
                required
              />
            </div>
            <div>
                <label className="mb-2 block text-sm font-semibold uppercase tracking-wider text-white/70">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full border border-white/15 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-fuchsia-300"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-fuchsia-600 py-3 font-bold uppercase tracking-wider text-white transition hover:bg-fuchsia-500"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
