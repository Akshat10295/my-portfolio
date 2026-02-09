import { personalInfo } from "@/data/portfolio";
import { Github, Linkedin, Mail, Code, ArrowUp } from "lucide-react";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-8 border-t border-border">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left side - Copyright + reCAPTCHA */}
          <div className="flex flex-col gap-1 text-muted-foreground text-sm">
            <div className="flex items-center gap-2">
              <span>© {new Date().getFullYear()}</span>
              <span className="text-primary font-medium">
                {personalInfo.name}
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:flex items-center gap-1">
                Portfolio
              </span>
            </div>
          </div>

          {/* Center - Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm group"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            <span>Back to Top</span>
          </button>

          {/* Right side - Social links */}
          <div className="flex items-center gap-4">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LeetCode"
            >
              <Code className="w-4 h-4" />
            </a>
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.email}&su=Portfolio%20Inquiry&body=Hi%20Akshat,`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
