  import { useState, useRef } from "react";
  import emailjs from "@emailjs/browser";
  import { motion } from "framer-motion";
  import { Send, User, Mail, MessageSquare, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
  import { Particles } from "../components/Particles"; // Keep your existing component
  import CopyEmailButton from "../components/CopyEmailButton";
  // If you don't want to use your custom Alert, you can use the inline one I built below, 
  // or keep your <Alert /> component. I have integrated a custom inline one here for style matching.

  const Contact = () => {
    const formRef = useRef();
    
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      message: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState({ show: false, type: "", message: "" });

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const showAlertMessage = (type, message) => {
      setStatus({ show: true, type, message });
      setTimeout(() => {
        setStatus({ show: false, type: "", message: "" });
      }, 5000);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);

      try {
        await emailjs.send(
          "service_vec1szp",
          "template_7xinsun",
          {
            from_name: formData.name,
            to_name: "Dilshan Sethmina",
            from_email: formData.email,
            to_email: "sethminadilshan@gmail.com",
            message: formData.message,
          },
          "Us9uWvf1qGhrqsuAs"
        );
        
        setIsLoading(false);
        setFormData({ name: "", email: "", message: "" });
        showAlertMessage("success", "Message sent successfully!");
      } catch (error) {
        setIsLoading(false);
        console.error(error);
        showAlertMessage("error", "Something went wrong. Please try again.");
      }
    };

    return (
      <section id="contact" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black py-20 px-4 sm:px-10">
        
        {/* Background Particles */}
            <Particles
              className="absolute inset-0"
              quantity={400}
              ease={500}
              color="#22c55e" 
              shape="square"  
              vx={0.5}
              vy={-0.5} 
            />

        <div className="container mx-auto relative z-10 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* LEFT COLUMN: Text & Context */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 w-fit">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/>
                <span className="text-xs font-medium text-slate-300 tracking-wider uppercase">Available for work</span>
              </div>

              <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.1]">
                Let's build something <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                  extraordinary.
                </span>
              </h2>
              
              <p className="text-lg text-slate-400 max-w-md leading-relaxed">
                Whether you're looking to build a new website, improve your existing platform, or bring a unique project to life, I'm here to help you turn ideas into reality.
              </p>

              <div className="mt-8 flex flex-col gap-4 text-slate-300">
                  <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                          <Mail className="w-5 h-5 text-indigo-400" />
                      </div>
                      <div>
                          <p className="text-sm text-slate-500">Email me at</p>
                          <CopyEmailButton />
                      
                      </div>
                  </div>
              </div>
            </motion.div>


            {/* RIGHT COLUMN: The Form */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              {/* Form Card */}
              <div className="relative rounded-3xl border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl p-8 md:p-10 shadow-2xl">
                
                <h3 className="text-2xl font-semibold text-white mb-6">Send a message</h3>

                <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
                  
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 ml-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                      <input
                        name="name"
                        type="text"
                        placeholder="Dilshan"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 ml-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                      <input
                        name="email"
                        type="email"
                        placeholder="sethmina@example.com"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 ml-1">Your Message</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                      <textarea
                        name="message"
                        rows="4"
                        placeholder="Tell me about your project..."
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300 resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="group relative w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-medium py-4 rounded-xl transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>

                  {/* Alert Notification */}
                  {status.show && (
                      <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex items-center gap-2 p-4 rounded-lg text-sm ${
                              status.type === 'success' 
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                              : 'bg-red-500/10 text-red-400 border border-red-500/20'
                          }`}
                      >
                          {status.type === 'success' ? <CheckCircle2 className="w-4 h-4"/> : <AlertCircle className="w-4 h-4"/>}
                          {status.message}
                      </motion.div>
                  )}

                </form>
              </div>
              
              {/* Decorative background blur behind form */}
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

            </motion.div>
          </div>
        </div>
      </section>
    );
  };

  export default Contact;