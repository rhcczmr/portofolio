'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// ==============================
// Framer Motion Variants
// ==============================
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}


// ==============================
// Page Component
// ==============================
export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  // ==============================
  // FIX DOWNLOAD CV (FINAL)
  // ==============================
  const handleDownloadCV = () => {
    window.open('/cv/Usamah_Rhacac_Zamar_CV.pdf', '_blank')
  }

  return (
    <main className="min-h-screen bg-dark font-inter overflow-x-hidden">

      {/* ==========================
          NAVBAR
      ========================== */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
        style={{
          background: isScrolled ? 'rgba(26,31,58,0.9)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => scrollToSection('hero')}
            className="text-2xl font-poppins font-bold gradient-text"
          >
            RZ
          </motion.button>

          {/* Nav Items */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="hidden md:flex items-center gap-8"
          >
            {['about', 'skills', 'experience', 'projects', 'achievements', 'contact'].map(
              (item) => (
                <motion.button
                  key={item}
                  variants={fadeInUp}
                  onClick={() => scrollToSection(item)}
                  className="text-gray-300 hover:text-primary transition-colors font-medium"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </motion.button>
              )
            )}
          </motion.div>

          {/* ==========================
              DOWNLOAD CV (FIXED)
          ========================== */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={handleDownloadCV}
            className="hidden md:inline-flex px-6 py-2.5 bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg shadow-glow-cyan hover:shadow-glow-cyan-lg transition-all duration-300"
          >
            Download CV
          </motion.button>
        </div>
      </motion.nav>

      {/* ====== SECTION LAIN DI BAWAH TIDAK DIUBAH ====== */}


      {/* ==========================
    HERO SECTION
========================== */}
<motion.section
  id="hero"
  initial="hidden"
  animate="visible"
  variants={staggerContainer}
  className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24"
>
  {/* Background */}
  <div className="absolute inset-0 animated-gradient" />
  <div className="absolute inset-0 grid-background opacity-20" />

  {/* Floating Orbs */}
  <motion.div
    animate={{ scale: [1, 1.2, 1] }}
    transition={{ duration: 6, repeat: Infinity }}
    className="absolute -top-32 -left-32 w-96 h-96 bg-primary/30 rounded-full blur-3xl"
  />

  <motion.div
    animate={{ scale: [1, 1.2, 1] }}
    transition={{ duration: 6, repeat: Infinity, delay: 2 }}
    className="absolute -bottom-32 -right-32 w-96 h-96 bg-secondary/30 rounded-full blur-3xl"
  />

  {/* Content */}
  <motion.div
    variants={staggerContainer}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className="relative z-10 text-center px-4 max-w-4xl"
  >
    {/* Profile Photo */}
    <motion.div
      variants={scaleIn}
      whileHover={{ scale: 1.05 }}
      className="w-40 h-40 mx-auto mb-8 rounded-full overflow-hidden
                 border border-primary/40 shadow-glow-cyan"
    >
      <img
        src="/profile.jpg"
        alt="Usamah Rhacac Zamar"
        className="w-full h-full object-cover"
      />
    </motion.div>

    {/* Name */}
    <motion.h1
      variants={fadeInUp}
      className="text-5xl md:text-6xl font-poppins font-bold text-white mb-4"
    >
      Usamah Rhacac Zamar
    </motion.h1>

    {/* Role */}
    <motion.h2
      variants={fadeInUp}
      transition={{ delay: 0.2 }}
      className="text-2xl md:text-3xl text-primary mb-6"
    >
      Data & Administrative Operations Specialist
    </motion.h2>

    {/* Description */}
    <motion.p
      variants={fadeInUp}
      transition={{ delay: 0.4 }}
      className="text-lg md:text-xl text-gray-300 mb-12"
    >
      Focused on structured data handling, Excel-based operations,
      documentation, and administrative reliability.
    </motion.p>

    {/* CTA Buttons */}
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <motion.button
        whileHover={{ scale: 1.05 }}
        onClick={() => scrollToSection('projects')}
        className="px-8 py-3 bg-gradient-to-r from-primary to-primary-dark
                   text-white rounded-lg shadow-glow-cyan"
      >
        View My Work
      </motion.button>

      <motion.a
        whileHover={{ scale: 1.05 }}
        href="/cv/Usamah_Rhacac_Zamar_CV.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="px-8 py-3 border-2 border-primary text-primary
                   rounded-lg hover:bg-primary hover:text-dark transition-all"
      >
        Download CV
      </motion.a>
    </div>
  </motion.div>
</motion.section>
{/* ===== END HERO ===== */}

      {/* ==========================
          ABOUT SECTION
      ========================== */}
      <motion.section
  id="about"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={staggerContainer}
  className="relative py-20 bg-dark overflow-hidden"
>
  <div className="absolute inset-0 grid-background opacity-10" />

  <motion.div className="relative z-10 max-w-7xl mx-auto px-4">
    <motion.div variants={fadeInUp} className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-poppins font-bold gradient-text mb-4">
        About Me
      </h2>
      <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto" />
    </motion.div>

      

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Card 1 */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -8, scale: 1.03 }}
              className="bg-dark-card p-8 rounded-xl border border-primary/30 shadow-glow-cyan transition-all"
            >
              <div className="w-16 h-16 mb-6 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow-cyan">
                📄
              </div>
              <h3 className="text-xl font-semibold text-primary mb-4">
                Data Operations
              </h3>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• Excel mastery (10K+ records)</li>
                <li>• Data validation & QC</li>
                <li>• Reporting & documentation</li>
              </ul>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -8, scale: 1.03 }}
              className="bg-dark-card p-8 rounded-xl border border-secondary/30 shadow-glow-purple transition-all"
            >
              <div className="w-16 h-16 mb-6 rounded-lg bg-gradient-to-br from-secondary to-primary flex items-center justify-center shadow-glow-purple">
                ✅
              </div>
              <h3 className="text-xl font-semibold text-secondary mb-4">
                Administrative Support
              </h3>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• SOP development</li>
                <li>• Documentation standards</li>
                <li>• Operational workflows</li>
              </ul>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -8, scale: 1.03 }}
              className="bg-dark-card p-8 rounded-xl border border-primary/30 shadow-glow-cyan transition-all"
            >
              <div className="w-16 h-16 mb-6 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow-cyan">
                💻
              </div>
              <h3 className="text-xl font-semibold text-primary mb-4">
                Technical Foundation
              </h3>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• Python (Pandas, NumPy)</li>
                <li>• SQL (MySQL)</li>
                <li>• Microsoft Azure certified</li>
              </ul>
            </motion.div>
          </div>

          {/* Journey Card */}
          <motion.div
            variants={scaleIn}
            className="max-w-4xl mx-auto bg-dark-card p-10 rounded-xl border border-primary/20 shadow-glow-cyan-lg"
          >
            <h3 className="text-2xl font-poppins font-bold gradient-text mb-6">
              My Journey
            </h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              I am a graduate of Informatics Engineering with a strong focus on
              data processing, administrative operations, and system
              documentation. My experience includes managing more than 10,000
              operational documents during my internship at a government
              institution, where I worked almost entirely using Microsoft Excel
              for data entry, validation, tracking, and reporting.
            </p>
            <p className="text-gray-300 leading-relaxed">
              I am detail-oriented, structured, and comfortable working with
              large datasets, ensuring data accuracy and consistency to support
              operational and reporting needs. Currently, I am focused on
              administrative and data operations roles where reliability,
              documentation, and process discipline are essential.
            </p>
          </motion.div>
        </motion.div>
            </motion.section>
      {/* ===== END ABOUT ===== */}

      {/* ==========================
          SKILLS SECTION
      ========================== */}
      <motion.section
  id="skills"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={staggerContainer}
  className="relative py-20 bg-dark-secondary overflow-hidden"
