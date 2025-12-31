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
    <div className="z-10 mt-20 text-center md:mt-40 md:text-left rounded-3xl bg-clip-text">
     
     
      {/* Desktop View */}
      <div className="flex-col hidden md:flex c-space">
        <motion.h1
          className="text-6xl font-medium text-neutral-300 "
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
        >
          Hi I'm Sethmina
        </motion.h1>
        <div className="flex flex-col items-start">
          <motion.div
            className="text-5xl font-medium text-neutral-300"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.2 }}
          >
            
            <FlipWord2
              words={who}
              className="font-black text-white text-5xl"
            />
            <br /> Dedicated to Crafting
          </motion.div>
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.5 }}
          >
            <FlipWords
              words={words}
              className="font-black text-white text-6xl"
            />
          </motion.div>
          <motion.div
            className="text-4xl font-medium text-neutral-300"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.8 }}
          >
            Web Solutions
          </motion.div>
        </div>
      </div>
      {/* Mobile View */}
      <div className="flex flex-col md:hidden">
        <motion.div
          className="text-5xl font-black text-neutral-300"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
        >
          Hi,I'm Sethmina
          <br />
          <FlipWord2
              words={who}
              className="font-black text-white text-5xl"
            />
        </motion.div>
        
        
        
      </div>
    </div>
  );
};

export default HeroText;
