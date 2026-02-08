import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { aboutInfo, personalInfo } from "@/data/portfolio";
import akshatPhoto from "@/assets/akshat-photo.jpg";

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isHovering, setIsHovering] = useState(false);

  const stats = [
    { label: "Full Stack", value: "Developer" },
    { label: "Currently", value: aboutInfo.status },
    { label: "B.Tech CSE", value: aboutInfo.university },
    { label: "Focus", value: aboutInfo.focus },
  ];

  return (
    <section id="about" className="py-24 relative" ref={ref}>
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div
              className="relative mx-auto max-w-xs lg:max-w-sm flex items-center justify-center"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {/* Glow effect behind photo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-64 h-64 lg:w-80 lg:h-80 rounded-full bg-primary/20 blur-3xl"
                  animate={{ opacity: isHovering ? 0.8 : 0.4, scale: isHovering ? 1.1 : 1 }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              {/* Wave ripple rings removed - keeping only the glow effect */}
              
              {/* Rotating ring */}
              <motion.div
                className="absolute w-72 h-72 lg:w-96 lg:h-96 rounded-full border border-primary/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute w-64 h-64 lg:w-80 lg:h-80 rounded-full border border-primary/30" />
              
              {/* Main image - Round with slower zoom effect */}
              <motion.div
                className="relative z-10 w-56 h-56 lg:w-72 lg:h-72 rounded-full overflow-hidden border-4 border-primary/50 shadow-2xl shadow-primary/20"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200, damping: 20, duration: 0.6 }}
              >
                <img
                  src={akshatPhoto}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover object-top"
                />
              </motion.div>

              {/* Status badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-20">
                <div className="status-badge shadow-lg">
                  <span className="status-dot" />
                  <span className="whitespace-nowrap">Available for work</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="section-title mb-6">
              About <span className="text-primary">me</span>
            </h2>

            <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
              <p>{aboutInfo.description}</p>
              <p>{aboutInfo.currentWork}</p>
              <p>{aboutInfo.passion}</p>
            </div>

            {/* Stats grid - slower zoom effect */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  // Slower zoom transition
                  className="p-4 rounded-xl border border-border bg-card/50 cursor-pointer transition-shadow duration-500 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
                >
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">
                    {stat.label}
                  </p>
                  <p className="text-foreground font-semibold">{stat.value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};