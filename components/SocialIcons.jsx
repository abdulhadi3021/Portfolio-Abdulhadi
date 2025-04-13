import { motion } from "framer-motion";

const socialLinks = [
  { name: "GitHub", url: "https://github.com/abdulhadi3021", icon: "💻" },
  { name: "Twitter", url: "https://twitter.com", icon: "🐦" },
  { name: "LinkedIn", url: "https://linkedin.com", icon: "🔗" },
  { name: "Instagram", url: "https://instagram.comhttps://www.instagram.com/featurewebdeveloper/", icon: "📷" },
];

const SocialIcons = () => {
  return (
    <div className="flex justify-center gap-4">
      {socialLinks.map((social, index) => (
        <motion.a
          key={social.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{ y: -5, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
          aria-label={social.name}
        >
          <span className="text-xl">{social.icon}</span>
        </motion.a>
      ))}
    </div>
  );
};

export default SocialIcons;