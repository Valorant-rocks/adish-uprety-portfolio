import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text3D, Float, MeshDistortMaterial, Sphere, Box, Cylinder } from '@react-three/drei';
import { useInView as useInViewHook } from 'react-intersection-observer';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Youtube,
  Facebook,
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
  MessageCircle,
  Sun,
  Moon
} from 'lucide-react';
import './App.css';

// Particle System Component
const ParticleSystem = ({ isDark }) => {
  const particles = [
    '∫', '∑', '∏', '∆', '∇', '∂', '∞', '≈', '≡', '±', '∀', '∃', '∈', '⊂', '⊆', '∪', '∩',
    'α', 'β', 'γ', 'δ', 'ε', 'θ', 'λ', 'μ', 'π', 'σ', 'φ', 'ψ', 'ω', '√', '∛', '∜'
  ];

  const [particleElements, setParticleElements] = useState([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 25 }, (_, i) => ({
        id: i,
        symbol: particles[Math.floor(Math.random() * particles.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 0.8 + 0.4,
        opacity: Math.random() * 0.3 + 0.1,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 5
      }));
      setParticleElements(newParticles);
    };

    generateParticles();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particleElements.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{
            x: `${particle.x}vw`,
            y: `${particle.y}vh`,
            opacity: 0,
            scale: 0
          }}
          animate={{
            x: `${particle.x + (Math.random() - 0.5) * 30}vw`,
            y: `${particle.y - 20}vh`,
            opacity: particle.opacity,
            scale: particle.size,
            rotate: [0, 360]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear"
          }}
          className={`absolute font-bold select-none ${
            isDark ? 'text-white/10' : 'text-gray-800/15'
          }`}
          style={{
            fontSize: `${particle.size * 2}rem`,
            fontFamily: 'serif'
          }}
        >
          {particle.symbol}
        </motion.div>
      ))}
    </div>
  );
};

// Navigation Component
const Navigation = ({ isDark, toggleTheme }) => {
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
            
            {/* Theme Toggle */}
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              {isDark ? (
                <Sun size={20} className="text-yellow-400" />
              ) : (
                <Moon size={20} className="text-blue-300" />
              )}
            </motion.button>
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

// Mini 3D Scene Component for individual sections
const Mini3DScene = ({ symbols, size = 100, count = 3, speed = 0.5 }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.3} />
        {Array.from({ length: count }).map((_, index) => (
          <Float3DMathSymbol
            key={index}
            symbol={symbols[index % symbols.length]}
            position={[
              (Math.random() - 0.5) * 8,
              (Math.random() - 0.5) * 6,
              (Math.random() - 0.5) * 4
            ]}
            size={size}
            speed={speed}
          />
        ))}
      </Canvas>
    </div>
  );
};

// Floating 3D Math Symbol for mini scenes
const Float3DMathSymbol = ({ symbol, position, size, speed }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01 * speed;
      meshRef.current.rotation.y += 0.01 * speed;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5;
    }
  });

  // Different shapes based on symbol type
  const getGeometry = (symbol) => {
    switch (symbol) {
      case '○':
      case '◯':
      case '◉':
        return <sphereGeometry args={[size/120, 16, 16]} />;
      case '△':
        return <coneGeometry args={[size/120, size/80, 8]} />;
      case '□':
      case '◇':
      case '◆':
        return <boxGeometry args={[size/100, size/100, size/120]} />;
      case '★':
      case '✦':
        return <dodecahedronGeometry args={[size/120]} />;
      case '⬟':
        return <cylinderGeometry args={[size/120, size/120, size/80, 6]} />;
      default:
        return <boxGeometry args={[size/100, size/100, size/120]} />;
    }
  };

  const getColor = (symbol) => {
    const colors = {
      '∫': '#60a5fa', '∑': '#a78bfa', '∞': '#34d399', '∂': '#fbbf24',
      'α': '#f472b6', 'β': '#06b6d4', 'γ': '#84cc16', 'θ': '#ef4444', 'λ': '#8b5cf6',
      '○': '#3b82f6', '△': '#10b981', '□': '#f59e0b', '◇': '#ec4899', '★': '#8b5cf6',
      '@': '#06b6d4', '☎': '#10b981', '📍': '#ef4444', '✉': '#3b82f6', '🌐': '#8b5cf6'
    };
    return colors[symbol] || '#60a5fa';
  };

  return (
    <mesh ref={meshRef} position={position}>
      {getGeometry(symbol)}
      <meshStandardMaterial 
        color={getColor(symbol)} 
        transparent 
        opacity={0.6}
        metalness={0.3}
        roughness={0.4}
      />
    </mesh>
  );
};

