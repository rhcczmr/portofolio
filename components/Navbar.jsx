'use client'

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <a href="#" className="text-xl font-bold text-primary">
          RZ
        </a>

        {/* Menu */}
        <div className="hidden md:flex gap-6 text-sm text-gray-300">
          <a href="#about" className="hover:text-primary transition">About</a>
          <a href="#skills" className="hover:text-primary transition">Skills</a>
          <a href="#experience" className="hover:text-primary transition">Experience</a>
          <a href="#projects" className="hover:text-primary transition">Projects</a>
          <a href="#contact" className="hover:text-primary transition">Contact</a>
        </div>

        {/* CTA */}
        <a
          href="/cv/Usamah_Rhacac_Zamar_CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-block px-4 py-2 text-sm rounded-lg bg-primary text-dark font-medium"
        >
          Download CV
        </a>
      </div>
    </nav>
  )
}
