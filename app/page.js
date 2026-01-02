'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import { FaLinkedinIn, FaGithub, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { clearInterval(timer); setTimeout(onComplete, 300); return 100 }
        return prev + 4
      })
    }, 30)
    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.1 }} transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 z-[200] bg-[#0A0E27] flex flex-col items-center justify-center">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#00D9FF]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#A855F7]/20 rounded-full blur-3xl animate-pulse delay-500" />
      </div>
      <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="relative z-10 mb-8">
        <span className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#00D9FF] via-cyan-400 to-[#A855F7] bg-clip-text text-transparent">RZ</span>
      </motion.div>
      <div className="relative z-10 w-48 md:w-64 h-1 bg-[#1A1F3A] rounded-full overflow-hidden">
        <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} className="h-full bg-gradient-to-r from-[#00D9FF] to-[#A855F7] rounded-full" style={{ boxShadow: '0 0 20px rgba(0, 217, 255, 0.5)' }} />
      </div>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="relative z-10 mt-4 text-gray-400 text-sm">Loading... {progress}%</motion.p>
    </motion.div>
  )
}

function TypingText({ texts, className }) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentFullText = texts[currentTextIndex]
    const typeSpeed = isDeleting ? 30 : 80
    const pauseTime = 2000
    if (!isDeleting && displayText === currentFullText) { setTimeout(() => setIsDeleting(true), pauseTime); return }
    if (isDeleting && displayText === '') { setIsDeleting(false); setCurrentTextIndex((prev) => (prev + 1) % texts.length); return }
    const timeout = setTimeout(() => {
      setDisplayText(prev => isDeleting ? currentFullText.substring(0, prev.length - 1) : currentFullText.substring(0, prev.length + 1))
    }, typeSpeed)
    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentTextIndex, texts])

  return <span className={className}>{displayText}<span className="animate-blink text-[#00D9FF]">|</span></span>
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  return <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00D9FF] via-cyan-400 to-[#A855F7] origin-left z-[60]" />
}

