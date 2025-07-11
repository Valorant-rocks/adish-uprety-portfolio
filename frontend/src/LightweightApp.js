import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { useInView as useInViewHook } from 'react-intersection-observer';
import { 
  Mail, Phone, MapPin, Github, Linkedin, Youtube, Facebook,
  Award, BookOpen, Users, Calendar, ExternalLink, Download,
  ChevronRight, MousePointer, Menu, X, Home, User,
  Briefcase, Trophy, MessageCircle, Sun, Moon, Settings
} from 'lucide-react';
import './App.css';

// Performance Settings
const PERFORMANCE_CONFIG = {
  enableParticles: false,        // Disabled for performance
  enable3D: false,              // Minimal 3D only in hero
  enableParallax: false,        // Disabled parallax scrolling
  maxParticles: 0,              // No background particles
  animationSpeed: 0.7,          // Slower, smoother animations
  reduceMotion: true            // Simplified animations
};

// Lightweight particle system (CSS only, no JS animations)
const StaticMathBackground = () => {
  const symbols = ['∫', '∑', '∞', '∂', 'π', 'α', 'β', 'γ'];
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-5">
      {symbols.map((symbol, index) => (
        <div
          key={index}
          className="absolute text-white/20 text-4xl font-bold select-none"
          style={{
            left: `${(index * 12.5) % 100}%`,
            top: `${(index * 17) % 100}%`,
            transform: `rotate(${index * 30}deg)`
          }}
        >
          {symbol}
        </div>
      ))}
    </div>
  );
};

// Minimal 3D Scene (only for hero section, very simple)
const Minimal3DScene = () => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Canvas 
      className="absolute inset-0 pointer-events-none"
      camera={{ position: [0, 0, 5] }}
      style={{ opacity: 0.3 }}
    >
      <ambientLight intensity={0.5} />
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={meshRef}>
          <torusGeometry args={[1, 0.3, 8, 16]} />
          <meshStandardMaterial color="#60a5fa" transparent opacity={0.7} />
        </mesh>
      </Float>
    </Canvas>
  );
};

// Performance-optimized navigation
const LightweightNavigation = ({ isDark, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', updateScrolled, { passive: true });
    return () => window.removeEventListener('scroll', updateScrolled);
  }, []);

  const navItems = [
    { name: 'Home', icon: <Home size={16} />, href: '#home' },
    { name: 'About', icon: <User size={16} />, href: '#about' },
    { name: 'Projects', icon: <Briefcase size={16} />, href: '#projects' },
    { name: 'Achievements', icon: <Trophy size={16} />, href: '#achievements' },
    { name: 'Contact', icon: <MessageCircle size={16} />, href: '#contact' }
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-black/90 backdrop-blur-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-center h-16">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-white/10"
              >
                <span className="text-blue-400">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </button>
            ))}
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              {isDark ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-blue-300" />}
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-sm">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="flex items-center space-x-3 text-white/80 hover:text-white hover:bg-white/10 p-3 rounded-lg transition-all duration-200 w-full"
              >
                <span className="text-blue-400">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

// Simple counter without complex animations
const SimpleCounter = ({ end, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInViewHook({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => setCount(end), 100);
      return () => clearTimeout(timer);
    }
  }, [inView, end]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// Lightweight typewriter effect
const SimpleTypewriter = ({ text }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayText(text);
    }, 500);
    return () => clearTimeout(timer);
  }, [text]);

  return <span>{displayText}</span>;
};

