import { FlipWords } from "./FlipWords";
import { FlipWord2 } from "./FlipWord2";
import { motion } from "motion/react";

const HeroText = () => {
  const words = ["Creative", "Modern", "Stylish", "Responsive", "Innovative"];
  const who = ["Developer", "Designer", "Creator"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
    },
  };

  return (
    // CHANGE 1: Used 'absolute inset-0' + 'flex justify-center' to vertically center the text
    // CHANGE 2: Added 'pointer-events-none' so this overlay doesn't block clicks on your 3D model
    <div className="absolute inset-0 z-10 flex flex-col justify-center items-center pointer-events-none c-space">
      
      {/* ---------------- DESKTOP VIEW ---------------- */}
      <motion.div 
        // Added 'pointer-events-auto' so users can still highlight text
        className="hidden md:flex flex-col gap-2 pointer-events-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="text-5xl font-black text-neutral-300"
          variants={childVariants}
        >
          Hi, I'm <span className="text-white">Sethmina</span>
        </motion.div>

        <motion.div 
          className="h-[60px] flex items-center" 
          variants={childVariants}
        >
          <FlipWord2 words={who} className="font-black text-white text-5xl" />
        </motion.div>
        
        <motion.div 
          className="text-5xl font-medium text-neutral-300"
          variants={childVariants}
        >
          Dedicated to Crafting
        </motion.div>

        <motion.div 
          className="h-[70px] flex items-center" 
          variants={childVariants}
        >
           <FlipWords words={words} className="font-black text-white text-6xl" />
        </motion.div>

        <motion.div 
          className="text-4xl font-medium text-indigo-400"
          variants={childVariants}
        >
          Web Solutions
        </motion.div>
      </motion.div>


      {/* ---------------- MOBILE VIEW ---------------- */}
      <motion.div 
        className="flex flex-col md:hidden gap-4 text-center pointer-events-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="text-5xl font-black text-neutral-300 leading-tight"
          variants={childVariants}
        >
          Hi, I'm <br /> 
          <span className="text-white">Sethmina</span>
        </motion.div>

        <motion.div 
          className="w-full flex justify-center items-center h-[60px]"
          variants={childVariants}
        >
           <FlipWord2
              words={who}
              className="font-black text-white text-5xl"
            />
        </motion.div>

        <motion.div 
          className="text-xl text-neutral-400 font-medium"
          variants={childVariants}
        >
           Dedicated to Crafting <br/>
           <span className="text-indigo-400 font-bold">Web Solutions</span>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default HeroText;