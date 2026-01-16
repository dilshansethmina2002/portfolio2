import { FlipWords } from "./FlipWords";
import { FlipWord2 } from "./FlipWord2";
import { motion } from "motion/react";

const HeroText = () => {
  const words = ["Creative", "Modern", "Stylish", "Responsive", "Innovative"];
  const who = [" Developer", "Designer", " Creator"];

  const variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="absolute inset-0 z-10 flex flex-col md:top-50 md:left-40 pointer-events-none c-space">
      
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
      {/* 1. Use 'block' instead of 'flex' to prevent flex-gap jitter */}
      <div className="block md:hidden font-space text-center w-full mt-25">
        
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

        {/* Block 2: Dynamic Flip Words (Rigid Container) */}
        {/* 2. RIGID BOX: Fixed height (h-24) + Overflow Hidden. This stops expansion. */}
        <motion.div 
            className="relative w-full h-24 overflow-hidden" 
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.2 }}
        >
             {/* 3. ABSOLUTE CENTERING: Locks text to the center of the rigid box */}
             <div className="absolute inset-0 flex justify-center items-center">
                <FlipWord2
                    words={who}
                    className="font-black text-white text-5xl tracking-widest"
                />
             </div>
        </motion.div>

      </div>

    </div>
  );
};

export default HeroText;