// Hero section without parallax or complex 3D
const LightweightHero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 overflow-hidden">
      {/* Simple background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20"></div>
      </div>
      
      {/* Minimal 3D scene only in hero */}
      {PERFORMANCE_CONFIG.enable3D && (
        <div className="absolute inset-0">
          <Minimal3DScene />
        </div>
      )}
      
      {/* Content */}
      <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-4 pt-16">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent"
        >
          Adish Uprety
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xl md:text-2xl mb-8 text-gray-300"
        >
          <SimpleTypewriter text="Mathematical Researcher & 3D Visualization Expert" />
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl mb-12 text-gray-400 max-w-2xl mx-auto leading-relaxed"
        >
          Exploring the infinite beauty of mathematics through cutting-edge research and stunning visualizations
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button 
            onClick={() => document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center"
          >
            Explore My Work
            <ChevronRight className="ml-2" size={20} />
          </button>
          
          <button className="px-8 py-4 border-2 border-white/30 rounded-full text-white font-semibold text-lg hover:bg-white/10 transition-all duration-300 flex items-center">
            <Download className="mr-2" size={20} />
            Download CV
          </button>
        </motion.div>
      </div>
      
      {/* Simple scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
        <MousePointer size={24} />
      </div>
    </section>
  );
};

// About section without parallax
const LightweightAbout = () => {
  const [ref, inView] = useInViewHook({ triggerOnce: true, threshold: 0.2 });
  
  return (
    <section id="about" ref={ref} className="py-20 px-4 bg-gray-900 relative">
      <StaticMathBackground />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
              <img 
                src="https://images.unsplash.com/photo-1511629091441-ee46146481b6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwyfHxtYXRoZW1hdGljaWFuJTIwaGVhZHNob3R8ZW58MHx8fHwxNzUyMjEyNzQ3fDA&ixlib=rb-4.1.0&q=85"
                alt="Adish Uprety"
                className="relative rounded-lg shadow-xl w-full max-w-md mx-auto"
                loading="lazy"
              />
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-white space-y-6"
          >
            <p className="text-lg leading-relaxed text-gray-300">
              Welcome to my mathematical universe! I'm Adish Uprety, a passionate researcher dedicated to exploring the elegant patterns and infinite possibilities within mathematics. With over a decade of experience in mathematical research and visualization, I bridge the gap between abstract concepts and practical applications.
            </p>
            
            <p className="text-lg leading-relaxed text-gray-300">
              My work focuses on complex mathematical modeling, computational geometry, and creating accessible visualizations that make mathematics beautiful and understandable. I believe mathematics is the universal language of discovery.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Mathematical quotes without complex animations
const LightweightQuotes = () => {
  const [ref, inView] = useInViewHook({ triggerOnce: true, threshold: 0.2 });
  
  const quote = {
    text: "Mathematics is the language with which God has written the universe.",
    author: "Galileo Galilei"
  };

  return (
    <section ref={ref} className="py-16 px-4 bg-gradient-to-br from-indigo-900 to-purple-900">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
        >
          <blockquote className="text-white text-xl md:text-2xl italic mb-6 leading-relaxed">
            "{quote.text}"
          </blockquote>
          <cite className="text-cyan-300 text-lg font-semibold">
            — {quote.author}
          </cite>
        </motion.div>
      </div>
    </section>
  );
};

// Projects section without individual 3D elements
const LightweightProjects = () => {
  const [ref, inView] = useInViewHook({ triggerOnce: true, threshold: 0.1 });
  
  const projects = [
    {
      id: 1,
      title: "Complex Number Visualization",
      description: "Interactive 3D visualization of complex number operations and transformations",
      image: "https://images.unsplash.com/photo-1743183988574-e8b4d2e5830a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxtYXRoZW1hdGljYWwlMjByZXNlYXJjaHxlbnwwfHx8fDE3NTIyMTI3NTJ8MA&ixlib=rb-4.1.0&q=85",
      tags: ["3D Visualization", "Complex Analysis", "Interactive"]
    },
    {
      id: 2,
      title: "Fractal Geometry Explorer",
      description: "Real-time fractal generation and exploration with mathematical precision",
      image: "https://images.unsplash.com/photo-1750776418412-1548a2b3f4b9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwyfHxtYXRoZW1hdGljYWwlMjByZXNlYXJjaHxlbnwwfHx8fDE3NTIyMTI3NTJ8MA&ixlib=rb-4.1.0&q=85",
      tags: ["Fractals", "Computational Geometry", "Research"]
    },
    {
      id: 3,
      title: "Topology Visualization Suite",
      description: "Advanced tools for visualizing topological spaces and transformations",
      image: "https://images.pexels.com/photos/6958530/pexels-photo-6958530.jpeg",
      tags: ["Topology", "Mathematical Modeling", "Visualization"]
    }
  ];
  
  return (
    <section id="projects" ref={ref} className="py-20 px-4 bg-gradient-to-br from-gray-900 to-black">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Featured <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto rounded-full"></div>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 group"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ExternalLink className="text-white" size={20} />
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
                      className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Achievements section simplified
const LightweightAchievements = () => {
  const [ref, inView] = useInViewHook({ triggerOnce: true, threshold: 0.2 });
  
  const achievements = [
    { icon: <Award className="w-6 h-6" />, title: "Publications", count: 89, description: "Peer-reviewed research papers" },
    { icon: <Users className="w-6 h-6" />, title: "Citations", count: 1247, description: "Academic citations worldwide" },
    { icon: <BookOpen className="w-6 h-6" />, title: "Books", count: 3, description: "Mathematical textbooks authored" },
    { icon: <Calendar className="w-6 h-6" />, title: "Conferences", count: 42, description: "International speaking engagements" }
  ];
  
  return (
    <section id="achievements" ref={ref} className="py-20 px-4 bg-gradient-to-br from-purple-900 to-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            My <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Achievements</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-purple-400/50 transition-all duration-300"
            >
              <div className="text-purple-400 mb-4 flex justify-center">
                {achievement.icon}
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                <SimpleCounter end={achievement.count} suffix="+" />
              </div>
              <div className="text-lg font-semibold text-purple-300 mb-2">
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

// Contact section simplified
const LightweightContact = () => {
  const [ref, inView] = useInViewHook({ triggerOnce: true, threshold: 0.2 });
  
  return (
    <section id="contact" ref={ref} className="py-20 px-4 bg-gradient-to-br from-gray-900 to-black">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Get In <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-green-500 mx-auto rounded-full"></div>
        </motion.div>
        
        <div className="flex justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 max-w-md"
          >
            {[
              { icon: <Mail size={20} />, label: "Email", value: "alex.chen@mathematics.edu", color: "blue" },
              { icon: <Phone size={20} />, label: "Phone", value: "+1 (555) 123-4567", color: "green" },
              { icon: <MapPin size={20} />, label: "Location", value: "MIT, Cambridge, MA", color: "purple" }
            ].map((contact, index) => (
              <div key={index} className={`flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:border-${contact.color}-400/50 transition-all duration-300`}>
                <div className={`text-${contact.color}-400`}>
                  {contact.icon}
                </div>
                <div>
                  <div className={`text-white font-semibold hover:text-${contact.color}-300 transition-colors`}>{contact.label}</div>
                  <div className="text-gray-400">{contact.value}</div>
                </div>
              </div>
            ))}
            
            {/* Social Media */}
            <div className="pt-6 border-t border-white/10">
              <h3 className="text-center text-white font-semibold mb-4">Connect With Me</h3>
              <div className="flex justify-center space-x-4">
                {[
                  { icon: <Github size={20} />, href: "https://github.com/Valorant-rocks", color: "gray" },
                  { icon: <Youtube size={20} />, href: "https://youtube.com/@adishuprety", color: "red" },
                  { icon: <Linkedin size={20} />, href: "https://linkedin.com/in/adishuprety", color: "blue" },
                  { icon: <Facebook size={20} />, href: "https://facebook.com/adishuprety", color: "blue" }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 bg-white/5 rounded-full border border-white/10 hover:border-${social.color}-400/50 hover:bg-white/10 transition-all duration-300`}
                  >
                    <span className={`text-gray-400 hover:text-${social.color}-400 transition-colors`}>
                      {social.icon}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Footer
const LightweightFooter = () => {
  return (
    <footer className="bg-black text-white py-12 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <div className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Adish Uprety
        </div>
        <div className="text-gray-400 mb-6">
          Mathematical Researcher & 3D Visualization Expert
        </div>
        <div className="text-sm text-gray-500">
          © 2025 Adish Uprety. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

// Main lightweight app
function LightweightApp() {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => setIsDark(!isDark);

  useEffect(() => {
    document.body.className = isDark ? 'dark' : 'light';
  }, [isDark]);

  return (
    <div className={`App ${isDark ? 'dark' : 'light'}`}>
      <LightweightNavigation isDark={isDark} toggleTheme={toggleTheme} />
      <LightweightHero />
      <LightweightAbout />
      <LightweightQuotes />
      <LightweightProjects />
      <LightweightAchievements />
      <LightweightContact />
      <LightweightFooter />
    </div>
  );
}

export default LightweightApp;