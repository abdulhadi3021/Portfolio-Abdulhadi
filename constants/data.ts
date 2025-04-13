import { FaReact, FaNodeJs, FaJs, FaHtml5, FaCss3Alt, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiMongodb } from "react-icons/si";

export const navLinks = [
  { name: "Home", hash: "#home" },
  { name: "About", hash: "#about" },
  { name: "Skills", hash: "#skills" },
  { name: "Projects", hash: "#projects" },
  { name: "Contact", hash: "#contact" }
];

export const socialLinks = [
  { name: "GitHub", url: "https://github.com", icon: FaGithub },
  { name: "LinkedIn", url: "https://linkedin.com", icon: FaLinkedin },
  { name: "Twitter", url: "https://twitter.com", icon: FaTwitter }
];

export const skills = [
  { name: "React", icon: FaReact },
  { name: "Node.js", icon: FaNodeJs },
  { name: "JavaScript", icon: FaJs },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "HTML5", icon: FaHtml5 },
  { name: "CSS3", icon: FaCss3Alt },
  { name: "Tailwind", icon: SiTailwindcss },
  { name: "MongoDB", icon: SiMongodb }
];

export const projects = [
  {
    title: "E-Commerce Platform",
    description: "Full-featured online store with payment integration",
    tags: ["React", "Node.js", "MongoDB"],
    image: "/assets/images/project1.jpg"
  },
  {
    title: "Task Management App",
    description: "Productivity app for organizing daily tasks",
    tags: ["Next.js", "TypeScript", "Firebase"],
    image: "/assets/images/project2.jpg"
  }
];