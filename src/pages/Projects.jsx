import { useEffect, useState } from 'react';
import { ArrowUpRight, Orbit, Sigma, X } from 'lucide-react';

const projects = [
  { title: 'Darwinian Evolution Simulator', type: 'Python / Pygame', icon: Orbit, description: 'A 2D real-time ecosystem simulator where prey, predators, and food evolve through natural selection.', details: 'This project is a 2D real-time Darwinian Evolution Simulator developed using Python and Pygame. It models an ecosystem containing prey, predators, and food, where organisms have inheritable traits such as speed, size, vision, and energy. Through natural selection, mutation, reproduction, and survival competition, organisms adapt to environmental pressures such as limited food and predation. The simulation tracks population changes and trait evolution across generations using statistical graphs and visualizations. Overall, the project demonstrates how simple mathematical and AI-based rules can produce complex evolutionary and predator-prey behavior.', docsUrl: 'https://res.cloudinary.com/cyduhyca/image/upload/v1788177203/Team_09_-_Darwinian_Evolution_Simulator.pdf' },
  { title: 'ML-Powered Airfoil Optimization Engine', type: 'Machine Learning / Streamlit', icon: Sigma, description: 'A surrogate model and genetic algorithm pipeline for faster aerodynamic analysis and airfoil design.', details: 'This project, ML-Powered Airfoil Optimization Engine, uses Machine Learning to replace expensive CFD simulations for faster aerodynamic analysis. A dataset of over 175,000 cleaned aerodynamic samples is used to train a Random Forest surrogate model that predicts lift and drag coefficients from airfoil and flow parameters. The system then uses a Genetic Algorithm to search for improved airfoil designs based on objectives such as maximum lift, minimum drag, and maximum efficiency. A Streamlit interface with Plotly visualizations allows users to enter parameters, view predicted aerodynamic performance, and compare optimized designs. Overall, the project aims to make aerodynamic optimization faster, more accessible, and computationally efficient for applications such as aircraft, drones, vehicles, and wind turbines.', githubUrl: 'https://github.com/tanmayoff2-cyber/airfoil_optimization_engine', websiteUrl: 'https://airfoiloptimizationengine-aejz9in8hyjbxyttnqd5il.streamlit.app/' },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    document.body.style.overflow = selectedProject ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedProject]);

  return (
    <section className="min-h-screen px-6 pb-24 pt-40 text-white">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-fuchsia-300">Build / explore / share</p>
        <h1 className="max-w-3xl text-5xl font-black uppercase tracking-[0.12em] text-glow-white md:text-7xl" style={{textShadow: '6px 9px 17.7px rgba(212,204,204,0.5)'}}>PROJECTS</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/60">Ideas from the VITMAS community, shaped into experiments, tools, and experiences.</p>
        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {projects.map((project) => {
            const { title, type, icon: Icon, description } = project;
            return (
            <article key={title} className="group border border-fuchsia-300/25 bg-[#130a20]/80 p-7 transition hover:-translate-y-2 hover:border-fuchsia-300/70 hover:shadow-[0_0_30px_rgba(217,70,239,0.25)]">
              <Icon size={34} className="text-fuchsia-300" />
              <p className="mt-12 text-xs uppercase tracking-[0.2em] text-white/40">{type}</p>
              <h2 className="mt-3 text-2xl font-bold">{title}</h2>
              <p className="mt-4 min-h-20 text-sm leading-7 text-white/60">{description}</p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button type="button" onClick={() => setSelectedProject(project)} className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-fuchsia-300 transition group-hover:text-white">View project <ArrowUpRight size={16} /></button>
                {project.docsUrl && (
                  <a href={project.docsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-fuchsia-300/30 px-4 py-2 text-xs font-bold uppercase tracking-wider text-fuchsia-300 transition hover:border-fuchsia-300/70 hover:bg-fuchsia-500/10 hover:text-white">Docs <ArrowUpRight size={14} /></a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-fuchsia-300/30 px-4 py-2 text-xs font-bold uppercase tracking-wider text-fuchsia-300 transition hover:border-fuchsia-300/70 hover:bg-fuchsia-500/10 hover:text-white">GitHub <ArrowUpRight size={14} /></a>
                )}
                {project.websiteUrl && (
                  <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-fuchsia-300/30 px-4 py-2 text-xs font-bold uppercase tracking-wider text-fuchsia-300 transition hover:border-fuchsia-300/70 hover:bg-fuchsia-500/10 hover:text-white">Website <ArrowUpRight size={14} /></a>
                )}
              </div>
            </article>
            );
          })}
        </div>
      </div>
      {selectedProject && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true" aria-labelledby="project-dialog-title">
          <button aria-label="Close project details" className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedProject(null)} />
          <article className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto border border-fuchsia-400/50 bg-[#150a23] p-6 shadow-[0_0_60px_rgba(217,70,239,0.35)] sm:p-8">
            <button aria-label="Close project details" onClick={() => setSelectedProject(null)} className="absolute right-4 top-4 rounded-full p-2 text-white/60 transition hover:bg-white/10 hover:text-white"><X size={20} /></button>
            <p className="mb-3 pr-10 text-xs font-bold uppercase tracking-[0.3em] text-fuchsia-300">VITMAS PROJECT</p>
            <h2 id="project-dialog-title" className="pr-10 text-2xl font-black uppercase tracking-wide text-white sm:text-3xl">{selectedProject.title}</h2>
            <p className="mt-6 text-base leading-8 text-white/75">{selectedProject.details}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button onClick={() => setSelectedProject(null)} className="inline-flex items-center gap-2 bg-fuchsia-600 px-5 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-fuchsia-500">Close <X size={16} /></button>
              {selectedProject.docsUrl && (
                <a href={selectedProject.docsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-fuchsia-300/30 px-5 py-3 text-sm font-bold uppercase tracking-wider text-fuchsia-300 transition hover:border-fuchsia-300/60 hover:bg-fuchsia-500/10 hover:text-white">Docs <ArrowUpRight size={16} /></a>
              )}
              {selectedProject.githubUrl && (
                <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-fuchsia-300/30 px-5 py-3 text-sm font-bold uppercase tracking-wider text-fuchsia-300 transition hover:border-fuchsia-300/60 hover:bg-fuchsia-500/10 hover:text-white">GitHub <ArrowUpRight size={16} /></a>
              )}
              {selectedProject.websiteUrl && (
                <a href={selectedProject.websiteUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-fuchsia-300/30 px-5 py-3 text-sm font-bold uppercase tracking-wider text-fuchsia-300 transition hover:border-fuchsia-300/60 hover:bg-fuchsia-500/10 hover:text-white">Website <ArrowUpRight size={16} /></a>
              )}
            </div>
          </article>
        </div>
      )}
    </section>
  );
}
