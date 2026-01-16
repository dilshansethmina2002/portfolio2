import { Canvas, useFrame } from "@react-three/fiber";
import HeroText from "../components/HeroText";
import Astronaut from "../components/Astronaut";
import { Float, OrbitControls } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { easing } from "maath";
import { Suspense, useRef } from "react";
import Loader from "../components/Loader";
import AnimatedButton from "../components/AnimatedButton";
import SoundController from "../components/SoundController";
import ParallaxBackground from "../components/ParallaxBackground";
// 1. Import motion from framer-motion
import { motion } from "framer-motion";

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  
  const heroGroupRef = useRef(); 

  const screenScale = isMobile ? 0.1 : 0.15;
  const screenPosition = isMobile ? [0, -20, 0] : [20, -27, 3];
  const rotation = [-1.3, -0.5, 0];

  const scrollToAbout = () => {
    const section = document.getElementById('about');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }  
  }

  return (
    <section className="flex items-start justify-center min-h-screen overflow-hidden md:items-start md:justify-start c-space" id="home">
      <HeroText />
      <ParallaxBackground/>
      <SoundController />
      
      {/* --- DESKTOP 3D VIEW --- */}
      {!isMobile && (
        <figure
          className="absolute bottom-0 w-full h-[50vh] pointer-events-none flex z-10 md:bottom-auto md:top-0 md:right-0 md:h-full"
          style={{ width: "100vw", height: "100vh" }}
        >
          <Canvas
            camera={{ position: [0, 0, 30] }}
            gl={{ antialias: true }}
            dpr={[1, 2]}
            style={{ pointerEvents: "auto" }}
          >
            <ambientLight intensity={0.5} />
            <directionalLight position={[0, 10, 10]} intensity={2} />
            
            <Suspense fallback={<Loader />}>
              <group ref={heroGroupRef}>
                <Float speed={1} rotationIntensity={1} floatIntensity={1}>
                  <Astronaut 
                    scale={screenScale} 
                    position={screenPosition} 
                    rotation={rotation} 
                  />
                </Float>
              </group>

              <Rig objectRef={heroGroupRef} />

              <OrbitControls 
                enableZoom={false}
                enablePan={false}
                enableRotate={true}
                makeDefault
              />
            </Suspense>
          </Canvas>
        </figure>
      )}

      {/* --- MOBILE 2D FALLBACK --- */}
      {isMobile && (
        <div className="absolute top-[35%] w-full flex justify-center z-10 pointer-events-none">
            {/* 2. Changed <img> to <motion.img> */}
            <motion.img 
              src="/assets/astronaut-2d.png" 
              alt="Astronaut"
              // 3. Define the fade-in states
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 3, ease: "easeOut" }} // Slow 3s fade
              
              className="w-[250px] h-auto object-contain animate-float"
              style={{
                filter: "drop-shadow(0 0 10px rgba(255,255,255,0.3))"
              }}
            />
            
            <style jsx>{`
              @keyframes float {
                0% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(-20px) rotate(2deg); }
                100% { transform: translateY(0px) rotate(0deg); }
              }
              .animate-float {
                animation: float 6s ease-in-out infinite;
              }
            `}</style>
        </div>
      )}

      <div className="absolute bottom-10 w-full flex z-20"
        style={ isMobile ? { justifyContent: "center" } : { left:"40%"}}
        onClick={scrollToAbout}
      >
        <AnimatedButton />
      </div>
    </section>
  );
};

function Rig({ objectRef }) {
  useFrame((state, delta) => {
    if (!objectRef.current) return;
    easing.damp3(
      objectRef.current.rotation, 
      [state.pointer.y / 5, -state.pointer.x / 5, 0], 
      0.25, 
      delta
    );
  });
}

export default Hero;