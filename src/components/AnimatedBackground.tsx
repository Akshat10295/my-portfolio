import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const AnimatedBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      mouseX.set(x);
      mouseY.set(y);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Generate floating sparkles
  const sparkles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 2,
  }));

  return (
    <>
      {/* Animated gradient orbs that follow mouse */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute inset-0 bg-background/80 backdrop-blur-3xl z-10" />
        
        {/* Primary orb - top left */}
        <motion.div
          className="hidden md:block absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary/30 blur-[100px] opacity-60"
          style={{
            x: springX,
            y: springY,
          }}
        />
        
        {/* Purple orb - top right */}
        <motion.div
          className="hidden md:block absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-purple-500/20 blur-[100px] opacity-50"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Blue orb - bottom left */}
        <motion.div
          className="hidden md:block absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-blue-500/20 blur-[120px] opacity-40"
          animate={{
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Indigo orb - center */}
        <motion.div
          className="hidden md:block absolute top-[40%] left-[40%] w-[30vw] h-[30vw] rounded-full bg-indigo-500/20 blur-[80px] opacity-30"
          style={{
            x: useSpring(mouseX, { stiffness: 30, damping: 30 }),
            y: useSpring(mouseY, { stiffness: 30, damping: 30 }),
          }}
        />

        {/* Mobile gradient fallback */}
        <div className="md:hidden absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-500/10 to-blue-500/10 blur-3xl opacity-50" />
      </div>

      {/* Floating sparkle dots */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            className="absolute w-1 h-1 bg-primary/40 rounded-full"
            style={{
              left: sparkle.left,
              top: sparkle.top,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: sparkle.duration,
              repeat: Infinity,
              delay: sparkle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </>
  );
};
