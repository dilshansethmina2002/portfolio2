"use client";
import { useRef } from "react";
import { 
  motion, 
  useMotionValue, 
  useSpring, 
  useTransform, 
  AnimatePresence 
} from "motion/react"; // Using your imports
import { 
  Home, 
  User, 
  GraduationCap, 
  Mail,
  Trophy, 
  LayoutGrid 
} from "lucide-react"; // Icons for the dock

// 1. Configuration for your links
const LINKS = [
  { title: "Home", icon: <Home className="w-full h-full" />, href: "#home" },
  { title: "About", icon: <User className="w-full h-full" />, href: "#about" },
  
  { title: "Projects", icon: <LayoutGrid className="w-full h-full" />, href: "#projects" },
  { title: "Education", icon: <GraduationCap className="w-full h-full" />, href: "#education" },
  { title: "Achievements", icon: <Trophy className="w-full h-full" />, href: "#achievements" },
  { title: "Contact", icon: <Mail className="w-full h-full" />, href: "#contact" },
];

export default function Navbar() {
  return (
    <>
      {/* 1. Top Bar: Just the Logo (Like the Apple Menu) */}
      <div className="fixed top-0 left-0 right-0 z-40 px-6 py-4 pointer-events-none">
        <div className="max-w-7xl mx-auto flex justify-between items-center pointer-events-auto">
          
          {/* Optional: Mobile Menu Toggle could go here if you still want a side menu, 
              but the Dock usually replaces it. */}
        </div>
      </div>

      {/* 2. The Floating macOS Dock */}
      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
        <Dock className="items-end pb-3">
          {LINKS.map((link, idx) => (
            <DockItem key={idx} href={link.href} title={link.title}>
              {link.icon}
            </DockItem>
          ))}
        </Dock>
      </div>
    </>
  );
}

/**
 * Core Dock Component
 * Handles the mouse detection and container styling
 */
function Dock({ children, className }) {
  let mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={`
        mx-auto flex h-16 items-end gap-4 rounded-2xl px-4 pb-3 
        bg-white/10 border border-white/20 shadow-2xl backdrop-blur-2xl
        dark:bg-black/10 dark:border-white/10
        ${className}
      `}
    >
      {children.map((child, i) => {
        // Clone child to pass the mouseX motion value down
        if (child) {
            return (
                <DockItemWrapper key={i} mouseX={mouseX}>
                    {child}
                </DockItemWrapper>
            )
        }
      })}
    </motion.div>
  );
}

/**
 * Wrapper to handle the magnification logic for each item
 */
function DockItemWrapper({ mouseX, children }) {
  let ref = useRef(null);

  // Calculate distance from mouse to this specific item
  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Map distance to width: closer = wider
  // Range: [-150, 0, 150] -> [40, 80, 40]
  let widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  
  // Add spring physics for that "bouncy" macOS feel
  let width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className="aspect-square flex items-center justify-center relative group"
    >
      {children}
    </motion.div>
  );
}

/**
 * The actual clickable item inside the dock
 */
function DockItem({ href, children, title }) {
  return (
    <a
      href={href}
      className="
        aspect-square w-full h-full rounded-full 
        flex items-center justify-center 
        bg-neutral-800/80 border border-white/10
        text-neutral-200 shadow-inner
        hover:bg-neutral-700 hover:text-white transition-colors
        relative
      "
    >
      {/* Icon */}
      <div className="w-1/2 h-1/2 pointer-events-none">
        {children}
      </div>

      {/* Tooltip (Like app name on hover) */}
      <span className="
        absolute -top-10 left-1/2 -translate-x-1/2 
        px-2 py-1 rounded bg-neutral-900/90 text-white text-xs 
        border border-white/10 opacity-0 group-hover:opacity-100 
        transition-opacity pointer-events-none whitespace-nowrap
      ">
        {title}
      </span>
      
      {/* Active Indicator Dot (Optional) */}
      {/* <div className="absolute -bottom-2 w-1 h-1 bg-white/50 rounded-full" /> */}
    </a>
  );
}