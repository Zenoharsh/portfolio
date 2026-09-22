"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowUpRight, CheckCircle2, AlertCircle } from "lucide-react";
import Image from "next/image";

export default function ContactSection() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    // TODO: Replace with your actual Web3Forms Access Key
    formData.append("access_key", "YOUR_WEB3FORMS_ACCESS_KEY");
    formData.append("subject", "New Contact from Portfolio");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };
  return (
    <section id="contact" className="py-24 relative z-10 max-w-4xl mx-auto px-6">
      <div className="mb-16 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
          Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ea64] to-[#a3e635]">Touch</span>
        </h2>
        <div className="h-1 w-20 bg-white/20 mt-6 mx-auto rounded-full"></div>
        <p className="text-gray-300 mt-6 max-w-lg mx-auto">
          Currently open to new opportunities for Summer 2027 or freelance collaborations. Let's build something extraordinary together.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative overflow-hidden">
        {/* Abstract Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-32 bg-white/5 blur-[100px] rounded-full pointer-events-none" />

        {/* Left: Contact Info */}
        <div className="flex flex-col justify-center space-y-8 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 shrink-0 rounded-full overflow-hidden border border-white/20 shadow-lg relative">
              <Image src="/pfp.jpg" alt="Harsh Raj" fill className="object-cover" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">Let's Connect</h3>
              <p className="text-gray-300 text-xs">
                I'm always open to discussing system architecture, generative AI, or new engineering challenges.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <a href="mailto:harsh.dev4u@gmail.com" className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group">
              <div className="p-3 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                <Mail size={20} />
              </div>
              <span className="font-medium">harsh.dev4u@gmail.com</span>
            </a>
            <a href="https://www.linkedin.com/in/harsh-raj-422b801a9/" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group">
              <div className="p-3 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                <ArrowUpRight size={20} />
              </div>
              <span className="font-medium">LinkedIn Profile</span>
            </a>
            <a href="https://github.com/Zenoharsh" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group">
              <div className="p-3 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                <ArrowUpRight size={20} />
              </div>
              <span className="font-medium">GitHub @Zenoharsh</span>
            </a>
          </div>
        </div>

        {/* Right: Simple Form UI */}
        <form className="space-y-4 relative z-10" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="name"
              required
              placeholder="Your Name"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/50 focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              required
              placeholder="Your Email"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/50 focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>
          <div>
            <textarea
              name="message"
              required
              placeholder="Your Message"
              rows={4}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/50 focus:outline-none focus:border-white/30 transition-colors resize-none"
            ></textarea>
          </div>
          
          <button 
            disabled={status === "submitting"}
            className="w-full flex items-center justify-center gap-2 bg-white text-black font-semibold py-4 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {status === "idle" && "Send Message"}
            {status === "submitting" && "Sending..."}
            {status === "success" && (
              <>
                <CheckCircle2 size={20} className="text-green-600" />
                Sent Successfully!
              </>
            )}
            {status === "error" && (
              <>
                <AlertCircle size={20} className="text-red-600" />
                Failed to send
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
