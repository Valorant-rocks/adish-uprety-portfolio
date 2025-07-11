import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text3D, Float, MeshDistortMaterial, Sphere, Box, Cylinder } from '@react-three/drei';
import { useInView as useInViewHook } from 'react-intersection-observer';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Award, 
  BookOpen, 
  Users, 
  Calendar,
  ExternalLink,
  Download,
  ChevronRight,
  MousePointer
} from 'lucide-react';
import './App.css';

// 3D Floating Mathematical Elements
const FloatingMathElement = ({ position, color, symbol, rotation = [0, 0, 0] }) => {
  const meshRef = useRef();
  
  useEffect(() => {
    const animateElement = () => {
      if (meshRef.current) {
        meshRef.current.rotation.x += 0.01;
        meshRef.current.rotation.y += 0.01;
        meshRef.current.position.y += Math.sin(Date.now() * 0.001) * 0.02;
      }
    };
    
    const interval = setInterval(animateElement, 16);
    return () => clearInterval(interval);
  }, []);

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position} rotation={rotation}>
        {symbol === 'π' && <Cylinder args={[0.8, 0.8, 0.2]} />}
        {symbol === 'e' && <Sphere args={[0.6]} />}
        {symbol === 'i' && <Box args={[0.8, 0.8, 0.8]} />}
        <MeshDistortMaterial 
          color={color} 
          attach="material" 
          distort={0.3} 
          speed={2} 
          roughness={0.1}
        />
      </mesh>
    </Float>
  );
};

// 3D Scene Component
const MathematicalScene = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 75 }}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      <FloatingMathElement 
        position={[-4, 2, 0]} 
        color="#ff6b6b" 
        symbol="π" 
        rotation={[0, 0, 0]}
      />
      <FloatingMathElement 
        position={[4, -2, 0]} 
        color="#4ecdc4" 
        symbol="e" 
        rotation={[0, 0, 0]}
      />
      <FloatingMathElement 
        position={[0, 3, -2]} 
        color="#45b7d1" 
        symbol="i" 
        rotation={[0, 0, 0]}
      />
      
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
};

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInViewHook();

  useEffect(() => {
    if (inView) {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [inView, end, duration]);

  return (
    <span ref={ref} className="inline-block">
      {count}{suffix}
    </span>
  );
};

// Typewriter Effect Component
const TypewriterEffect = ({ text, speed = 100 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return (
    <span className="typewriter">
      {displayText}
      <span className="cursor animate-pulse">|</span>
    </span>
  );
};

// Hero Section Component
const HeroSection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -500]);
  
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Mathematical Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="mathematical-background"></div>
      </div>
      
      {/* 3D Scene */}
      <div className="absolute inset-0 z-10">
        <MathematicalScene />
      </div>
      
      {/* Content */}
      <motion.div 
        style={{ y }}
        className="relative z-20 flex items-center justify-center min-h-screen px-4"
      >
        <div className="text-center text-white max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent"
          >
            Dr. Alex Chen
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-xl md:text-2xl mb-8 text-gray-300"
          >
            <TypewriterEffect text="Mathematical Researcher & 3D Visualization Expert" speed={80} />
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="text-lg md:text-xl mb-12 text-gray-400 max-w-2xl mx-auto"
          >
            Exploring the infinite beauty of mathematics through cutting-edge research and stunning 3D visualizations
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-semibold text-lg overflow-hidden shadow-lg"
            >
              <span className="relative z-10 flex items-center">
                Explore My Work
                <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-white/30 rounded-full text-white font-semibold text-lg hover:bg-white/10 transition-colors backdrop-blur-sm"
            >
              <span className="flex items-center">
                <Download className="mr-2" size={20} />
                Download CV
              </span>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="flex flex-col items-center text-white/60">
          <MousePointer size={24} className="mb-2 animate-bounce" />
          <span className="text-sm">Scroll to explore</span>
        </div>
      </motion.div>
    </section>
  );
};

