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
      live: "https://liogi-store.vercel.app/",
      image: "https://media-hosting.imagekit.io/f151620d279e4f94/bandicam%202025-05-10%2021-48-49-857.jpg?Expires=1841553005&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=K7Fh3RVH9ECE42N9KQy9CQe8sN-itx4~KiqHMkad-Bwq18dzU-Pjex96ocrOrxRI1QGb~UDcYNp8C9vXjOOHv-4RGo9hyZZIozoYNAyciESYhJ9NSFTJhNYhE4NXdcIE3NYGHUF1HVNaGGy4CXM9IAHsjX8rcgLKEjmivzRaIjDz1Ess3762q~jyPRwXFGWtAblq-oFA7PCxtRvN3IjvLCO0Bbc5x-9bH7NpjMRIAySsOZQ01hp4RLtUvO3PA3GYHDjxK5KvVjEIgtD3tbNPVHB6e-dlefMad05ffy5jdhXKMXu0t1G6HDhoolena9S133MPH4t6ytxKjfz7LDLGmg__", // Update with your actual image path
      alt: "E-Commerce Platform Screenshot"
    },
    {
      title: "Task Management App",
      description: "A productivity app for managing tasks with drag-and-drop functionality.",
      tags: ["Next.js", "Firebase", "Tailwind CSS"],
      github: "#",
      live: "https://curriculum-control-center.vercel.app/",
      image: "public/2.png", // Update with your actual image path
      alt: "Task Management App Screenshot"
    },
    {
      title: "Portfolio Website",
      description: "A modern portfolio website with animations and dark mode support.",
      tags: ["React", "Framer Motion", "CSS"],
      github: "#",
      live: "https://abdulhadi-portfolio1.vercel.app/",
      image: "public/1.png", // Replace with the actual image URL
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
