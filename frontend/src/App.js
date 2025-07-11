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
  MousePointer,
  Menu,
  X,
  Home,
  User,
  Briefcase,
  Trophy,
  MessageCircle
} from 'lucide-react';
import './App.css';

// Navigation Component
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  useEffect(() => {
    const updateScrolled = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };
    
    window.addEventListener('scroll', updateScrolled);
    updateScrolled();
    
    return () => window.removeEventListener('scroll', updateScrolled);
  }, []);

  const navItems = [
    { name: 'Home', icon: <Home size={18} />, href: '#home' },
    { name: 'About', icon: <User size={18} />, href: '#about' },
    { name: 'Projects', icon: <Briefcase size={18} />, href: '#projects' },
    { name: 'Achievements', icon: <Trophy size={18} />, href: '#achievements' },
    { name: 'Contact', icon: <MessageCircle size={18} />, href: '#contact' }
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-black/80 backdrop-blur-md border-b border-white/10' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16">

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(item.href)}
                className="group relative flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-200"
              >
                <span className="text-blue-400 group-hover:text-blue-300 transition-colors">
                  {item.icon}
                </span>
                <span className="font-medium">{item.name}</span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></div>
              </motion.button>
            ))}
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isOpen ? 1 : 0, 
          height: isOpen ? 'auto' : 0 
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden bg-black/90 backdrop-blur-md border-t border-white/10"
      >
        <div className="px-4 py-4 space-y-3">
          {navItems.map((item, index) => (
            <motion.button
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToSection(item.href)}
              className="flex items-center space-x-3 text-white/80 hover:text-white hover:bg-white/10 p-3 rounded-lg transition-all duration-200 w-full"
            >
              <span className="text-blue-400">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
};

// 3D Floating Mathematical Elements
const FloatingMathElement = ({ position, color, symbol, rotation = [0, 0, 0] }) => {
  const textRef = useRef();
  
  useEffect(() => {
    const animateElement = () => {
      if (textRef.current) {
        textRef.current.rotation.x += 0.005;
        textRef.current.rotation.y += 0.008;
        textRef.current.position.y += Math.sin(Date.now() * 0.001 + position[0]) * 0.03;
      }
    };
    
    const interval = setInterval(animateElement, 16);
    return () => clearInterval(interval);
  }, [position]);

  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.5}>
      <Text3D
        ref={textRef}
        font="https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"
        position={position}
        rotation={rotation}
        size={1.2}
        height={0.2}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
      >
        {symbol}
        <meshStandardMaterial 
          color={color}
          metalness={0.1}
          roughness={0.3}
          emissive={color}
          emissiveIntensity={0.1}
        />
      </Text3D>
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
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, -10, 5]} intensity={0.4} color="#4a90e2" />
      <directionalLight position={[0, 10, 5]} intensity={0.5} />
      
      <FloatingMathElement 
        position={[-4, 2, -1]} 
        color="#ff6b6b" 
        symbol="π" 
        rotation={[0.2, 0, 0.1]}
      />
      <FloatingMathElement 
        position={[4, -1, 1]} 
        color="#4ecdc4" 
        symbol="e" 
        rotation={[-0.1, 0.3, 0]}
      />
      <FloatingMathElement 
        position={[-1, 3, -2]} 
        color="#45b7d1" 
        symbol="i" 
        rotation={[0.1, -0.2, 0.3]}
      />
      
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
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
    <section id="home" className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
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
        className="relative z-20 flex items-center justify-center min-h-screen px-4 pt-16"
      >
        <div className="text-center text-white max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent"
          >
            Adish Uprety
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
              onClick={() => document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' })}
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
    <section id="about" ref={ref} className="py-20 px-4 bg-gray-900 relative overflow-hidden">
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
                alt="Adish Uprety"
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
              Welcome to my mathematical universe! I'm Adish Uprety, a passionate researcher dedicated to exploring the elegant patterns and infinite possibilities within mathematics. With over a decade of experience in mathematical research and 3D visualization, I bridge the gap between abstract mathematical concepts and stunning visual representations.
            </p>
            
            <p className="text-lg leading-relaxed text-gray-300">
              My work focuses on complex mathematical modeling, computational geometry, and creating immersive 3D visualizations that make mathematics accessible and beautiful. I believe that mathematics is not just about numbers—it's about discovering the hidden patterns that govern our universe.
            </p>
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
    <section id="projects" ref={ref} className="py-20 px-4 bg-gradient-to-br from-gray-900 to-black">
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
  const [ref, inView] = useInViewHook();
  const [hoveredCard, setHoveredCard] = useState(null);
  
  const achievements = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "Publications",
      count: 89,
      description: "Peer-reviewed research papers",
      details: {
        examples: [
          "Advanced Topology in 3D Space",
          "Mathematical Modeling of Complex Systems",
          "Geometric Algorithms for Visualization"
        ],
        journals: ["Nature Mathematics", "Journal of Computational Geometry", "Mathematical Quarterly"]
      }
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Citations",
      count: 1247,
      description: "Academic citations worldwide",
      details: {
        examples: [
          "Cited in MIT Advanced Mathematics",
          "Referenced in 15+ doctoral dissertations",
          "Featured in top mathematical journals"
        ],
        impact: "H-index: 23, i10-index: 45"
      }
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Books",
      count: 3,
      description: "Mathematical textbooks authored",
      details: {
        examples: [
          "Introduction to Complex Analysis",
          "3D Visualization in Mathematics",
          "Modern Geometric Theory"
        ],
        publishers: ["Academic Press", "MIT Press", "Springer"]
      }
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Conferences",
      count: 42,
      description: "International speaking engagements",
      details: {
        examples: [
          "International Congress of Mathematicians",
          "SIGGRAPH Mathematics & Visualization",
          "European Mathematical Society Conference"
        ],
        locations: ["USA", "Europe", "Asia", "Australia"]
      }
    }
  ];
  
  return (
    <section id="achievements" ref={ref} className="py-20 px-4 bg-gradient-to-br from-purple-900 to-gray-900">
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
              className={`relative text-center p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 cursor-pointer transition-all duration-500 group ${
                hoveredCard === index ? 'transform scale-110 bg-white/10 border-purple-400/50 shadow-2xl z-10' : 'hover:border-white/20'
              }`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Default Content */}
              <div className={`transition-all duration-500 ${hoveredCard === index ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
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
              </div>

              {/* Hover Details */}
              <div className={`absolute inset-0 p-4 transition-all duration-500 ${
                hoveredCard === index ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`}>
                <div className="text-purple-400 mb-3 flex justify-center">
                  {achievement.icon}
                </div>
                <div className="text-lg font-bold text-white mb-3">{achievement.title} Details</div>
                
                <div className="text-xs text-gray-300 space-y-2">
                  {achievement.details.examples.map((example, idx) => (
                    <div key={idx} className="flex items-center">
                      <div className="w-1 h-1 bg-purple-400 rounded-full mr-2"></div>
                      <span>{example}</span>
                    </div>
                  ))}
                  
                  {achievement.details.journals && (
                    <div className="mt-3 pt-2 border-t border-white/10">
                      <div className="text-purple-300 font-semibold text-xs">Featured in:</div>
                      {achievement.details.journals.map((journal, idx) => (
                        <div key={idx} className="text-xs text-gray-400">{journal}</div>
                      ))}
                    </div>
                  )}
                  
                  {achievement.details.impact && (
                    <div className="mt-2 text-xs text-purple-300 font-semibold">
                      {achievement.details.impact}
                    </div>
                  )}
                  
                  {achievement.details.publishers && (
                    <div className="mt-3 pt-2 border-t border-white/10">
                      <div className="text-purple-300 font-semibold text-xs">Publishers:</div>
                      {achievement.details.publishers.map((pub, idx) => (
                        <div key={idx} className="text-xs text-gray-400">{pub}</div>
                      ))}
                    </div>
                  )}
                  
                  {achievement.details.locations && (
                    <div className="mt-2 text-xs text-purple-300">
                      Locations: {achievement.details.locations.join(", ")}
                    </div>
                  )}
                </div>
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
  const [ref, inView] = useInViewHook();
  
  return (
    <section id="contact" ref={ref} className="py-20 px-4 bg-gradient-to-br from-gray-900 to-black">
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
        
        <div className="flex justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8 max-w-md"
          >
            <motion.div 
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:border-blue-400/50 hover:bg-white/10 transition-all duration-300 cursor-pointer group"
            >
              <div className="text-blue-400 group-hover:scale-110 transition-transform duration-300">
                <Mail size={24} />
              </div>
              <div>
                <div className="text-white font-semibold group-hover:text-blue-300 transition-colors">Email</div>
                <div className="text-gray-400 group-hover:text-gray-300 transition-colors">alex.chen@mathematics.edu</div>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:border-green-400/50 hover:bg-white/10 transition-all duration-300 cursor-pointer group"
            >
              <div className="text-green-400 group-hover:scale-110 transition-transform duration-300">
                <Phone size={24} />
              </div>
              <div>
                <div className="text-white font-semibold group-hover:text-green-300 transition-colors">Phone</div>
                <div className="text-gray-400 group-hover:text-gray-300 transition-colors">+1 (555) 123-4567</div>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:border-purple-400/50 hover:bg-white/10 transition-all duration-300 cursor-pointer group"
            >
              <div className="text-purple-400 group-hover:scale-110 transition-transform duration-300">
                <MapPin size={24} />
              </div>
              <div>
                <div className="text-white font-semibold group-hover:text-purple-300 transition-colors">Location</div>
                <div className="text-gray-400 group-hover:text-gray-300 transition-colors">MIT, Cambridge, MA</div>
              </div>
            </motion.div>
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
            Adish Uprety
          </div>
          <div className="text-gray-400 mb-6">
            Mathematical Researcher & 3D Visualization Expert
          </div>
          <div className="text-sm text-gray-500">
            © 2025 Adish Uprety. All rights reserved.
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
      <Navigation />
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