>
  <div className="absolute inset-0 grid-background opacity-10" />

  <motion.div className="relative z-10 max-w-7xl mx-auto px-4">
    <motion.div variants={fadeInUp} className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-poppins font-bold gradient-text mb-4">
        Skills & Expertise
      </h2>
      <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto" />
    </motion.div>

          

          {/* Top Row */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Primary Skills */}
            <motion.div
              variants={fadeInUp}
              className="bg-dark-card p-8 rounded-xl border border-primary/30 shadow-glow-cyan"
            >
              <h3 className="text-2xl font-semibold text-primary mb-6 flex items-center gap-3">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Primary Skills
              </h3>

              <ul className="space-y-4">
                {[
                  'Microsoft Excel (Advanced)',
                  'Microsoft Word (Advanced)',
                  'Data Entry & Processing',
                  'Data Validation',
                  'Documentation & SOP',
                ].map((item) => (
                  <motion.li
                    key={item}
                    variants={slideInLeft}
                    className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
                  >
                    <span className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-secondary shadow-glow-cyan" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Technical Skills */}
            <motion.div
              variants={fadeInUp}
              className="bg-dark-card p-8 rounded-xl border border-secondary/30 shadow-glow-purple"
            >
              <h3 className="text-2xl font-semibold text-secondary mb-6 flex items-center gap-3">
                <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                Technical Skills
              </h3>

              <ul className="space-y-4">
                {[
                  'Python (Pandas, NumPy, Scikit-learn)',
                  'SQL (MySQL)',
                  'Google Workspace (Sheets, Drive)',
                  'Git & GitHub',
                  'VS Code, Google Colab',
                ].map((item) => (
                  <motion.li
                    key={item}
                    variants={slideInLeft}
                    className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
                  >
                    <span className="w-3 h-3 rounded-full bg-gradient-to-r from-secondary to-primary shadow-glow-purple" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Bottom Row */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Specialized Skills */}
            <motion.div
              variants={fadeInUp}
              className="bg-dark-card p-8 rounded-xl border border-primary/30 shadow-glow-cyan"
            >
              <h3 className="text-2xl font-semibold text-primary mb-6 flex items-center gap-3">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Specialized Skills
              </h3>

              <div className="flex flex-wrap gap-3">
                {[
                  'NLP',
                  'Sentiment Analysis',
                  'Data Cleaning',
                  'Feature Engineering',
                  'Reporting',
                  'Azure Data Fundamentals',
                ].map((skill) => (
                  <motion.span
                    key={skill}
                    variants={scaleIn}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 text-sm rounded-full bg-primary/10 border border-primary/50 text-primary shadow-glow-cyan cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Soft Skills */}
            <motion.div
              variants={fadeInUp}
              className="bg-dark-card p-8 rounded-xl border border-secondary/30 shadow-glow-purple"
            >
              <h3 className="text-2xl font-semibold text-secondary mb-6 flex items-center gap-3">
                <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                Soft Skills
              </h3>

              <ul className="space-y-4">
                {[
                  'Analytical Thinking',
                  'Detail-Oriented',
                  'Consistency & Discipline',
                  'Documentation Mindset',
                  'Team Coordination',
                ].map((item) => (
                  <motion.li
                    key={item}
                    variants={slideInLeft}
                    className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
                  >
                    <span className="w-3 h-3 rounded-full bg-gradient-to-r from-secondary to-primary shadow-glow-purple" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Bottom Banner */}
          <motion.div
            variants={scaleIn}
            className="bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/50 rounded-xl p-6 text-center shadow-glow-cyan-lg"
          >
            <p className="text-lg font-medium gradient-text">
              Currently Learning: Advanced Excel Workflows & Structured Reporting
              Systems
            </p>
          </motion.div>
        </motion.div>
            </motion.section>
      {/* ===== END SKILLS ===== */}

      {/* ==========================
          EXPERIENCE SECTION
      ========================== */}
      <motion.section
  id="experience"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={staggerContainer}
  className="relative py-20 bg-dark overflow-hidden"
>
  <div className="absolute inset-0 grid-background opacity-10" />

  <motion.div className="relative z-10 max-w-7xl mx-auto px-4">
    <motion.div variants={fadeInUp} className="text-center mb-20">
      <h2 className="text-4xl md:text-5xl font-poppins font-bold gradient-text mb-4">
        Work Experience
      </h2>
      <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto" />
    </motion.div>

        

          {/* Timeline Wrapper */}
          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="absolute left-4 top-0 w-1 bg-gradient-to-b from-primary via-secondary to-primary rounded-full"
            />

            {/* Timeline Item */}
            <motion.div
              variants={slideInRight}
              className="relative pl-16"
            >
              {/* Timeline Dot */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="absolute left-0 top-4 w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary border-4 border-dark shadow-glow-cyan flex items-center justify-center"
              >
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              </motion.div>

              {/* Experience Card */}
              <motion.div
                whileHover={{ y: -8 }}
                className="bg-dark-card p-8 rounded-xl border border-primary/30 shadow-glow-cyan hover:shadow-glow-cyan-lg transition-all"
              >
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h3 className="text-2xl font-semibold text-white hover:text-primary transition-colors">
                    Information Technology Intern
                  </h3>

                  <span className="inline-block mt-2 md:mt-0 px-4 py-1 text-sm rounded-full bg-primary/20 border border-primary/50 text-primary">
                    Jan 2025 – Feb 2025
                  </span>
                </div>

                <p className="text-primary font-medium mb-1">
                  Balai Besar Karantina Hewan, Ikan, dan Tumbuhan Sulawesi Selatan
                </p>

                <p className="text-gray-400 text-sm mb-6 flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-secondary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7z"
                    />
                  </svg>
                  Makassar, Indonesia
                </p>

                <p className="text-gray-300 mb-6 leading-relaxed">
                  Internship role focused on administrative data processing and
                  operational documentation within a government institution,
                  working almost entirely with Microsoft Excel to ensure data
                  accuracy, traceability, and structured reporting.
                </p>

                {/* Responsibilities */}
                <div className="mb-6">
                  <h4 className="flex items-center gap-2 text-primary font-semibold mb-3">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Key Responsibilities
                  </h4>

                  <ul className="space-y-3">
                    {[
                      'Managed and processed 10,000+ operational documents using Microsoft Excel',
                      'Performed data entry, validation, recapitulation, and status tracking',
                      'Prepared operational reports based on structured datasets',
                      'Developed Excel templates and standardized data entry formats',
                      'Assisted in creating simple documentation and operational SOPs',
                      'Provided first-level support for basic data and system-related issues',
                    ].map((item) => (
                      <motion.li
                        key={item}
                        variants={slideInLeft}
                        className="flex items-start gap-3 text-gray-300"
                      >
                        <span className="mt-2 w-2 h-2 bg-primary rounded-full shadow-glow-cyan" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Impact */}
                <div className="mb-6">
                  <h4 className="flex items-center gap-2 text-secondary font-semibold mb-3">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    Impact
                  </h4>

                  <ul className="space-y-3">
                    {[
                      'Improved data consistency and traceability across operational documents',
                      'Enhanced efficiency and clarity of reporting through standardized Excel templates',
                    ].map((item) => (
                      <motion.li
                        key={item}
                        variants={slideInLeft}
                        className="flex items-start gap-3 text-gray-300"
                      >
                        <span className="mt-2 w-2 h-2 bg-secondary rounded-full shadow-glow-purple" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-3">
                  {[
                    'Microsoft Excel',
                    'Microsoft Word',
                    'Google Drive',
                    'Data Entry Systems',
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 text-sm rounded-full bg-primary/10 border border-primary/40 text-primary shadow-glow-cyan"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
            </motion.section>
      {/* ===== END EXPERIENCE ===== */}

      {/* ==========================
    PROJECTS SECTION
========================== */}
<motion.section
  id="projects"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={staggerContainer}
  className="relative py-20 bg-dark-secondary overflow-hidden"
>
  <div className="absolute inset-0 grid-background opacity-10" />

  <motion.div className="relative z-10 max-w-7xl mx-auto px-4">

    {/* Section Title */}
    <motion.div variants={fadeInUp} className="text-center mb-20">
      <h2 className="text-4xl md:text-5xl font-poppins font-bold gradient-text mb-4">
        Projects & Experience
      </h2>
      <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-4" />
      <p className="text-gray-400 max-w-2xl mx-auto">
        Data analysis, documentation, and administrative-focused projects
        built with structured workflows.
      </p>
    </motion.div>

    {/* Projects Grid */}
    <div className="grid md:grid-cols-2 gap-10">

      {/* ========= PROJECT 1 ========= */}
      <motion.div
        variants={fadeInUp}
        whileHover={{ y: -8 }}
        className="bg-dark-card p-8 rounded-xl border border-primary/40 shadow-glow-cyan hover:shadow-glow-cyan-lg transition-all"
      >
        <h3 className="text-2xl font-semibold text-white mb-2">
          Sentiment Analysis of TradingView Reviews
        </h3>
        <p className="text-primary text-sm mb-4">
          Undergraduate Thesis Project (Jul 2024 – Dec 2024)
        </p>

        <ul className="text-gray-300 text-sm space-y-2 mb-4">
          <li>• Managed 3,000+ reviews using Excel</li>
          <li>• Data cleaning & validation</li>
          <li>• NLP & Random Forest classification</li>
          <li>• Structured academic documentation</li>
        </ul>

        <div className="flex flex-wrap gap-2">
          {['Python', 'NLP', 'Random Forest', 'Microsoft Excel'].map(tag => (
            <span key={tag} className="px-3 py-1 text-xs rounded-full bg-primary/10 border border-primary/40 text-primary">
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      {/* ========= PROJECT 2 ========= */}
      <motion.div
        variants={fadeInUp}
        whileHover={{ y: -8 }}
        className="bg-dark-card p-8 rounded-xl border border-secondary/40 shadow-glow-purple hover:shadow-glow-purple-lg transition-all"
      >
        <h3 className="text-2xl font-semibold text-white mb-2">
          Research Data Processing Support
        </h3>
        <p className="text-secondary text-sm mb-4">
          Academic Project (Jul 2024 – Dec 2024)
        </p>

        <ul className="text-gray-300 text-sm space-y-2 mb-4">
          <li>• Large dataset handling</li>
          <li>• Data validation & consistency</li>
          <li>• Reporting & documentation support</li>
        </ul>

        <div className="flex flex-wrap gap-2">
          {['Microsoft Excel', 'Documentation', 'Reporting'].map(tag => (
            <span key={tag} className="px-3 py-1 text-xs rounded-full bg-secondary/10 border border-secondary/40 text-secondary">
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      {/* ========= PROJECT 3 ========= */}
      <motion.div
        variants={fadeInUp}
        whileHover={{ y: -8 }}
        className="bg-dark-card p-8 rounded-xl border border-primary/30 shadow-glow-cyan hover:shadow-glow-cyan-lg transition-all"
      >
        <h3 className="text-2xl font-semibold text-white mb-2">
          AI RAG Chatbot Prototype
        </h3>
        <p className="text-primary text-sm mb-4">
          System Documentation Project (Jan 2025 – Feb 2025)
        </p>

        <ul className="text-gray-300 text-sm space-y-2 mb-4">
          <li>• System & user documentation</li>
          <li>• Testing & behavior recording</li>
          <li>• QA & validation support</li>
        </ul>

        <div className="flex flex-wrap gap-2">
          {['AI/RAG', 'Documentation', 'QA'].map(tag => (
            <span key={tag} className="px-3 py-1 text-xs rounded-full bg-primary/10 border border-primary/30 text-primary">
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      {/* ========= PROJECT 4 ========= */}
      <motion.div
        variants={fadeInUp}
        whileHover={{ y: -8 }}
        className="bg-dark-card p-8 rounded-xl border border-secondary/30 shadow-glow-purple hover:shadow-glow-purple-lg transition-all"
      >
        <h3 className="text-2xl font-semibold text-white mb-2">
          School Website Development
        </h3>
        <p className="text-secondary text-sm mb-4">
          Freelance – Project Administration (Oct 2025 – Nov 2025)
        </p>

        <ul className="text-gray-300 text-sm space-y-2 mb-4">
          <li>• Academic content management</li>
          <li>• Documentation & archives</li>
          <li>• Data accuracy coordination</li>
        </ul>

        <div className="flex flex-wrap gap-2">
          {['Web Admin', 'Content Management', 'Documentation'].map(tag => (
            <span key={tag} className="px-3 py-1 text-xs rounded-full bg-secondary/10 border border-secondary/30 text-secondary">
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

    </div>
  </motion.div>
</motion.section>

      {/* ===== END PROJECTS ===== */}

      {/* ==========================
          ACHIEVEMENTS SECTION
      ========================== */}
      <motion.section
  id="achievements"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={staggerContainer}
  className="relative py-20 bg-dark overflow-hidden"
>
  {/* Background */}
  <div className="absolute inset-0 grid-background opacity-10" />

  <motion.div
    variants={staggerContainer}
    className="relative z-10 max-w-5xl mx-auto px-4"
  >
    {/* Section Title */}
    <motion.div variants={fadeInUp} className="text-center mb-20">
      <h2 className="text-4xl md:text-5xl font-poppins font-bold gradient-text mb-4">
        Achievements & Certifications
      </h2>
      <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-4" />
      <p className="text-gray-400 max-w-2xl mx-auto">
        Academic recognition, workshops, and professional certifications
        that reflect my analytical, documentation, and communication skills.
      </p>
    </motion.div>

    <div className="space-y-10">

          
            {/* ===== ACHIEVEMENT 1 ===== */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              className="bg-dark-card p-8 rounded-xl border-2 border-primary shadow-glow-cyan-lg hover:shadow-glow-cyan transition-all"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow-cyan text-3xl">
                  🎤
                </div>

                <div className="flex-1">
                  <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold rounded-full bg-primary/30 border border-primary text-primary">
                    🏆 ORAL PRESENTER
                  </span>

                  <h3 className="text-2xl font-semibold text-white mb-1">
                    EIConCIT 2024 – Oral Presenter
                  </h3>

                  <p className="text-primary text-sm mb-3">
                    East Indonesia Conference on Computer and Information Technology
                  </p>

                  <p className="text-gray-300 mb-4">
                    Selected as an oral presenter at an international academic
                    conference, presenting undergraduate research on sentiment
                    analysis and machine learning.
                  </p>

                  <ul className="space-y-2 text-sm text-gray-300 mb-4">
                    {[
                      'Applied NLP techniques on Indonesian-language user reviews',
                      'Built classification pipeline using Random Forest',
                      'Focused on structured data handling and analytical reporting',
                    ].map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2 w-2 h-2 bg-primary rounded-full shadow-glow-cyan" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <p className="text-gray-400 text-sm italic">
                    Strengthened my ability to communicate technical findings in
                    formal academic environments.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* ===== ACHIEVEMENT 2 ===== */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              className="bg-dark-card p-8 rounded-xl border border-secondary/40 shadow-glow-purple hover:shadow-glow-purple-lg transition-all"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center shadow-glow-purple text-3xl">
                  👥
                </div>

                <div className="flex-1">
                  <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold rounded-full bg-secondary/30 border border-secondary text-secondary">
                    🎤 WORKSHOP SPEAKER
                  </span>

                  <h3 className="text-2xl font-semibold text-white mb-1">
                    Workshop Speaker: Sentiment Analysis
                  </h3>

                  <p className="text-secondary text-sm mb-3">
                    Academic Workshop (Final-Year Students & Lab Assistant Candidates)
                  </p>

                  <ul className="space-y-2 text-sm text-gray-300 mb-4">
                    {[
                      'Explained end-to-end sentiment analysis workflow',
                      'Demonstrated machine learning model training with Python',
                      'Showed how unstructured text becomes structured insights',
                    ].map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2 w-2 h-2 bg-secondary rounded-full shadow-glow-purple" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <p className="text-gray-400 text-sm italic">
                    Improved my ability to translate technical concepts into
                    practical learning materials.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* ===== ACHIEVEMENT 3 ===== */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              className="bg-dark-card p-8 rounded-xl border border-primary/40 shadow-glow-cyan hover:shadow-glow-cyan-lg transition-all"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow-cyan text-3xl">
                  💡
                </div>

                <div className="flex-1">
                  <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold rounded-full bg-primary/30 border border-primary text-primary">
                    🎤 WORKSHOP SPEAKER
                  </span>

                  <h3 className="text-2xl font-semibold text-white mb-1">
                    Workshop Speaker: Machine Learning Fundamentals
                  </h3>

                  <p className="text-primary text-sm mb-3">
                    Academic Workshop (Undergraduate Students)
                  </p>

                  <ul className="space-y-2 text-sm text-gray-300 mb-4">
                    {[
                      'Introduced core machine learning principles',
                      'Explained data preparation and evaluation basics',
                      'Connected theory with real-world data use cases',
                    ].map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2 w-2 h-2 bg-primary rounded-full shadow-glow-cyan" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <p className="text-gray-400 text-sm italic">
                    Enhanced my skills in structured explanation and audience-focused delivery.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* ===== ACHIEVEMENT 4 ===== */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              className="bg-dark-card p-8 rounded-xl border-2 border-secondary shadow-glow-purple-lg hover:shadow-glow-purple transition-all"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center shadow-glow-purple text-3xl">
                  🛡️
                </div>

                <div className="flex-1">
                  <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold rounded-full bg-secondary/30 border border-secondary text-secondary">
                    🎓 MICROSOFT CERTIFIED
                  </span>

                  <h3 className="text-2xl font-semibold text-white mb-1">
                    Microsoft Certified: Azure Data Fundamentals (DP-900)
                  </h3>

                  <p className="text-secondary text-sm mb-3">
                    Microsoft Corporation · Oct 30, 2024
                  </p>

                  <p className="text-gray-300 mb-4">
                    Demonstrated strong understanding of core data concepts,
                    relational and non-relational data, and analytics workloads
                    on Microsoft Azure.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 mb-4 bg-dark/50 p-6 rounded-xl border border-secondary/20">
  {/* LEFT: Coverage */}
  <div>
    <h4 className="text-sm font-semibold text-secondary mb-3 flex items-center gap-2">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      Certification Coverage
    </h4>
    <ul className="space-y-2 text-sm text-gray-300">
      <li className="flex items-start gap-2">
        <span className="text-secondary mt-1">•</span>
        <span>Core data concepts (relational & non-relational)</span>
      </li>
      <li className="flex items-start gap-2">
        <span className="text-secondary mt-1">•</span>
        <span>Relational data workloads on Azure</span>
      </li>
      <li className="flex items-start gap-2">
        <span className="text-secondary mt-1">•</span>
        <span>Non-relational data solutions in Azure</span>
      </li>
      <li className="flex items-start gap-2">
        <span className="text-secondary mt-1">•</span>
        <span>Analytics workloads on Azure</span>
      </li>
    </ul>
  </div>

  {/* RIGHT: Score */}
  <div className="bg-dark-card p-4 rounded-lg border border-secondary/30">
    <h4 className="text-sm font-semibold text-secondary mb-4">
      Exam Performance
    </h4>

    <div className="text-center mb-4 pb-4 border-b border-secondary/20">
      <div className="text-4xl font-bold gradient-text mb-1">940</div>
      <div className="text-sm text-gray-400">out of 1000</div>
    </div>

    <div className="space-y-2 text-sm">
      <div className="flex justify-between">
        <span className="text-gray-300">Core Data Concepts</span>
        <span className="text-secondary font-bold">100%</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-300">Relational Data</span>
        <span className="text-secondary font-bold">88%</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-300">Non-Relational Data</span>
        <span className="text-secondary font-bold">93%</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-300">Analytics Workloads</span>
        <span className="text-secondary font-bold">95%</span>
      </div>
    </div>
  </div>
</div>


                  <p className="text-gray-400 text-sm italic">
                    Reflects readiness to work in structured, data-driven operational environments.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
</motion.section>
      {/* ===== END ACHIEVEMENTS ===== */}

      {/* ==========================
    EDUCATION SECTION
========================== */}
<motion.section
  id="education"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={staggerContainer}
  className="relative py-20 bg-dark-secondary overflow-hidden"
>
  {/* Background */}
  <div className="absolute inset-0 grid-background opacity-10" />

  <motion.div className="relative z-10 max-w-5xl mx-auto px-4">
    {/* Section Title */}
    <motion.div variants={fadeInUp} className="text-center mb-20">
      <h2 className="text-4xl md:text-5xl font-poppins font-bold gradient-text mb-4">
        Education
      </h2>
      <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto" />
    </motion.div>

    {/* Education Card */}
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -4 }}
      className="bg-dark-card p-8 md:p-10 rounded-xl border border-primary/30 shadow-glow-cyan-lg hover:shadow-glow-cyan transition-all duration-300"
    >
      <div className="flex flex-col md:flex-row gap-8">
        {/* Icon */}
        <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow-cyan text-3xl">
          🎓
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
            <div>
              <h3 className="text-3xl font-poppins font-bold text-white mb-2 hover:text-primary transition-colors">
                Bachelor of Informatics Engineering
              </h3>
              <p className="text-primary font-semibold text-lg">
                Universitas Hasanuddin
              </p>
              <p className="text-gray-400 text-sm">
                Makassar, South Sulawesi, Indonesia
              </p>
            </div>

            <div className="mt-3 md:mt-0 space-y-2 text-right">
              <span className="inline-block px-4 py-2 bg-primary/20 border border-primary/50 text-primary rounded-full text-sm font-medium">
                2020 – 2025
              </span>
              <div className="flex items-center justify-end gap-2 text-white font-semibold">
                <span className="text-primary">✔</span>
                GPA: 3.64 / 4.00
              </div>
            </div>
          </div>

          {/* Coursework */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
              📚 Relevant Coursework
            </h4>

            <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-300">
              {[
                'Data Structures & Algorithms',
                'Database Management Systems',
                'Machine Learning',
                'Data Mining',
                'Natural Language Processing',
                'Software Engineering',
                'Web Development',
                'Information Systems',
              ].map((course) => (
                <motion.div
                  key={course}
                  variants={slideInLeft}
                  className="flex gap-3"
                >
                  <span className="mt-2 w-2 h-2 bg-primary rounded-full shadow-glow-cyan" />
                  {course}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Final Project */}
          <div>
            <h4 className="text-lg font-semibold text-secondary mb-3 flex items-center gap-2">
              📄 Final Project
            </h4>
            <p className="text-gray-300 leading-relaxed">
              <span className="font-semibold text-white">
                “Sentiment Analysis of Indonesian TradingView Reviews”
              </span>{' '}
              — Developed a comprehensive sentiment classification system
              using Natural Language Processing and machine learning techniques
              to analyze user reviews from the Google Play Store.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  </motion.div>
</motion.section>
{/* ===== END EDUCATION ===== */}


      {/* ==========================
    CONTACT SECTION
========================== */}
<motion.section
  id="contact"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={staggerContainer}
  className="relative py-20 bg-dark overflow-hidden"
>
  {/* Background */}
  <div className="absolute inset-0 grid-background opacity-10" />

  <motion.div className="relative z-10 max-w-7xl mx-auto px-4">
    {/* Section Title */}
    <motion.div variants={fadeInUp} className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-poppins font-bold gradient-text mb-4">
        Get In Touch
      </h2>
      <p className="text-gray-400 max-w-2xl mx-auto">
        Interested in data operations, administrative support, or technical
        documentation roles? Let’s connect!
      </p>
      <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-6" />
    </motion.div>

    {/* Content Grid */}
    <div className="grid md:grid-cols-2 gap-12 items-start">
      {/* LEFT — CONTACT INFO */}
      <motion.div variants={staggerContainer} className="grid gap-6">
        {/* Email */}
        <motion.a
          variants={slideInLeft}
          href="mailto:rhcczmr@gmail.com"
          className="group bg-dark-card p-6 rounded-xl border border-primary/30 hover:border-primary shadow-glow-cyan hover:shadow-glow-cyan-lg transition-all duration-300 flex gap-4 items-center hover:-translate-y-2"
        >
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xl shadow-glow-cyan group-hover:scale-110 transition-transform">
            ✉️
          </div>
          <div>
            <h4 className="text-white font-semibold group-hover:text-primary transition-colors">
              Email
            </h4>
            <p className="text-gray-400 group-hover:text-primary">
              rhcczmr@gmail.com
            </p>
          </div>
        </motion.a>

        {/* LinkedIn */}
        <motion.a
          variants={slideInLeft}
          href="https://linkedin.com/in/usamah-rhacac-zamar"
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-dark-card p-6 rounded-xl border border-secondary/30 hover:border-secondary shadow-glow-purple hover:shadow-glow-purple-lg transition-all duration-300 flex gap-4 items-center hover:-translate-y-2"
        >
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-xl shadow-glow-purple group-hover:scale-110 transition-transform">
            in
          </div>
          <div>
            <h4 className="text-white font-semibold group-hover:text-secondary transition-colors">
              LinkedIn
            </h4>
            <p className="text-gray-400 group-hover:text-secondary">
              usamah-rhacac-zamar
            </p>
          </div>
        </motion.a>

        {/* GitHub */}
        <motion.a
          variants={slideInLeft}
          href="https://github.com/rhcczmr"
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-dark-card p-6 rounded-xl border border-primary/30 hover:border-primary shadow-glow-cyan hover:shadow-glow-cyan-lg transition-all duration-300 flex gap-4 items-center hover:-translate-y-2"
        >
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xl shadow-glow-cyan group-hover:scale-110 transition-transform">
            GH
          </div>
          <div>
            <h4 className="text-white font-semibold group-hover:text-primary transition-colors">
              GitHub
            </h4>
            <p className="text-gray-400 group-hover:text-primary">
              github.com/rhcczmr
            </p>
          </div>
        </motion.a>

        {/* Location */}
        <motion.div
          variants={slideInLeft}
          className="bg-dark-card p-6 rounded-xl border border-secondary/30 shadow-glow-purple flex gap-4 items-center hover:-translate-y-2 transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-xl shadow-glow-purple">
            📍
          </div>
          <div>
            <h4 className="text-white font-semibold">Location</h4>
            <p className="text-gray-400">
              Makassar, South Sulawesi, Indonesia
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* RIGHT — CTA BOX */}
      <motion.div
        variants={slideInRight}
        className="bg-dark-card p-8 rounded-xl border-2 border-primary/30 shadow-glow-cyan-lg hover:-translate-y-2 transition-all duration-300"
      >
        <h3 className="text-2xl font-poppins font-bold text-white mb-4">
          Ready to Connect?
        </h3>

        <p className="text-gray-300 mb-6 leading-relaxed">
          I’m currently seeking opportunities in data operations,
          administrative support, and documentation roles where I can apply
          my Excel expertise, structured data handling, and process discipline.
        </p>

        <ul className="space-y-3 mb-8 text-sm text-gray-300">
          <li className="flex gap-2">
            <span className="text-primary">✔</span>
            Open to full-time, contract, or freelance opportunities
          </li>
          <li className="flex gap-2">
            <span className="text-primary">✔</span>
            Available for remote or on-site work in Makassar area
          </li>
          <li className="flex gap-2">
            <span className="text-primary">✔</span>
            Typically respond within 24 hours
          </li>
        </ul>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="mailto:rhcczmr@gmail.com"
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:shadow-glow-cyan-lg hover:scale-105 transition-all duration-300"
          >
            Send Email
          </a>
          <a
            href="/cv/Usamah_Rhacac_Zamar_CV.pdf"
            download
            className="flex-1 px-6 py-3.5 border-2 border-primary text-primary rounded-lg text-center hover:bg-primary hover:text-white transition-all duration-300"
          >
            Download Full CV
          </a>
        </div>
      </motion.div>
    </div>
  </motion.div>
</motion.section>
{/* ===== END CONTACT ===== */}


      {/* ==========================
    FOOTER
========================== */}
<motion.footer
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={staggerContainer}
  className="relative bg-dark-secondary border-t border-primary/20 py-12 overflow-hidden"
>
  {/* Background */}
  <div className="absolute inset-0 grid-background opacity-5" />

  <motion.div className="relative z-10 max-w-7xl mx-auto px-4">
    {/* Top Grid */}
    <div className="grid md:grid-cols-3 gap-10 mb-10">
      {/* BRAND */}
      <motion.div variants={fadeInUp}>
        <h3 className="text-2xl font-poppins font-bold gradient-text mb-4">
          Usamah Rhacac Zamar
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          Data & Administrative Operations Specialist focused on
          Excel-based workflows, structured data handling, and operational
          documentation.
        </p>
      </motion.div>

      {/* QUICK LINKS */}
      <motion.div variants={fadeInUp}>
        <h4 className="text-lg font-semibold text-white mb-4">
          Quick Links
        </h4>
        <ul className="space-y-2">
          {[
            ['about', 'About'],
            ['skills', 'Skills'],
            ['experience', 'Experience'],
            ['projects', 'Projects'],
            ['contact', 'Contact'],
          ].map(([id, label]) => (
            <li key={id}>
              <button
                onClick={() => scrollToSection(id)}
                className="text-gray-400 hover:text-primary transition-all text-sm hover:translate-x-1"
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* CONNECT */}
      <motion.div variants={fadeInUp}>
        <h4 className="text-lg font-semibold text-white mb-4">
          Connect
        </h4>

        <div className="flex gap-4 mb-4">
          {/* Email */}
          <a
            href="mailto:rhcczmr@gmail.com"
            className="w-10 h-10 bg-dark-card border border-primary/30 rounded-lg flex items-center justify-center hover:border-primary hover:shadow-glow-cyan transition-all hover:rotate-6"
          >
            ✉️
          </a>

          {/* LinkedIn */}
          <a
  href="https://www.linkedin.com/in/rhacac-zamar-03a277227"
  target="_blank"
  rel="noopener noreferrer"
  onClick={(e) => {
    e.stopPropagation()
  }}
>
  LinkedIn
</a>

          {/* GitHub */}
          <a
            href="https://github.com/rhcczmr"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-dark-card border border-primary/30 rounded-lg flex items-center justify-center hover:border-primary hover:shadow-glow-cyan transition-all hover:rotate-6"
          >
            GH
          </a>
        </div>

        <p className="text-gray-400 text-sm">
          Makassar, South Sulawesi<br />
          Indonesia
        </p>
      </motion.div>
    </div>

    {/* Bottom Bar */}
    <div className="border-t border-primary/20 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-gray-400 text-sm text-center md:text-left">
        © 2025 Usamah Rhacac Zamar. All rights reserved.
      </p>
      <div className="text-gray-400 text-sm text-center">
  Built around <span className="text-primary">data accuracy</span> &
  <span className="text-secondary"> documentation</span>
</div>

    </div>
  </motion.div>
</motion.footer>
{/* ===== END FOOTER ===== */}


    </main>
  )
}







