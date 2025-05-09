import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import SectionalHeading from "./SectionHeading";
import Image from "next/image"; // Import Next.js Image component for optimized images

const Projects = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-featured online store with product listings, cart, and checkout functionality.",
      tags: ["React", "Node.js", "MongoDB"],
      github: "#",
      live: "#",
      image: "/images/ecommerce-demo.jpg", // Update with your actual image path
      alt: "E-Commerce Platform Screenshot"
    },
    {
      title: "Task Management App",
      description: "A productivity app for managing tasks with drag-and-drop functionality.",
      tags: ["Next.js", "Firebase", "Tailwind CSS"],
      github: "#",
      live: "#",
      image: "https://media-hosting.imagekit.io/6ebebca3932541ea/bandicam%202025-05-09%2016-38-52-624.jpg?Expires=1841403329&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=j316VcIxHB0mcY9g1UayRKih3Hm6eGm-TY3MifZqL-Fo8ObrRsjXcT7wSRBJEEaXgrjM-t4x5PLa2gZ6m9XG0G8zZUC8BfM7Sx8G609yCQLNq0yl8wCA0ivQQcUmDbgdhQymy~zuQP43XPdxA12VDi7sM8DuDgXOPpHLfIkK~QjMsPFXdCTzDC1CF28SRKuLO8Db1lOUQkNx9dK9yF4c71o4j~2jizeMRLBsZGAG6iuLqCHOIeMUL-dL05K61NiMAzaaE7JWKFOEDH-oFd-JcU~UfsSGfDL6WhPPZstiqDGL0ZlINfePyYksrIUTZyk0Dgm0tI26nJczvEgfXkcx1g__", // Update with your actual image path
      alt: "Task Management App Screenshot"
    },
    {
      title: "Portfolio Website",
      description: "A modern portfolio website with animations and dark mode support.",
      tags: ["React", "Framer Motion", "CSS"],
      github: "http://abdulhadiportfolio.free.nf/",
      live: "http://abdulhadiportfolio.free.nf/",
      image: "/1.jpg", // Update with your actual image path
      alt: "Portfolio Website Screenshot"
    },
  ];

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <SectionalHeading 
          title="My Projects" 
          subtitle="Some of my recent work and personal projects" 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="h-48 relative overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  placeholder="blur" // Optional: Add blur-up placeholder
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <motion.span
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs rounded"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    <FiGithub className="mr-1" /> Code
                  </motion.a>
                  {project.live && (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      <FiExternalLink className="mr-1" /> Live Demo
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
