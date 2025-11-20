import React, { useState, useEffect } from 'react';
import { Scale, Menu, X, MessageCircle } from 'lucide-react';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Header height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { id: 'sobre', label: 'Sobre' },
    { id: 'servicos', label: 'Áreas de Atuação' },
    { id: 'resultados', label: 'Resultados' },
    { id: 'depoimentos', label: 'Depoimentos' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        isScrolled 
          ? 'bg-slate-950/95 backdrop-blur-md border-slate-800 py-3 shadow-lg' 
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="relative">
              <div className="absolute inset-0 bg-amber-500 blur opacity-20 group-hover:opacity-40 transition-opacity rounded-full"></div>
              <Scale className="w-8 h-8 text-amber-500 relative z-10" />
            </div>
            <div className="font-serif">
              <h1 className="text-xl font-bold text-slate-100 tracking-wide">Dr. Reinaldo Pereira</h1>
              <p className="text-xs text-amber-500 tracking-widest uppercase font-sans font-semibold">Advogado Trabalhista</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-sm font-medium text-slate-300 hover:text-amber-500 transition-colors uppercase tracking-wider"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('contato')}
              className="bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 px-6 py-2.5 rounded-full font-bold text-sm hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all transform hover:scale-105 flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Fale Conosco
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-100 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}>
          <nav className="flex flex-col space-y-4 bg-slate-900 p-6 rounded-2xl border border-slate-800">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-left text-slate-300 hover:text-amber-500 font-medium py-2 border-b border-slate-800 last:border-0"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('contato')}
              className="bg-amber-500 text-slate-950 py-3 rounded-lg font-bold text-center mt-2"
            >
              Agendar Consulta
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};