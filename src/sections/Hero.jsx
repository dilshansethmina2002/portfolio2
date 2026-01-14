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

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  
  // 1. Create a reference for the group we want to move with the mouse
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
          <figure
        className="absolute bottom-0 w-full h-[50vh] pointer-events-none flex z-10 md:bottom-auto md:top-0 md:right-0 md:h-full"
        style={{ width: "100vw", height: "100vh" }}
      >
        <Canvas
          camera={{ position: [0, 0, 30] }} // Set a fixed initial camera position
          gl={{ antialias: true }}
          dpr={[1, 2]}
          style={{ pointerEvents: "auto" }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[0, 10, 10]} intensity={2} />
          
          <Suspense fallback={<Loader />}>
            {/* 2. Wrap everything in a group referenced by heroGroupRef */}
            <group ref={heroGroupRef}>
              <Float speed={1} rotationIntensity={1} floatIntensity={1}>
                <Astronaut 
                  scale={screenScale} 
                  position={screenPosition} 
                  rotation={rotation} 
                />
              </Float>
            </group>

            {/* 3. Pass the group ref to the Rig, NOT the camera */}
            <Rig objectRef={heroGroupRef} />

            <OrbitControls 
              enableZoom={false}
              enablePan={false}
              enableRotate={true}
              enabled={!isMobile} // This now works safely
              makeDefault
            />
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

// 4. Update Rig to move the OBJECT (group), not the CAMERA
function Rig({ objectRef }) {
  useFrame((state, delta) => {
    if (!objectRef.current) return;

    // This creates a subtle rotation/parallax effect on the model based on mouse position
    // We adjust rotation x and y. You can also adjust position if you prefer.
    easing.damp3(
      objectRef.current.rotation, 
      [state.pointer.y / 5, -state.pointer.x / 5, 0], 
      0.25, 
      delta
    );
  });
}

export default Hero;