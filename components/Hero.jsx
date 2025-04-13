import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import SocialIcons from "./SocialIcons.jsx";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
            className="absolute rounded-full bg-indigo-300 dark:bg-indigo-900"
            style={{
              width: `${Math.random() * 150 + 50}px`,
              height: `${Math.random() * 150 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.1,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 text-center lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold mb-6 dark:text-white"
            >
              Hi, I'm <span className="text-indigo-600 dark:text-indigo-400">AbdulHadi</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl font-medium mb-8 text-gray-600 dark:text-gray-300 h-10"
            >
              <TypeAnimation
                sequence={[
                  'Frontend Developer',
                  1000,
                  'React Specialist',
                  1000,
                  'UI/UX Enthusiast',
                  1000,
                  'Problem Solver',
                  1000
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg mb-10 text-gray-500 dark:text-gray-400 max-w-lg"
            >
              I build beautiful, responsive, and user-friendly web applications with modern technologies.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium shadow-lg hover:bg-indigo-700 transition-colors"
              >
                Contact Me
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#projects"
                className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-lg font-medium shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700"
              >
                View Projects
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-12"
            >
              <SocialIcons />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:w-1/2 flex justify-center"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 bg-indigo-100 dark:bg-indigo-900 rounded-full blur-xl opacity-70 animate-pulse"></div>
              <div className="absolute inset-4 border-4 border-indigo-300 dark:border-indigo-700 rounded-full animate-spin-slow"></div>
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="w-48 h-48 md:w-60 md:h-60 bg-indigo-500 rounded-full overflow-hidden shadow-2xl">
                  {/* Replace with your actual image */}
                  {/* <div className="w-full h-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-4xl">
                    👨‍💻
                  </div> */}
                  
                  <div>
      <img 
        src="https://media-hosting.imagekit.io/00d55f2b01d34aef/me3__1_-removebg-preview.png?Expires=1839157487&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=wApPhKtovdHPnkD8tfTrg4EdtAvkP7ms5n0ywE7E0PYRerzKid32Wq65jfa~Jt0dc67jrQ4~oGhox6r6k4pCyW9IMg1Y0wSIX4Umy0M6fHNm1qP7wnRhYSM1zmoyJQYrA96vGG4L17YF1j3Z~3peiZ1DmPW~xkP7JU6F28k-pDQz6ALiIiOPjLHY96RAL4NcdCbU1fhGAg-G2ax1Kz0~LZjmLDd9gBRyqLzwvzc~JXz9nx0LMlCtIGclh9g9oNJGwA7F96ckEzF-Ucw12EJ-9TTaJvrxow1n~ALw2SmsMBzSD5seW7rJbBrq2Zw-Q~T-0PWKpWcx5cRHe0z2Yi9Qng__" 
        alt="Description of image"
        style={{ width: '300px', borderRadius: '10px' }}
      />
    </div>

                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="flex flex-col items-center"
        >
          <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">Scroll Down</span>
          <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-300 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1 h-2 bg-gray-400 dark:bg-gray-300 rounded-full mt-1"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;