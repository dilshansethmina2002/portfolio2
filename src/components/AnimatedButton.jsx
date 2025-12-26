export default function AnimatedButton() {
  return (
    <button
      className="
        group
        relative flex items-center gap-1 px-9 py-4
        bg-white/10 backdrop-blur-md  /* Glass Background */
        border border-white/20        /* Glass Border */
        rounded-full
        text-white font-semibold text-base
        shadow-lg
        overflow-hidden
        cursor-pointer
        transition-all duration-600 ease-[cubic-bezier(0.23,1,0.32,1)]
        hover:shadow-xl hover:text-[#212121] hover:bg-white/20
        active:scale-95
      "
    >
      {/* Arrow 2 (Left - Moves in on hover) */}
      <svg
        viewBox="0 0 24 24"
        className="
          absolute -left-1/4 w-6 fill-white z-[9] rotate-90
          transition-all duration-800 ease-[cubic-bezier(0.23,1,0.32,1)]
          group-hover:left-4 group-hover:fill-[#212121]
        "
      >
        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
      </svg>

      {/* Button Text */}
      <span
        className="
          relative z-10 -translate-x-3
          transition-all duration-800 ease-[cubic-bezier(0.23,1,0.32,1)]
          group-hover:translate-x-3
        "
      >
        Click to Scroll
      </span>

      {/* Circle (Expands on hover - now White) */}
      <span
        className="
          absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-5 h-5 bg-white rounded-full opacity-0
          transition-all duration-800 ease-[cubic-bezier(0.23,1,0.32,1)]
          group-hover:w-[220px] group-hover:h-[220px] group-hover:opacity-100
        "
      ></span>

      {/* Arrow 1 (Right - Moves out on hover) */}
      <svg
        viewBox="0 0 24 24"
        className="
          absolute right-4 w-6 fill-white z-[9] rotate-90
          transition-all duration-800 ease-[cubic-bezier(0.23,1,0.32,1)]
          group-hover:-right-1/4 group-hover:fill-[#212121]
        "
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
      </svg>
    </button>
  );
}