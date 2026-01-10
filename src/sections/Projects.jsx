import { useState } from "react";
import Project from "../components/Project";
import { myProjects } from "../constants";
import { motion, useMotionValue, useSpring } from "motion/react";
import { Particles } from "../components/Particles";

const Projects = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Adjusted physics for a smoother, more "premium" float feel
  const springX = useSpring(x, { damping: 15, stiffness: 100 });
  const springY = useSpring(y, { damping: 15, stiffness: 100 });

  const handleMouseMove = (e) => {
    // Slight offset so the cursor doesn't block the top-left corner of the image
    x.set(e.clientX + 15);
    y.set(e.clientY + 15);
  };

  const [preview, setPreview] = useState(null);

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative w-full py-24 bg-[#050505] overflow-hidden scroll-mt-28"
      id="projects"
    >
      <div className="absolute inset-0 z-0">
                      <Particles
                          className="absolute inset-0"
                          quantity={400}
                          ease={500}
                          color="#22c55e" 
                          shape="square"  
                          vx={0.5}
                          vy={-0.5} 
                      />
              </div>
      {/* Decorative Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6">
        
        <h1 className="mb-8 text-5xl md:text-7xl font-bold tracking-tight text-center text-white">
          Selected{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            Works
          </span>
        </h1>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16" />

        <div className="flex flex-col gap-4">
          {myProjects.map((project) => (
            <Project key={project.id} {...project} setPreview={setPreview} />
          ))}
        </div>
      </div>

      {preview && (
        <motion.div
          className="fixed top-0 left-0 z-50 pointer-events-none"
          style={{ x: springX, y: springY }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
        >
          <div className="relative w-[400px] aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl">
            <img
              src={preview}
              className="absolute inset-0 object-cover w-full h-full"
              alt="Project Preview"
            />
            {/* Subtle overlay to ensure image blends nicely with dark mode */}
            <div className="absolute inset-0 bg-black/10" />
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default Projects;