// About Section Component
const AboutSection = () => {
  const [ref, inView] = useInViewHook();
  
  return (
    <section ref={ref} className="py-20 px-4 bg-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 gap-4 h-full">
          {Array.from({ length: 144 }, (_, i) => (
            <div key={i} className="border border-white/20"></div>
          ))}
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <img 
                src="https://images.unsplash.com/photo-1511629091441-ee46146481b6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwyfHxtYXRoZW1hdGljaWFuJTIwaGVhZHNob3R8ZW58MHx8fHwxNzUyMjEyNzQ3fDA&ixlib=rb-4.1.0&q=85"
                alt="Dr. Alex Chen"
                className="relative rounded-lg shadow-2xl w-full max-w-md mx-auto transform group-hover:scale-105 transition duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white space-y-6"
          >
            <p className="text-lg leading-relaxed text-gray-300">
              Welcome to my mathematical universe! I'm Dr. Alex Chen, a passionate researcher dedicated to exploring the elegant patterns and infinite possibilities within mathematics. With over a decade of experience in mathematical research and 3D visualization, I bridge the gap between abstract mathematical concepts and stunning visual representations.
            </p>
            
            <p className="text-lg leading-relaxed text-gray-300">
              My work focuses on complex mathematical modeling, computational geometry, and creating immersive 3D visualizations that make mathematics accessible and beautiful. I believe that mathematics is not just about numbers—it's about discovering the hidden patterns that govern our universe.
            </p>
            
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="text-center p-4 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10">
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  <AnimatedCounter end={15} suffix="+" />
                </div>
                <div className="text-sm text-gray-400">Years Experience</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  <AnimatedCounter end={89} suffix="+" />
                </div>
                <div className="text-sm text-gray-400">Published Papers</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Projects Section Component
const ProjectsSection = () => {
  const [ref, inView] = useInViewHook();
  
  const projects = [
    {
      id: 1,
      title: "Complex Number Visualization",
      description: "Interactive 3D visualization of complex number operations and transformations",
      image: "https://images.unsplash.com/photo-1743183988574-e8b4d2e5830a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxtYXRoZW1hdGljYWwlMjByZXNlYXJjaHxlbnwwfHx8fDE3NTIyMTI3NTJ8MA&ixlib=rb-4.1.0&q=85",
      tags: ["3D Visualization", "Complex Analysis", "Interactive"],
      link: "#"
    },
    {
      id: 2,
      title: "Fractal Geometry Explorer",
      description: "Real-time fractal generation and exploration with mathematical precision",
      image: "https://images.unsplash.com/photo-1750776418412-1548a2b3f4b9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwyfHxtYXRoZW1hdGljYWwlMjByZXNlYXJjaHxlbnwwfHx8fDE3NTIyMTI3NTJ8MA&ixlib=rb-4.1.0&q=85",
      tags: ["Fractals", "Computational Geometry", "Research"],
      link: "#"
    },
    {
      id: 3,
      title: "Topology Visualization Suite",
      description: "Advanced tools for visualizing topological spaces and transformations",
      image: "https://images.pexels.com/photos/6958530/pexels-photo-6958530.jpeg",
      tags: ["Topology", "Mathematical Modeling", "Visualization"],
      link: "#"
    }
  ];
  
  return (
    <section ref={ref} className="py-20 px-4 bg-gradient-to-br from-gray-900 to-black">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Featured <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto rounded-full"></div>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group relative bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ExternalLink className="text-white" size={24} />
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Achievements Section Component
const AchievementsSection = () => {
  const [ref, inView] = useIntersection();
  
  const achievements = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "Publications",
      count: 89,
      description: "Peer-reviewed research papers"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Citations",
      count: 1247,
      description: "Academic citations worldwide"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Books",
      count: 3,
      description: "Mathematical textbooks authored"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Conferences",
      count: 42,
      description: "International speaking engagements"
    }
  ];
  
  return (
    <section ref={ref} className="py-20 px-4 bg-gradient-to-br from-purple-900 to-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            My <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Achievements</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 group"
            >
              <div className="text-purple-400 mb-4 flex justify-center group-hover:scale-110 transition-transform">
                {achievement.icon}
              </div>
              <div className="text-4xl font-bold text-white mb-2">
                <AnimatedCounter end={achievement.count} suffix="+" />
              </div>
              <div className="text-xl font-semibold text-purple-300 mb-2">
                {achievement.title}
              </div>
              <div className="text-gray-400 text-sm">
                {achievement.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section Component
const ContactSection = () => {
  const [ref, inView] = useIntersection();
  
  return (
    <section ref={ref} className="py-20 px-4 bg-gradient-to-br from-gray-900 to-black">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Get In <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-green-500 mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-6 text-lg">
            Ready to explore the mathematical universe together?
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
              <div className="text-blue-400">
                <Mail size={24} />
              </div>
              <div>
                <div className="text-white font-semibold">Email</div>
                <div className="text-gray-400">alex.chen@mathematics.edu</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
              <div className="text-green-400">
                <Phone size={24} />
              </div>
              <div>
                <div className="text-white font-semibold">Phone</div>
                <div className="text-gray-400">+1 (555) 123-4567</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
              <div className="text-purple-400">
                <MapPin size={24} />
              </div>
              <div>
                <div className="text-white font-semibold">Location</div>
                <div className="text-gray-400">MIT, Cambridge, MA</div>
              </div>
            </div>
            
            <div className="flex space-x-4 pt-4">
              <motion.a 
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white hover:from-blue-600 hover:to-blue-700 transition-all"
              >
                <Github size={24} />
              </motion.a>
              <motion.a 
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white hover:from-blue-600 hover:to-blue-700 transition-all"
              >
                <Linkedin size={24} />
              </motion.a>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10"
          >
            <form className="space-y-6">
              <div>
                <label className="block text-white text-sm font-semibold mb-2">Name</label>
                <input 
                  type="text"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label className="block text-white text-sm font-semibold mb-2">Email</label>
                <input 
                  type="email"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label className="block text-white text-sm font-semibold mb-2">Message</label>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all resize-none"
                  placeholder="Tell me about your mathematical interests..."
                />
              </div>
              
              <motion.button 
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <div className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Dr. Alex Chen
          </div>
          <div className="text-gray-400 mb-6">
            Mathematical Researcher & 3D Visualization Expert
          </div>
          <div className="text-sm text-gray-500">
            © 2025 Dr. Alex Chen. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
function App() {
  return (
    <div className="App">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <AchievementsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;