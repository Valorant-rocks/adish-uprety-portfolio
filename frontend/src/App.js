import React, { useEffect, useState, useRef, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useInView as useInViewHook } from 'react-intersection-observer';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, MeshDistortMaterial } from '@react-three/drei';
import { 
  Mail, Phone, MapPin, Github, Linkedin, Youtube, Facebook,
  Award, BookOpen, Users, Calendar, ExternalLink, Download,
  ChevronRight, MousePointer, Menu, X, Home, User,
  Briefcase, Trophy, MessageCircle, Sun, Moon, ChevronLeft
} from 'lucide-react';
import './App.css';
import { AnimatePresence } from 'framer-motion';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

// Ultra Performance Settings - Everything optimized for 60fps with 3D mathematical elements
const ULTRA_PERFORMANCE_CONFIG = {
  enableParticles: false,
  enable3D: true, // Enabled for mathematical floating elements
  enableParallax: false,
  enableComplexAnimations: false,
  useSimpleTransitions: true,
  reduceMotion: true,
  enableMathElements: true // New flag for mathematical 3D elements
};

// Static CSS-only background (no JavaScript animations)
const StaticBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 opacity-80"></div>
    <div className="absolute inset-0" style={{
      backgroundImage: `radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                       radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
                       radial-gradient(circle at 40% 80%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)`
    }}></div>
  </div>
);

// Individual floating mathematical element component
const FloatingMathElement = ({ position, text, color = "#4F46E5", size = 1 }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.4 + position[0]) * 0.5 + Math.sin(state.clock.elapsedTime * 0.1 + position[0]) * 2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <Text
        ref={meshRef}
        position={position}
        fontSize={size}
        color={color}
        anchorX="center"
        anchorY="middle"
        material-transparent
        material-opacity={0.6}
        fontWeight="500"
        fontFamily="serif"
      >
        {text}
      </Text>
    </Float>
  );
};

// CSS Fallback for mathematical elements (when 3D doesn't load)
const MathElementsFallback = () => {
  const mathElements = [
    { text: "π", style: { top: "20%", left: "15%", color: "#3B82F6" } },
    { text: "∫", style: { top: "30%", right: "10%", color: "#8B5CF6" } },
    { text: "e", style: { bottom: "40%", left: "20%", color: "#10B981" } },
    { text: "∞", style: { top: "60%", right: "15%", color: "#F59E0B" } },
    { text: "i", style: { top: "15%", left: "70%", color: "#EF4444" } },
    { text: "∂", style: { top: "45%", right: "25%", color: "#6366F1" } },
    { text: "Σ", style: { bottom: "60%", left: "10%", color: "#14B8A6" } },
    { text: "√", style: { bottom: "20%", right: "20%", color: "#F97316" } }
  ];

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {mathElements.map((element, index) => (
        <div
          key={index}
          className="absolute text-4xl md:text-6xl math-symbol-3d opacity-30 floating"
          style={{
            ...element.style,
            color: element.style.color,
            animationDelay: `${index * 0.5}s`,
            animationDuration: `${3 + index * 0.3}s`
          }}
        >
          {element.text}
        </div>
      ))}
    </div>
  );
};

