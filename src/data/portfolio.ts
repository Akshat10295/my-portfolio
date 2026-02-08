// Portfolio data - Akshat Srivastava

export const personalInfo = {
  name: "Akshat Srivastava",
  firstName: "Akshat",
  lastName: "Srivastava",
  initials: "AS",
  finitial:"A",
  linitial:"S",
  title: "Full Stack Developer",
  roles: ["Full Stack Developer", "Software Developer", "Web Developer"],
  tagline: "3rd-year B.Tech CSE student aspiring to be a Full-Stack Developer, eager to apply coding skills and learn modern web technologies to build efficient and user-friendly applications.",
  email: "akshat.kayasth@gmail.com",
  phone: "+91 9148992220",
  location: "Bengaluru, India",
  github: "https://github.com/Akshat10295",
  linkedin: "http://www.linkedin.com/in/akshat-srivastava10295",
  leetcode: "https://leetcode.com/u/akshat2220/",
  resumeUrl: "my-portfolio\src\assets\Akshat Resume.pdf",
};

export const aboutInfo = {
  description: "I'm a Full Stack Developer currently pursuing my B.Tech in Computer Science and Engineering at Alliance University, Bengaluru. With a strong foundation in both frontend and backend technologies, I love creating seamless web experiences.",
  currentWork: "Currently building projects with MERN Stack and exploring AI/ML technologies, while actively participating in hackathons to solve real-world problems through code.",
  passion: "My journey in tech is driven by curiosity and a desire to solve real-world problems through code.",
  status: "3rd Year Student",
  focus: "Modern Web Apps",
  education: "B.Tech CSE",
  university: "Alliance University",
};

export const skills = {
  languages: ["C++", "Python", "Java", "JavaScript"],
  frontend: ["HTML", "CSS", "React", "Tailwind CSS"],
  backend: ["Node.js", "Express.js", "REST APIs"],
  database: ["MySQL", "MongoDB"],
  tools: ["Git", "GitHub", "VS Code"],
  others: ["Data Structures", "OOPs", "Algorithms"],
};

export interface SkillDetail {
  name: string;
  level: number; // 0-100
  description: string;
}

export interface SkillCategory {
  name: string;
  skills: SkillDetail[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Languages",
    skills: [
      { name: "C++", level: 85, description: "Primary language for DSA and competitive programming" },
      { name: "Python", level: 75, description: "Used for AI/ML projects and automation scripts" },
      { name: "Java", level: 80, description: "Oracle certified, strong OOP fundamentals" },
      { name: "JavaScript", level: 85, description: "Full-stack web development with ES6+" },
    ],
  },
  {
    name: "Frontend",
    skills: [
      { name: "HTML", level: 90, description: "Semantic markup and accessibility" },
      { name: "CSS", level: 85, description: "Responsive design with Flexbox & Grid" },
      { name: "React", level: 80, description: "Component-based UI with hooks and state management" },
      { name: "Tailwind CSS", level: 85, description: "Utility-first styling framework" },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "Node.js", level: 80, description: "Server-side JavaScript runtime" },
      { name: "Express.js", level: 80, description: "RESTful API development" },
      { name: "REST APIs", level: 85, description: "API design and integration" },
    ],
  },
  {
    name: "Database",
    skills: [
      { name: "MySQL", level: 75, description: "Relational database management" },
      { name: "MongoDB", level: 80, description: "NoSQL document database for MERN stack" },
    ],
  },
  {
    name: "Tools",
    skills: [
      { name: "Git", level: 85, description: "Version control and collaboration" },
      { name: "GitHub", level: 90, description: "Repository hosting and CI/CD" },
      { name: "VS Code", level: 90, description: "Primary development environment" },
    ],
  },
  {
    name: "Others",
    skills: [
      { name: "Data Structures", level: 80, description: "Arrays, trees, graphs, and algorithms" },
      { name: "OOPs", level: 85, description: "Object-oriented programming principles" },
      { name: "Algorithms", level: 75, description: "Problem solving and optimization" },
    ],
  },
];

export const education = [
  {
    degree: "B.Tech in Computer Science and Engineering",
    institution: "Alliance University, Bengaluru",
    period: "2023 – 2027",
    grade: "8.5 CGPA",
  },
  {
    degree: "Class 12th (Intermediate)",
    institution: "Surana Vidyalaya, Bengaluru",
    period: "2022 – 2023",
    grade: "81%",
  },
  {
    degree: "Class 10th (Matriculate)",
    institution: "Surana Vidyalaya, Bengaluru",
    period: "2020 – 2021",
    grade: "83%",
  },
];

export const experience = [
  {
    title: "Hackathon Participant",
    company: "Smart India Hackathon & Adobe",
    period: "2024 – 2025",
    location: "India",
    description: [
      "Participated in Smart India Hackathon (2024) organized by Govt. of India",
      "Participated in Adobe India Hackathon (2025) organized by Adobe",
      "Developed innovative solutions for real-world problems",
    ],
  },
];

export const projects = [
  {
    title: "Apna PG",
    category: "MERN Stack",
    description: "Developed a MERN Stack application using Google Maps APIs to locate nearby PGs and visualize local amenities. Features include user authentication, search filters, and interactive maps.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Google Maps API"],
    github: "https://github.com/Akshat10295/Apna-PG.git",
    demo: "",
  },
  {
    title: "Hotel Management System",
    category: "Python",
    description: "The project is to simulate the simulate the application of a hotel, where the user can check-in, check-out, book rooms and order food. ",
    technologies: ["Python", "MySQL"],
    github: "https://github.com/Akshat10295/hotel_management.git",
    demo: "",
  },
  {
    title: "Phone Book",
    category: "MERN Stack",
    description: "Designed to store contact data with CRUD operations. Enables users to store, update, delete and search the data of contacts with a clean user interface.",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    github: "https://github.com/Akshat10295/JFSD_CSE_0324/tree/main/phonebook-app",
    demo: "",
  },
  {
    title: "Image Recognition",
    category: "AI/ML Project",
    description: "Implemented a Siamese Neural Network in Python to detect image similarity and perform one-shot classification using deep learning techniques.",
    technologies: ["Python", "TensorFlow", "Keras", "Neural Networks"],
    github: "https://github.com/Akshat10295/Facial-Recognition.git",
    demo: "",
  },
];

export const certifications = [
  {
    year: "2025",
    title: "Oracle Java Foundations 1Z0-811",
    issuer: "Oracle University",
    description: "Oracle Certified",
    link: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=5887A9C1C69B41935ECEDF145A5F43670F388D7DAFE665C26338E4F0805AA158",
  },
  {
    year: "2025",
    title: "Oracle Cloud Infrastructure AI Foundations",
    issuer: "Oracle University",
    description: "Oracle Certified AI Associate",
    link: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=1A990DF514BAB04BE019C87BC458D0A2433539517F140F69E446D95F5F03D20E",
  },
  {
    year: "2024",
    title: "Ordered Data Structures",
    issuer: "University of Illinois",
    description: "Computer Science Fundamentals",
    link: "https://coursera.org/share/a8e4fcb2c5a65f63647d3439acd63506",
  },
  {
    year: "2024",
    title: "Cybersecurity Foundations",
    issuer: "Coursera",
    description: "Security Foundations",
    link: "https://coursera.org/share/b214e647c8249e34466ada34cb845c69",
  },
];

export const achievements = [
  "Participated in Smart India Hackathon (2024) organized by Govt. of India",
  "Participated in Adobe India Hackathon (2025) organized by Adobe",
];