function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#0A0E27]" />
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] md:w-[800px] md:h-[800px] bg-[#00D9FF]/10 rounded-full blur-[100px] animate-float-slow" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] md:w-[800px] md:h-[800px] bg-[#A855F7]/10 rounded-full blur-[100px] animate-float-slow-reverse" />
        <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-cyan-500/5 rounded-full blur-[80px] animate-float-medium" />
      </div>
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(rgba(0, 217, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 217, 255, 0.3) 1px, transparent 1px)`, backgroundSize: '50px 50px' }} />
    </div>
  )
}

function InteractiveCard({ children, className, glowColor = 'cyan' }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isTapped, setIsTapped] = useState(false)
  const glowColors = { cyan: 'hover:shadow-[0_0_30px_rgba(0,217,255,0.3)]', purple: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]' }

  return (
    <motion.div onHoverStart={() => setIsHovered(true)} onHoverEnd={() => setIsHovered(false)} onTapStart={() => setIsTapped(true)} onTap={() => setTimeout(() => setIsTapped(false), 150)} onTapCancel={() => setIsTapped(false)}
      whileHover={{ y: -8, scale: 1.02 }} whileTap={{ scale: 0.98 }} className={`relative overflow-hidden transition-all duration-300 ${glowColors[glowColor]} ${className}`}>
      <div className={`absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 ${isHovered || isTapped ? 'opacity-100' : ''}`}
        style={{ background: 'linear-gradient(45deg, transparent, rgba(0, 217, 255, 0.1), transparent)', animation: isHovered || isTapped ? 'shimmer 2s infinite' : 'none' }} />
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

function Navbar({ scrollToSection, activeSection }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { name: 'About', href: 'about' },
    { name: 'Skills', href: 'skills' },
    { name: 'Experience', href: 'experience' },
    { name: 'Projects', href: 'projects' },
    { name: 'Contact', href: 'contact' },
  ]

  const handleClick = (id) => { scrollToSection(id); setIsOpen(false) }

  return (
    <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-[#0A0E27]/80 backdrop-blur-xl border-b border-[#00D9FF]/10 shadow-lg shadow-[#00D9FF]/5' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 md:h-16 flex items-center justify-between">
        <motion.a href="#hero" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative text-xl md:text-2xl font-bold">
          <span className="bg-gradient-to-r from-[#00D9FF] via-cyan-400 to-[#A855F7] bg-clip-text text-transparent">RZ</span>
        </motion.a>
        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          {links.map((link) => (
            <motion.button key={link.name} onClick={() => handleClick(link.href)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${activeSection === link.href ? 'text-[#00D9FF]' : 'text-gray-400 hover:text-white'}`}>
              {link.name}
              {activeSection === link.href && <motion.div layoutId="activeSection" className="absolute inset-0 bg-[#00D9FF]/10 rounded-lg border border-[#00D9FF]/30" transition={{ type: 'spring', stiffness: 300, damping: 30 }} />}
            </motion.button>
          ))}
        </div>
        <motion.button onClick={() => setIsOpen(!isOpen)} whileTap={{ scale: 0.9 }} className="md:hidden relative w-10 h-10 flex items-center justify-center text-white text-xl z-[100]" aria-label="Toggle menu">
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><FaTimes /></motion.div>
            ) : (
              <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><FaBars /></motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden bg-[#0A0E27]/95 backdrop-blur-xl border-t border-[#00D9FF]/10 overflow-hidden">
            <div className="px-4 py-4 space-y-1">
              {links.map((link, index) => (
                <motion.button key={link.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}
                  onClick={() => handleClick(link.href)} className={`block w-full text-left py-3 px-4 rounded-xl transition-all duration-300 text-sm font-medium ${activeSection === link.href ? 'bg-[#00D9FF]/10 text-[#00D9FF] border border-[#00D9FF]/30' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}>
                  {link.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

function Section({ id, children, className = '', dark = false }) {
  return (
    <motion.section id={id} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={staggerContainer}
      className={`relative py-16 md:py-24 overflow-hidden ${dark ? 'bg-[#0d1229]/50' : ''} ${className}`}>
      {children}
    </motion.section>
  )
}

function SectionTitle({ title, subtitle }) {
  return (
    <motion.div variants={fadeInUp} className="text-center mb-12 md:mb-16">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-poppins font-bold mb-3 md:mb-4">
        <span className="bg-gradient-to-r from-[#00D9FF] via-cyan-400 to-[#A855F7] bg-clip-text text-transparent">{title}</span>
      </h2>
      <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-[#00D9FF] to-[#A855F7] mx-auto rounded-full" />
      {subtitle && <p className="text-gray-400 max-w-2xl mx-auto mt-4 text-sm md:text-base px-4">{subtitle}</p>}
    </motion.div>
  )
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'achievements', 'education', 'contact']
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) { setActiveSection(section); break }
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'smooth' }) }
  const roleTexts = ['Data & Administrative Operations Specialist', 'Excel Power User', 'Documentation Expert']

  return (
    <>
      <AnimatePresence>{isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}</AnimatePresence>

      <main className="min-h-screen font-inter overflow-x-hidden">
        <AnimatedBackground />
        <ScrollProgress />
        <Navbar scrollToSection={scrollToSection} activeSection={activeSection} />

        <style jsx global>{`
          @keyframes float-slow { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(30px, -30px) scale(1.1); } }
          @keyframes float-slow-reverse { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(-30px, 30px) scale(1.1); } }
          @keyframes float-medium { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(20px, -20px); } }
          @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
          @keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
          .animate-float-slow { animation: float-slow 20s ease-in-out infinite; }
          .animate-float-slow-reverse { animation: float-slow-reverse 25s ease-in-out infinite; }
          .animate-float-medium { animation: float-medium 15s ease-in-out infinite; }
          .animate-blink { animation: blink 1s infinite; }
        `}</style>

        {/* HERO */}
        <motion.section id="hero" initial="hidden" animate="visible" variants={staggerContainer} className="relative min-h-screen flex items-center justify-center pt-14 md:pt-16">
          <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl">
            <motion.div variants={scaleIn} className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto mb-6 md:mb-8">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00D9FF] to-[#A855F7] opacity-75 blur-sm" style={{ animation: 'spin 8s linear infinite' }} />
              <div className="absolute inset-1 rounded-full overflow-hidden border-2 border-[#0A0E27] bg-[#0A0E27]">
                <img src="/profile.jpg" alt="Usamah Rhacac Zamar" className="w-full h-full object-cover" />
              </div>
              <div className="absolute inset-0 rounded-full border-2 border-[#00D9FF]/50 animate-ping opacity-20" />
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-poppins font-bold text-white mb-3 md:mb-4">
              Usamah Rhacac <span className="bg-gradient-to-r from-[#00D9FF] via-cyan-400 to-[#A855F7] bg-clip-text text-transparent">Zamar</span>
            </motion.h1>
            <motion.div variants={fadeInUp} className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#00D9FF] mb-4 md:mb-6 h-8 md:h-10">
              <TypingText texts={roleTexts} />
            </motion.div>
            <motion.p variants={fadeInUp} className="text-sm sm:text-base md:text-lg text-gray-400 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed">
              Focused on structured data handling, Excel-based operations, documentation, and administrative reliability.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
              <motion.button whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 217, 255, 0.5)' }} whileTap={{ scale: 0.95 }} onClick={() => scrollToSection('projects')}
                className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-3.5 bg-gradient-to-r from-[#00D9FF] to-cyan-500 text-white text-sm md:text-base font-semibold rounded-xl shadow-[0_0_20px_rgba(0,217,255,0.3)] transition-all duration-300">
                View My Work
              </motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => scrollToSection('contact')}
                className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-3.5 border-2 border-[#00D9FF]/50 text-[#00D9FF] text-sm md:text-base font-semibold rounded-xl hover:bg-[#00D9FF]/10 transition-all duration-300">
                Contact Me
              </motion.button>
            </motion.div>
          </div>
        </motion.section>

        {/* ABOUT */}
        <Section id="about">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionTitle title="About Me" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-10 md:mb-16">
              {[
                { icon: '📄', title: 'Data Operations', color: 'cyan', items: ['Excel mastery (10K+ records)', 'Data validation & QC', 'Reporting & documentation'] },
                { icon: '✅', title: 'Administrative Support', color: 'purple', items: ['SOP development', 'Documentation standards', 'Operational workflows'] },
                { icon: '💻', title: 'Technical Foundation', color: 'cyan', items: ['Python (Pandas, NumPy)', 'SQL (MySQL)', 'Microsoft Azure certified'] }
              ].map((card) => (
                <motion.div key={card.title} variants={fadeInUp}>
                  <InteractiveCard glowColor={card.color} className={`bg-[#1A1F3A]/80 backdrop-blur-sm p-5 sm:p-6 md:p-8 rounded-xl border ${card.color === 'cyan' ? 'border-[#00D9FF]/30' : 'border-[#A855F7]/30'} h-full`}>
                    <div className={`w-12 h-12 md:w-14 md:h-14 mb-4 md:mb-5 rounded-xl bg-gradient-to-br ${card.color === 'cyan' ? 'from-[#00D9FF] to-cyan-600' : 'from-[#A855F7] to-purple-600'} flex items-center justify-center text-xl md:text-2xl shadow-lg`}>{card.icon}</div>
                    <h3 className={`text-lg md:text-xl font-semibold mb-3 md:mb-4 ${card.color === 'cyan' ? 'text-[#00D9FF]' : 'text-[#A855F7]'}`}>{card.title}</h3>
                    <ul className="text-gray-300 space-y-2 text-xs sm:text-sm">
                      {card.items.map(item => (<li key={item} className="flex items-center gap-2"><span className={`w-1.5 h-1.5 rounded-full ${card.color === 'cyan' ? 'bg-[#00D9FF]' : 'bg-[#A855F7]'}`} />{item}</li>))}
                    </ul>
                  </InteractiveCard>
                </motion.div>
              ))}
            </div>
            <motion.div variants={scaleIn}>
              <InteractiveCard glowColor="cyan" className="max-w-4xl mx-auto bg-[#1A1F3A]/80 backdrop-blur-sm p-5 sm:p-6 md:p-8 lg:p-10 rounded-xl border border-[#00D9FF]/20">
                <h3 className="text-xl md:text-2xl font-poppins font-bold mb-4 md:mb-6 bg-gradient-to-r from-[#00D9FF] to-[#A855F7] bg-clip-text text-transparent">My Journey</h3>
                <p className="text-gray-300 mb-3 md:mb-4 leading-relaxed text-sm md:text-base">
                  I am a graduate of Informatics Engineering with a strong focus on data processing, administrative operations, and system documentation. My experience includes managing more than 10,000 operational documents during my internship at a government institution, where I worked almost entirely using Microsoft Excel for data entry, validation, tracking, and reporting.
                </p>
                <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                  I am detail-oriented, structured, and comfortable working with large datasets, ensuring data accuracy and consistency to support operational and reporting needs. Currently, I am focused on administrative and data operations roles where reliability, documentation, and process discipline are essential.
                </p>
              </InteractiveCard>
            </motion.div>
          </div>
        </Section>

        {/* SKILLS */}
        <Section id="skills" dark>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionTitle title="Skills & Expertise" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
              <motion.div variants={fadeInUp}>
                <InteractiveCard glowColor="cyan" className="bg-[#1A1F3A]/80 backdrop-blur-sm p-5 sm:p-6 md:p-8 rounded-xl border border-[#00D9FF]/30 h-full">
                  <h3 className="text-lg md:text-xl font-semibold text-[#00D9FF] mb-4 md:mb-6 flex items-center gap-2"><span className="w-2 h-2 bg-[#00D9FF] rounded-full animate-pulse" />Primary Skills</h3>
                  <ul className="space-y-3 md:space-y-4">
                    {['Microsoft Excel (Advanced)', 'Microsoft Word (Advanced)', 'Data Entry & Processing', 'Data Validation', 'Documentation & SOP'].map((item) => (
                      <motion.li key={item} variants={slideInLeft} className="flex items-center gap-3 text-gray-300 text-xs sm:text-sm md:text-base group">
                        <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-gradient-to-r from-[#00D9FF] to-cyan-400 group-hover:scale-125 transition-transform" />
                        <span className="group-hover:text-white transition-colors">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </InteractiveCard>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <InteractiveCard glowColor="purple" className="bg-[#1A1F3A]/80 backdrop-blur-sm p-5 sm:p-6 md:p-8 rounded-xl border border-[#A855F7]/30 h-full">
                  <h3 className="text-lg md:text-xl font-semibold text-[#A855F7] mb-4 md:mb-6 flex items-center gap-2"><span className="w-2 h-2 bg-[#A855F7] rounded-full animate-pulse" />Technical Skills</h3>
                  <ul className="space-y-3 md:space-y-4">
                    {['Python (Pandas, NumPy, Scikit-learn)', 'SQL (MySQL)', 'Google Workspace (Sheets, Drive)', 'Git & GitHub', 'VS Code, Google Colab'].map((item) => (
                      <motion.li key={item} variants={slideInLeft} className="flex items-center gap-3 text-gray-300 text-xs sm:text-sm md:text-base group">
                        <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-gradient-to-r from-[#A855F7] to-purple-400 group-hover:scale-125 transition-transform" />
                        <span className="group-hover:text-white transition-colors">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </InteractiveCard>
              </motion.div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
              <motion.div variants={fadeInUp}>
                <InteractiveCard glowColor="cyan" className="bg-[#1A1F3A]/80 backdrop-blur-sm p-5 sm:p-6 md:p-8 rounded-xl border border-[#00D9FF]/30 h-full">
                  <h3 className="text-lg md:text-xl font-semibold text-[#00D9FF] mb-4 md:mb-6 flex items-center gap-2"><span className="w-2 h-2 bg-[#00D9FF] rounded-full animate-pulse" />Specialized Skills</h3>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {['NLP', 'Sentiment Analysis', 'Data Cleaning', 'Feature Engineering', 'Reporting', 'Azure Data Fundamentals'].map((skill) => (
                      <motion.span key={skill} variants={scaleIn} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                        className="px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm rounded-full bg-[#00D9FF]/10 border border-[#00D9FF]/40 text-[#00D9FF] hover:bg-[#00D9FF]/20 transition-all cursor-default">{skill}</motion.span>
                    ))}
                  </div>
                </InteractiveCard>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <InteractiveCard glowColor="purple" className="bg-[#1A1F3A]/80 backdrop-blur-sm p-5 sm:p-6 md:p-8 rounded-xl border border-[#A855F7]/30 h-full">
                  <h3 className="text-lg md:text-xl font-semibold text-[#A855F7] mb-4 md:mb-6 flex items-center gap-2"><span className="w-2 h-2 bg-[#A855F7] rounded-full animate-pulse" />Soft Skills</h3>
                  <ul className="space-y-3 md:space-y-4">
                    {['Analytical Thinking', 'Detail-Oriented', 'Consistency & Discipline', 'Documentation Mindset', 'Team Coordination'].map((item) => (
                      <motion.li key={item} variants={slideInLeft} className="flex items-center gap-3 text-gray-300 text-xs sm:text-sm md:text-base group">
                        <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-gradient-to-r from-[#A855F7] to-purple-400 group-hover:scale-125 transition-transform" />
                        <span className="group-hover:text-white transition-colors">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </InteractiveCard>
              </motion.div>
            </div>
            <motion.div variants={scaleIn} className="bg-gradient-to-r from-[#00D9FF]/10 via-cyan-500/10 to-[#A855F7]/10 border border-[#00D9FF]/30 rounded-xl p-4 md:p-6 text-center backdrop-blur-sm">
              <p className="text-sm md:text-base font-medium"><span className="text-gray-400">Currently Learning: </span><span className="bg-gradient-to-r from-[#00D9FF] to-[#A855F7] bg-clip-text text-transparent font-semibold">Advanced Excel Workflows & Structured Reporting Systems</span></p>
            </motion.div>
          </div>
        </Section>

        {/* EXPERIENCE */}
        <Section id="experience">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionTitle title="Work Experience" />
            <div className="relative max-w-4xl mx-auto">
              <div className="absolute left-3 md:left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00D9FF] via-[#A855F7] to-[#00D9FF] rounded-full" />
              <motion.div variants={slideInRight} className="relative pl-10 md:pl-16">
                <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} className="absolute left-0 top-6 w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-[#00D9FF] to-[#A855F7] flex items-center justify-center shadow-[0_0_20px_rgba(0,217,255,0.5)]">
                  <span className="w-2 h-2 bg-white rounded-full" />
                </motion.div>
                <InteractiveCard glowColor="cyan" className="bg-[#1A1F3A]/80 backdrop-blur-sm p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl border border-[#00D9FF]/30">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white">Information Technology Intern</h3>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs md:text-sm rounded-full bg-[#00D9FF]/20 border border-[#00D9FF]/40 text-[#00D9FF] w-fit">🗓 Jan 2025 – Feb 2025</span>
                  </div>
                  <p className="text-[#00D9FF] font-medium text-sm md:text-base mb-1">Balai Besar Karantina Hewan, Ikan, dan Tumbuhan Sulawesi Selatan</p>
                  <p className="flex items-center gap-1.5 text-gray-400 text-xs md:text-sm mb-4 md:mb-6">📍 Makassar, Indonesia</p>
                  <p className="text-gray-300 mb-4 md:mb-6 text-xs sm:text-sm md:text-base leading-relaxed">Internship role focused on administrative data processing and operational documentation within a government institution, working almost entirely with Microsoft Excel to ensure data accuracy, traceability, and structured reporting.</p>
                  <div className="mb-4 md:mb-6">
                    <h4 className="text-[#00D9FF] font-semibold mb-3 text-sm md:text-base flex items-center gap-2">🔑 Key Responsibilities</h4>
                    <ul className="space-y-2 md:space-y-3">
                      {['Managed and processed 10,000+ operational documents using Microsoft Excel', 'Performed data entry, validation, recapitulation, and status tracking', 'Prepared operational reports based on structured datasets', 'Developed Excel templates and standardized data entry formats', 'Assisted in creating simple documentation and operational SOPs', 'Provided first-level support for basic data and system-related issues'].map((item) => (
                        <li key={item} className="flex items-start gap-2 md:gap-3 text-gray-300 text-xs sm:text-sm"><span className="mt-1.5 w-1.5 h-1.5 bg-[#00D9FF] rounded-full flex-shrink-0" />{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mb-4 md:mb-6">
                    <h4 className="text-[#A855F7] font-semibold mb-3 text-sm md:text-base flex items-center gap-2">🎯 Impact</h4>
                    <ul className="space-y-2 md:space-y-3">
                      {['Improved data consistency and traceability across operational documents', 'Enhanced efficiency and clarity of reporting through standardized Excel templates'].map((item) => (
                        <li key={item} className="flex items-start gap-2 md:gap-3 text-gray-300 text-xs sm:text-sm"><span className="mt-1.5 w-1.5 h-1.5 bg-[#A855F7] rounded-full flex-shrink-0" />{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Microsoft Excel', 'Microsoft Word', 'Google Drive', 'Data Entry Systems'].map((tech) => (
                      <span key={tech} className="px-2.5 py-1 md:px-3 md:py-1.5 text-[10px] md:text-xs rounded-full bg-[#00D9FF]/10 border border-[#00D9FF]/30 text-[#00D9FF]">{tech}</span>
                    ))}
                  </div>
                </InteractiveCard>
              </motion.div>
            </div>
          </div>
        </Section>

        {/* PROJECTS */}
        <Section id="projects" dark>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionTitle title="Projects & Experience" subtitle="Data analysis, documentation, and administrative-focused projects built with structured workflows." />
            
            {/* FEATURED PROJECT - Thesis */}
            <motion.div variants={fadeInUp} className="mb-6 md:mb-8">
              <InteractiveCard glowColor="cyan" className="bg-gradient-to-br from-[#1A1F3A] to-[#0d1229] backdrop-blur-sm p-5 sm:p-6 md:p-8 rounded-xl border-2 border-[#00D9FF]/50 relative overflow-hidden">
                {/* Featured Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-[#00D9FF] to-[#A855F7] rounded-full text-[10px] md:text-xs font-bold text-white shadow-lg">
                  ⭐ FEATURED PROJECT
                </div>
                
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 pr-24 md:pr-32">
                      Sentiment Analysis of TradingView Reviews
                    </h3>
                    <p className="text-[#00D9FF] text-sm md:text-base mb-4 font-medium">
                      📄 Undergraduate Thesis Project (Jul 2024 – Dec 2024)
                    </p>
                    <p className="text-gray-300 text-sm md:text-base mb-4 leading-relaxed">
                      Developed a complete sentiment classification system to analyze Indonesian user reviews from TradingView, combining NLP techniques with machine learning for actionable insights.
                    </p>
                    <ul className="text-gray-300 text-xs sm:text-sm md:text-base space-y-2 mb-4">
                      {['Managed & processed 3,000+ reviews using Excel for data preparation', 'Implemented data cleaning, validation & preprocessing pipeline', 'Built NLP pipeline with TF-IDF vectorization', 'Trained Random Forest classifier with optimized hyperparameters', 'Achieved structured academic documentation & reporting'].map((item) => (
                        <li key={item} className="flex items-start gap-2"><span className="mt-1.5 w-2 h-2 bg-[#00D9FF] rounded-full flex-shrink-0" />{item}</li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {['Python', 'NLP', 'Random Forest', 'Scikit-learn', 'Pandas', 'Microsoft Excel', 'TF-IDF'].map((tag) => (
                        <span key={tag} className="px-3 py-1 md:px-4 md:py-1.5 text-xs md:text-sm rounded-full bg-[#00D9FF]/20 border border-[#00D9FF]/50 text-[#00D9FF] font-medium">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </InteractiveCard>
            </motion.div>

            {/* Other Projects Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
              {[
                { title: 'Research Data Processing Support', subtitle: 'Academic Project (Jul 2024 – Dec 2024)', color: 'purple', items: ['Large dataset handling', 'Data validation & consistency', 'Reporting & documentation support'], tags: ['Microsoft Excel', 'Documentation', 'Reporting'] },
                { title: 'AI RAG Chatbot Prototype', subtitle: 'System Documentation Project (Jan 2025 – Feb 2025)', color: 'cyan', items: ['System & user documentation', 'Testing & behavior recording', 'QA & validation support'], tags: ['AI/RAG', 'Documentation', 'QA'] },
                { title: 'School Website Development', subtitle: 'Freelance – Project Administration (Oct 2025 – Nov 2025)', color: 'purple', items: ['Academic content management', 'Documentation & archives', 'Data accuracy coordination'], tags: ['Web Admin', 'Content Management', 'Documentation'] }
              ].map((project) => (
                <motion.div key={project.title} variants={fadeInUp}>
                  <InteractiveCard glowColor={project.color} className={`bg-[#1A1F3A]/80 backdrop-blur-sm p-4 sm:p-5 md:p-6 rounded-xl border ${project.color === 'cyan' ? 'border-[#00D9FF]/30' : 'border-[#A855F7]/30'} h-full`}>
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-1 md:mb-2">{project.title}</h3>
                    <p className={`text-[10px] sm:text-xs md:text-sm mb-3 md:mb-4 ${project.color === 'cyan' ? 'text-[#00D9FF]' : 'text-[#A855F7]'}`}>{project.subtitle}</p>
                    <ul className="text-gray-300 text-[10px] sm:text-xs md:text-sm space-y-1.5 md:space-y-2 mb-3 md:mb-4">
                      {project.items.map((item) => (<li key={item} className="flex items-start gap-2"><span className={`mt-1 w-1 h-1 rounded-full flex-shrink-0 ${project.color === 'cyan' ? 'bg-[#00D9FF]' : 'bg-[#A855F7]'}`} />{item}</li>))}
                    </ul>
                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                      {project.tags.map((tag) => (<span key={tag} className={`px-2 py-0.5 md:px-2.5 md:py-1 text-[9px] md:text-xs rounded-full ${project.color === 'cyan' ? 'bg-[#00D9FF]/10 border border-[#00D9FF]/30 text-[#00D9FF]' : 'bg-[#A855F7]/10 border border-[#A855F7]/30 text-[#A855F7]'}`}>{tag}</span>))}
                    </div>
                  </InteractiveCard>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* ACHIEVEMENTS */}
        <Section id="achievements">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <SectionTitle title="Achievements & Certifications" subtitle="Academic recognition, workshops, and professional certifications that reflect my analytical, documentation, and communication skills." />
            <div className="space-y-4 md:space-y-6">
              {/* EIConCIT */}
              <motion.div variants={fadeInUp}>
                <InteractiveCard glowColor="cyan" className="bg-[#1A1F3A]/80 backdrop-blur-sm p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl border border-[#00D9FF]/30">
                  <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-[#00D9FF] to-cyan-600 flex items-center justify-center text-2xl md:text-3xl flex-shrink-0 shadow-lg">🎤</div>
                    <div className="flex-1">
                      <span className="inline-block px-2.5 py-0.5 mb-2 text-[10px] md:text-xs font-semibold rounded-full bg-[#00D9FF]/20 border border-[#00D9FF]/40 text-[#00D9FF]">🏆 ORAL PRESENTER</span>
                      <h3 className="text-lg md:text-xl font-semibold text-white mb-1">EIConCIT 2024 – Oral Presenter</h3>
                      <p className="text-[#00D9FF] text-xs md:text-sm mb-3">East Indonesia Conference on Computer and Information Technology</p>
                      <p className="text-gray-300 text-xs sm:text-sm md:text-base mb-4">Selected as an oral presenter at an international academic conference, presenting undergraduate research on sentiment analysis and machine learning.</p>
                      <ul className="space-y-2 mb-4">
                        {['Applied NLP techniques on Indonesian-language user reviews', 'Built classification pipeline using Random Forest', 'Focused on structured data handling and analytical reporting'].map((item) => (<li key={item} className="flex items-start gap-2 text-gray-300 text-xs sm:text-sm"><span className="mt-1.5 w-1.5 h-1.5 bg-[#00D9FF] rounded-full flex-shrink-0" />{item}</li>))}
                      </ul>
                      <p className="text-gray-400 text-xs sm:text-sm italic">Strengthened my ability to communicate technical findings in formal academic environments.</p>
                    </div>
                  </div>
                </InteractiveCard>
              </motion.div>
              {/* Workshop 1 */}
              <motion.div variants={fadeInUp}>
                <InteractiveCard glowColor="cyan" className="bg-[#1A1F3A]/80 backdrop-blur-sm p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl border border-[#00D9FF]/30">
                  <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-[#00D9FF] to-cyan-600 flex items-center justify-center text-2xl md:text-3xl flex-shrink-0 shadow-lg">👥</div>
                    <div className="flex-1">
                      <span className="inline-block px-2.5 py-0.5 mb-2 text-[10px] md:text-xs font-semibold rounded-full bg-[#00D9FF]/20 border border-[#00D9FF]/40 text-[#00D9FF]">🎤 WORKSHOP SPEAKER</span>
                      <h3 className="text-lg md:text-xl font-semibold text-white mb-1">Workshop Speaker: Sentiment Analysis</h3>
                      <p className="text-[#00D9FF] text-xs md:text-sm mb-3">Academic Workshop (Final-Year Students & Lab Assistant Candidates)</p>
                      <ul className="space-y-2 mb-4">
                        {['Explained end-to-end sentiment analysis workflow', 'Demonstrated machine learning model training with Python', 'Showed how unstructured text becomes structured insights'].map((item) => (<li key={item} className="flex items-start gap-2 text-gray-300 text-xs sm:text-sm"><span className="mt-1.5 w-1.5 h-1.5 bg-[#00D9FF] rounded-full flex-shrink-0" />{item}</li>))}
                      </ul>
                      <p className="text-gray-400 text-xs sm:text-sm italic">Improved my ability to translate technical concepts into practical learning materials.</p>
                    </div>
                  </div>
                </InteractiveCard>
              </motion.div>
              {/* Workshop 2 */}
              <motion.div variants={fadeInUp}>
                <InteractiveCard glowColor="cyan" className="bg-[#1A1F3A]/80 backdrop-blur-sm p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl border border-[#00D9FF]/30">
                  <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-[#00D9FF] to-cyan-600 flex items-center justify-center text-2xl md:text-3xl flex-shrink-0 shadow-lg">💡</div>
                    <div className="flex-1">
                      <span className="inline-block px-2.5 py-0.5 mb-2 text-[10px] md:text-xs font-semibold rounded-full bg-[#00D9FF]/20 border border-[#00D9FF]/40 text-[#00D9FF]">🎤 WORKSHOP SPEAKER</span>
                      <h3 className="text-lg md:text-xl font-semibold text-white mb-1">Workshop Speaker: Machine Learning Fundamentals</h3>
                      <p className="text-[#00D9FF] text-xs md:text-sm mb-3">Academic Workshop (Undergraduate Students)</p>
                      <ul className="space-y-2 mb-4">
                        {['Introduced core machine learning principles', 'Explained data preparation and evaluation basics', 'Connected theory with real-world data use cases'].map((item) => (<li key={item} className="flex items-start gap-2 text-gray-300 text-xs sm:text-sm"><span className="mt-1.5 w-1.5 h-1.5 bg-[#00D9FF] rounded-full flex-shrink-0" />{item}</li>))}
                      </ul>
                      <p className="text-gray-400 text-xs sm:text-sm italic">Enhanced my skills in structured explanation and audience-focused delivery.</p>
                    </div>
                  </div>
                </InteractiveCard>
              </motion.div>
              {/* Azure */}
              <motion.div variants={fadeInUp}>
                <InteractiveCard glowColor="purple" className="bg-gradient-to-br from-[#1A1F3A] to-[#1a1035] backdrop-blur-sm p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl border-2 border-[#A855F7]/50 relative overflow-hidden">
                  {/* Top Score Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-[#A855F7] to-[#00D9FF] rounded-full text-[10px] md:text-xs font-bold text-white shadow-lg">
                    🏆 TOP 6% SCORE
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-[#A855F7] to-purple-600 flex items-center justify-center text-2xl md:text-3xl flex-shrink-0 shadow-lg">🛡️</div>
                    <div className="flex-1">
                      <span className="inline-block px-2.5 py-0.5 mb-2 text-[10px] md:text-xs font-semibold rounded-full bg-[#A855F7]/20 border border-[#A855F7]/40 text-[#A855F7]">🎓 MICROSOFT CERTIFIED</span>
                      <h3 className="text-lg md:text-xl font-semibold text-white mb-1 pr-20 md:pr-28">Microsoft Certified: Azure Data Fundamentals (DP-900)</h3>
                      <p className="text-[#A855F7] text-xs md:text-sm mb-3">Microsoft Corporation · Oct 30, 2024</p>
                      <p className="text-gray-300 text-xs sm:text-sm md:text-base mb-4">Demonstrated strong understanding of core data concepts, relational and non-relational data, and analytics workloads on Microsoft Azure.</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-[#0A0E27]/50 rounded-lg p-4 border border-[#A855F7]/20">
                          <h4 className="text-[#00D9FF] font-semibold mb-3 text-sm">Certification Coverage</h4>
                          <ul className="space-y-2">{['Core data concepts (relational & non-relational)', 'Relational data workloads on Azure', 'Non-relational data solutions in Azure', 'Analytics workloads on Azure'].map((item) => (<li key={item} className="flex items-start gap-2 text-gray-300 text-xs"><span className="mt-1 w-1 h-1 bg-[#00D9FF] rounded-full flex-shrink-0" />{item}</li>))}</ul>
                        </div>
                        <div className="bg-gradient-to-br from-[#A855F7]/20 to-[#0A0E27]/50 rounded-lg p-4 border border-[#A855F7]/40">
                          <h4 className="text-[#A855F7] font-semibold mb-2 text-sm">Exam Performance</h4>
                          <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#A855F7] to-[#00D9FF] bg-clip-text text-transparent mb-1">940</div>
                          <div className="text-sm text-gray-400 mb-3">out of 1000 · Passing: 700</div>
                          <ul className="space-y-1.5 text-xs text-gray-300">
                            <li className="flex justify-between items-center"><span>Core Data Concepts</span><span className="px-2 py-0.5 bg-[#00D9FF]/20 rounded text-[#00D9FF] font-semibold">100%</span></li>
                            <li className="flex justify-between items-center"><span>Relational Data</span><span className="text-[#00D9FF]">88%</span></li>
                            <li className="flex justify-between items-center"><span>Non-Relational Data</span><span className="text-[#00D9FF]">93%</span></li>
                            <li className="flex justify-between items-center"><span>Analytics Workloads</span><span className="text-[#00D9FF]">95%</span></li>
                          </ul>
                        </div>
                      </div>
                      <p className="text-gray-400 text-xs sm:text-sm italic mt-4">Reflects readiness to work in structured, data-driven operational environments.</p>
                    </div>
                  </div>
                </InteractiveCard>
              </motion.div>
            </div>
          </div>
        </Section>

        {/* EDUCATION */}
        <Section id="education" dark>
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <SectionTitle title="Education" />
            <motion.div variants={fadeInUp}>
              <InteractiveCard glowColor="cyan" className="bg-[#1A1F3A]/80 backdrop-blur-sm p-4 sm:p-6 md:p-8 lg:p-10 rounded-xl border-2 border-[#00D9FF]/50">
                <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-[#00D9FF] to-cyan-600 flex items-center justify-center text-2xl md:text-3xl flex-shrink-0 shadow-lg">🎓</div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white">Bachelor of Informatics Engineering</h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] md:text-xs bg-[#00D9FF]/20 border border-[#00D9FF]/40 text-[#00D9FF]">2021 – 2025</span>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] md:text-xs bg-[#A855F7]/20 border border-[#A855F7]/40 text-[#A855F7]">GPA: 3.56 / 4.00</span>
                      </div>
                    </div>
                    <p className="text-[#00D9FF] font-medium text-sm md:text-base">Universitas Muslim Indonesia</p>
                    <p className="text-gray-400 text-xs md:text-sm mb-4 md:mb-6">Makassar, South Sulawesi, Indonesia</p>
                    <div className="mb-4 md:mb-6">
                      <h4 className="text-[#00D9FF] font-semibold mb-3 text-sm md:text-base">📚 Relevant Coursework</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1.5 text-gray-300 text-xs md:text-sm">
                        <ul className="space-y-1.5"><li>• Data Structures & Algorithms</li><li>• Database Management Systems</li><li>• Information Systems</li><li>• Software Engineering</li></ul>
                        <ul className="space-y-1.5"><li>• Data Mining</li><li>• Natural Language Processing</li><li>• Machine Learning (Fundamentals)</li><li>• Web Development</li></ul>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-[#A855F7] font-semibold mb-2 text-sm md:text-base">📄 Final Project</h4>
                      <p className="text-white font-medium text-sm md:text-base mb-1">"Sentiment Analysis of Indonesian TradingView Reviews"</p>
                      <p className="text-gray-300 text-xs md:text-sm">Developed a sentiment classification system using Natural Language Processing and machine learning techniques to analyze Indonesian user reviews. The project emphasized structured data preparation, validation, and analytical reporting aligned with real-world data operations workflows.</p>
                    </div>
                  </div>
                </div>
              </InteractiveCard>
            </motion.div>
          </div>
        </Section>

        {/* CONTACT */}
        <Section id="contact">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionTitle title="Get In Touch" subtitle="Interested in data operations, administrative support, or technical documentation roles? Let's connect!" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <motion.div variants={staggerContainer} className="space-y-3 md:space-y-4">
                {[
                  { icon: '✉️', title: 'Email', value: 'rhcczmr@gmail.com', href: 'mailto:rhcczmr@gmail.com', color: 'cyan' },
                  { icon: <FaLinkedinIn />, title: 'LinkedIn', value: 'Rhacac Zamar', href: 'https://www.linkedin.com/in/rhacac-zamar-03a277227/', color: 'purple' },
                  { icon: <FaGithub />, title: 'GitHub', value: 'github.com/rhcczmr', href: 'https://github.com/rhcczmr', color: 'cyan' },
                  { icon: '📍', title: 'Location', value: 'Makassar, South Sulawesi, Indonesia', color: 'purple' },
                ].map((contact) => (
                  <motion.div key={contact.title} variants={slideInLeft}>
                    {contact.href ? (
                      <a href={contact.href} target={contact.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                        <InteractiveCard glowColor={contact.color} className={`bg-[#1A1F3A]/80 backdrop-blur-sm p-4 md:p-5 rounded-xl border ${contact.color === 'cyan' ? 'border-[#00D9FF]/30' : 'border-[#A855F7]/30'} flex items-center gap-3 md:gap-4`}>
                          <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br ${contact.color === 'cyan' ? 'from-[#00D9FF] to-cyan-600' : 'from-[#A855F7] to-purple-600'} flex items-center justify-center text-lg md:text-xl`}>{contact.icon}</div>
                          <div><h4 className="text-white font-semibold text-sm md:text-base">{contact.title}</h4><p className={`text-xs md:text-sm ${contact.color === 'cyan' ? 'text-[#00D9FF]' : 'text-[#A855F7]'}`}>{contact.value}</p></div>
                        </InteractiveCard>
                      </a>
                    ) : (
                      <InteractiveCard glowColor={contact.color} className={`bg-[#1A1F3A]/80 backdrop-blur-sm p-4 md:p-5 rounded-xl border ${contact.color === 'cyan' ? 'border-[#00D9FF]/30' : 'border-[#A855F7]/30'} flex items-center gap-3 md:gap-4`}>
                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br ${contact.color === 'cyan' ? 'from-[#00D9FF] to-cyan-600' : 'from-[#A855F7] to-purple-600'} flex items-center justify-center text-lg md:text-xl`}>{contact.icon}</div>
                        <div><h4 className="text-white font-semibold text-sm md:text-base">{contact.title}</h4><p className="text-gray-400 text-xs md:text-sm">{contact.value}</p></div>
                      </InteractiveCard>
                    )}
                  </motion.div>
                ))}
              </motion.div>
              <motion.div variants={slideInRight}>
                <InteractiveCard glowColor="cyan" className="bg-[#1A1F3A]/80 backdrop-blur-sm p-5 sm:p-6 md:p-8 rounded-xl border-2 border-[#00D9FF]/30 h-full">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4">Ready to Connect?</h3>
                  <p className="text-gray-300 mb-4 md:mb-6 text-xs sm:text-sm md:text-base leading-relaxed">I'm currently seeking opportunities in data operations, administrative support, and documentation roles where I can apply my Excel expertise, structured data handling, and process discipline.</p>
                  <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8 text-xs md:text-sm text-gray-300">
                    <li className="flex gap-2"><span className="text-[#00D9FF]">✔</span>Open to full-time, contract, or freelance opportunities</li>
                    <li className="flex gap-2"><span className="text-[#00D9FF]">✔</span>Available for remote or on-site work in Makassar area</li>
                    <li className="flex gap-2"><span className="text-[#00D9FF]">✔</span>Typically respond within 24 hours</li>
                  </ul>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <motion.a href="mailto:rhcczmr@gmail.com" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-[#00D9FF] to-cyan-500 text-white font-semibold rounded-xl text-sm md:text-base shadow-[0_0_20px_rgba(0,217,255,0.3)]">Send Email</motion.a>
                    <motion.a href="/cv/Usamah_Rhacac_Zamar_CV.pdf" download whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1 px-5 py-3 border-2 border-[#00D9FF] text-[#00D9FF] rounded-xl text-center font-semibold text-sm md:text-base hover:bg-[#00D9FF]/10 transition-colors">Download Full CV</motion.a>
                  </div>
                </InteractiveCard>
              </motion.div>
            </div>
          </div>
        </Section>

        {/* FOOTER */}
        <footer className="relative bg-[#0d1229]/80 border-t border-[#00D9FF]/10 py-8 md:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 bg-gradient-to-r from-[#00D9FF] to-[#A855F7] bg-clip-text text-transparent">Usamah Rhacac Zamar</h3>
                <p className="text-gray-400 text-xs md:text-sm">Data & Administrative Operations Specialist focused on Excel-based workflows, structured data handling, and operational documentation.</p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-3 text-sm md:text-base">Quick Links</h4>
                <ul className="space-y-1.5">{['About', 'Skills', 'Experience', 'Projects', 'Contact'].map((link) => (<li key={link}><button onClick={() => scrollToSection(link.toLowerCase())} className="text-gray-400 hover:text-[#00D9FF] transition-colors text-xs md:text-sm">{link}</button></li>))}</ul>
              </div>
              <div className="sm:col-span-2 md:col-span-1">
                <h4 className="text-white font-semibold mb-3 text-sm md:text-base">Connect</h4>
                <div className="flex gap-3 mb-3">
                  {[{ icon: <FaEnvelope />, href: 'mailto:rhcczmr@gmail.com' }, { icon: <FaLinkedinIn />, href: 'https://www.linkedin.com/in/rhacac-zamar-03a277227/' }, { icon: <FaGithub />, href: 'https://github.com/rhcczmr' }].map((social, index) => (
                    <motion.a key={index} href={social.href} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.9 }}
                      className="w-9 h-9 md:w-10 md:h-10 bg-[#1A1F3A] border border-[#00D9FF]/30 rounded-lg flex items-center justify-center text-gray-400 hover:text-[#00D9FF] hover:border-[#00D9FF] transition-all">{social.icon}</motion.a>
                  ))}
                </div>
                <p className="text-gray-400 text-xs md:text-sm">Makassar, South Sulawesi, Indonesia</p>
              </div>
            </div>
            <div className="border-t border-[#00D9FF]/10 pt-4 md:pt-6 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4">
              <p className="text-gray-500 text-xs md:text-sm text-center md:text-left">© 2025 Usamah Rhacac Zamar. All rights reserved.</p>
              <p className="text-gray-500 text-xs md:text-sm">Built around <span className="text-[#00D9FF]">data accuracy</span> & <span className="text-[#A855F7]">documentation</span></p>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}