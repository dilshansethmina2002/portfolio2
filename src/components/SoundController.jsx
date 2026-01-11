import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";

const SoundController = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const audioRef = useRef(null);

  // Initialize audio object once
  useEffect(() => {
    let firstGestureCleanup = null;

    // 1. Define the Audio Source
    audioRef.current = new Audio("/assets/BackgroundTrack.mp3");

    // 2. Settings
    audioRef.current.loop = true; // Loop forever
    audioRef.current.volume = 0.2; // Keep it subtle (20% volume)

    // Helper: try playing, with optional muted fallback
    let triedMutedFallback = false;
    const tryPlay = async (muted = false) => {
      if (!audioRef.current) return;
      audioRef.current.muted = muted;
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        setIsMuted(muted);
        setAutoplayBlocked(false);

        // If we're playing muted, add a one-time gesture listener to enable sound when user interacts
        if (muted) {
          const onFirstGesture = () => {
            if (audioRef.current) {
              audioRef.current.muted = false;
              setIsMuted(false);
            }
            // cleanup listeners
            document.removeEventListener("click", onFirstGesture);
            document.removeEventListener("touchstart", onFirstGesture);
            document.removeEventListener("keydown", onFirstGesture);
          };

          // store cleanup fn for unmount
          firstGestureCleanup = () => {
            document.removeEventListener("click", onFirstGesture);
            document.removeEventListener("touchstart", onFirstGesture);
            document.removeEventListener("keydown", onFirstGesture);
          };

          document.addEventListener("click", onFirstGesture, { once: true });
          document.addEventListener("touchstart", onFirstGesture, { once: true });
          document.addEventListener("keydown", onFirstGesture, { once: true });
        }
      } catch (err) {
        // If unmuted autoplay fails, try muted autoplay once
        if (!muted && !triedMutedFallback) {
          triedMutedFallback = true;
          tryPlay(true);
        } else {
          // final failure: autoplay blocked; user gesture required
          console.log("Autoplay prevented:", err);
          setAutoplayBlocked(true);
          setIsPlaying(false);
        }
      }
    };

    // Try unmuted first
    tryPlay(false);

    return () => {
      // Cleanup when component unmounts
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (firstGestureCleanup) firstGestureCleanup();
    };
  }, []);

  // Handle Play/Pause/Unmute Toggling
  const toggleSound = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Ensure unmuted when manually starting
      audioRef.current.muted = false;
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        setIsMuted(false);
        setAutoplayBlocked(false);
      } catch (err) {
        // If playback still fails, keep UI state consistent
        console.log("Play failed:", err);
        setIsPlaying(false);
        setAutoplayBlocked(true);
      }
    }
  };

  return (
    <motion.button
      onClick={toggleSound}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      aria-pressed={isPlaying}
      aria-label={isPlaying ? (isMuted ? 'Unmute ambience' : 'Mute ambience') : 'Play ambience'}
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
      <span
        className="absolute right-14 bg-black/50 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none"
        aria-hidden="true"
      >
        {isPlaying ? (isMuted ? "Unmute Ambience (tap to enable sound)" : "Mute Ambience") : (autoplayBlocked ? "Play Ambience (tap to enable sound)" : "Play Ambience")}
      </span>
      {/* Accessibility label */}
      <span className="sr-only" aria-live="polite">
        {isPlaying ? (isMuted ? "Playing (muted)" : "Playing") : "Paused"}
      </span>
    </motion.button>
  );
};

export default SoundController;