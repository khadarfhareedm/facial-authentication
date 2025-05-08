import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const parallaxRef = useRef(null);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const parallaxEffect = (e) => {
    const speed = 5;
    const x = (window.innerWidth - e.pageX * speed) / 100;
    const y = (window.innerHeight - e.pageY * speed) / 100;
    parallaxRef.current.style.transform = `translateX(${x}px) translateY(${y}px)`;
  };

  const featureVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white overflow-y-auto">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute inset-0 bg-noise-pattern opacity-5"></div>
      
      <header className="fixed w-full bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg z-10">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* VisageAuth */}
            
            
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
            >
              VisageAuth
            </motion.span>
          

            {/* Done by Insight Engineers */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
            >
              Done by Insight Engineers
            </motion.span>

            {/* Login Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to={"/user-select"} className="relative overflow-hidden group bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-full transition duration-300">
                <span className="relative z-10">Login</span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
            </motion.div>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 pt-32">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center justify-between py-20 min-h-screen">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:w-1/2 mb-10 md:mb-0"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">Next-Gen</span> Biometric Authentication
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Secure your digital presence with cutting-edge facial and voice recognition technology.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to={"/user-select"} className="relative overflow-hidden group bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:shadow-lg">
                <span className="relative z-10">Get Started</span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="md:w-1/2 relative"
          >
            <div
              ref={parallaxRef}
              onMouseMove={parallaxEffect}
              className="w-full h-64 md:h-96 bg-blue-900 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300"
              style={{
                transform: `perspective(1000px) rotateY(${(mousePosition.x - window.innerWidth / 2) / 50}deg) rotateX(${-(mousePosition.y - window.innerHeight / 2) / 50}deg)`,
              }}
            >
              <div
                className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-600 opacity-75"
                style={{
                  transform: `translateY(${scrollY * 0.2}px)`,
                  transition: "transform 0.2s ease-out",
                }}
              />
              <img
                src="https://roc.ai/wp-content/uploads/2018/11/howfrworks-1080x675.png"
                alt="Biometric Authentication"
                className="w-full h-full object-cover mix-blend-overlay transition-transform duration-300 transform hover:scale-110"
              />
            </div>
          </motion.div>
        </section>

        {/* Key Features Section */}
        <motion.section
          ref={ref}
          initial="hidden"
          animate={controls}
          className="pt-0 pb-20 min-h-screen flex flex-col justify-center"
        >
          <motion.h2
            variants={featureVariants}
            className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
          >
            Key Features
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["Facial Recognition", "Voice Authentication", "Multi-Factor Security"].map((feature, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={featureVariants}
                className="bg-gray-800 bg-opacity-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:bg-gray-700 group"
              >
                <h3 className="text-2xl font-semibold mb-4 group-hover:text-blue-400 transition-colors duration-300">{feature}</h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  One of our project features which allows our multi-authentication possible
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Why Choose Our Face Recognition Solution? Section */}
        <section className="py-20 min-h-screen flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            Why Choose Our Face Recognition Solution?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "High Accuracy",
                description: "Achieve 99%+ accuracy with our advanced AI-driven algorithms for real-time identification.",
              },
              {
                title: "Fast Processing",
                description: "Instant verification under 1 second, ensuring seamless access control.",
              },
              {
                title: "Secure and Private",
                description: "Compliant with international data privacy standards to keep your information safe.",
              },
              {
                title: "Versatile Integration",
                description: "Easily integrate into your existing security system without hassle.",
              },
              {
                title: "Enhanced Scalability",
                description: "Scalable to fit any system size. Maintain top performance as your security needs expand.",
              },
              {
                title: "Robust AI Training",
                description: "Trained on diverse datasets for consistent accuracy, feasible performance across different lighting and angles.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="bg-gray-800 bg-opacity-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:bg-gray-700 group"
              >
                <h3 className="text-2xl font-semibold mb-4 group-hover:text-blue-400 transition-colors duration-300">{feature.title}</h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 min-h-screen flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "Capture Image",
                description: "The system captures a high-quality image of the user's face.",
              },
              {
                step: "Analyze Features",
                description: "Advanced AI algorithms analyze facial features for identification.",
              },
              {
                step: "Match Data",
                description: "The system matches the analyzed data with stored records.",
              },
              {
                step: "Authenticate Access",
                description: "Access is granted or denied based on the match result.",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="bg-gray-800 bg-opacity-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:bg-gray-700 group"
              >
                <h3 className="text-2xl font-semibold mb-4 group-hover:text-blue-400 transition-colors duration-300">{step.step}</h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Us Section */}
<section className="py-20 min-h-screen flex flex-col justify-center">
  <h2 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
    Contact Us
  </h2>
  <div className="max-w-4xl mx-auto bg-gray-800 bg-opacity-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:bg-gray-700 group">
    <form className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-lg font-medium text-gray-300">First Name</label>
          <input
            type="text"
            id="firstName"
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter First Name"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-lg font-medium text-gray-300">Last Name</label>
          <input
            type="text"
            id="lastName"
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Last Name"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block text-lg font-medium text-gray-300">Email</label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Email"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-lg font-medium text-gray-300">Phone</label>
          <input
            type="tel"
            id="phone"
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Phone Number"
          />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="block text-lg font-medium text-gray-300">Message</label>
        <textarea
          id="message"
          rows="4"
          className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Your Message..."
        />
      </div>
      <div className="text-center">
        <button
          type="submit"
          className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:shadow-lg hover:scale-105"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</section>
      </main>

      <style jsx>{`
        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        .bg-noise-pattern {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
        h1, h2 {
          background-size: 200% 200%;
          animation: gradientFlow 5s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;