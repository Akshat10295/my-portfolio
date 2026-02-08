import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolio";
import { useMemo } from "react";

interface LoadingScreenProps {
  progress: number;
  isDark?: boolean;
}

interface ShootingStar {
  id: number;
  delay: number;
  duration: number;
  startX: number;
  startY: number;
  length: number;
  opacity: number;
}

export const LoadingScreen = ({ progress, isDark = true }: LoadingScreenProps) => {
  // Generate shooting stars - more stars, faster animation
  const shootingStars: ShootingStar[] = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      delay: Math.random() * 3,
      duration: 0.6 + Math.random() * 0.8,
      startX: Math.random() * 120 - 10, // percentage
      startY: Math.random() * 60 - 20, // percentage
      length: 100 + Math.random() * 150,
      opacity: 0.3 + Math.random() * 0.7,
    }));
  }, []);

  // Small background stars
  const backgroundStars = useMemo(() => {
    return Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      twinkleDelay: Math.random() * 3,
    }));
  }, []);

  // Theme-based colors
  const bgPrimary = isDark ? "#0a0a0f" : "#f8f8fc";
  const bgGradientFrom = isDark ? "#0a0a1a" : "#f0f0fa";
  const bgGradientVia = isDark ? "#0f0f1f" : "#f5f5ff";
  const bgGradientTo = isDark ? "#0a0a0f" : "#f8f8fc";
  const textColor = isDark ? "text-white" : "text-gray-900";
  const accentColor = isDark ? "text-cyan-400" : "text-purple-600";
  const starColor = isDark ? "bg-white" : "bg-purple-400";
  const shootingStarColor = isDark ? "rgba(0, 230, 255," : "rgba(147, 51, 234,";
  const glowColor = isDark ? "rgba(0, 230, 255," : "rgba(147, 51, 234,";
  const nebulaColor = isDark ? "bg-cyan-500/5" : "bg-purple-500/10";
  const progressBarBg = isDark ? "bg-cyan-900/30" : "bg-purple-200/50";
  const progressBarGradient = isDark 
    ? "linear-gradient(90deg, #0ea5e9, #06b6d4, #22d3ee)" 
    : "linear-gradient(90deg, #9333ea, #a855f7, #c084fc)";
  const progressBarShadow = isDark 
    ? "0 0 20px rgba(6, 182, 212, 0.7), 0 0 40px rgba(6, 182, 212, 0.4)" 
    : "0 0 20px rgba(147, 51, 234, 0.7), 0 0 40px rgba(147, 51, 234, 0.4)";
  const dotColor = isDark ? "bg-cyan-400" : "bg-purple-500";

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: bgPrimary }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Deep space gradient background */}
      <div 
        className="absolute inset-0"
        style={{ 
          background: `linear-gradient(to bottom, ${bgGradientFrom}, ${bgGradientVia}, ${bgGradientTo})` 
        }}
      />
      
      {/* Nebula glow */}
      <div className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] ${nebulaColor} blur-[120px] rounded-full`} />
      
      {/* Background stars */}
      {backgroundStars.map((star) => (
        <motion.div
          key={star.id}
          className={`absolute rounded-full ${starColor}`}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [star.opacity, star.opacity * 0.3, star.opacity],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: star.twinkleDelay,
          }}
        />
      ))}

      {/* Shooting stars */}
      {shootingStars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute"
          style={{
            left: `${star.startX}%`,
            top: `${star.startY}%`,
            width: star.length,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${shootingStarColor} ${star.opacity}), rgba(255, 255, 255, ${star.opacity}))`,
            transformOrigin: "left center",
            transform: "rotate(35deg)",
            borderRadius: "50%",
            boxShadow: `0 0 10px ${glowColor} 0.5), 0 0 20px ${glowColor} 0.3)`,
          }}
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{
            opacity: [0, star.opacity, star.opacity, 0],
            x: [0, 300, 500],
            y: [0, 210, 350],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "linear",
          }}
        />
      ))}

      {/* Main content */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center"
      >
        {/* Name */}
        <h1 className={`text-4xl md:text-5xl font-bold mb-6`}>
          <span className={textColor}>{personalInfo.firstName} </span>
          <span className={accentColor}>{personalInfo.lastName}</span>
        </h1>

        {/* Progress percentage */}
        <motion.div
          className={`text-4xl md:text-5xl font-bold ${accentColor} mb-8 font-mono`}
          key={Math.round(progress)}
        >
          {Math.round(progress)}%
        </motion.div>

        {/* Progress bar */}
        <div className="w-64 md:w-80 mx-auto mb-6">
          <div className={`relative h-1 ${progressBarBg} rounded-full overflow-hidden`}>
            {/* Glow effect */}
            <div className={`absolute inset-0 bg-gradient-to-r from-transparent ${isDark ? 'via-cyan-400/20' : 'via-purple-400/20'} to-transparent`} />
            
            {/* Progress fill */}
            <motion.div
              className="h-full rounded-full relative"
              style={{
                background: progressBarGradient,
                boxShadow: progressBarShadow,
              }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />

            {/* Edge glow */}
            <motion.div
              className="absolute top-0 h-full w-4"
              style={{
                background: "radial-gradient(circle, rgba(255,255,255,0.8), transparent)",
                filter: "blur(2px)",
              }}
              initial={{ left: 0 }}
              animate={{ left: `calc(${progress}% - 8px)` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Side glows */}
          <div className="relative mt-2">
            <div className={`absolute left-0 w-2 h-2 ${dotColor} rounded-full blur-sm`} />
            <motion.div
              className={`absolute w-2 h-2 ${dotColor} rounded-full blur-sm`}
              animate={{ left: `calc(${progress}% - 4px)` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>

        {/* Status text */}
        <motion.p
          className={`${isDark ? 'text-cyan-400/70' : 'text-purple-600/70'} text-sm tracking-[0.3em] uppercase font-mono animate-pulse`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Initializing UI...
        </motion.p>
      </motion.div>
    </motion.div>
  );
};
