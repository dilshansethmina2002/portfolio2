import { Canvas, useFrame } from "@react-three/fiber";
import HeroText from "../components/HeroText";
import ParallaxBackground from "../components/ParallaxBackground";
import Astronaut from "../components/Astronaut";
import { Float, OrbitControls } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { easing } from "maath";
import { Suspense } from "react";
import Loader from "../components/Loader";
import { useRef } from "react";
import { s } from "motion/react-client";
import AnimatedButton from "../components/AnimatedButton";

const Hero = () => {
  // 1. Adjust the breakpoint if needed
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const aboutSec = useRef(null);



  const astronautRef = useRef();
  const screenScale = isMobile ? 0.3 : 0.45;
  const screenPosition = isMobile ? [0, -50, 0] : [50,-80, 3];
  const rotation = [-1.3, -0.5, 0];

  const scrollToAbout = () => {
    const section = document.getElementById('about');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }  
  }

  return (
    <section className="flex items-start justify-center min-h-screen overflow-hidden md:items-start md:justify-start c-space ">
      <HeroText />
      <ParallaxBackground />
      <figure
        className="absolute bottom-0 w-full h-[50vh] pointer-events-none flex z-10 md:bottom-auto md:top-0 md:right-0 md:h-full "
        style={ isMobile ? { width: "80vw", height: "80vh" } : { width: "100vw", height: "100vh" }}
      >
        <Canvas  camera={{ position: [0, 0, 0] } }
          style={{ pointerEvents: "auto" }}
        >

          {/* 3. LIGHTING IS ESSENTIAL */}
          {/* Ambient light provides base brightness so it's not black */}
          <ambientLight intensity={0.5} />
          {/* Directional light acts like the sun, creating shadows and depth */}
          <directionalLight position={[10, 10, 10]} intensity={5} />
          
          <Suspense fallback={<Loader />}>
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
              <Astronaut 
                ref={astronautRef} 
                scale={screenScale} 
                position={screenPosition} 
                rotation={rotation} 
              />
            </Float>
            <Rig astronautRef={astronautRef} />
            <OrbitControls 
              enableZoom={false}
              enablePan={false}
              enableRotate={true}
              enabled={!isMobile}
              makeDefault
            />
            <Rig />
          </Suspense>
        </Canvas>
      </figure>
      <div className="absolute bottom-10 w-full flex z-20"
        style={ isMobile ? { justifyContent: "center" } : { left:"40%"}}
        onClick={scrollToAbout}
      >
        <AnimatedButton />

      </div>
      
    </section>
  );
};

function Rig() {
  return useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [state.pointer.x * 10, state.pointer.y * 10, 100], // Reduced movement sensitivity
      0.25,
      delta
    );
  });
}

export default Hero;