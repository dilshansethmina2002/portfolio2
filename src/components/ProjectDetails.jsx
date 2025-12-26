import { motion } from "motion/react";

const ProjectDetails = ({
  title,
  description,
  subDescription,
  image,
  tags,
  href,
  closeModal,
}) => {
  return (
    // Background Overlay (Darker and slightly blurred)
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full p-4 bg-black/60 backdrop-blur-[2px]">
      
      <motion.div
        // iOS Glass Card Container
        className="
          relative w-full max-w-lg max-h-[90vh] overflow-y-auto
          bg-gray-900/60 backdrop-blur-2xl
          border border-white/10
          rounded-3xl
          shadow-2xl shadow-black/50
          scrollbar-hide
        "
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Floating Close Button (Glass Circle) */}
        <button
          onClick={closeModal}
          className="
            absolute top-4 right-4 z-10
            p-2 rounded-full
            bg-black/40 hover:bg-black/60
            backdrop-blur-md border border-white/10
            transition-all duration-200
            group
          "
        >
          <img 
            src="assets/close.svg" 
            className="w-5 h-5 opacity-70 group-hover:opacity-100 invert" 
            alt="Close"
          />
        </button>

        {/* Hero Image */}
        <div className="relative w-full h-48 sm:h-56 overflow-hidden">
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover opacity-90" 
            />
            {/* Gradient overlay to blend image into content */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent" />
        </div>

        {/* Content Container */}
        <div className="p-6 -mt-4 relative">
          <h5 className="mb-2 text-2xl font-bold text-white tracking-tight">{title}</h5>
          
          <p className="mb-4 text-sm leading-relaxed text-gray-300 font-medium">
            {description}
          </p>
          
          <div className="space-y-3 mb-6">
            {subDescription.map((subDesc, index) => (
              <p key={index} className="text-sm leading-relaxed text-gray-400">
                {subDesc}
              </p>
            ))}
          </div>

          {/* Footer: Tags & Link */}
          <div className="pt-4 mt-2 border-t border-white/10 flex items-center justify-between">
            
            {/* Tech Stack Icons */}
            <div className="flex gap-2">
              {tags.map((tag) => (
                <div 
                  key={tag.id}
                  className="
                    p-1.5 rounded-xl
                    bg-white/5 border border-white/10
                    hover:bg-white/10 transition-colors
                  "
                >
                  <img
                    src={tag.path}
                    alt={tag.name}
                    className="size-6 object-contain"
                  />
                </div>
              ))}
            </div>

            {/* View Project Link */}
            <a 
              href={href} 
              target="_blank" 
              rel="noreferrer"
              className="
                flex items-center gap-2 px-4 py-2
                rounded-full
                bg-blue-600/80 hover:bg-blue-500
                text-white text-xs font-bold uppercase tracking-wide
                transition-all duration-300
                shadow-lg shadow-blue-500/20
              "
            >
              View Project
              <img src="assets/arrow-up.svg" className="size-3 invert" alt="arrow" />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetails;