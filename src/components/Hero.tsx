import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Download, ChevronDown, Code } from "lucide-react";
import { personalInfo } from "@/data/portfolio";
import resume from "../assets/Akshat-Resume.pdf";

export const Hero = () => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = personalInfo.roles[currentRoleIndex];
    const typeSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentRole.length) {
          setDisplayedText(currentRole.slice(0, displayedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(currentRole.slice(0, displayedText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % personalInfo.roles.length);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentRoleIndex]);

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center pt-16 pb-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="absolute inset-0 bg-radial-gradient" />

      <div className="section-container relative z-10 text-center">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-emerald-500/30 bg-card/50 backdrop-blur-sm mb-8 shadow-[0_0_15px_rgba(16,185,129,0.3)] animate-pulse"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
          <span className="text-sm font-medium tracking-wide">Available for opportunities</span>
        </motion.div>

        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-primary font-mono text-base mb-4"
        >
          <span className="text-primary mr-2">✦</span> Hello, I'm
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4"
        >
          <span className="text-foreground">{personalInfo.firstName} </span>
          <span className="text-primary">{personalInfo.lastName}</span>
        </motion.h1>

        {/* Typing role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="h-8 mb-6 flex items-center justify-center gap-4"
        >
          <span className="w-12 sm:w-20 h-px bg-gradient-to-r from-transparent to-primary/50" />
          <span className="text-primary text-lg font-medium min-w-[200px] sm:min-w-[280px] text-center">
            {displayedText}
            <span className="animate-blink">|</span>
          </span>
          <span className="w-12 sm:w-20 h-px bg-gradient-to-l from-transparent to-primary/50" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-muted-foreground max-w-2xl mx-auto mb-10 text-base sm:text-lg leading-relaxed"
        >
          {personalInfo.tagline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap justify-center gap-4 mb-6"
        >
          <a href="#contact" className="btn-primary inline-flex items-center gap-2">
            Get In Touch
          </a>
          <a
            href={resume}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Resume
          </a>
        </motion.div>

        {/* Scroll indicator - moved above social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
          className="mb-6"
        >
          <a href="#about" className="inline-flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors text-xs tracking-[0.2em] uppercase">
            <span>SCROLL DOWN</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center gap-3"
        >
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-card/50 border border-border hover:border-primary hover:text-primary transition-all duration-300"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-card/50 border border-border hover:border-primary hover:text-primary transition-all duration-300"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.email}&su=Portfolio%20Inquiry&body=Hi%20Akshat,`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-card/50 border border-border hover:border-primary hover:text-primary transition-all duration-300">
            <Mail className="w-5 h-5" />
          </a>
          <a
            href={personalInfo.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-card/50 border border-border hover:border-primary hover:text-primary transition-all duration-300"
          >
            <Code className="w-5 h-5" />
          </a>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="absolute bottom-0 left-0 right-0 py-3 bg-card/50 backdrop-blur-sm border-t border-b border-border overflow-hidden">
        <div className="marquee">
          <div className="marquee-content">
            {Array(8)
              .fill(null)
              .map((_, i) => (
                <div key={i} className="flex items-center gap-8 text-sm font-medium whitespace-nowrap px-1">
                  <span className="text-foreground">{personalInfo.name}</span>
                  <span className="text-primary">✦</span>
                  <span className="text-muted-foreground">{personalInfo.title}</span>
                  <span className="text-primary">✦</span>
                </div>
              ))}
          </div>
          <div className="marquee-content" aria-hidden>
            {Array(8)
              .fill(null)
              .map((_, i) => (
                <div key={i} className="flex items-center gap-8 text-sm font-medium whitespace-nowrap px-1">
                  <span className="text-foreground">{personalInfo.name}</span>
                  <span className="text-primary">✦</span>
                  <span className="text-muted-foreground">{personalInfo.title}</span>
                  <span className="text-primary">✦</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};
