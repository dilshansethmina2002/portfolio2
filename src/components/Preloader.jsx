import { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "react-responsive";

// A list of "techy" loading states to cycle through
const loadingStates = [
  "Initializing System...",
  "Loading Modules...",
  "Optimizing Assets...",
  "Compiling Shaders...",
  "Mounting React Components...",
  "Establishing Uplink...",
  "Launch Ready."
];

const Preloader = () => {
  const { progress } = useProgress();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  
  const [displayProgress, setDisplayProgress] = useState(0);
  const [show, setShow] = useState(true);
  const [currentState, setCurrentState] = useState(0);

  // --- PROGRESS LOGIC (Simulated vs Real) ---
  useEffect(() => {
      // Always use real progress, regardless of device.
      // This ensures the loader vanishes as soon as the assets are ready.
      setDisplayProgress(Math.round(progress));
    }, [progress]);

  // --- TEXT CYCLING LOGIC ---
  // Change the text based on the percentage loaded
  useEffect(() => {
    const totalStates = loadingStates.length;
    // Map 0-100% to the index of our loadingStates array
    const index = Math.floor((displayProgress / 100) * (totalStates - 1));
    setCurrentState(index);
  }, [displayProgress]);

  // --- EXIT LOGIC ---
  useEffect(() => {
    if (displayProgress === 100) {
      const timer = setTimeout(() => setShow(false), 800); // Slight delay to see "Launch Ready"
      return () => clearTimeout(timer);
    }
  }, [displayProgress]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: -50, // Slide up like a terminal window closing
            transition: { duration: 0.8, ease: "easeInOut" } 
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black font-mono text-green-500"
        >
          {/* Optional: CRT Scanline Effect Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))]" style={{ backgroundSize: "100% 2px, 3px 100%" }} />

          <div className="w-full max-w-md px-6 relative z-10">
            {/* Header */}
            <div className="flex justify-between items-end mb-2 border-b border-green-500/30 pb-2">
               <span className="text-xs uppercase tracking-widest text-green-400/70">System Boot</span>
               <span className="text-xs uppercase text-green-400/70">v.1.0.4</span>
            </div>

            {/* Main Percentage - Big & Glitchy */}
            <div className="text-6xl md:text-8xl font-bold tabular-nums mb-4 tracking-tighter text-white mix-blend-difference">
               {displayProgress.toString().padStart(3, "0")}%
            </div>

            {/* Progress Bar - Segmented Style */}
            <div className="w-full h-2 bg-gray-900 mb-4 overflow-hidden flex gap-1">
               {/* Create a 'segmented' look by using a dashed border or multiple divs, 
                   but a simple masked width works best for performance */}
               <motion.div 
                 className="h-full bg-green-500"
                 initial={{ width: 0 }}
                 animate={{ width: `${displayProgress}%` }}
               />
            </div>

            {/* Dynamic Status Text */}
            <div className="h-8 flex items-center">
               <span className="mr-2 text-green-500">{">"}</span>
               <motion.span 
                 key={currentState} // Animate when text changes
                 initial={{ opacity: 0, x: -10 }}
                 animate={{ opacity: 1, x: 0 }}
                 className="uppercase tracking-widest text-sm md:text-base text-green-100"
               >
                 {loadingStates[currentState]}
                 <span className="animate-pulse">_</span> {/* Blinking Cursor */}
               </motion.span>
            </div>
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;