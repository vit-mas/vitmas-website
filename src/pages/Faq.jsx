import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
    { question: "WHAT DOES VITMAS DO?", answer: "VITMAS organizes various mathematical and technical events." },
    { question: "WHY DOES VITMAS DO?", answer: "To promote the application of mathematics in technology and everyday life." },
    { question: "WHEN DOES VITMAS DO?", answer: "Events are held throughout the academic year, with Gravitas being our flagship fest." },
    { question: "WHERE DOES VITMAS DO?", answer: "Events are conducted both online and at the Vellore Institute of Technology campus." },
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-[#0d0415] relative overflow-hidden flex items-center justify-center p-8 pt-40">
            {/* Background glow effect */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-fuchsia-600/20 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 z-10">

                {/* Left Column - FAQ */}
                <div className="bg-[#9d2e9e] p-10 rounded-sm shadow-2xl flex flex-col h-full">
                    <h1 className="text-white text-6xl font-normal text-center mb-10 tracking-wide font-sans">FAQ</h1>

                    <div className="space-y-4 mt-auto mb-auto">
                        {faqs.map((faq, index) => (
                            <div key={index} className="flex flex-col">
                                <button
                                    className="w-full flex justify-between items-center p-5 bg-[#872488] text-white text-left font-medium hover:bg-[#7a207b] transition-colors focus:outline-none"
                                    onClick={() => toggleFAQ(index)}
                                >
                                    <span className="text-lg">{faq.question}</span>
                                    <ChevronDown
                                        className={`transition-transform duration-300 ${openIndex === index ? 'rotate-180' : 'rotate-0'}`}
                                        size={24}
                                    />
                                </button>
                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out bg-[#7a207b]/50 ${openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                                >
                                    <p className="p-5 text-start text-white/90">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column - Ask Away Form */}
                <div className="bg-[#9d2e9e] p-10 rounded-sm shadow-2xl flex flex-col h-full">
                    <h1 className="text-white text-6xl font-normal text-center mb-10 tracking-wide font-sans">ASK AWAY</h1>

                    <form className="flex flex-col gap-6 mt-auto mb-auto" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="w-full p-4 bg-[#b545b6] text-white placeholder-white/70 outline-none border-none focus:ring-2 focus:ring-white/50 transition-all"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full p-4 bg-[#b545b6] text-white placeholder-white/70 outline-none border-none focus:ring-2 focus:ring-white/50 transition-all"
                        />
                        <textarea
                            placeholder="Type Your Message"
                            rows="4"
                            className="w-full p-4 bg-[#b545b6] text-white placeholder-white/70 outline-none border-none focus:ring-2 focus:ring-white/50 transition-all resize-none"
                        ></textarea>

                        <div className="flex justify-center mt-4">
                            <button
                                type="submit"
                                className="bg-[#b545b6] text-white text-xl px-12 py-3 hover:bg-[#c755c8] transition-colors"
                            >
                                SUBMIT
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default FAQ;
