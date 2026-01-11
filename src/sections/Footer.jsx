import { Github, Mail, Linkedin} from "lucide-react";

const Footer = () => {
  // Define your socials here (or move to your constants file)
  const socialLinks = [
    {
      id: 1,
      name: "GitHub",
      icon: Github,
      href: "https://github.com/dilshansethmina2002", 
    },
    {
      id: 2,
      name: "Email",
      icon: Mail,
      href: "mailto:sethminadilshan@gmail.com",
    },
    {
      id: 3,
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://www.linkedin.com/in/sethminakol/", 
    },
    
  ];

  return (
    <footer className="relative bg-[#050505] pt-16 pb-8 overflow-hidden">
      
      {/* 1. Top Glowing Border Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent blur-sm" />
      </div>

      {/* 2. Background Radial Glow */}
      <div className="absolute -top-[100px] left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="c-space relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 md:gap-0">
          
          {/* LEFT: Copyright & Branding */}
          <div className="text-center md:text-left order-3 md:order-1">
            <h3 className="text-xl font-bold text-white mb-2">Dilshan Sethmina</h3>
            <p className="text-slate-400 text-sm font-light">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>

          {/* CENTER: Social Icons (Using Lucide Icons) */}
          <div className="flex gap-4 order-1 md:order-2">
            {socialLinks.map((social) => (
              <a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-indigo-500/50 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(99,102,241,0.3)]"
              >
                {/* Render the Lucide Icon Component */}
                <social.icon 
                  strokeWidth={1.5}
                  className="w-5 h-5 text-slate-300 transition-colors duration-300 group-hover:text-white" 
                />
                
                {/* Tooltip */}
                <span className="absolute -top-10 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 bg-white/10 backdrop-blur-md border border-white/10 text-white text-[10px] px-2 py-1 rounded-md uppercase tracking-wider">
                    {social.name}
                </span>
              </a>
            ))}
          </div>

          {/* RIGHT: Legal Links */}
          <div className="flex gap-6 text-sm font-medium text-slate-400 order-2 md:order-3">
            <a href="#" className="relative group transition-colors hover:text-white">
              Terms & Conditions
              <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-indigo-400 transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#" className="relative group transition-colors hover:text-white">
              Privacy Policy
              <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-indigo-400 transition-all duration-300 group-hover:w-full" />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;