import { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "react-responsive";

const Preloader = () => {
  const { progress } = useProgress();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  
  // We use a local state to manage the display percentage
  const [displayProgress, setDisplayProgress] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (isMobile) {
      // --- MOBILE LOGIC: Simulated Smooth Load ---
      // This runs a fake progress bar from 0 to 100 over ~2 seconds
      // It gives the 2D image time to load and shows off your branding
      const timer = setInterval(() => {
        setDisplayProgress((old) => {
          if (old >= 100) {
            clearInterval(timer);
            return 100;
          }
          return old + 1; // Increment by 1% every 20ms
        });
      }, 20);

      return () => clearInterval(timer);
    } else {
      // --- DESKTOP LOGIC: Real 3D Asset Tracking ---
      // We round the progress to avoid decimals
      setDisplayProgress(Math.round(progress));
    }
  }, [progress, isMobile]);

  // When our local displayProgress hits 100, trigger the exit
  useEffect(() => {
    if (displayProgress === 100) {
      // Small buffer (500ms) before fading out so user sees "100%"
      const timer = setTimeout(() => setShow(false), 500);
      return () => clearTimeout(timer);
    }
  }, [displayProgress]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            {/* Branding / Greeting */}
            <h2 className="text-xl md:text-3xl font-bold text-white font-generalsans uppercase tracking-widest">
              Initializing Space
            </h2>
            
            {/* Progress Bar */}
            <div className="w-64 h-1 bg-gray-800 rounded-full mt-4 overflow-hidden relative">
              <motion.div
                className="h-full bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                initial={{ width: 0 }}
                animate={{ width: `${displayProgress}%` }}
              />
            </div>

            {/* Percentage Text */}
            <p className="mt-2 text-sm text-gray-400 font-mono">
              {displayProgress}% Loaded
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;