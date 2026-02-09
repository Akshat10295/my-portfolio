import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { skillCategories, SkillDetail } from "@/data/portfolio";
import { X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export const Skills = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isMobile = useIsMobile();

  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<SkillDetail | null>(null);

  /* ---------- FLATTEN SKILLS ---------- */
  const allSkills = skillCategories.flatMap((cat) =>
    cat.skills.map((skill) => ({ skill, category: cat.name }))
  );

  /* ---------- FILTERED SKILLS (SINGLE SOURCE OF TRUTH) ---------- */
  const filteredSkills = allSkills.filter(
    ({ category }) =>
      selectedCategory === null || category === selectedCategory
  );

  /* ---------- ORBIT POSITION ---------- */
  const getSkillPosition = (index: number, total: number, radius: number) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  };

  const handleSkillClick = (skill: SkillDetail) => {
    setSelectedSkill(
      selectedSkill?.name === skill.name ? null : skill
    );
  };

  return (
    <section id="skills" ref={ref} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-gradient opacity-50" />

      <div className="section-container relative z-10">
        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p className="section-subtitle mb-4">EXPERTISE</p>
          <h2 className="section-title">
            Technical <span className="text-primary">Skills</span>
          </h2>
        </motion.div>

        {/* ================= CATEGORY FILTERS ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <button
            onClick={() => {
              setSelectedCategory(null);
              setSelectedSkill(null);
            }}
            className={`skill-node text-sm ${
              selectedCategory === null ? "skill-node-active" : ""
            }`}
          >
            All
          </button>

          {skillCategories.map((category, index) => (
            <motion.button
              key={category.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + index * 0.05 }}
              onClick={() => {
                setSelectedCategory(
                  selectedCategory === category.name ? null : category.name
                );
                setSelectedSkill(null);
              }}
              className={`skill-node text-sm ${
                selectedCategory === category.name ? "skill-node-active" : ""
              }`}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* ================= SELECTED SKILL DETAIL ================= */}
        <AnimatePresence>
          {selectedSkill && (
            <motion.div
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              className="mb-8 overflow-hidden"
            >
              <div className="bg-card border border-border rounded-xl p-6 relative max-w-md mx-auto">
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="absolute top-4 right-4 p-1 hover:bg-muted rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>

                <h3 className="text-xl font-bold text-primary mb-3">
                  {selectedSkill.name}
                </h3>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Proficiency</span>
                    <span className="text-primary font-medium">
                      {selectedSkill.level}%
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-purple-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedSkill.level}%` }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                </div>

                <p className="text-muted-foreground text-sm">
                  {selectedSkill.description}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ================= DESKTOP ORBIT ================= */}
        {!isMobile && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="relative h-[500px] md:h-[600px] flex items-center justify-center"
            >
              {/* CENTER */}
              <div className="absolute w-24 h-24 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center z-20">
                <span className="text-primary font-bold text-sm text-center">
                  {selectedCategory || "Skills"}
                </span>
              </div>

              {/* RINGS */}
              <div className="absolute w-64 h-64 rounded-full border border-border/30" />
              <div className="absolute w-96 h-96 rounded-full border border-border/20" />
              <div className="absolute w-[450px] h-[450px] rounded-full border border-border/10 hidden md:block" />

              {/* ORBIT SKILLS */}
              <AnimatePresence mode="sync">
                {filteredSkills.map(({ skill, category }, index) => {
                  const radius =
                    filteredSkills.length <= 6
                      ? 120
                      : filteredSkills.length <= 12
                      ? 160
                      : 200;

                  const pos = getSkillPosition(
                    index,
                    filteredSkills.length,
                    radius
                  );

                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        x: pos.x,
                        y: pos.y,
                      }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                        delay: index * 0.03,
                      }}
                      whileHover={{ scale: 1.15, zIndex: 30 }}
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      onClick={() => handleSkillClick(skill)}
                      className="absolute cursor-pointer"
                    >
                      {/* CONNECTION LINE */}
                      <motion.div
                        className="absolute top-1/2 left-1/2 h-px bg-gradient-to-r from-primary/50 to-transparent origin-left -z-10"
                        style={{
                          width: Math.sqrt(pos.x * pos.x + pos.y * pos.y),
                          transform: `rotate(${
                            Math.atan2(-pos.y, -pos.x) * (180 / Math.PI)
                          }deg)`,
                        }}
                        animate={{
                          opacity:
                            hoveredSkill === skill.name ||
                            selectedSkill?.name === skill.name
                              ? 0.8
                              : 0.2,
                        }}
                        transition={{ duration: 0.2 }}
                      />

                      {/* SKILL PILL */}
                      <div
                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
                          ${
                            hoveredSkill === skill.name ||
                            selectedSkill?.name === skill.name
                              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                              : "bg-card border border-border hover:border-primary/50"
                          }`}
                      >
                        {skill.name}
                      </div>

                      {/* TOOLTIP */}
                      <AnimatePresence>
                        {hoveredSkill === skill.name &&
                          !selectedSkill && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-muted text-muted-foreground text-xs rounded whitespace-nowrap"
                            >
                              {category} • Click for details
                            </motion.div>
                          )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>

            {/* ================= DESKTOP LIST (SYNCED) ================= */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="mt-10 flex flex-wrap justify-center gap-3"
            >
              {filteredSkills.map(({ skill }) => (
                <button
                  key={skill.name}
                  onClick={() => handleSkillClick(skill)}
                  className={`px-4 py-2 rounded-full text-sm transition-all
                    ${
                      selectedSkill?.name === skill.name
                        ? "bg-primary text-primary-foreground"
                        : "bg-card border border-border hover:border-primary/50"
                    }`}
                >
                  {skill.name}
                </button>
              ))}
            </motion.div>
          </>
        )}

        {/* ================= MOBILE LIST ================= */}
        {isMobile && (
          <div className="mt-8">
            <div className="flex flex-wrap justify-center gap-2">
              {filteredSkills.map(({ skill }, index) => (
                <motion.button
                  key={skill.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.02 }}
                  onClick={() => handleSkillClick(skill)}
                  className={`px-3 py-1.5 rounded-full text-sm
                    ${
                      selectedSkill?.name === skill.name
                        ? "bg-primary text-primary-foreground"
                        : "bg-card border border-border"
                    }`}
                >
                  {skill.name}
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
