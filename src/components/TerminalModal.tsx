import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Terminal } from "lucide-react";
import { personalInfo } from "@/data/portfolio";

interface TerminalLine {
  type: "input" | "output";
  text: string;
}

const SECTIONS = ["hero", "about", "skills", "experience", "projects", "certifications", "contact"];

const WELCOME_LINES: TerminalLine[] = [
  { type: "output", text: "Welcome to Portfolio OS v2.0.0" },
  { type: "output", text: "Type 'help' for available commands." },
];

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TerminalModal = ({ isOpen, onClose }: TerminalModalProps) => {
  const [lines, setLines] = useState<TerminalLine[]>([...WELCOME_LINES]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const addLines = (newLines: TerminalLine[]) => {
    setLines((prev) => [...prev, ...newLines]);
  };

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const parts = trimmed.split(/\s+/);
    const command = parts[0];
    const arg = parts[1];

    addLines([{ type: "input", text: `$ ${cmd}` }]);

    switch (command) {
      case "help":
        addLines([
          { type: "output", text: "Available commands: help, clear, cd [section], ls, exit, whoami" },
        ]);
        break;

      case "clear":
        setLines([]);
        break;

      case "ls":
        addLines([
          { type: "output", text: `sections: ${SECTIONS.join(", ")}` },
        ]);
        break;

      case "cd":
        if (!arg) {
          addLines([{ type: "output", text: "Usage: cd [section]" }]);
        } else if (SECTIONS.includes(arg)) {
          addLines([{ type: "output", text: `Navigating to /${arg}...` }]);
          setTimeout(() => {
            const el = document.getElementById(arg);
            if (el) {
              el.scrollIntoView({ behavior: "smooth" });
            }
          }, 400);
        } else {
          addLines([
            { type: "output", text: `Error: section '${arg}' not found.` },
            { type: "output", text: `Available: ${SECTIONS.join(", ")}` },
          ]);
        }
        break;

      case "exit":
        addLines([{ type: "output", text: "Exiting Dev Mode..." }]);
        setTimeout(() => onClose(), 600);
        break;

      case "whoami":
        addLines([
          { type: "output", text: `visitor@portfolio:~$ guest user` },
          { type: "output", text: `Name: ${personalInfo.name}` },
          { type: "output", text: `Role: ${personalInfo.title}` },
          { type: "output", text: `Location: ${personalInfo.location}` },
          { type: "output", text: `Email: ${personalInfo.email}` },
        ]);
        break;

      case "":
        break;

      default:
        addLines([
          { type: "output", text: `Command not found: ${command}` },
          { type: "output", text: "Type 'help' for available commands." },
        ]);
    }

    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-20 right-6 z-50 w-[90vw] max-w-[520px] rounded-xl border border-border bg-card/95 backdrop-blur-xl shadow-2xl shadow-primary/10 overflow-hidden"
          onClick={() => inputRef.current?.focus()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
            <div className="flex items-center gap-2 font-mono text-sm font-bold text-foreground">
              <Terminal className="w-4 h-4 text-primary" />
              <span>&gt;_ TERMINAL</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close terminal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div
            ref={scrollRef}
            className="p-4 h-[280px] overflow-y-auto font-mono text-sm custom-scrollbar"
          >
            {lines.map((line, i) => (
              <div
                key={i}
                className={`leading-7 ${
                  line.type === "input"
                    ? "text-primary font-semibold"
                    : "text-primary/80"
                }`}
              >
                {line.text}
              </div>
            ))}

            {/* Input line */}
            <div className="flex items-center gap-2 leading-7">
              <span className="text-primary font-semibold">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none border-none text-primary caret-primary font-mono text-sm placeholder:text-primary/40"
                placeholder="Type a command..."
                autoComplete="off"
                spellCheck={false}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