// Mathematical Quotes Component
const MathematicalQuotes = () => {
  const [ref, inView] = useInViewHook();
  
  const mathematicalQuotes = [
    {
      quote: "Mathematics is the language with which God has written the universe.",
      author: "Galileo Galilei"
    },
    {
      quote: "Pure mathematics is, in its way, the poetry of logical ideas.",
      author: "Albert Einstein"
    },
    {
      quote: "Mathematics knows no races or geographic boundaries; for mathematics, the cultural world is one country.",
      author: "David Hilbert"
    },
    {
      quote: "In mathematics, the art of proposing a question must be held of higher value than solving it.",
      author: "Georg Cantor"
    },
    {
      quote: "Mathematics is not about numbers, equations, computations, or algorithms: it is about understanding.",
      author: "William Paul Thurston"
    },
    {
      quote: "The essence of mathematics lies in its freedom.",
      author: "Georg Cantor"
    }
  ];

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % mathematicalQuotes.length);
    }, 4000); // Change quote every 4 seconds

    return () => clearInterval(interval);
  }, [mathematicalQuotes.length]);

  return (
    <section ref={ref} className="relative py-16 px-4 bg-gradient-to-br from-indigo-900 to-purple-900 overflow-hidden">
      {/* 3D Background Elements */}
      <Mini3DScene 
        symbols={['∫', '∑', '∞', '∂']} 
        size={80} 
        count={4} 
        speed={0.3} 
      />
      
      <div className="relative max-w-4xl mx-auto z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Mathematical <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Wisdom</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full"></div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-3xl mx-auto"
        >
          <motion.div
            key={currentQuoteIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="text-center bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl"
          >
            <blockquote className="text-white text-lg md:text-xl italic mb-6 leading-relaxed">
              "{mathematicalQuotes[currentQuoteIndex].quote}"
            </blockquote>
            <cite className="text-cyan-300 text-base md:text-lg font-semibold">
              — {mathematicalQuotes[currentQuoteIndex].author}
            </cite>
          </motion.div>
          
          {/* Quote Navigation Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {mathematicalQuotes.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuoteIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentQuoteIndex
                    ? 'bg-cyan-400 scale-125'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// About Section Component
const AboutSection = () => {
  const [ref, inView] = useInViewHook();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 2000], [0, -200]);
  
  return (
    <section id="about" ref={ref} className="py-20 px-4 bg-gray-900 relative overflow-hidden">
      {/* 3D Background Elements */}
      <Mini3DScene 
        symbols={['α', 'β', 'γ', 'θ', 'λ']} 
        size={60} 
        count={5} 
        speed={0.4} 
      />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 gap-4 h-full">
          {Array.from({ length: 144 }, (_, i) => (
            <div key={i} className="border border-white/20"></div>
          ))}
        </div>
      </div>
      
      <motion.div style={{ y }} className="max-w-6xl mx-auto relative z-10">
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
      </motion.div>
    </section>
  );
};

