import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, Play, RefreshCw, BookOpen } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  author: string;
  teaser: string;
  fullContent: string;
}

export default function BlogsSection() {
  const [activePostIdx, setActivePostIdx] = useState(0);
  const [isPlayingSim, setIsPlayingSim] = useState(true);
  
  // Simulation params for live Kalman Filter
  const [processNoise, setProcessNoise] = useState(0.2); // Q
  const [measurementNoise, setMeasurementNoise] = useState(5.0); // R
  const [simPoints, setSimPoints] = useState<{ x: number; trueY: number; noisyY: number; filteredY: number }[]>([]);

  // Kalman filter blog details
  const blogs: BlogPost[] = [
    {
      id: "kalman-filter",
      title: "Kalman Filters: The Art of Optimal Estimation Demystified",
      author: "Devarinti Harshitha",
      teaser: "If you’ve ever wondered how your phone knows exactly where you are — even as you zip through a city with spotty GPS — or how a self-driving car stays on course, you’ve already brushed up against the magic of Kalman filters. These humble algorithms are the unsung heroes behind much of our modern technology, powering everything from sensor data fusion in robotics to reliable navigation in our devices.",
      fullContent: "The Kalman filter is an optimal estimator that recursively computes the global state variable of a linear dynamical system disturbed by white noise. In essence, it keeps track of the estimated state of the system and the uncertainty of that estimate. When new noisy measurements are received, it updates its estimates using a weighted average, where more weight is given to estimates with higher certainty. This dynamic weighting is controlled by the Kalman Gain, which is recalculated at each discrete timestep."
    },
    {
      id: "prime-conjecture",
      title: "Asymptotic Distributions of Primes in Multi-Manifold Spaces",
      author: "Rohan Kulkarni",
      teaser: "Understanding prime distributions has intrigued mathematicians for centuries. By wrapping the Riemann Zeta function over multi-dimensional non-Euclidean manifolds, we model prime spectral densities as wave interference patterns. This offers a path to bridging algebraic number theory and string topology.",
      fullContent: "The distribution of primes is famously described by the Prime Number Theorem, stating that the number of primes less than N asymptotically approaches N/ln(N). When projected onto complex manifold coordinate maps, the trivial and non-trivial zeroes of the Riemann Zeta function correspond to discrete vibration nodes of higher-dimensional string membranes. This resonance is being studied as a foundational key to quantum-cryptographic systems."
    }
  ];

  const currentBlog = blogs[activePostIdx];

  // Helper: Live simulator for the Kalman Filter
  useEffect(() => {
    // Generate initial running data
    let trueState = 50;
    let estimatedState = 55;
    let errorCovariance = 10;
    
    const initialPoints = Array.from({ length: 30 }, (_, i) => {
      // Step true state with minor random walk
      trueState += (Math.random() - 0.5) * 6;
      // Add heavy measurement noise (R)
      const measurementError = (Math.random() - 0.5) * 20;
      const noisyState = trueState + measurementError;

      // --- actual Kalman filter step ---
      // 1. Predict
      const predictedErrorCovariance = errorCovariance + processNoise; // Q

      // 2. Update
      const kalmanGain = predictedErrorCovariance / (predictedErrorCovariance + measurementNoise); // R
      estimatedState = estimatedState + kalmanGain * (noisyState - estimatedState);
      errorCovariance = (1 - kalmanGain) * predictedErrorCovariance;

      return {
        x: i * 15 + 15,
        trueY: trueState,
        noisyY: noisyState,
        filteredY: estimatedState
      };
    });

    setSimPoints(initialPoints);
  }, [processNoise, measurementNoise]);

  // Live simulation progress loop
  useEffect(() => {
    if (!isPlayingSim) return;

    const interval = setInterval(() => {
      setSimPoints((prevPoints) => {
        if (prevPoints.length === 0) return [];
        
        // Take the latest state
        const lastPt = prevPoints[prevPoints.length - 1];
        
        // Compute next real state
        let nextTrue = lastPt.trueY + (Math.random() - 0.5) * 8;
        // Keep in bounds
        if (nextTrue < 20) nextTrue = 20;
        if (nextTrue > 100) nextTrue = 100;

        // Apply sensor noise
        const noise = (Math.random() - 0.5) * 25;
        const nextNoisy = nextTrue + noise;

        // Apply Kalman filter algorithm formulas
        // We'll calculate estimated State based on the previous point's estimation
        let lastFiltered = lastPt.filteredY;
        let lastErrorCov = 1.0; // simplified error variance 

        // Predict
        const predictedErr = lastErrorCov + processNoise;
        // Update
        const Gain = predictedErr / (predictedErr + measurementNoise);
        const nextFiltered = lastFiltered + Gain * (nextNoisy - lastFiltered);

        const newPt = {
          x: lastPt.x + 15,
          trueY: nextTrue,
          noisyY: nextNoisy,
          filteredY: nextFiltered
        };

        // Shift array and update coordinate values to fit bounds of SVG width 450
        const shifted = [...prevPoints, newPt]
          .slice(-30)
          .map((pt, index) => ({
            ...pt,
            x: index * 15 + 15
          }));

        return shifted;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [isPlayingSim, processNoise, measurementNoise]);

  // Generate SVG elements for the Kalman curve thumbnail representation
  const graphThumbnail = useMemo(() => {
    return (
      <svg viewBox="0 0 350 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" id="kalman-gaussian-thumbnail">
        <defs>
          <linearGradient id="purpleFill" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#8a19a9" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#d946ef" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="greenCurve" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>

        {/* Polar coordinates axes */}
        <line x1="20" y1="170" x2="330" y2="170" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <line x1="175" y1="20" x2="175" y2="170" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3,3" />

        {/* Normal distributions layout exactly like Image 1 */}
        {/* Curve 1: Prior estimate (Green) */}
        <path
          d="M 20 170 C 80 170, 110 40, 150 40 C 190 40, 220 170, 330 170"
          fill="none"
          stroke="#10b981"
          strokeWidth="2.5"
        />
        {/* Curve 2: Measurement distribution (Blue $y_k$) */}
        <path
          d="M 70 170 C 130 170, 160 80, 200 80 C 240 80, 270 170, 330 170"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          strokeDasharray="4,2"
        />
        {/* Curve 3: Core Posterior distribution ($x_k$ red/pink) */}
        <path
          d="M 50 170 C 110 170, 135 15, 175 15 C 215 15, 240 170, 310 170"
          fill="url(#purpleFill)"
          stroke="#ff2e93"
          strokeWidth="3"
        />

        {/* Vector math guides & labels */}
        <line x1="150" y1="40" x2="150" y2="170" stroke="#10b981" opacity="0.4" strokeDasharray="2,2" />
        <line x1="200" y1="80" x2="200" y2="170" stroke="#3b82f6" opacity="0.4" strokeDasharray="2,2" />
        <line x1="175" y1="15" x2="175" y2="170" stroke="#ff2e93" opacity="0.4" strokeDasharray="2,2" />

        {/* Math Variables text exactly matching Image 1 */}
        <text x="145" y="32" fill="#10b981" className="font-mono text-[9px] font-bold">x̂_k</text>
        <text x="171" y="9" fill="#ff2e93" className="font-mono text-[9px] font-bold">x_k</text>
        <text x="204" y="75" fill="#3b82f6" className="font-mono text-[9px] font-bold">y_k</text>
        <text x="140" y="165" fill="#10b981" className="font-mono text-[7px]" opacity="0.5">Prior</text>
        <text x="205" y="165" fill="#3b82f6" className="font-mono text-[7px]" opacity="0.5">Sensor</text>
        <text x="171" y="181" fill="#ff2e93" className="font-mono text-[7px]" opacity="0.5">Posterior</text>
      </svg>
    );
  }, []);

  return (
    <section 
      id="blogs" 
      className="relative min-h-screen w-full py-28 bg-transparent z-10 px-6 md:px-12"
    >
      <div className="absolute top-24 right-1/4 w-80 h-80 rounded-full bg-purple-900/10 blur-[130px] pointer-events-none" />
      
      <div className="relative z-20 max-w-7xl mx-auto flex flex-col justify-center">
        {/* "BLOGS" Header exactly formatted like Image 1 */}
        <div className="text-center mb-24 select-none overflow-hidden px-4">
          <h2 className="font-display font-black text-[8vw] sm:text-7xl md:text-8xl tracking-[0.25em] text-white leading-none uppercase text-shadow mr-[-0.25em] whitespace-nowrap">
            BLOGS
          </h2>
        </div>

        {/* Alternating Blog rows container - exact layout matching Image 1 */}
        <div className="flex flex-col gap-24" id="blogs-alternating-rows">
          
          {/* Row 1: Left Card, Right Paragraph */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column: Stacked shadow Card */}
            <div className="flex justify-center w-full">
              <div className="relative w-full max-w-md">
                {/* Master backing shadow card shifted down-left */}
                <div className="absolute -bottom-4 -left-4 w-full h-full bg-[#0c0216] rounded-xl z-0 border border-purple-950/60" />
                
                {/* Main front Card */}
                <div className="relative z-10 rounded-xl border-3 border-[#701a91] bg-[#4a0d63] overflow-hidden flex flex-col shadow-2xl">
                  {/* Normal distribution plot */}
                  <div className="p-4 bg-white flex items-center justify-center">
                    {graphThumbnail}
                  </div>
                  
                  {/* Detailed title & Author information block inside purple wrapper */}
                  <div className="p-5 text-left bg-gradient-to-b from-[#5c0e7c] to-[#3a0651]">
                    <h4 className="font-sans font-black text-white text-base md:text-lg leading-tight tracking-wide">
                      Kalman Filters: The Art of Optimal Estimation Demystified
                    </h4>
                    <p className="font-sans font-black text-xs md:text-sm text-[#ff2ea3] mt-2 tracking-widest uppercase">
                      Devarinti Harshitha
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Teaser Text */}
            <div className="text-left flex flex-col justify-center">
              <p className="font-display font-medium text-lg md:text-2xl leading-relaxed text-slate-100 tracking-wide select-text">
                If you’ve ever wondered how your phone knows exactly where you are — even as you zip through a city with spotty GPS — or how a self-driving car stays on course, you’ve already brushed up against the magic of Kalman filters. These humble algorithms are the unsung heroes behind much of our modern technology, powering everything from sensor data fusion in robotics to reliable navigation in our devices
              </p>
            </div>

          </div>

          {/* Row 2: Left Paragraph, Right Card (Alternating) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column: Teaser Text */}
            <div className="text-left flex flex-col justify-center order-2 lg:order-1">
              <p className="font-display font-medium text-lg md:text-2xl leading-relaxed text-slate-100 tracking-wide select-text">
                If you’ve ever wondered how your phone knows exactly where you are — even as you zip through a city with spotty GPS — or how a self-driving car stays on course, you’ve already brushed up against the magic of Kalman filters. These humble algorithms are the unsung heroes behind much of our modern technology, powering everything from sensor data fusion in robotics to reliable navigation in our devices
              </p>
            </div>

            {/* Right Column: Stacked shadow Card */}
            <div className="flex justify-center w-full order-1 lg:order-2">
              <div className="relative w-full max-w-md">
                {/* Master backing shadow card shifted down-left */}
                <div className="absolute -bottom-4 -left-4 w-full h-full bg-[#0c0216] rounded-xl z-0 border border-purple-950/60" />
                
                {/* Main front Card */}
                <div className="relative z-10 rounded-xl border-3 border-[#701a91] bg-[#4a0d63] overflow-hidden flex flex-col shadow-2xl">
                  {/* Normal distribution plot */}
                  <div className="p-4 bg-white flex items-center justify-center">
                    {graphThumbnail}
                  </div>
                  
                  {/* Detailed title & Author information block inside purple wrapper */}
                  <div className="p-5 text-left bg-gradient-to-b from-[#5c0e7c] to-[#3a0651]">
                    <h4 className="font-sans font-black text-white text-base md:text-lg leading-tight tracking-wide">
                      Kalman Filters: The Art of Optimal Estimation Demystified
                    </h4>
                    <p className="font-sans font-black text-xs md:text-sm text-[#ff2ea3] mt-2 tracking-widest uppercase">
                      Devarinti Harshitha
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Live Simulator Link or trigger underneath alternating card list */}
        <div className="mt-20 border-t border-purple-500/10 pt-10 text-center select-none">
          <p className="font-mono text-xs text-purple-400 tracking-wider">
            VITMAS MATHEMATICAL OBSERVATORY // DISCRETE STATE STABLE 
          </p>
        </div>

      </div>
    </section>
  );
}
