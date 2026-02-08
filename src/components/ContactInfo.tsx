import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, Code, ArrowUpRight } from "lucide-react";
import { personalInfo } from "@/data/portfolio";

interface ContactInfoProps {
  isInView: boolean;
}

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone.replace(/\s/g, "")}`,
  },
  {
    icon: MapPin,
    label: "Location",
    value: personalInfo.location,
    href: null,
  },
];

const socialLinks = [
  {
    icon: Github,
    href: personalInfo.github,
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: personalInfo.linkedin,
    label: "LinkedIn",
  },
  {
    icon: Code,
    href: personalInfo.leetcode,
    label: "LeetCode",
  },
];

export const ContactInfo = ({ isInView }: ContactInfoProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.2 }}
    >
      <div className="space-y-4 mb-8">
        {contactInfo.map((info, index) => (
          <motion.div
            key={info.label}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 + index * 0.1 }}
            whileHover={{ scale: 1.03, x: 8 }}
            className="group flex items-center gap-4 p-4 rounded-xl border border-border bg-card/50 cursor-pointer transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:bg-primary/5"
          >
            <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300">
              <info.icon className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground mb-0.5 uppercase tracking-wider">
                {info.label}
              </p>
              {info.href ? (
                <a
                  href={info.href}
                  className="text-foreground font-medium group-hover:text-primary transition-colors"
                >
                  {info.value}
                </a>
              ) : (
                <p className="text-foreground font-medium group-hover:text-primary transition-colors">{info.value}</p>
              )}
            </div>
            {info.href && (
              <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Social links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5 }}
      >
        <p className="text-sm text-muted-foreground mb-4">Follow me on</p>
        <div className="flex gap-3">
          {socialLinks.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -4 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="p-3 rounded-xl border border-border bg-card hover:border-primary hover:text-primary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:bg-primary/10"
              aria-label={social.label}
            >
              <social.icon className="w-5 h-5" />
            </motion.a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
