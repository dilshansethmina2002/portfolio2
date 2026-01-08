import { useState } from "react";
import Project from "../components/Project";
import ReflectBackground from "../components/ReflectBackground";
import { myProjects } from "../constants";
import { motion, useMotionValue, useSpring } from "motion/react";
const Projects = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 10, stiffness: 50 });
  const springY = useSpring(y, { damping: 10, stiffness: 50 });
  const handleMouseMove = (e) => {
    x.set(e.clientX + 20);
    y.set(e.clientY + 20);
  };
  const [preview, setPreview] = useState(null);
  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative c-space section-spacing"
      id="projects"
    >

      <ReflectBackground 
        backdropBlurAmount="md" 
        className="absolute inset-0 -z-10"
      />
      <h1 className="mb-4 text-4xl font-extrabold tracking-tighter text-center text-white md:text-6xl lg:text-7xl">
            My {" "}
            <span className="bg-gradient-to-br from-purple-500 to-blue-500 bg-clip-text text-transparent">
              Projects
            </span>
      </h1>      
      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent mt-12 h-[1px] w-full" />
      {myProjects.map((project) => (
        <Project key={project.id} {...project} setPreview={setPreview} />
      ))}
      {preview && (
        <motion.div
          className="fixed top-0 left-0 z-40 pointer-events-none"
          style={{ x: springX, y: springY }}
        >
          <div className="relative w-80 h-56">
            <ReflectBackground
              backdropBlurAmount="md"
              edgeFade="55%"
              blendMode="screen"
              className="absolute inset-0 rounded-lg overflow-hidden"
            />
            <img
              src={preview}
              className="absolute inset-0 object-cover w-full h-full rounded-lg shadow-lg"
              alt=""
              aria-hidden
            />
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default Projects;
