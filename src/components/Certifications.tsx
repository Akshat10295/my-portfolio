import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Award } from "lucide-react";
import { certifications } from "@/data/portfolio";

export const Certifications = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 relative" ref={ref}>
      <div className="section-container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p className="section-subtitle mb-4">ACHIEVEMENTS</p>
          <h2 className="section-title">
            <span className="text-primary">Certifications</span>
          </h2>
        </motion.div>

        {/* Certifications grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {certifications.map((cert, index) => (
            <motion.a
              key={cert.title}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -8, transition: { type: "spring", stiffness: 400, damping: 20 } }}
              className="cert-card group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-primary font-semibold">
                  {cert.year}
                </span>
                <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="mb-3">
                <Award className="w-8 h-8 text-primary/50 mb-3" />
              </div>

              <h3 className="font-semibold text-foreground mb-1 text-sm leading-tight group-hover:text-primary transition-colors">
                {cert.title}
              </h3>

              <p className="text-xs text-muted-foreground mb-2">
                {cert.description}
              </p>

              <p className="text-xs text-primary font-medium">{cert.issuer}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
