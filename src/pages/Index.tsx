import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Certifications } from "@/components/Certifications";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { LoadingScreen } from "@/components/LoadingScreen";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CursorFollower } from "@/components/CursorFollower";
import { TerminalModal } from "@/components/TerminalModal";
import { Terminal } from "lucide-react";

const Index = () => {
  const [isDark, setIsDark] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  useEffect(() => {
    // Check for saved preference
    const savedTheme = localStorage.getItem("theme");
    const shouldBeDark = savedTheme ? savedTheme === "dark" : true;
    setIsDark(shouldBeDark);
    
    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Simulate loading progress - 10 second duration
  useEffect(() => {
    const totalDuration = 3000; // 3 seconds
    const intervalTime = 100;
    const totalSteps = totalDuration / intervalTime;
    const incrementPerStep = 100 / totalSteps;

    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 300);
          return 100;
        }
        return Math.min(prev + incrementPerStep, 100);
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
    
    if (newIsDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen progress={loadingProgress} isDark={isDark} />}
      </AnimatePresence>

      <div className={`min-h-screen bg-background text-foreground transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {/* Cursor follower */}
        <CursorFollower />
        
        {/* Scroll progress bar */}
        <ScrollProgress />
        
        {/* Background effects */}
        <ParticlesBackground />
        <AnimatedBackground />

        <Navigation isDark={isDark} toggleTheme={toggleTheme} />
        
        <main className="relative z-10">
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Certifications />
          <Contact />
        </main>

        <Footer />

        {/* Terminal modal */}
        <TerminalModal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />

        {/* Floating terminal button */}
        <button
          onClick={() => setIsTerminalOpen((prev) => !prev)}
          className="fixed bottom-6 right-6 p-4 rounded-full bg-card border border-border shadow-lg hover:border-primary hover:shadow-primary/20 transition-all duration-300 z-40"
          aria-label="Open terminal"
        >
          <Terminal className="w-5 h-5" />
        </button>
      </div>
    </>
  );
};

export default Index;
