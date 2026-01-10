import { motion } from "framer-motion";

const Marquee = ({ children, speed = 20, direction = "left" }) => {
  return (
    <div className="flex overflow-hidden whitespace-nowrap [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      {/* Wrapper that moves */}
      <motion.div
        className="flex gap-10 min-w-full"
        initial={{ x: direction === "left" ? "0%" : "-50%" }}
        animate={{ x: direction === "left" ? "-50%" : "0%" }}
        transition={{
          ease: "linear",
          duration: speed,
          repeat: Infinity,
        }}
      >
        {/* Render content twice for the loop effect */}
        <div className="flex gap-10 flex-shrink-0 items-center">
          {children}
        </div>
        <div className="flex gap-10 flex-shrink-0 items-center">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default Marquee;