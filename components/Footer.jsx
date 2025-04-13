import { motion } from "framer-motion";
import { 
  FiArrowUp, 
  FiHeart, 
  FiGithub, 
  FiTwitter, 
  FiLinkedin, 
  FiInstagram,
  FiMapPin,
  FiMail,
  FiPhone
} from "react-icons/fi";
import { FaReact } from "react-icons/fa";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const socialLinks = [
    {
      name: "GitHub",
      icon: <FiGithub size={20} />,
      url: "https://github.com/abdulhadi3021",
    },
    {
      name: "Twitter",
      icon: <FiTwitter size={20} />,
      url: "https://twitter.com",
    },
    {
      name: "LinkedIn",
      icon: <FiLinkedin size={20} />,
      url: "https://linkedin.com",
    },
    {
      name: "Instagram",
      icon: <FiInstagram size={20} />,
      url: "https://instagram.com",
    },
  ];

  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2"
          >
            <div className="flex items-center gap-3 mb-4">
              <FaReact className="text-3xl text-indigo-400 animate-spin-slow" />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                AbdulHadi
              </h2>
            </div>
            <p className="text-gray-400 mb-6">
              Crafting exceptional digital experiences with modern web technologies.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:text-white hover:bg-indigo-600 transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {["Home", "About", "Skills", "Projects", "Contact"].map((item, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-indigo-400 transition-colors"
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-6 text-white">Get In Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FiMapPin className="mt-1 text-indigo-400" />
                <span className="text-gray-400">Abbottabad, Pakistan</span>
              </li>
              <li className="flex items-start gap-3">
                <FiMail className="mt-1 text-indigo-400" />
                <a
                  href="mailto:abdulhadi@example.com"
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  muhammadrashi60776@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FiPhone className="mt-1 text-indigo-400" />
                <a
                  href="tel:+921234567890"
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  +92 333 355 1378
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="border-t border-gray-800 my-8"
        />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-gray-500 text-sm flex items-center"
          >
            Made with <FiHeart className="mx-1.5 text-red-500 animate-pulse" /> by AbdulHadi
            <span className="mx-1.5">•</span>
            Built with <FaReact className="mx-1.5 text-indigo-400" />
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-500 text-sm"
          >
            © {new Date().getFullYear()} All Rights Reserved
          </motion.p>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 bg-gray-800 rounded-full text-gray-400 hover:text-white hover:bg-indigo-600 transition-colors"
            aria-label="Back to top"
          >
            <FiArrowUp size={18} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;