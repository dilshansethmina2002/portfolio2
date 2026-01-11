import { useEffect } from "react";
import { motion, useAnimation } from "motion/react";

const ProjectDetails = ({
  title,
  description,
  subDescription,
  image,
  tags,
  href,
  closeModal,
}) => {
  const controls = useAnimation();

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const onDragEnd = (event, info) => {
    if (info.offset.y > 100) {
      closeModal();
    } else {
      controls.start({ y: 0 });
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-end sm:items-center justify-center w-full h-full overflow-hidden">
      {/* Global Background Overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeModal}
        className="absolute inset-0 w-full h-full bg-black/90 backdrop-blur-md cursor-pointer" 
      />
      
      <motion.div
        className="
          relative w-full max-w-lg sm:max-w-6xl 
          max-h-[92vh] sm:max-h-[85vh] 
          flex flex-col sm:flex-row
          bg-zinc-900 
          border-t sm:border border-white/10
          rounded-t-[2.5rem] sm:rounded-3xl
          shadow-2xl shadow-black
          overflow-hidden
        "
        onClick={(e) => e.stopPropagation()} 
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.6}
        onDragEnd={onDragEnd}
        animate={controls}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
      >
        {/* Mobile Drag Handle */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-12 h-1.5 bg-white/20 rounded-full" />
        </div>

        {/* High-Visibility Close Button */}
        <button
          onClick={closeModal}
          className="
            absolute top-5 right-5 z-[1010]
            p-3 rounded-full
            bg-zinc-800/80 hover:bg-zinc-700
            backdrop-blur-xl border border-white/20
            shadow-2xl transition-all duration-200
            group
          "
        >
          <img 
            src="assets/close.svg" 
            className="w-4 h-4 invert opacity-90 group-hover:scale-110 transition-transform" 
            alt="Close" 
          />
        </button>

        {/* LEFT COLUMN: Image + Tech Stack + Button (Desktop) */}
        <div className="w-full sm:w-[45%] flex flex-col bg-black/20 border-r border-white/5">
            {/* Centered Image Container */}
            <div className="relative w-full h-64 sm:h-[400px] flex items-center justify-center overflow-hidden p-4 sm:p-8">
                <img 
                  src={image} 
                  alt={title} 
                  className="w-full h-full object-contain" 
                />
            </div>

            {/* Desktop-only Footer: Tech Stack & CTA under image */}
            <div className="hidden sm:flex flex-col p-8 pt-0 gap-8">
                <div className="h-px bg-white/10 w-full" />
                
                <div className="flex flex-col gap-4">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Technologies Used</p>
                    <div className="flex gap-3 flex-wrap">
                      {tags.map((tag) => (
                        <div 
                          key={tag.id} 
                          className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 hover:bg-white/10 transition-colors"
                        >
                          <img src={tag.path} alt={tag.name} className="size-5 object-contain" />
                          <span className="text-xs text-gray-300 font-medium">{tag.name}</span>
                        </div>
                      ))}
                    </div>
                </div>

                <a 
                  href={href} 
                  target="_blank" 
                  rel="noreferrer"
                  className="
                    flex items-center justify-center gap-3 px-10 py-5
                    rounded-2xl bg-blue-600 hover:bg-blue-500 
                    text-white font-black uppercase tracking-widest text-xs
                    transition-all shadow-[0_15px_40px_rgba(37,99,235,0.25)]
                  "
                >
                  View Live Project
                  <img src="assets/arrow-up.svg" className="size-4 invert" alt="arrow" />
                </a>
            </div>
        </div>

        {/* RIGHT COLUMN: Title & Narrative */}
        <div className="flex-1 p-8 sm:p-12 overflow-y-auto bg-zinc-900 custom-scrollbar">
          <div className="max-w-2xl">
              <h5 className="mb-6 text-4xl sm:text-6xl font-black text-white tracking-tighter leading-none">
                {title}
              </h5>
              
              <p className="mb-10 text-lg sm:text-xl text-gray-300 font-medium leading-relaxed">
                {description}
              </p>
              
              <div className="space-y-6">
                {subDescription.map((subDesc, index) => (
                  <div key={index} className="flex gap-4">
                      <div className="mt-2 size-1.5 rounded-full bg-blue-500 shrink-0" />
                      <p className="text-sm sm:text-base text-gray-400 leading-relaxed italic">
                        {subDesc}
                      </p>
                  </div>
                ))}
              </div>
          </div>

          {/* Mobile-only Footer: Appears at bottom of scroll on small screens */}
          <div className="flex sm:hidden flex-col gap-6 mt-12 pt-8 border-t border-white/10">
              <div className="flex gap-3 flex-wrap justify-center">
                {tags.map((tag) => (
                  <div key={tag.id} className="p-2 rounded-xl bg-white/5 border border-white/10">
                    <img src={tag.path} alt={tag.name} className="size-6 object-contain" />
                  </div>
                ))}
              </div>
              <a 
                href={href} 
                className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-blue-600 text-white font-bold uppercase text-xs"
              >
                View Project
              </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetails;