import toast from "react-hot-toast";
import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, Send, Code } from "lucide-react";
import { personalInfo } from "@/data/portfolio";

export const Contact = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  /* ================= STATE ================= */
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSending, setIsSending] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  /* ================= COOLDOWN ================= */
  useEffect(() => {
    if (cooldown === 0) return;
    const timer = setInterval(() => {
      setCooldown((c) => c - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  /* ================= RATE LIMIT ================= */
  const isRateLimited = () => {
    const lastSent = localStorage.getItem("lastContactSubmit");
    if (!lastSent) return false;
    return Date.now() - Number(lastSent) < 60_000; // 1 minute
  };

  /* ================= INPUT ================= */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isRateLimited()) {
      toast.error("Please wait a minute before sending another message.");
      return;
    }

    setIsSending(true);
    setCooldown(30);

    try {
      const form = e.currentTarget;

      const formDataObj = new FormData(form);

      // 👇 REQUIRED for Netlify
      formDataObj.append("form-name", "contact");

      await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(formDataObj as any).toString(),
      });

      localStorage.setItem("lastContactSubmit", Date.now().toString());
      setFormData({ name: "", email: "", subject: "", message: "" });

      toast.success("Message sent successfully!");
    } catch {
      const body =
        `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n\n` +
        `Hi Akshat,\n\n` +
        `${formData.message}\n\n` +
        `Best regards,\n${formData.name}`;

      const gmailFallback = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
        personalInfo.email
      )}&su=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        body
      )}`;

      window.open(gmailFallback, "_blank", "noopener,noreferrer");
      toast.error("Form failed. Gmail has been opened for you.");
    } finally {
      setIsSending(false);
    }
  };


  /* ================= DATA ================= */
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: personalInfo.email,
      href: `https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.email}`,
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
    { icon: Github, href: personalInfo.github, label: "GitHub" },
    { icon: Linkedin, href: personalInfo.linkedin, label: "LinkedIn" },
    { icon: Code, href: personalInfo.leetcode, label: "LeetCode" },
  ];

  return (
    <section id="contact" className="py-24 relative" ref={ref}>
      <div className="absolute inset-0 bg-radial-gradient opacity-30" />

      <div className="section-container relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p className="section-subtitle mb-4">GET IN TOUCH</p>
          <h2 className="section-title">
            Let's Work <span className="text-primary">Together</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from
            you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* CONTACT DETAILS */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
          >
            <div className="space-y-6 mb-8">
              {contactInfo.map((info) => (
                <div
                  key={info.label}
                  className="
                    group flex items-start gap-4
                    transition-transform duration-300
                    hover:translate-x-2
                  "
                >
                  <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                    <info.icon className="w-5 h-5 text-primary" />
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {info.label}
                    </p>
                    {info.href ? (
                      <a
                        href={info.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          font-medium transition-colors duration-300
                          group-hover:text-primary
                        "
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="font-medium">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-sm text-muted-foreground mb-4">Follow me on</p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    p-3 rounded-xl border border-border bg-card
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:border-primary
                    hover:text-primary
                  "
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* CONTACT FORM */}
          <motion.form
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className="
              space-y-6 rounded-2xl p-8
              border border-border
              bg-card/40 backdrop-blur
            "
          >
            <input type="hidden" name="form-name" value="contact" />
            <input type="hidden" name="bot-field" />

            {/* Name + Email */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="group transition-transform duration-300 hover:scale-[1.02]">
                <label className="block text-sm mb-2 text-muted-foreground">
                  Name
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="Your name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="group transition-transform duration-300 hover:scale-[1.02]">
                <label className="block text-sm mb-2 text-muted-foreground">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>

            {/* Subject */}
            <div className="group transition-transform duration-300 hover:scale-[1.02]">
              <label className="block text-sm mb-2 text-muted-foreground">
                Subject
              </label>
              <input
                name="subject"
                type="text"
                placeholder="How can I help you?"
                required
                value={formData.subject}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            {/* Message */}
            <div className="group transition-transform duration-300 hover:scale-[1.02]">
              <label className="block text-sm mb-2 text-muted-foreground">
                Message
              </label>
              <textarea
                name="message"
                rows={5}
                placeholder="Tell me about your project..."
                required
                value={formData.message}
                onChange={handleChange}
                className="form-input resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSending || cooldown > 0}
              className="
                btn-primary w-full flex items-center justify-center gap-2
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              <Send className="w-4 h-4" />
              {cooldown > 0 ? `Wait ${cooldown}s` : "Send Message"}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};
