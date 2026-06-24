import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Send, CheckCircle2 } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQSection() {
  const [activeFAQIdx, setActiveFAQIdx] = useState<number | null>(0);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const faqs: FAQItem[] = [
    {
      question: "WHAT DOES VITMAS DO?",
      answer: "VITMAS (Vellore Institute of Technology Mathematical Association) acts as a dynamic catalyst bridging mathematical theory and technological innovation. We host intense hackathons, pure seminars, coding camps, and interactive research conferences centered on cryptography, topological structures, neural computing networks, and deep statistical estimation algorithms."
    },
    {
      question: "WHY DOES VITMAS DO?",
      answer: "We believe mathematics is the foundational language of the cosmos and computing technology. Our association is dedicated to demonstrating the deep-seated mathematical architectures underpinning AI models, graphics modeling renderers, financial algorithms, and quantum processing. Our mission is to demystify mathematical structures for engineer students."
    },
    {
      question: "WHEN DOES VITMAS DO?",
      answer: "Throughout the dynamic academic semesters, VITMAS hosts flagship multi-day hackathons (like <ZERO TO VIBE/>), competitive mathematical outreach olympiads (like The Rational Game), weekly tech workshops, and guest lectures from expert mathematicians around the globe."
    },
    {
      question: "WHERE DOES VITMAS DO?",
      answer: "Our operations are active squarely within Vellore Institute of Technology (VIT), Vellore, Katpadi TN. Our sessions take place across major state-of-the-art auditorium rooms, campus innovation hubs, and digitally via open-source collaborative codebases and remote live seminars."
    }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim() || !formMessage.trim()) {
      setErrorMsg("Please fill out all fields of the form matrix.");
      return;
    }
    setErrorMsg("");
    setIsSubmitted(true);
    
    // Clear fields
    setTimeout(() => {
      setFormName("");
      setFormEmail("");
      setFormMessage("");
      setIsSubmitted(false);
    }, 4000);
  };

  return (
    <section 
      id="faq" 
      className="relative min-h-screen w-full py-24 bg-transparent z-10 px-4 md:px-8"
    >
      {/* Background neon visual anchors */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-purple-900/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-5 right-10 w-80 h-80 rounded-full bg-fuchsia-950/20 blur-[120px] pointer-events-none" />

      <div className="relative z-20 max-w-7xl mx-auto flex flex-col justify-center">
        
        {/* Joint Container holding FAQ left and ASK Form right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch px-4 md:px-8" id="faq-interactive-matrix">
          
          {/* Box A: FAQ Column */}
          <div className="flex flex-col bg-[#861d9a]/90 md:bg-[#861d9a] border border-purple-400/30 rounded-2xl p-8 md:p-10 shadow-2xl flex-1 justify-between">
            {/* FAQ TITLE exactly as Image 4 */}
            <div className="text-center mb-10 select-none">
              <h3 className="font-display font-black text-6xl md:text-8xl tracking-widest text-white leading-none uppercase">
                FAQ
              </h3>
            </div>

            {/* Accordion List */}
            <div className="space-y-4 flex-1 flex flex-col justify-start">
              {faqs.map((faq, idx) => {
                const isOpen = activeFAQIdx === idx;
                return (
                  <div
                    key={faq.question}
                    className="w-full flex flex-col"
                    id={`faq-item-${idx}`}
                  >
                    <button
                      onClick={() => setActiveFAQIdx(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between text-left bg-white/10 hover:bg-white/15 border border-white/5 rounded-xl py-4.5 px-6 font-display font-black text-xs md:text-sm tracking-widest text-white select-none transition-all cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown 
                        className={`w-5 h-5 text-white/80 transition-transform duration-300 ${
                          isOpen ? "transform rotate-180 text-white" : ""
                        }`} 
                      />
                    </button>

                    {/* Expandable Panel */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="bg-black/15 border-x border-b border-white/5 rounded-b-xl px-6 py-4 mt-[-4px]"
                        >
                          <p className="font-sans text-xs md:text-sm text-purple-100 leading-relaxed select-text">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Box B: ASK AWAY Form Column */}
          <div className="flex flex-col bg-[#861d9a]/90 md:bg-[#861d9a] border border-purple-400/30 rounded-2xl p-8 md:p-10 shadow-2xl flex-1">
            {/* Title display */}
            <div className="text-center mb-10 select-none overflow-hidden">
              <h3 className="font-display font-black text-[7vw] sm:text-5xl md:text-7xl tracking-widest text-white leading-none uppercase whitespace-nowrap">
                ASK AWAY
              </h3>
            </div>

            {/* Core input fields exactly as represented */}
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form-contact"
                  onSubmit={handleContactSubmit}
                  className="flex flex-col gap-6 justify-center flex-1"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  id="ask-away-form-inputs"
                >
                  {errorMsg && (
                    <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/50 text-red-100 text-xs font-mono">
                      {errorMsg}
                    </div>
                  )}

                  {/* Field: Full Name */}
                  <div className="flex flex-col font-mono text-xs gap-2">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full bg-white/10 border border-white/5 focus:border-white/40 rounded-xl py-4.5 px-6 text-white text-sm outline-none transition-all placeholder-white/50"
                    />
                  </div>

                  {/* Field: Email */}
                  <div className="flex flex-col font-mono text-xs gap-2">
                    <input
                      type="email"
                      placeholder="Email"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      className="w-full bg-white/10 border border-white/5 focus:border-white/40 rounded-xl py-4.5 px-6 text-white text-sm outline-none transition-all placeholder-white/50"
                    />
                  </div>

                  {/* Field: Type Your Message */}
                  <div className="flex flex-col font-mono text-xs gap-2">
                    <textarea
                      placeholder="Type Your Message"
                      rows={4}
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      className="w-full bg-white/10 border border-white/5 focus:border-white/40 rounded-xl py-4.5 px-6 text-white text-sm outline-none transition-all placeholder-white/50 resize-none"
                    />
                  </div>

                  {/* Submit Action Button exactly matches Image 4 style */}
                  <div className="flex justify-center w-full mt-4">
                    <button
                      type="submit"
                      className="w-1/2 py-3.5 rounded-lg text-xs md:text-sm font-display font-black tracking-widest uppercase bg-[#a735bd] hover:bg-[#b040c6] text-white transition-all shadow-md active:scale-95 cursor-pointer"
                      id="submit-contact-form"
                    >
                      SUBMIT
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="submit-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center flex-1 py-10"
                  id="form-success-alert"
                >
                  <CheckCircle2 className="w-16 h-16 text-emerald-300 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)] mb-4 animate-bounce" />
                  <h4 className="font-display font-bold text-xl text-white tracking-wide uppercase mb-2">
                    Hypothesis Accepted!
                  </h4>
                  <p className="font-sans text-xs text-purple-100 max-w-xs leading-relaxed">
                    Message received secure and computed into queue. Our mathematical lead will sync coordinates shortly.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
