import { FlipWords } from "./FlipWords";
import { FlipWord2 } from "./FlipWord2";
import { motion } from "motion/react";

const HeroText = () => {
  const words = ["Creative", "Modern", "Stylish", "Responsive", "Innovative"];
  const who = ["Developer", "Designer", "Creator"];

  const variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="absolute inset-0 z-10 flex flex-col top-50 left-40 pointer-events-none c-space">
      
      {/* 1. INJECT SPACE FONT (Orbitron) */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&display=swap');
          .font-space { font-family: 'Orbitron', sans-serif; }
        `}
      </style>

      {/* ---------------- DESKTOP VIEW ---------------- */}
      <div className="flex-col hidden md:flex c-space font-space">
        <motion.div
          className="text-6xl font-bold text-neutral-300 mb-6 tracking-wide"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
        >
          HI, I'M <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">SETHMINA</span>
        </motion.div>

        <div className="flex flex-col items-start gap-6"> 
          <div className="relative h-[70px] w-full">
             <motion.div
                className="absolute left-0 top-0 text-6xl font-medium text-neutral-300 tracking-wider"
                variants={variants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 1.2 }}
              >
                <FlipWord2 words={who} className="font-bold text-white text-6xl tracking-widest" />
              </motion.div>
          </div>
          
          <div className="text-4xl font-medium text-neutral-400 tracking-widest uppercase">
            Dedicated to Crafting
          </div>

          <div className="relative h-[90px] w-full">
              <motion.div
                className="absolute left-0 top-0"
                variants={variants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 1.5 }}
              >
                <FlipWords words={words} className="font-black text-white text-7xl tracking-tighter drop-shadow-md" />
              </motion.div>
          </div>

          <motion.div
            className="text-4xl font-bold text-indigo-400 tracking-[0.2em] uppercase drop-shadow-[0_0_10px_rgba(129,140,248,0.5)]"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.8 }}
          >
            Web Solutions
          </motion.div>
        </div>
      </div>

      {/* ---------------- MOBILE VIEW (FIXED) ---------------- */}
      <div className="flex flex-col md:hidden gap-6 font-space items-center text-center w-full">
        
        {/* Block 1: Static Greeting */}
        <motion.div
          className="text-5xl font-black text-neutral-300 leading-tight tracking-wide"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
        >
          HI, I'M <br />
          <span className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]">SETHMINA</span>
        </motion.div>

        {/* Block 2: Dynamic Flip Words (Isolated) */}
        {/* Using a fixed height container that is separated from the text above */}
        <motion.div 
            className="relative h-[60px] w-full flex justify-center items-center mt-2"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.2 }}
        >
             {/* Absolute centering ensures the box size never changes regardless of word length */}
             <div className="absolute inset-0 flex justify-center items-center">
                <FlipWord2
                    words={who}
                    className="font-black text-white text-4xl tracking-widest" // Reduced to 4xl to prevent screen overflow
                />
             </div>
        </motion.div>

      </div>

    </div>
  );
};

export default HeroText;