// 3D Mathematical elements floating in background
const FloatingMathElements = () => {
  const [use3D, setUse3D] = useState(true);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouse({ x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  const NUM_ELEMENTS = 40;
  const mathSymbols = ["π", "∫", "e", "∞", "i", "∂", "Σ", "√", "∆", "φ", "λ", "∇", "∑", "θ", "Ω", "Ψ", "β", "μ", "α", "γ", "δ", "ω"];
  const colors = ["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B", "#EF4444", "#6366F1", "#14B8A6", "#F97316", "#A855F7", "#059669", "#DC2626", "#7C3AED", "#06b6d4", "#f43f5e", "#f59e42", "#6366F1", "#10B981", "#F59E0B", "#3B82F6", "#8B5CF6", "#10B981", "#F59E0B"];
  const sizes = [18,20,16,20,18,20,24,18,18,18,18,20,30,18,18,20,20,18,18,18,18,18];
  // Only generate once per mount
  const mathElements = useRef([]);
  if (mathElements.current.length === 0) {
    // Explicitly add elements at the corners and sides (positions tuned for hero section)
    const edgePositions = [
      [-120, 60, -40],   // top-left
      [120, 60, -40],    // top-right
      [-120, -60, -40],  // bottom-left
      [120, -60, -40],   // bottom-right
      [-140, 0, -40],    // left-center
      [140, 0, -40],     // right-center
      [0, 80, -40],      // top-center
      [0, -80, -40]      // bottom-center
    ];
    for (let i = 0; i < edgePositions.length; i++) {
      mathElements.current.push({
        text: mathSymbols[i % mathSymbols.length],
        position: edgePositions[i],
        color: colors[i % colors.length],
        size: sizes[i % sizes.length]
      });
    }
    // Fill the rest randomly
    for (let i = edgePositions.length; i < NUM_ELEMENTS; i++) {
      const x = (Math.random() - 0.5) * 240; // -120 to 120
      const y = (Math.random() - 0.5) * 120; // -60 to 60
      const z = -20 - Math.random() * 60; // -20 to -80
      mathElements.current.push({
        text: mathSymbols[i % mathSymbols.length],
        position: [x, y, z],
        color: colors[i % colors.length],
        size: sizes[i % sizes.length]
      });
    }
  }
  // Parallax offset based on mouse
  const getParallaxedPosition = (pos) => [
    pos[0] + mouse.x * 10,
    pos[1] + mouse.y * 5,
    pos[2]
  ];

  // Fallback to CSS animation if 3D fails
  const handleError = () => {
    setUse3D(false);
  };

  if (!use3D || !ULTRA_PERFORMANCE_CONFIG.enable3D) {
    return <MathElementsFallback />;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-10 math-3d-container">
      <Canvas 
        camera={{ position: [0, 0, 40], fov: 100 }}
        onError={handleError}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          {mathElements.current.map((element, index) => (
            <FloatingMathElement
              key={index}
              position={getParallaxedPosition(element.position)}
              text={element.text}
              color={element.color}
              size={element.size}
            />
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
};

// Ultra-lightweight navigation
const UltraLightNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  useEffect(() => {
    // Use IntersectionObserver to detect when #about is visible
    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setScrolledPastHero(entry.isIntersecting);
      },
      { root: null, threshold: 0.1 }
    );
    observer.observe(aboutSection);
    return () => observer.disconnect();
  }, []);

  const navItems = [
    { name: 'Home', icon: <Home size={14} />, href: '#home' },
    { name: 'About', icon: <User size={14} />, href: '#about' },
    { name: 'Projects', icon: <Briefcase size={14} />, href: '#projects' },
    { name: 'Achievements', icon: <Trophy size={14} />, href: '#achievements' },
    { name: 'Contact', icon: <MessageCircle size={14} />, href: '#contact' }
  ];

  const scrollToSection = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  // Subtle background: only after hero, use dark/blurred glass effect
  const navBg = scrolledPastHero
    ? 'bg-black/60 backdrop-blur-md shadow-md'
    : 'bg-transparent';
  const navText = scrolledPastHero ? 'text-white' : 'text-white';

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-30 transition-colors duration-500 ${navBg}`}
      style={{ color: '#fff' }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <div className={`font-bold text-xl tracking-wide cursor-pointer select-none ${navText}`}>Adish Uprety</div>
        <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="nav-animated-underline flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-150 px-3 py-2 rounded-md hover:bg-white/10 relative overflow-hidden group"
              >
                <span className="text-blue-400">{item.icon}</span>
                <span className="font-medium text-sm group-hover:scale-105 group-hover:text-blue-300 transition-transform transition-colors duration-200 relative inline-block">
                  {item.name}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                </span>
              </button>
            ))}
        </div>
        <button
          className={`md:hidden text-2xl focus:outline-none transition-colors duration-300 ${navText}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      {/* Mobile menu */}
      {isOpen && (
        <div className={`md:hidden bg-black/95 shadow-lg transition-all duration-300`}> 
          <div className="flex flex-col gap-4 px-6 py-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={e => { e.preventDefault(); scrollToSection(item.href); }}
                className="font-semibold text-white hover:text-blue-400 transition-colors duration-300 py-2 border-b border-gray-200 last:border-b-0"
              >
                <span className="inline-block align-middle mr-1">{item.icon}</span>
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

// Simple counter with immediate display (no animation lag)
const InstantCounter = ({ end, suffix = "" }) => {
  const [ref, inView] = useInViewHook({ triggerOnce: true });
  return <span ref={ref}>{inView ? end : 0}{suffix}</span>;
};

// No typewriter effect - instant text display
const InstantText = ({ text }) => <span>{text}</span>;

// Ultra-light hero section with 3D floating elements
const UltraLightHero = () => {
  const fullName = "Adish Uprety";
  const subtitleText = "Mathematical Researcher & 3D Visualization Expert";
  const [displayedName, setDisplayedName] = useState("");
  const [displayedSubtitle, setDisplayedSubtitle] = useState("");
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  
  useEffect(() => {
    setDisplayedName("");
    setDisplayedSubtitle("");
    setShowSubtitle(false);
    setShowButtons(false);
    setShowCursor(false);
    
    let i = 0;
    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayedName(fullName.slice(0, i + 1));
        i++;
        if (i === fullName.length) {
          clearInterval(interval);
          // Start subtitle typewriter effect after name is complete
          setTimeout(() => {
            setShowSubtitle(true);
            setShowCursor(true);
            let j = 0;
            const subtitleInterval = setInterval(() => {
              setDisplayedSubtitle(subtitleText.slice(0, j + 1));
              j++;
              if (j === subtitleText.length) {
                clearInterval(subtitleInterval);
                setShowCursor(false);
                setTimeout(() => setShowButtons(true), 500);
              }
            }, 50); // Faster typing for subtitle
          }, 600);
        }
      }, 180); // Increased from 120ms to 180ms for slower typing
    }, 1200); // Increased from 600ms to 1200ms for more delay before starting
    return () => { clearTimeout(startDelay); };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <StaticBackground />
      {/* 3D floating math elements behind the name, centered in hero section */}
      <div className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 flex items-center justify-center">
        <FloatingMathElements />
      </div>
      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center min-h-[40vh] pt-14">
        <div className="fade-in-typewriter">
          <h1 className="hero-name text-4xl md:text-7xl lg:text-8xl font-bold mb-6 mx-auto text-center font-extrabold tracking-wide drop-shadow-[0_4px_32px_rgba(99,102,241,0.7)]">
            {displayedName}
          </h1>
        </div>
        {showSubtitle && (
          <div className="fade-in-hero-content-stagger text-xl md:text-2xl mb-8 text-gray-300" style={{minHeight: '2.5em'}}>
            <span className="typewriter-text">
              {displayedSubtitle}
              {showCursor && <span className="cursor-blink">|</span>}
            </span>
          </div>
        )}
        {showButtons && (
          <div className="flex flex-col items-center gap-4 w-full">
            {/* Top row: Explore My Work and About Me */}
            <div className="flex flex-row gap-4 justify-center w-full">
              <motion.button 
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 flex items-center button-glow"
              >
                <Briefcase className="mr-2" size={18} />
                Explore My Work
                <ChevronRight className="ml-2" size={18} />
              </motion.button>
              <motion.button
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 flex items-center button-glow"
              >
                <User className="mr-2" size={18} />
                About Me
              </motion.button>
            </div>
            {/* Bottom row: Download CV centered */}
            <div className="flex justify-center w-full">
              <motion.button 
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                className="px-8 py-3 border-2 border-white/30 rounded-full text-white font-semibold hover:bg-white/10 transition-all duration-200 flex items-center mt-2 button-glow-secondary"
              >
                <Download className="mr-2" size={18} />
                Download CV
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// Ultra-light about section
const UltraLightAbout = () => {
  const [ref, inView] = useInViewHook({ triggerOnce: true, threshold: 0.3 });
  
  return (
    <section id="about" ref={ref} className="py-20 px-4 bg-gray-900 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            About <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-20"></div>
              <img 
                src="https://images.unsplash.com/photo-1511629091441-ee46146481b6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwyfHxtYXRoZW1hdGljaWFuJTIwaGVhZHNob3R8ZW58MHx8fHwxNzUyMjEyNzQ3fDA&ixlib=rb-4.1.0&q=85"
                alt="Adish Uprety"
                className="relative rounded-lg shadow-xl w-full max-w-md mx-auto"
              />
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="bg-[#181c2a]/90 rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center">
              <div className="text-left text-gray-200 text-lg mb-6">
                Welcome to my mathematical universe! I'm Adish Uprety, a passionate researcher dedicated to exploring the elegant patterns and infinite possibilities within mathematics. With over a decade of experience in mathematical research and visualization, I bridge the gap between abstract concepts and practical applications.<br /><br />
                My work focuses on complex mathematical modeling, computational geometry, and creating accessible visualizations that make mathematics beautiful and understandable. I believe mathematics is the universal language of discovery.
              </div>
              {/* Quote block inside the same card */}
              <blockquote className="text-xl md:text-2xl italic text-center text-blue-200 mb-2 mt-4">
                "Mathematics is the language with which God has written the universe."
              </blockquote>
              <cite className="block text-blue-400 text-base not-italic text-center mb-2">— Galileo Galilei</cite>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Ultra-light projects section
const UltraLightProjects = () => {
  const [ref, inView] = useInViewHook({ triggerOnce: true, threshold: 0.2 });
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeIdx, setActiveIdx] = useState(0);
  const projects = [
    {
      id: 1,
      title: "Complex Number Visualization",
      description: "Interactive 3D visualization of complex number operations and transformations.",
      image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=800&q=80",
      tags: ["3D Visualization", "Complex Analysis", "Interactive"]
    },
    {
      id: 2,
      title: "Fractal Geometry Explorer",
      description: "Real-time fractal generation and exploration with mathematical precision.",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      tags: ["Fractals", "Computational Geometry", "Research"]
    },
    {
      id: 3,
      title: "Topology Visualization Suite",
      description: "Advanced tools for visualizing topological spaces and transformations.",
      image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
      tags: ["Topology", "Mathematical Modeling", "Visualization"]
    },
    {
      id: 4,
      title: "Prime Number Explorer",
      description: "A tool for visualizing and analyzing prime number distributions.",
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
      tags: ["Number Theory", "Visualization", "Research"]
    },
    {
      id: 5,
      title: "Graph Theory Playground",
      description: "Interactive graph algorithms and visualizations for learning and research.",
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
      tags: ["Graph Theory", "Algorithms", "Education"]
    },
    {
      id: 6,
      title: "Algebraic Surfaces Gallery",
      description: "Explore beautiful algebraic surfaces in 3D.",
      image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=800&q=80",
      tags: ["Algebraic Geometry", "3D", "Gallery"]
    },
    {
      id: 7,
      title: "AI Math Tutor",
      description: "Personalized AI-powered math tutoring with step-by-step solutions.",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
      tags: ["AI", "Education", "Tutoring"]
    },
    {
      id: 8,
      title: "Probability Simulator",
      description: "Simulate and visualize probability distributions and random events.",
      image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=800&q=80",
      tags: ["Probability", "Simulation", "Statistics"]
    },
    {
      id: 9,
      title: "Calculus Animation Lab",
      description: "Animated calculus concepts for intuitive understanding.",
      image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
      tags: ["Calculus", "Animation", "Education"]
    },
    {
      id: 10,
      title: "Math Art Generator",
      description: "Create generative art using mathematical formulas and algorithms.",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      tags: ["Art", "Generative", "Math"]
    }
  ];

  // 3D hover effect handler
  const handleMouseMove = (e, idx) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({
      x: (x / rect.width - 0.5) * 2, // -1 to 1
      y: (y / rect.height - 0.5) * 2 // -1 to 1
    });
    setHoveredIdx(idx);
  };
  const handleMouseLeave = () => {
    setHoveredIdx(null);
    setMousePos({ x: 0, y: 0 });
  };

  // Track active slide
  const onMoved = (splide) => {
    setActiveIdx(splide.index);
  };

  return (
    <section id="projects" ref={ref} className="py-20 px-4 bg-gradient-to-b from-transparent via-[#181c2a]/90 to-[#181c2a]/90 relative">
      <style>{`
        .splide__slide.is-active .project-card {
          transform: scale(1.12) translateY(-12px) perspective(900px) rotateY(0deg) !important;
          box-shadow: 0 12px 40px 0 rgba(0, 255, 255, 0.25), 0 2px 12px 0 rgba(0,0,0,0.18);
          z-index: 2;
        }
        .splide__slide:not(.is-active) .project-card {
          filter: blur(0.5px) grayscale(0.1);
          opacity: 0.7;
          transform: scale(0.96) translateY(0px) perspective(900px) rotateY(-18deg);
          transition: transform 0.3s cubic-bezier(.4,2,.6,1), filter 0.3s, opacity 0.3s;
        }
        .splide__slide.is-prev .project-card {
          transform: scale(0.98) translateY(4px) perspective(900px) rotateY(18deg);
        }
        .splide__slide.is-next .project-card {
          transform: scale(0.98) translateY(4px) perspective(900px) rotateY(-18deg);
        }
        .project-card {
          transition: box-shadow 0.3s, filter 0.3s, transform 0.3s cubic-bezier(.4,2,.6,1);
        }
        .project-card:hover {
          box-shadow: 0 16px 48px 0 rgba(0,255,255,0.35), 0 4px 16px 0 rgba(0,0,0,0.22);
          filter: brightness(1.08) saturate(1.1);
        }
        .project-card .project-title {
          transition: color 0.3s;
        }
        .project-card:hover .project-title {
          color: #38bdf8;
        }
        .project-card .project-tag {
          transition: background 0.3s, color 0.3s;
        }
        .project-card:hover .project-tag {
          background: #38bdf8;
          color: #fff;
        }
      `}</style>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Featured <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Projects</span>
          </h2>
        </motion.div>
        <div className="relative flex items-center justify-center min-h-[420px]">
          <Splide
            options={{
              type: 'loop',
              perPage: 3,
              gap: '1rem',
              focus: 'center',
              pagination: false,
              arrows: true,
              speed: 300,
              breakpoints: {
                1024: { perPage: 1 },
                640: { perPage: 1 },
              },
            }}
            aria-label="Featured Projects Carousel"
            className="w-full max-w-4xl"
            hasTrack={false}
            onMoved={onMoved}
          >
            <SplideTrack>
              {projects.map((project, idx) => (
                <SplideSlide key={project.id}>
                  <div
                    className="group cursor-pointer h-full flex flex-col justify-between project-card transition-all duration-300"
                    onClick={() => setSelectedProject(project)}
                    {...(activeIdx === idx ? {
                      onMouseMove: e => handleMouseMove(e, idx),
                      onMouseLeave: handleMouseLeave,
                      style: hoveredIdx === idx
                        ? {
                            transform: `scale(1.13) translateY(-16px) perspective(900px) rotateY(${mousePos.x * 12}deg) rotateX(${-mousePos.y * 8}deg)`,
                            boxShadow: '0 20px 60px 0 rgba(56,189,248,0.25), 0 4px 16px 0 rgba(0,0,0,0.22)',
                            zIndex: 3
                          }
                        : undefined
                    } : {})}
                  >
                    <div className="bg-[#23263a]/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-400/60 transition-all duration-300 h-full flex flex-col">
                      <div className="relative overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-200 project-title">
                          {project.title}
                        </h3>
                        <p className="text-gray-400 mb-4 leading-relaxed flex-1">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30 project-tag"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </SplideSlide>
              ))}
            </SplideTrack>
            {/* Splide Arrows will be rendered outside the cards by default, but we style them further above */}
          </Splide>
        </div>
        {/* Modal overlay for fullscreen project */}
        {selectedProject && (
          <div className="fixed inset-0 bg-[#181c2a]/95 z-50 flex items-center justify-center">
            <div className="max-w-2xl w-full bg-[#23263a] rounded-2xl shadow-2xl p-8 relative flex flex-col items-center">
              <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4 text-white text-2xl hover:text-blue-400">&times;</button>
              <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-64 object-cover rounded-xl mb-6" />
              <h3 className="text-2xl font-bold text-white mb-3">{selectedProject.title}</h3>
              <p className="text-gray-300 mb-4 text-center">{selectedProject.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedProject.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// Ultra-light achievements section
const UltraLightAchievements = () => {
  const [ref, inView] = useInViewHook({ triggerOnce: true, threshold: 0.3 });
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const achievements = [
    { icon: <Award className="w-6 h-6" />, title: "Publications", count: 89, description: "Peer-reviewed research papers" },
    { icon: <Users className="w-6 h-6" />, title: "Citations", count: 1247, description: "Academic citations worldwide" },
    { icon: <BookOpen className="w-6 h-6" />, title: "Books", count: 3, description: "Mathematical textbooks authored" },
    { icon: <Calendar className="w-6 h-6" />, title: "Conferences", count: 42, description: "International speaking engagements" },
    { icon: <Trophy className="w-6 h-6" />, title: "Math Olympiad Medals", count: 7, description: "International math olympiad awards" },
    { icon: <Download className="w-6 h-6" />, title: "Software Tools Released", count: 12, description: "Open-source math tools published" },
    { icon: <MessageCircle className="w-6 h-6" />, title: "Invited Talks", count: 55, description: "Talks at global conferences" },
    { icon: <Sun className="w-6 h-6" />, title: "Research Grants", count: 5, description: "Major research grants awarded" },
    { icon: <Moon className="w-6 h-6" />, title: "Night Owl Sessions", count: 200, description: "Late-night math breakthroughs" }
  ];
  return (
    <section id="achievements" ref={ref} className="py-20 px-4 bg-gradient-to-b from-transparent via-[#181c2a]/90 to-[#181c2a]/90 relative" style={{ opacity: 1 }}>
      <style>{`
        .achievement-card {
          transition: transform 0.3s cubic-bezier(.4,2,.6,1), box-shadow 0.3s, background 0.3s, border-color 0.3s;
        }
        .achievement-card:hover {
          transform: translateY(-12px) scale(1.06);
          box-shadow: 0 12px 40px 0 rgba(56,189,248,0.18), 0 4px 16px 0 rgba(0,0,0,0.22);
          background: rgba(56,189,248,0.10);
          border-color: #38bdf8;
          outline: 0;
        }
        .achievement-card:focus-visible {
          border-color: #38bdf8;
          outline: 2px solid #38bdf8;
          outline-offset: 2px;
        }
      `}</style>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              My <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Achievements</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.slice(0,6).map((achievement, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              className="achievement-card text-center p-6 bg-[#23263a]/80 backdrop-blur-sm rounded-xl border border-cyan-400/10 hover:border-cyan-400/50 transition-all duration-200 cursor-pointer"
              onMouseEnter={() => setHoveredIdx(index)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <div className="text-purple-400 mb-4 flex justify-center">
                {achievement.icon}
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                <InstantCounter end={achievement.count} suffix="+" />
              </div>
              <div className="text-lg font-semibold text-white mb-2">
                {achievement.title}
              </div>
              <div className="text-white text-sm min-h-[40px] flex items-center justify-center">
                {hoveredIdx === index ? 'Click to learn more!' : achievement.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Ultra-light contact section
const UltraLightContact = () => {
  const [ref, inView] = useInViewHook({ triggerOnce: true, threshold: 0.3 });
  const [copied, setCopied] = useState("");
  const contacts = [
    {
      icon: <Mail size={36} />, label: "Email", value: "alex.chen@mathematics.edu", color: "from-blue-400 to-cyan-400", href: "mailto:alex.chen@mathematics.edu",
      desc: "I usually reply within 24 hours.",
      action: () => { navigator.clipboard.writeText("alex.chen@mathematics.edu"); setCopied("Email"); setTimeout(() => setCopied(""), 1200); },
      actionLabel: "Copy Email"
    },
    {
      icon: <Phone size={36} />, label: "Phone", value: "+1 (555) 123-4567", color: "from-green-400 to-blue-400", href: "tel:+15551234567",
      desc: "Available 9am–6pm EST.",
      action: () => { navigator.clipboard.writeText("+1 (555) 123-4567"); setCopied("Phone"); setTimeout(() => setCopied(""), 1200); },
      actionLabel: "Copy Number"
    },
    {
      icon: <MapPin size={36} />, label: "Location", value: "MIT, Cambridge, MA", color: "from-purple-400 to-pink-400", href: "https://maps.google.com/?q=MIT, Cambridge, MA",
      desc: "Open to remote and on-site work.",
      action: () => window.open("https://maps.google.com/?q=MIT, Cambridge, MA", "_blank"),
      actionLabel: "View on Map"
    }
  ];
  // Icon animation state
  const [iconAnim, setIconAnim] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setIconAnim(anim => (anim + 1) % 10000), 1200);
    return () => clearInterval(interval);
  }, []);
  return (
    <section id="contact" ref={ref} className="py-20 px-4 bg-gradient-to-b from-transparent via-[#181c2a]/90 to-[#181c2a]/90 relative">
      <style>{`
        .contact-card {
          min-height: 270px;
          min-width: 0;
          transition: transform 0.4s cubic-bezier(.4,2,.6,1), box-shadow 0.4s, background 0.4s, border-color 0.4s;
        }
        .contact-card .contact-icon {
          transition: transform 0.5s cubic-bezier(.4,2,.6,1), color 0.3s;
        }
        .contact-card .contact-action {
          transition: background 0.2s, color 0.2s;
        }
        .contact-card:hover {
          transform: translateY(-16px) scale(1.08) rotateZ(-2deg);
          box-shadow: 0 16px 48px 0 rgba(56,189,248,0.22), 0 8px 32px 0 rgba(0,0,0,0.22);
          background: rgba(56,189,248,0.13);
          border-color: #38bdf8;
        }
        .contact-card:hover .contact-icon {
          transform: scale(1.25) rotate(-12deg);
          color: #38bdf8;
          filter: drop-shadow(0 0 8px #38bdf8);
        }
        .contact-card:hover .contact-action {
          background: #38bdf8;
          color: #fff;
        }
      `}</style>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Get In <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">Touch</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-green-500 mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contacts.map((contact, idx) => (
            <motion.div
              key={contact.label}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.15, ease: "easeOut" }}
              className={`contact-card group flex flex-col items-center justify-center p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-blue-400/60 transition-all duration-300 cursor-pointer shadow-lg`}
              style={{ minHeight: 270 }}
              tabIndex={0}
            >
              <div
                className={`contact-icon text-5xl mb-4 bg-gradient-to-r ${contact.color} bg-clip-text text-transparent`}
                style={{
                  transform:
                    `scale(${1.08 + 0.08 * Math.sin((iconAnim + idx * 2) * 0.7)}) rotate(${Math.sin((iconAnim + idx * 2) * 0.7) * 8}deg)`
                }}
              >
                {contact.icon}
              </div>
              <div className="text-lg font-semibold text-white mb-1">{contact.label}</div>
              <div className="text-xl font-bold text-white mb-2 select-all break-all text-center">{contact.value}</div>
              <div className="text-white text-sm mb-4 text-center min-h-[24px]">{contact.desc}</div>
              <button
                className="contact-action px-4 py-2 rounded-lg border border-blue-400 bg-blue-400/10 text-white font-semibold mt-auto transition-all duration-200"
                onClick={contact.action}
                tabIndex={0}
              >
                {copied === contact.label ? 'Copied!' : contact.actionLabel}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Ultra-light footer
const UltraLightFooter = () => (
  <footer className="bg-gradient-to-b from-transparent via-[#181c2a]/90 to-[#181c2a]/90 text-white py-12 px-4 relative">
    <div className="max-w-6xl mx-auto text-center">
      <div className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-white">
        Adish Uprety
      </div>
      <div className="text-white mb-6">
        Mathematical Researcher & 3D Visualization Expert
      </div>
      <div className="text-sm text-white">
        © 2025 Adish Uprety. All rights reserved.
      </div>
    </div>
  </footer>
);

// Ultra-lightweight main app
function UltraLightApp() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.body.className = isDark ? 'dark' : 'light';
  }, [isDark]);

  // Get full page height for scatter
  const [pageHeight, setPageHeight] = useState(window.innerHeight);
  useEffect(() => {
    const updateHeight = () => setPageHeight(document.body.scrollHeight);
    updateHeight();
    window.addEventListener('resize', updateHeight);
    window.addEventListener('scroll', updateHeight);
    return () => {
      window.removeEventListener('resize', updateHeight);
      window.removeEventListener('scroll', updateHeight);
    };
  }, []);

  return (
    <div className="App">
      <UltraLightNavigation />
      <UltraLightHero />
      <UltraLightAbout />
      <UltraLightProjects />
      <UltraLightAchievements />
      <UltraLightContact />
      <UltraLightFooter />
    </div>
  );
}

export default UltraLightApp;