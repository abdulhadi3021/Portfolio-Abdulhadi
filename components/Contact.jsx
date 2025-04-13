import { motion } from "framer-motion";
import { useState } from "react";
import { FiSend, FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import SectionalHeading from "./SectionHeading";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("https://formsubmit.co/ajax/muhammadrashi60776@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: "New message from your portfolio",
          _template: "table",
          _captcha: "false" // Disable captcha for better UX
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setSubmitStatus({ success: true, message: "Message sent successfully!" });
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error(result.message || "Submission failed");
      }
    } catch (error) {
      setSubmitStatus({ 
        success: false, 
        message: error.message || "Failed to send message. Please try again." 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <SectionalHeading 
          title="Contact Me" 
          subtitle="Feel free to reach out for collaborations or just a friendly hello" 
        />

        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:w-1/2"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white transition-all"
                    placeholder="Hello, I would like to talk about..."
                  ></textarea>
                </div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiSend /> Send Message
                    </>
                  )}
                </motion.button>

                {submitStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg text-sm ${
                      submitStatus.success
                        ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
                        : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
                    }`}
                  >
                    {submitStatus.message}
                  </motion.div>
                )}
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:w-1/2"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 h-full shadow-sm">
                <h3 className="text-2xl font-bold mb-6 dark:text-white">Contact Info</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  Feel free to reach out through any of these channels. I typically respond within 24 hours.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-full text-indigo-600 dark:text-indigo-300">
                      <FiMapPin size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-white mb-1">Location</h4>
                      <p className="text-gray-600 dark:text-gray-400">Abbottabad, Pakistan</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-full text-indigo-600 dark:text-indigo-300">
                      <FiMail size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-white mb-1">Email</h4>
                      <p className="text-gray-600 dark:text-gray-400">muhammadrashi60776@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-full text-indigo-600 dark:text-indigo-300">
                      <FiPhone size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-white mb-1">Phone</h4>
                      <p className="text-gray-600 dark:text-gray-400">+92 333 355 1378</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;