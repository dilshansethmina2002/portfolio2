import { useScroll, useTransform, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function PerspectiveStack() {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <main
      ref={container}
      className="relative min-h-screen bg-[#050505] pb-[20vh] font-sans"
    >
      {/* HEADER */}
      <div className="relative z-10 flex h-[70vh] flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="px-4 text-center"
        >
          <h1 className="mb-4 text-4xl font-extrabold tracking-tighter text-white md:text-6xl lg:text-7xl">
            My Journey &{" "}
            <span className="bg-gradient-to-br from-purple-500 to-blue-500 bg-clip-text text-transparent">
              Milestones
            </span>
          </h1>
          <p className="text-base tracking-wide text-slate-400 md:text-xl">
            Scroll to explore the archive
          </p>
        </motion.div>
      </div>

      {/* STACK WRAPPER */}
      <div className="px-4 md:px-0">
        {items.map((item, i) => {
          const targetScale = 1 - (items.length - i) * 0.05;
          return (
            <Card
              key={i}
              i={i}
              {...item}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </main>
  );
}

const Card = ({
  i,
  title,
  description,
  year,
  org,
  type,
  color,
  progress,
  range,
  targetScale,
}) => {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="sticky top-0 flex h-screen items-center justify-center"
    >
      <motion.div
        style={{
          backgroundColor: color, // Dynamic background color from data
          scale,
          top: `calc(-5vh + ${i * 25}px)`, // Dynamic stacking offset
        }}
        className="relative flex h-[450px] w-[1000px] max-w-[95%] origin-top flex-col justify-between overflow-hidden rounded-[32px] border border-white/10 p-8 shadow-[0_-10px_50px_-10px_rgba(0,0,0,0.8)] md:p-12"
      >
        {/* Card Content Layer */}
        <div className="relative z-10 flex h-full flex-col justify-between">
          {/* Top Row: Badge & Year */}
          <div className="flex items-center justify-between">
            <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-slate-200 backdrop-blur-md">
              {type}
            </span>
            <span className="font-mono text-sm text-slate-400">{year}</span>
          </div>

          {/* Middle: Title & Org */}
          <div>
            <h2 className="mb-2 text-3xl font-bold leading-tight text-white md:text-5xl">
              {title}
            </h2>
            <div className="mb-6 flex items-baseline gap-2 text-lg md:text-xl">
              <span className="italic text-slate-500">at</span>
              <span className="font-semibold text-purple-400">{org}</span>
            </div>
            <p className="max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
              {description}
            </p>
          </div>

          {/* Bottom: Progress Bar Indicator */}
          <div className="mt-auto">
            <div className="h-[2px] w-full bg-gradient-to-r from-purple-500 to-transparent opacity-50" />
          </div>
        </div>

        {/* Decorative Background Layer */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <motion.div
            style={{ scale: imageScale }}
            className="relative h-full w-full"
          >
            {/* Dot Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)]" />
            
            {/* Gradient Blob */}
            <div className="absolute -bottom-[20%] -right-[10%] h-[80%] w-[60%] bg-[radial-gradient(circle_closest-side,rgba(168,85,247,0.15),transparent)] blur-[60px]" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

/* ================= DATA ================= */

const items = [
  {
    title: "Financial Coordinator",
    description:
      "Executive Board member managing financial planning, budget allocation, and fiscal transparency for the 2025/2026 tenure.",
    year: "2025 – Present",
    org: "ICTS Society",
    type: "Leadership",
    color: "#111111", // Keeping hex colors for dynamic prop mapping
  },
  {
    title: "Multicloud Network Associate",
    description:
      "Aviatrix certified expert in enterprise cloud networking. Validated expertise in designing, securing, and operating multi-cloud architectures.",
    year: "2025",
    org: "Aviatrix",
    type: "Certification",
    color: "#0f172a", // Slate 900
  },
  {
    title: "J'Pura CryptX 1.0",
    description:
      "Core organizer for Project Management and HR. Coordinated team logistics to ensure the successful execution of this major tech event.",
    year: "2025",
    org: "ICTS Society",
    type: "Event Mgmt",
    color: "#18181b", // Zinc 900
  },
  {
    title: "AI & Tech Careers",
    description:
      "Explored the intersection of AI tools and modern careers. Gained insights into leveraging AI to optimize professional workflows.",
    year: "2025",
    org: "ICTS Society",
    type: "Workshop",
    color: "#171717", // Neutral 900
  },
  {
    title: "Prompt Engineering",
    description:
      "Acquired advanced skills in LLM interaction and prompting techniques to enhance AI model outputs for complex problem solving.",
    year: "2024",
    org: "USJ",
    type: "Workshop",
    color: "#0c0a09", // Stone 950
  },
];