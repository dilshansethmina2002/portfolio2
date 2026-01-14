import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, FileText, Smartphone, Server, Globe as GlobeIcon, Code, Database, Cpu } from "lucide-react"; 
import Card from "../components/Card";
import { Globe } from "../components/globe";
import CopyEmailButton from "../components/CopyEmailButton";
import { Frameworks } from "../components/FrameWorks";
import { Particles } from "../components/Particles";

// --- CUSTOM HOOK FOR MOBILE DETECTION ---
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  return isMobile;
};

// --- CSS STYLES ---
const styles = `
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }
  @keyframes scan {
    0% { top: 0%; opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { top: 100%; opacity: 0; }
  }
  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .animate-marquee {
    animation: marquee 20s linear infinite;
  }
  .crt-lines {
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0) 50%,
      rgba(0, 0, 0, 0.1) 50%,
      rgba(0, 0, 0, 0.1)
    );
    background-size: 100% 4px;
    pointer-events: none;
  }
`;

const About = () => {
  const grid2Container = useRef();
  const isMobile = useIsMobile();
  
  // --- CLOCK LOGIC ---
  const [time, setTime] = useState(new Date());
  const [greeting, setGreeting] = useState("Hello");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now);
      const hour = now.getHours();
      if (hour < 12) setGreeting("Good Morning");
      else if (hour < 18) setGreeting("Good Afternoon");
      else setGreeting("Good Evening");
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString('en-US', { 
    hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' 
  });

  // --- ANIMATION SETTINGS ---
  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const viewportConfig = { once: true, amount: 0.2 }; // Changed 'once' to true for better performance

  return (
    <section className="c-space section-spacing py-20 relative overflow-hidden" id="about">
      <style>{styles}</style>
      
      {/* 1. OPTIMIZATION: Reduced Particles on Mobile */}
      <div className="absolute inset-0 z-0 pointer-events-none">
          <Particles
              className="absolute inset-0"
              quantity={isMobile ? 40 : 400} // 10x fewer particles on mobile
              ease={500}
              color="#22c55e" 
              shape="square"  
              vx={0.5}
              vy={-0.5} 
          />
      </div>

      {/* CRT Overlay */}
      <div className="absolute inset-0 crt-lines z-50 opacity-20 pointer-events-none mix-blend-overlay" />

      {/* --- HEADER (Animated) --- */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        variants={itemVariants}
        className="flex flex-col md:flex-row justify-between items-end mb-10 px-4 border-b border-indigo-500/30 pb-4"
      >
        <h2 className="text-4xl font-bold text-white font-generalsans">
          <span className="text-indigo-400 text-lg block font-mono mb-1 tracking-widest">:: SYSTEM_USER // SETHMINA</span>
          {greeting}.
        </h2>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-green-500 font-mono text-sm">SYSTEM ONLINE</span>
        </div>
      </motion.div>

      {/* --- MAIN GRID --- */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 h-full relative z-10">
        
        {/* --- BLOCK 1: Profile (Animated) --- */}
        <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={itemVariants}
            className="xl:col-span-4 h-full"
        >
             <div className="bg-zinc-950/80 backdrop-blur-md border border-indigo-500/30 rounded-3xl p-6 flex flex-col items-center text-center h-[97%] relative overflow-hidden group hover:border-indigo-400/50 transition-colors duration-500">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e51a_1px,transparent_1px),linear-gradient(to_bottom,#4f46e51a_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />

                {/* Floating Image */}
                <div className="relative w-[80%] aspect-[4/4] mb-6 mt-4 animate-[float_6s_ease-in-out_infinite]">
                    <div className="absolute w-full h-[2px] bg-indigo-400 shadow-[0_0_10px_#818cf8] z-20 animate-[scan_3s_ease-in-out_infinite]" />
                    <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-indigo-500/20 group-hover:border-indigo-400 transition-colors">
                        <img
                            src="assets/dilshan2.png"
                            alt="Sethmina"
                            className="relative w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500"
                        />
                        <div className="absolute bottom-2 left-2 right-2 flex justify-between text-[10px] text-indigo-300 font-mono bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
                            <span>ID: 948-X</span>
                            <span>Lv. 99</span>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 w-full">
                    <p className="text-3xl font-bold text-white mb-1">Sethmina</p>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-4">
                        <span className="text-indigo-300 text-xs font-mono tracking-widest">FULL_STACK_DEV</span>
                    </div>
                    
                    <p className="text-zinc-400 text-sm leading-relaxed mb-6 text-justify px-2">
                        <span className="text-indigo-400 font-bold">&gt;</span> Initializing connection... <br/>
                        Over the last 3 years, I have optimized my neural networks (skills) through academic simulations and deployed production-grade code to the live server.
                    </p>
                    
                    {/* BUTTON CONTAINER */}
                    <div className="mt-auto w-full flex flex-col gap-3">
                        <a 
                            href="/assets/Sethmina_CV.pdf" 
                            download="Dilshan_Sethmina_CV.pdf"
                            className="group w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-lg transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40"
                        >
                            <FileText className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            <span className="font-medium text-sm">Download CV</span>
                            <Download className="w-4 h-4 opacity-70 group-hover:translate-y-1 transition-transform" />
                        </a>
                        <div className="w-full h-[1px] bg-white/10" />
                        <div className="pt-1">
                             <CopyEmailButton />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>


        {/* --- RIGHT COLUMN WRAPPER --- */}
        <div className="xl:col-span-8 flex flex-col gap-6">
            
            {/* --- BLOCK 2: Tech Stack (Animated) --- */}
            <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                variants={itemVariants}
                className="bg-zinc-900 border border-white/10 rounded-3xl p-8 relative overflow-hidden flex flex-col md:flex-row items-center min-h-[250px] shadow-lg shadow-black/50"
            >
                {/* Blinking Lights */}
                <div className="absolute top-4 right-4 flex gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                </div>

                <div className="md:w-1/2 z-10 relative">
                    <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                        <Cpu className="w-6 h-6 text-indigo-500" />
                        Tech Arsenal
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                        Current Loadout: <span className="text-white font-mono bg-indigo-500/20 px-1 rounded">Java</span> <span className="text-white font-mono bg-indigo-500/20 px-1 rounded">MongoDB</span> <span className="text-white font-mono bg-indigo-500/20 px-1 rounded">React</span>.
                        <br/><br/>
                        Building scalable architecture that survives the vacuum of space.
                    </p>
                </div>
                
                {/* 2. OPTIMIZATION: Conditional Tech Stack Display */}
                <div className="md:w-1/2 w-full flex justify-center items-center relative h-[200px] md:h-auto overflow-hidden">
                    <div className="absolute inset-0 bg-indigo-600/20 blur-[40px] rounded-full" />
                    
                    {isMobile ? (
                      /* LIGHTWEIGHT MOBILE MARQUEE (Zero CPU Cost) */
                      <div className="relative w-full overflow-hidden whitespace-nowrap mask-linear-fade">
                        <div className="flex gap-8 animate-marquee items-center text-zinc-500 font-bold text-2xl uppercase opacity-70">
                           <span>Java</span><span>•</span><span>React</span><span>•</span><span>Next.js</span><span>•</span><span>MongoDB</span><span>•</span><span>Node</span><span>•</span><span>Tailwind</span><span>•</span>
                           {/* Duplicate for seamless loop */}
                           <span>Java</span><span>•</span><span>React</span><span>•</span><span>Next.js</span><span>•</span><span>MongoDB</span><span>•</span><span>Node</span><span>•</span><span>Tailwind</span><span>•</span>
                        </div>
                      </div>
                    ) : (
                      /* HEAVY DESKTOP 3D CLOUD */
                      <div className="relative z-10 scale-90">
                          <Frameworks />
                      </div>
                    )}
                </div>
            </motion.div>

            {/* --- BLOCK 3 & 4: Interactive Modules --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-auto md:h-[400px]">
                
                {/* Logic Board */}
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportConfig}
                    variants={itemVariants}
                    className="bg-[#0a0a0a] border border-zinc-800 rounded-3xl relative overflow-hidden group min-h-[300px]"
                >
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
                      <div className="absolute top-5 left-5 z-20 bg-black/60 backdrop-blur px-3 py-1 rounded border border-white/10">
                        <p className="text-xs font-mono text-indigo-400">MODE: {isMobile ? 'STATIC' : 'INTERACTIVE'}</p>
                      </div>

                    <div ref={grid2Container} className="w-full h-full relative z-10">
                      {/* 3. OPTIMIZATION: Static Grid for Mobile, Physics for Desktop */}
                      {isMobile ? (
                        <div className="w-full h-full flex flex-col justify-center items-center gap-4 p-8">
                            <div className="bg-zinc-800/80 border border-white/10 px-6 py-3 rounded-full text-white font-bold shadow-lg flex items-center gap-2">
                                <Code size={18} className="text-blue-400"/> UI/UX
                            </div>
                            <div className="bg-zinc-800/80 border border-white/10 px-6 py-3 rounded-full text-white font-bold shadow-lg flex items-center gap-2">
                                <Server size={18} className="text-purple-400"/> SOLID
                            </div>
                            <div className="bg-zinc-800/80 border border-white/10 px-6 py-3 rounded-full text-white font-bold shadow-lg flex items-center gap-2">
                                <Database size={18} className="text-green-400"/> React
                            </div>
                        </div>
                      ) : (
                        <div className="w-full h-full relative hover:cursor-grab active:cursor-grabbing">
                           <Card style={{ rotate: "12deg", top: "35%", left: "15%" }} text="UI/UX" containerRef={grid2Container} />
                           <Card style={{ rotate: "-15deg", bottom: "25%", right: "20%" }} text="SOLID" containerRef={grid2Container} />
                           <Card style={{ rotate: "5deg", top: "15%", right: "10%" }} image="assets/logos/react.svg" containerRef={grid2Container} />
                           <Card style={{ rotate: "-10deg", bottom: "30%", left: "10%" }} image="assets/logos/csharp-pink.png" containerRef={grid2Container} />
                        </div>
                      )}
                    </div>
                </motion.div>

                {/* Global Uplink */}
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportConfig}
                    variants={itemVariants}
                    className="bg-gradient-to-t from-black to-zinc-900 border border-zinc-800 rounded-3xl relative overflow-hidden flex flex-col min-h-[300px]"
                >
                      <div className="p-6 w-full flex justify-between items-start z-20">
                        <div>
                            <p className="text-white font-bold text-lg flex items-center gap-2"><GlobeIcon size={18} /> Global Uplink</p>
                            <p className="text-indigo-400 text-xs font-mono">LATENCY: 20ms</p>
                        </div>
                        <div className="text-right">
                            <p className="text-3xl font-mono text-white tracking-widest">{formattedTime}</p>
                            <p className="text-zinc-500 text-[10px] uppercase">Earth Standard Time</p>
                        </div>
                      </div>
                      
                      <div className="flex-1 w-full h-full relative flex items-end justify-center pb-4">
                        <div className="scale-125 opacity-90 transition-opacity duration-300 hover:opacity-100">
                             {/* The Globe component now handles its own internal optimization */}
                            <Globe />
                        </div>
                        <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
                      </div>
                </motion.div>

            </div>
        </div>

      </div>
    </section>
  );
};

export default About;