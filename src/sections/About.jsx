import { useRef, useState, useEffect } from "react";
// 1. Import Framer Motion
import { motion } from "framer-motion";
import Card from "../components/Card";
import { Globe } from "../components/globe";
import CopyEmailButton from "../components/CopyEmailButton";
import { Frameworks } from "../components/FrameWorks";

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
  // 1. The Animation State
  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // 2. The Configuration
  // 'once: false' means it animates EVERY time you scroll to it.
  // 'amount: 0.3' means it triggers when 30% of the item is visible.
  const viewportConfig = { once: false, amount: 0.3 };

  return (
    <section className="c-space section-spacing py-20 relative overflow-hidden" id="about">
      <style>{styles}</style>

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
             <div className="bg-zinc-950/80 backdrop-blur-md border border-indigo-500/30 rounded-3xl p-6 flex flex-col items-center text-center h-full relative overflow-hidden group hover:border-indigo-400/50 transition-colors duration-500">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e51a_1px,transparent_1px),linear-gradient(to_bottom,#4f46e51a_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />

                {/* Floating Image */}
                <div className="relative w-[80%] aspect-[3/4] mb-6 mt-4 animate-[float_6s_ease-in-out_infinite]">
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
                    
                    <div className="mt-auto w-full border-t border-white/5 pt-4">
                        <CopyEmailButton />
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
                        <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                        Tech Arsenal
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                        Current Loadout: <span className="text-white font-mono bg-indigo-500/20 px-1 rounded">Java</span> <span className="text-white font-mono bg-indigo-500/20 px-1 rounded">MongoDB</span> <span className="text-white font-mono bg-indigo-500/20 px-1 rounded">React</span>.
                        <br/><br/>
                        Building scalable architecture that survives the vacuum of space.
                    </p>
                </div>
                <div className="md:w-1/2 w-full flex justify-center items-center relative">
                    <div className="absolute inset-0 bg-indigo-600/20 blur-[40px] rounded-full" />
                    <div className="relative z-10 scale-90">
                        <Frameworks />
                    </div>
                </div>
            </motion.div>

            {/* --- BLOCK 3 & 4: Interactive Modules --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[400px]">
                
                {/* Logic Board (Animated) */}
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportConfig}
                    variants={itemVariants}
                    className="bg-[#0a0a0a] border border-zinc-800 rounded-3xl relative overflow-hidden group"
                >
                     <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
                     <div className="absolute top-5 left-5 z-20 bg-black/60 backdrop-blur px-3 py-1 rounded border border-white/10">
                        <p className="text-xs font-mono text-indigo-400">MODE: INTERACTIVE</p>
                     </div>

                    <div ref={grid2Container} className="w-full h-full relative z-10 hover:cursor-grab active:cursor-grabbing">
                        <Card style={{ rotate: "12deg", top: "35%", left: "15%" }} text="UI/UX" containerRef={grid2Container} />
                        <Card style={{ rotate: "-15deg", bottom: "25%", right: "20%" }} text="SOLID" containerRef={grid2Container} />
                        <Card style={{ rotate: "5deg", top: "15%", right: "10%" }} image="assets/logos/react.svg" containerRef={grid2Container} />
                        <Card style={{ rotate: "-10deg", bottom: "30%", left: "10%" }} image="assets/logos/csharp-pink.png" containerRef={grid2Container} />
                    </div>
                </motion.div>

                {/* Global Uplink (Animated) */}
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportConfig}
                    variants={itemVariants}
                    className="bg-gradient-to-t from-black to-zinc-900 border border-zinc-800 rounded-3xl relative overflow-hidden flex flex-col"
                >
                     <div className="p-6 w-full flex justify-between items-start z-20">
                        <div>
                            <p className="text-white font-bold text-lg">Global Uplink</p>
                            <p className="text-indigo-400 text-xs font-mono">LATENCY: 20ms</p>
                        </div>
                        <div className="text-right">
                            <p className="text-3xl font-mono text-white tracking-widest">{formattedTime}</p>
                            <p className="text-zinc-500 text-[10px] uppercase">Earth Standard Time</p>
                        </div>
                     </div>
                     
                     <div className="flex-1 w-full h-full relative flex items-end justify-center pb-4">
                        <div className="scale-125 opacity-90 transition-opacity duration-300 hover:opacity-100">
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