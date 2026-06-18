import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Code, Sigma, Cpu, ArrowUpRight, X, Compass, Radio } from "lucide-react";

interface Project {
  id: string;
  title: string;
  category: string;
  summary: string;
  math: string;
  desc: string;
  color: string;
  glow: string;
  icon: React.ComponentType<{ className?: string }>;
  graphic: React.ReactNode;
}

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: "neural-ode",
      title: "Neural Differential Equations",
      category: "DYNAMIC SYSTEMS / AI",
      summary: "Combining Dynamical Systems Theory and Deep Learning by representing neural network layers as continuous state changes.",
      math: "\\frac{d\\mathbf{h}(t)}{dt} = f(\\mathbf{h}(t), t, \\theta)",
      desc: "This project reformulates standard discrete neural network layers (like ResNets) as continuous-time dynamical systems path integrals. Integrating an ordinary differential equation (ODE) solver directly in the backpropagation loop allows the network to learn continuous, variable-step embeddings appropriate for medical time-series and weather forecasting.",
      color: "border-fuchsia-500 text-fuchsia-400 bg-fuchsia-950/20",
      glow: "border-glow-pink",
      icon: Sigma,
      graphic: (
        <svg viewBox="0 0 200 120" className="w-full h-full stroke-fuchsia-400 opacity-80" fill="none">
          {/* Animated phase landscape */}
          <path d="M10 60 Q 50 20, 100 60 T 190 60" strokeWidth="1.5" strokeDasharray="3,3" />
          <path d="M10 30 Q 60 90, 110 30 T 190 30" strokeWidth="1" strokeOpacity="0.4" />
          <path d="M10 90 Q 40 10, 90 90 T 190 90" strokeWidth="1" strokeOpacity="0.4" />
          <circle cx="100" cy="60" r="4" fill="#d946ef" />
          <circle cx="50" cy="40" r="3" fill="#d946ef" className="animate-ping" />
        </svg>
      )
    },
    {
      id: "quantum-ft",
      title: "Quantum Fourier Spectral Mapping",
      category: "ALGEBRA / TRANSFORMS",
      summary: "Mapping algebraic spectral representations over discrete quantum registers, optimizing computational overhead exponentially.",
      math: "|\\psi\\rangle = \\frac{1}{\\sqrt{N}} \\sum_{k=0}^{N-1} e^{2\\pi i j k / N} |k\\rangle",
      desc: "By exploiting Quantum Fourier Transform (QFT) mathematical structures, we model highly-entangled spectral spaces. This approach replaces standard FFT complexity of O(N log N) with O(log² N) qubits operation sequence, laying algebraic groundwork for real-time prime factorization and quantum signal decoding.",
      color: "border-cyan-500 text-cyan-400 bg-cyan-950/20",
      glow: "border-glow-green",
      icon: Cpu,
      graphic: (
        <svg viewBox="0 0 200 120" className="w-full h-full stroke-cyan-400 opacity-80" fill="none">
          {/* Quantum states grid */}
          <line x1="20" y1="20" x2="180" y2="20" strokeWidth="1" strokeOpacity="0.3" />
          <line x1="20" y1="60" x2="180" y2="60" strokeWidth="1" strokeOpacity="0.3" />
          <line x1="20" y1="100" x2="180" y2="100" strokeWidth="1" strokeOpacity="0.3" />
          <circle cx="40" cy="20" r="5" fill="#06b6d4" />
          <circle cx="100" cy="60" r="5" fill="#06b6d4" />
          <circle cx="160" cy="100" r="5" fill="#06b6d4" />
          <path d="M40 20 Q 70 80, 100 60 T 160 100" strokeWidth="1.5" />
        </svg>
      )
    },
    {
      id: "tda-homology",
      title: "Topological Data Analysis",
      category: "PURE MATH / DATA SCIENCE",
      summary: "Inferring structural shape and loops in multidimensional data clouds using persistence barcodes of simplicial complexes.",
      math: "H_k(K) = \\ker(\\partial_k) / \\mathrm{im}(\\partial_{k+1})",
      desc: "Topological Data Analysis (TDA) uses algebraic topology methods to study the 'shape' of high-dimensional datasets. By building nested simplicial complexes (Vietoris-Rips filtration) as a parameter varies, we extract persistent homology invariants. This is critical for mapping neural connections, cosmological structures, and genomic sequences without coordinate systems limits.",
      color: "border-emerald-500 text-emerald-400 bg-emerald-950/20",
      glow: "border-glow-purple",
      icon: Compass,
      graphic: (
        <svg viewBox="0 0 200 120" className="w-full h-full stroke-emerald-400 opacity-80" fill="none">
          {/* Simplicial complexes triangulation */}
          <polygon points="30,80 100,20 170,90" strokeWidth="1" strokeOpacity="0.4" fill="rgba(16, 185, 129, 0.05)" />
          <line x1="30" y1="80" x2="100" y2="95" strokeWidth="1.5" />
          <line x1="100" y1="95" x2="170" y2="90" strokeWidth="1.5" />
          <line x1="100" y1="20" x2="100" y2="95" strokeWidth="1" strokeDasharray="2,2" />
          <circle cx="30" cy="80" r="4" fill="#10b981" />
          <circle cx="100" cy="20" r="4" fill="#10b981" />
          <circle cx="170" cy="90" r="4" fill="#10b981" />
          <circle cx="100" cy="95" r="4" fill="#10b981" />
        </svg>
      )
    }
  ];

  return (
    <section 
      id="projects" 
      className="relative min-h-screen w-full py-24 bg-transparent z-10 px-4 md:px-8"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#07010e]/70 via-transparent to-[#07010e]/70" />
      
      <div className="relative z-20 max-w-7xl mx-auto flex flex-col justify-center">
        {/* Glowing Title Section matching design guidelines */}
        <div className="text-center mb-16 select-none overflow-hidden px-4">
          <h2 className="font-display font-black text-[8vw] sm:text-6xl md:text-7xl tracking-widest text-white leading-none uppercase text-glow-purple whitespace-nowrap">
            PROJECTS
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-fuchsia-500 mx-auto mt-6 rounded" />
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4" id="projects-grid">
          {projects.map((proj, idx) => {
            const Icon = proj.icon;
            return (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className={`relative flex flex-col overflow-hidden rounded-2xl border bg-black/60 backdrop-blur-md p-6 cursor-pointer transition-all duration-300 ${proj.color} md:hover:${proj.glow}`}
                onClick={() => setSelectedProject(proj)}
                id={`project-card-${proj.id}`}
              >
                {/* Decorative border gloss */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                {/* Card Header information */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs tracking-widest opacity-80 uppercase">
                    {proj.category}
                  </span>
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Card Title */}
                <h3 className="font-display font-bold text-xl md:text-2xl text-white tracking-wide mb-3">
                  {proj.title}
                </h3>

                {/* Math representation box */}
                <div className="my-4 py-3 px-4 rounded-lg bg-black/40 border border-white/5 font-mono text-sm flex items-center justify-center text-center text-white/90">
                  <code>{proj.math}</code>
                </div>

                {/* Core description preview */}
                <p className="text-sm text-gray-400 mt-2 mb-6 line-clamp-3 leading-relaxed">
                  {proj.summary}
                </p>

                {/* Graphic Visual Representation container */}
                <div className="mt-auto h-28 w-full p-2 bg-black/30 border border-white/5 rounded-xl flex items-center justify-center overflow-hidden">
                  {proj.graphic}
                </div>

                {/* Trigger interactive overlay button */}
                <div className="mt-5 flex items-center justify-end text-xs font-mono tracking-widest gap-1 hover:text-white transition-colors">
                  VIEW MATRIX <ArrowUpRight className="w-4 h-4" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dynamic Project Overlay Modal */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Blur backdrop overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
                onClick={() => setSelectedProject(null)}
              />

              {/* Core card information box */}
              <motion.div
                layoutId={`project-card-${selectedProject.id}`}
                className="relative bg-neutral-900 border border-white/10 rounded-2xl p-6 md:p-8 max-w-2xl w-full text-left overflow-y-auto max-h-[90vh] z-10 shadow-2xl"
                id="active-project-modal-card"
              >
                {/* Close trigger button */}
                <button
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/20 transition-all text-white/80 hover:text-white"
                  onClick={() => setSelectedProject(null)}
                  id="close-project-modal"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Header detail */}
                <span className="font-mono text-xs tracking-widest text-[#d946ef] uppercase font-bold">
                  {selectedProject.category}
                </span>

                <h3 className="font-display font-extrabold text-2xl md:text-3xl text-white tracking-wide mt-2 mb-4 leading-snug">
                  {selectedProject.title}
                </h3>

                {/* Formulas box */}
                <div className="my-6 p-4 rounded-xl bg-black/60 border border-white/10 text-center font-mono text-base md:text-lg text-fuchsia-300">
                  <code>{selectedProject.math}</code>
                </div>

                {/* Deep description text */}
                <div className="space-y-4 text-gray-300 text-sm md:text-base leading-relaxed">
                  <h4 className="font-display font-semibold text-white tracking-wider uppercase text-xs font-mono">
                    MATHEMATICAL PARADIGM & OVERVIEW
                  </h4>
                  <p>{selectedProject.desc}</p>
                  <p>In cooperation with student scholars and mathematical researchers at VIT, we actively test, optimize, and synthesize these mathematical frameworks. Any theoretical development translates strictly into computational pipelines running over edge accelerators.</p>
                </div>

                {/* Scientific metadata details bar */}
                <div className="mt-8 pt-6 border-t border-white/5 grid grid-cols-2 gap-4 font-mono text-xs text-white/50">
                  <div>
                    <span className="block text-white/30 uppercase tracking-[0.1em] text-[10px]">Topology Matrix</span>
                    <span className="text-white">Continuous manifolds integration</span>
                  </div>
                  <div>
                    <span className="block text-white/30 uppercase tracking-[0.1em] text-[10px]">Project Status</span>
                    <span className="text-[#10b981] flex items-center gap-1">
                      <Radio className="w-3 h-3 animate-pulse" /> Live Research Active
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
