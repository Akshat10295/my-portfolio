import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Calendar, Briefcase, GraduationCap } from "lucide-react";
import { experience, education } from "@/data/portfolio";

export const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Slower zoom transition settings - using 'as const' for type safety
  const slowZoomTransition = { type: "spring" as const, stiffness: 200, damping: 25, duration: 0.6 };

  return ( 
    <section id="experience" className="py-24 relative" ref={ref}>
      <div className="section-container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p className="section-subtitle mb-4">BACKGROUND</p>
          <h2 className="section-title">
            Experience & <span className="text-primary">Education</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Experience column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-primary/10">
                <Briefcase className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Achievements & Experience</h3>
            </div>

            <div className="relative pl-6">
              <div className="timeline-line" />

              {experience.map((exp, index) => (
                <motion.div
                  key={exp.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className="relative pb-8 last:pb-0"
                >
                  <div className="timeline-dot top-1" />

                  {/* Slower zoom effect */}
                  <motion.div 
                    whileHover={{ scale: 1.03, y: -4 }} 
                    transition={slowZoomTransition} 
                    className="card-glass card-hover p-6 ml-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <h4 className="font-semibold text-foreground">{exp.title}</h4>
                      <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded">
                        {exp.period}
                      </span>
                    </div>

                    <p className="text-primary font-medium text-sm mb-2">
                      {exp.company}
                    </p>

                    <div className="flex items-center gap-1 text-muted-foreground text-xs mb-4">
                      <MapPin className="w-3 h-3" />
                      {exp.location}
                    </div>

                    <ul className="space-y-2">
                      {exp.description.map((item, i) => (
                        <li
                          key={i}
                          className="text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <span className="text-primary mt-1.5">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-primary/10">
                <GraduationCap className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Education</h3>
            </div>

            <div className="relative pl-6">
              <div className="timeline-line" />

              {education.map((edu, index) => (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className="relative pb-8 last:pb-0"
                >
                  <div className="timeline-dot top-1" />

                  {/* Slower zoom effect */}
                  <motion.div 
                    whileHover={{ scale: 1.03, y: -4 }} 
                    transition={slowZoomTransition} 
                    className="card-glass card-hover p-6 ml-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <h4 className="font-semibold text-foreground text-sm">
                        {edu.degree}
                      </h4>
                      <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded">
                        {edu.period}
                      </span>
                    </div>

                    <p className="text-muted-foreground text-sm mb-2">
                      {edu.institution}
                    </p>

                    <div className="inline-flex items-center gap-1 text-primary text-sm font-medium">
                      <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
                      {edu.grade}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};