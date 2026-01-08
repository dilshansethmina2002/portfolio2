import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Stars } from "lucide-react";

const SoundController = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Initialize audio object once
  useEffect(() => {
    // 1. Define the Audio Source (Replace with your local file in /public/assets/ if needed)
    // This is a free nature/wind ambience sound
    audioRef.current = new Audio("/assets/Hallelujah.mp3");

    // 2. Settings
    audioRef.current.loop = true;   // Loop forever
    audioRef.current.volume = 0.2;  // Keep it subtle (20% volume)
    
    return () => {
      // Cleanup when component unmounts
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Handle Play/Pause Toggling
  const toggleSound = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // Browser requires user interaction to play audio
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.button
      onClick={toggleSound}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      className="fixed bottom-10 right-10 z-[60] flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors group"
    >
      {/* Dynamic Sound Wave Animation */}
      <div className="flex items-end gap-[3px] h-4">
        {[1, 2, 3, 4].map((bar) => (
          <motion.div
            key={bar}
            className={`w-[3px] bg-white rounded-full ${isPlaying ? "" : "h-[3px]! min-h-[3px]"}`}
            animate={
              isPlaying
                ? {
                    height: [4, 16, 8, 12, 4], // Random height fluctuation
                  }
                : { height: 4 } // Static dot when paused
            }
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
              delay: bar * 0.1, // Stagger bars
            }}
          />
        ))}
      </div>
      
      {/* Tooltip */}
      <span className="absolute right-14 bg-black/50 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {isPlaying ? "Mute Ambience" : "Play Ambience"}
      </span>
    </motion.button>
  );
};

export default SoundController;