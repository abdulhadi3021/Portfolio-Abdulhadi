import { motion } from "framer-motion";
import SectionalHeading from "./SectionHeading";

const About = () => {
  const skills = [
    { name: "HTML/CSS", level: 95 },
    { name: "JavaScript", level: 90 },
    { name: "React", level: 85 },
    { name: "Next.js", level: 80 },
    { name: "Node.js", level: 75 },
    { name: "Tailwind CSS", level: 85 },
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <SectionalHeading 
          title="About Me" 
          subtitle="Get to know more about my background and skills" 
        />

        <div className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:w-1/2"
          >
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 dark:text-white">Who am I?</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                I'm a passionate Frontend Developer with expertise in modern web technologies.
                With experience in building responsive and user-friendly web applications,
                I love turning ideas into reality through code.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                My journey in web development started several years ago, and since then
                I've been constantly learning and improving my skills. I believe in writing
                clean, efficient, and maintainable code.
              </p>
              
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {skill.name}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {skill.level}%
                      </span>
                    </div>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="h-2 bg-indigo-100 dark:bg-indigo-900 rounded-full"
                    >
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-600"
                        style={{ width: `${skill.level}%` }}
                      />
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:w-1/2"
          >
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold mb-6 dark:text-white">My Experience</h3>
              
              <div className="space-y-6">
                <div className="relative pl-8 border-l-2 border-indigo-200 dark:border-indigo-800">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-indigo-600 rounded-full"></div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Frontend Developer</h4>
                  <p className="text-gray-500 dark:text-gray-400">Tech Company (2021 - Present)</p>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    Developed and maintained web applications using React and Next.js.
                    Collaborated with designers to implement responsive UIs.
                  </p>
                </div>
                
                <div className="relative pl-8 border-l-2 border-indigo-200 dark:border-indigo-800">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-indigo-600 rounded-full"></div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Web Developer</h4>
                  <p className="text-gray-500 dark:text-gray-400">Digital Agency (2019 - 2021)</p>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    Built client websites with HTML, CSS, and JavaScript.
                    Optimized websites for performance and SEO.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;