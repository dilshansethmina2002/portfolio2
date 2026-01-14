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

        <motion.div

          className="text-5xl font-black text-neutral-300"

          variants={variants}

          initial="hidden"

          animate="visible"

          transition={{ delay: 1 }}

        >

          Hi, I'm Sethmina

          <br />

        </motion.div>



        <div className="flex flex-col items-start">

          {/* Desktop Wrapper: Fixed height and absolute child */}

          <div className="relative h-[50px] w-full">

             <motion.div

                className="absolute left-0 top-0 text-5xl font-medium text-neutral-300"

                variants={variants}

                initial="hidden"

                animate="visible"

                transition={{ delay: 1.2 }}

              >

                <FlipWord2 words={who} className="font-black text-white text-5xl" />

              </motion.div>

          </div>

         

          <div className="text-5xl font-medium text-neutral-300">

            Dedicated to Crafting

          </div>



          {/* Secondary FlipWords Wrapper */}

          <div className="relative h-[50px] w-full">

              <motion.div

                className="absolute left-0 top-0"

                variants={variants}

                initial="hidden"

                animate="visible"

                transition={{ delay: 1.5 }}

              >

                <FlipWords words={words} className="font-black text-white text-6xl" />

              </motion.div>

          </div>



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

          Hi, I'm Sethmina

          <br />

          {/* MOBILE FIX:

              We create a relative container with a set height.

              The FlipWord2 is absolute centered.

              This prevents ANY layout shift because the 'relative' box never changes size.

          */}

          <div className="relative h-[65px] w-full mt-2">

             <div className="absolute inset-0 flex justify-center items-center">

                <span className="inline-block min-w-[280px]">

                    <FlipWord2

                        words={who}

                        className="font-black text-white text-5xl"

                    />

                </span>

             </div>

          </div>

        </motion.div>

      </div>

    </div>

  );

};



export default HeroText;