import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView as useInViewHook } from 'react-intersection-observer';
import { 
  Mail, Phone, MapPin, Github, Linkedin, Youtube, Facebook,
  Award, BookOpen, Users, Calendar, ExternalLink, Download,
  ChevronRight, MousePointer, Menu, X, Home, User,
  Briefcase, Trophy, MessageCircle, Sun, Moon
} from 'lucide-react';
import './App.css';

// Ultra Performance Settings - Everything optimized for 60fps
const ULTRA_PERFORMANCE_CONFIG = {
  enableParticles: false,
  enable3D: false,
  enableParallax: false,
  enableComplexAnimations: false,
  useSimpleTransitions: true,
  reduceMotion: true
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

// Ultra-lightweight navigation
const UltraLightNavigation = ({ isDark, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 20);
    const throttledUpdate = () => requestAnimationFrame(updateScrolled);
    window.addEventListener('scroll', throttledUpdate, { passive: true });
    return () => window.removeEventListener('scroll', throttledUpdate);
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

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
      scrolled ? 'bg-black/95 backdrop-blur-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-center h-14">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-150 px-3 py-2 rounded-md hover:bg-white/10"
              >
                <span className="text-blue-400">{item.icon}</span>
                <span className="font-medium text-sm">{item.name}</span>
              </button>
            ))}
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors duration-150"
            >
              {isDark ? <Sun size={16} className="text-yellow-400" /> : <Moon size={16} className="text-blue-300" />}
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-md transition-colors duration-150"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-sm border-t border-white/10">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="flex items-center space-x-3 text-white/80 hover:text-white hover:bg-white/10 p-3 rounded-md transition-colors duration-150 w-full"
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

// Simple counter with immediate display (no animation lag)
const InstantCounter = ({ end, suffix = "" }) => {
  const [ref, inView] = useInViewHook({ triggerOnce: true });
  return <span ref={ref}>{inView ? end : 0}{suffix}</span>;
};

// No typewriter effect - instant text display
const InstantText = ({ text }) => <span>{text}</span>;

// Ultra-light hero section
const UltraLightHero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <StaticBackground />
      
      {/* Content */}
      <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-4 pt-14">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent"
        >
          Adish Uprety
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-xl md:text-2xl mb-8 text-gray-300"
        >
          <InstantText text="Mathematical Researcher & 3D Visualization Expert" />
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="text-lg md:text-xl mb-12 text-gray-400 max-w-2xl mx-auto leading-relaxed"
        >
          Exploring the infinite beauty of mathematics through cutting-edge research and stunning visualizations
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button 
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 flex items-center"
          >
            Explore My Work
            <ChevronRight className="ml-2" size={18} />
          </button>
          
          <button className="px-8 py-3 border-2 border-white/30 rounded-full text-white font-semibold hover:bg-white/10 transition-all duration-200 flex items-center">
            <Download className="mr-2" size={18} />
            Download CV
          </button>
        </motion.div>
      </div>
      
      {/* Simple scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60">
        <MousePointer size={20} className="animate-bounce" />
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
                loading="lazy"
              />
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
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

// Single quote, no animation cycling
const UltraLightQuotes = () => {
  const [ref, inView] = useInViewHook({ triggerOnce: true, threshold: 0.3 });
  
  return (
    <section ref={ref} className="py-16 px-4 bg-gradient-to-br from-indigo-900 to-purple-900">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
        >
          <blockquote className="text-white text-xl md:text-2xl italic mb-6 leading-relaxed">
            "Mathematics is the language with which God has written the universe."
          </blockquote>
          <cite className="text-cyan-300 text-lg font-semibold">
            — Galileo Galilei
          </cite>
        </motion.div>
      </div>
    </section>
  );
};

// Ultra-light projects section
const UltraLightProjects = () => {
  const [ref, inView] = useInViewHook({ triggerOnce: true, threshold: 0.2 });
  
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
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Featured <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Projects</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto rounded-full"></div>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-200 group"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                  loading="lazy"
                />
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <ExternalLink className="text-white" size={18} />
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-200">
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

// Ultra-light achievements section
const UltraLightAchievements = () => {
  const [ref, inView] = useInViewHook({ triggerOnce: true, threshold: 0.3 });
  
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
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            My <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Achievements</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-purple-400/50 transition-all duration-200"
            >
              <div className="text-purple-400 mb-4 flex justify-center">
                {achievement.icon}
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                <InstantCounter end={achievement.count} suffix="+" />
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

// Ultra-light contact section
const UltraLightContact = () => {
  const [ref, inView] = useInViewHook({ triggerOnce: true, threshold: 0.3 });
  
  const contacts = [
    { icon: <Mail size={18} />, label: "Email", value: "alex.chen@mathematics.edu", color: "blue-400" },
    { icon: <Phone size={18} />, label: "Phone", value: "+1 (555) 123-4567", color: "green-400" },
    { icon: <MapPin size={18} />, label: "Location", value: "MIT, Cambridge, MA", color: "purple-400" }
  ];

  const socials = [
    { icon: <Github size={18} />, href: "https://github.com/Valorant-rocks" },
    { icon: <Youtube size={18} />, href: "https://youtube.com/@adishuprety" },
    { icon: <Linkedin size={18} />, href: "https://linkedin.com/in/adishuprety" },
    { icon: <Facebook size={18} />, href: "https://facebook.com/adishuprety" }
  ];
  
  return (
    <section id="contact" ref={ref} className="py-20 px-4 bg-gradient-to-br from-gray-900 to-black">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Get In <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">Touch</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-green-500 mx-auto rounded-full"></div>
        </motion.div>
        
        <div className="flex justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="space-y-6 max-w-md"
          >
            {contacts.map((contact, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:border-white/20 transition-all duration-200">
                <div className={`text-${contact.color}`}>
                  {contact.icon}
                </div>
                <div>
                  <div className="text-white font-semibold">{contact.label}</div>
                  <div className="text-gray-400 text-sm">{contact.value}</div>
                </div>
              </div>
            ))}
            
            {/* Social Media */}
            <div className="pt-6 border-t border-white/10">
              <h3 className="text-center text-white font-semibold mb-4">Connect With Me</h3>
              <div className="flex justify-center space-x-4">
                {socials.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/5 rounded-full border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-200"
                  >
                    <span className="text-gray-400 hover:text-white transition-colors duration-200">
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

// Ultra-light footer
const UltraLightFooter = () => (
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

// Ultra-lightweight main app
function UltraLightApp() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.body.className = isDark ? 'dark' : 'light';
  }, [isDark]);

  return (
    <div className={`App ${isDark ? 'dark' : 'light'}`}>
      <UltraLightNavigation isDark={isDark} toggleTheme={setIsDark} />
      <UltraLightHero />
      <UltraLightAbout />
      <UltraLightQuotes />
      <UltraLightProjects />
      <UltraLightAchievements />
      <UltraLightContact />
      <UltraLightFooter />
    </div>
  );
}

export default UltraLightApp;