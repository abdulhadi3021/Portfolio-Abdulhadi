import { motion } from "framer-motion";

const SectionalHeading = ({ title, subtitle, centered = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`${centered ? "text-center" : ""} mb-16`}
    >
      <motion.h2
        whileInView={{ x: [-10, 0] }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold mb-4 dark:text-white"
      >
        {title.split(" ").map((word, i) => (
          <span key={i} className="inline-block mr-2">
            {word.includes("<") ? (
              <span className="text-indigo-600 dark:text-indigo-400">
                {word.replace("<", "").replace(">", "")}
              </span>
            ) : (
              word
            )}
          </span>
        ))}
      </motion.h2>
      {subtitle && (
        <motion.p
          whileInView={{ x: [10, 0] }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`text-gray-500 dark:text-gray-400 max-w-2xl ${centered ? "mx-auto" : ""}`}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionalHeading;