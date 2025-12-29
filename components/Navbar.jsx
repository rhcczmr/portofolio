'use client'

import { useState, useEffect } from 'react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ]

  const scrollToSection = (e, href) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <nav className={isScrolled ? 'navbar-scrolled' : 'navbar'}>
      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          transition: all 0.3s;
          background: transparent;
        }
        .navbar-scrolled {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          transition: all 0.3s;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(12px);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .nav-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 64px;
        }
        .logo {
          font-size: 1.5rem;
          font-weight: 700;
          color: #2563EB;
          text-decoration: none;
          font-family: 'Poppins', sans-serif;
        }
        .logo:hover {
          color: #1E40AF;
        }
        .nav-links {
          display: none;
          gap: 2rem;
          align-items: center;
        }
        @media (min-width: 768px) {
          .nav-links {
            display: flex;
          }
        }
        .nav-link {
          color: #374151;
          font-weight: 500;
          text-decoration: none;
          position: relative;
          transition: color 0.3s;
        }
        .nav-link:hover {
          color: #2563EB;
        }
        .download-btn {
          display: none;
          padding: 0.625rem 1.5rem;
          background: linear-gradient(to right, #2563EB, #1E40AF);
          color: white;
          font-weight: 500;
          border-radius: 0.5rem;
          text-decoration: none;
          transition: all 0.3s;
        }
        @media (min-width: 768px) {
          .download-btn {
            display: inline-block;
          }
        }
        .download-btn:hover {
          box-shadow: 0 10px 15px rgba(37, 99, 235, 0.3);
          transform: scale(1.05);
        }
        .mobile-menu-btn {
          display: block;
          background: none;
          border: none;
          color: #374151;
          cursor: pointer;
        }
        @media (min-width: 768px) {
          .mobile-menu-btn {
            display: none;
          }
        }
        .mobile-menu {
          display: block;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          padding: 1rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        @media (min-width: 768px) {
          .mobile-menu {
            display: none;
          }
        }
        .mobile-link {
          display: block;
          padding: 0.75rem 1rem;
          color: #374151;
          text-decoration: none;
          border-radius: 0.5rem;
          font-weight: 500;
          transition: all 0.3s;
        }
        .mobile-link:hover {
          background: #F3F4F6;
          color: #2563EB;
        }
        .mobile-download {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background: linear-gradient(to right, #2563EB, #1E40AF);
          color: white;
          font-weight: 500;
          border-radius: 0.5rem;
          text-decoration: none;
          margin-top: 0.5rem;
        }
      `}</style>

      <div className="nav-container">
        <div className="nav-content">
          <a href="#" className="logo">RZ</a>

          <div className="nav-links">
            {navLinks.map((link) => (
              
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="nav-link"
              >
                {link.name}
              </a>
            ))}
          </div>

          <a href="/cv/Usamah_Rhacac_Zamar_CV.pdf" download className="download-btn">
            Download CV
          </a>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="mobile-menu-btn"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-menu">
          {navLinks.map((link) => (
            
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="mobile-link"
            >
              {link.name}
            </a>
          ))}
          <a href="/cv/Usamah_Rhacac_Zamar_CV.pdf" download className="mobile-download">
            Download CV
          </a>
        </div>
      )}
    </nav>
  )
}