import { motion } from "framer-motion";
import SectionalHeading from "./SectionHeading";


const Skills = () => {
  const skillCategories = [
    {
      name: "Frontend",
      skills: [
        { name: "HTML5", level: 95, icon: "🟠" },
        { name: "CSS3", level: 90, icon: "🔵" },
        { name: "JavaScript", level: 90, icon: "🟡" },
        { name: "React", level: 85, icon: "⚛️" },
        { name: "Next.js", level: 80, icon: "⏭️" },
        { name: "Tailwind CSS", level: 85, icon: "🎨" },
      ],
    },
    {
      name: "Backend",
      skills: [
        { name: "Node.js", level: 75, icon: "🟢" },
        { name: "Express", level: 70, icon: "🚂" },
        { name: "MongoDB", level: 65, icon: "🍃" },
        { name: "Firebase", level: 60, icon: "🔥" },
        { name: "REST APIs", level: 75, icon: "🔌" },
      ],
    },
    {
      name: "Tools",
      skills: [
        { name: "Git", level: 80, icon: "🐙" },
        { name: "VS Code", level: 90, icon: "💻" },
        { name: "Figma", level: 70, icon: "✏️" },
        { name: "Docker", level: 50, icon: "🐳" },
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <SectionalHeading 
          title="My Skills" 
          subtitle="Technologies and tools I work with" 
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
            >
              <h3 className="text-xl font-semibold mb-6 dark:text-white flex items-center gap-2">
                <span className="text-2xl">{category.icon}</span>
                {category.name}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        {skill.icon} {skill.name}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {skill.level}%
                      </span>
                    </div>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: skillIndex * 0.1 }}
                      className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
                    >
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-600"
                        style={{ width: `${skill.level}%` }}
                      />
                    </motion.div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;