// Projects Section Component
const ProjectsSection = () => {
  const [ref, inView] = useInViewHook();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [500, 2500], [100, -300]);
  
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
      <section id="projects" ref={ref} className="relative pt-32 pb-20 px-4 bg-gradient-to-br from-gray-900 to-black overflow-hidden">
        {/* 3D Background Elements */}
        <Mini3DScene 
          symbols={['◇', '○', '△', '□', '◯']} 
          size={70} 
          count={6} 
          speed={0.5} 
        />
        
        <motion.div style={{ y }} className="relative max-w-6xl mx-auto z-10">
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
              {/* Mini 3D element for each project */}
              <div className="absolute top-2 right-2 w-12 h-12 pointer-events-none opacity-30 group-hover:opacity-60 transition-opacity">
                <Canvas camera={{ position: [0, 0, 3] }}>
                  <ambientLight intensity={0.5} />
                  <mesh rotation={[0.1, 0.1, 0]}>
                    {index === 0 && <torusGeometry args={[0.3, 0.1, 8, 16]} />}
                    {index === 1 && <octahedronGeometry args={[0.3]} />}
                    {index === 2 && <icosahedronGeometry args={[0.3]} />}
                    <meshStandardMaterial 
                      color={index === 0 ? "#06b6d4" : index === 1 ? "#10b981" : "#8b5cf6"} 
                      transparent 
                      opacity={0.8}
                    />
                  </mesh>
                </Canvas>
              </div>
              
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
      </motion.div>
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
    <section id="achievements" ref={ref} className="relative py-20 px-4 bg-gradient-to-br from-purple-900 to-gray-900 overflow-hidden">
      {/* 3D Background Elements */}
      <Mini3DScene 
        symbols={['★', '◆', '✦', '⬟', '◉']} 
        size={90} 
        count={4} 
        speed={0.6} 
      />
      
      <div className="relative max-w-6xl mx-auto z-10">
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
              className={`relative text-center p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 cursor-pointer transition-all duration-500 group hover:scale-110 min-h-[280px] ${
                hoveredCard === index ? 'bg-white/10 border-purple-400/50 shadow-2xl z-10' : 'hover:border-white/20'
              }`}
              style={{
                transform: hoveredCard === index ? 'scale(1.15)' : 'scale(1)',
                zIndex: hoveredCard === index ? 10 : 1
              }}
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
              <div className={`absolute inset-0 p-3 transition-all duration-500 overflow-hidden ${
                hoveredCard === index ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`}>
                <div className="h-full flex flex-col">
                  <div className="text-purple-400 mb-2 flex justify-center">
                    {achievement.icon}
                  </div>
                  <div className="text-sm font-bold text-white mb-2 text-center">{achievement.title}</div>
                  
                  <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-400/30 scrollbar-track-transparent pr-1">
                    <div className="text-xs text-gray-300 space-y-1.5">
                      {achievement.details.examples.slice(0, 2).map((example, idx) => (
                        <div key={idx} className="flex items-start">
                          <div className="w-1 h-1 bg-purple-400 rounded-full mr-2 mt-1.5 flex-shrink-0"></div>
                          <span className="leading-tight">{example}</span>
                        </div>
                      ))}
                      
                      {achievement.details.journals && (
                        <div className="mt-2 pt-1 border-t border-white/10">
                          <div className="text-purple-300 font-semibold text-xs mb-1">Featured in:</div>
                          <div className="text-xs text-gray-400 leading-tight">
                            {achievement.details.journals.slice(0, 2).join(", ")}
                            {achievement.details.journals.length > 2 && "..."}
                          </div>
                        </div>
                      )}
                      
                      {achievement.details.impact && (
                        <div className="mt-1 text-xs text-purple-300 font-semibold leading-tight">
                          {achievement.details.impact}
                        </div>
                      )}
                      
                      {achievement.details.publishers && (
                        <div className="mt-2 pt-1 border-t border-white/10">
                          <div className="text-purple-300 font-semibold text-xs mb-1">Publishers:</div>
                          <div className="text-xs text-gray-400 leading-tight">
                            {achievement.details.publishers.slice(0, 2).join(", ")}
                            {achievement.details.publishers.length > 2 && "..."}
                          </div>
                        </div>
                      )}
                      
                                             {achievement.details.locations && (
                         <div className="mt-1 text-xs text-purple-300 leading-tight">
                           {achievement.details.locations.slice(0, 3).join(", ")}
                           {achievement.details.locations.length > 3 && "..."}
                         </div>
                       )}
                       
                       {/* Scroll hint */}
                       <div className="mt-2 text-center">
                         <div className="text-purple-400/50 text-xs">••••</div>
                       </div>
                     </div>
                   </div>
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
    <section id="contact" ref={ref} className="relative py-20 px-4 bg-gradient-to-br from-gray-900 to-black overflow-hidden">
      {/* 3D Background Elements */}
      <Mini3DScene 
        symbols={['@', '☎', '📍', '✉', '🌐']} 
        size={50} 
        count={5} 
        speed={0.3} 
      />
      
      <div className="relative max-w-4xl mx-auto z-10">
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
            
            {/* Social Media Section */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-12 pt-8 border-t border-white/10"
            >
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-white mb-2">Connect With Me</h3>
                <p className="text-gray-400 text-sm">Follow my mathematical journey</p>
              </div>
              
              <div className="flex justify-center space-x-6">
                <motion.a
                  href="https://github.com/Valorant-rocks"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-4 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 hover:border-gray-400/50 hover:bg-white/10 transition-all duration-300 group"
                >
                  <Github size={24} className="text-gray-400 group-hover:text-white transition-colors" />
                </motion.a>
                
                <motion.a
                  href="https://youtube.com/@adishuprety"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-4 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 hover:border-red-400/50 hover:bg-white/10 transition-all duration-300 group"
                >
                  <Youtube size={24} className="text-gray-400 group-hover:text-red-400 transition-colors" />
                </motion.a>
                
                <motion.a
                  href="https://linkedin.com/in/adishuprety"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-4 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 hover:border-blue-400/50 hover:bg-white/10 transition-all duration-300 group"
                >
                  <Linkedin size={24} className="text-gray-400 group-hover:text-blue-400 transition-colors" />
                </motion.a>
                
                <motion.a
                  href="https://facebook.com/adishuprety"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-4 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 hover:border-blue-500/50 hover:bg-white/10 transition-all duration-300 group"
                >
                  <Facebook size={24} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
                </motion.a>
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
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  useEffect(() => {
    // Apply theme to body element
    if (isDark) {
      document.body.classList.remove('light');
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
      document.body.classList.add('light');
    }
  }, [isDark]);

  return (
    <div className={`App ${isDark ? 'dark' : 'light'}`}>
      <ParticleSystem isDark={isDark} />
      <Navigation isDark={isDark} toggleTheme={toggleTheme} />
      <HeroSection />
      <AboutSection />
      <MathematicalQuotes />
      <ProjectsSection />
      <AchievementsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;