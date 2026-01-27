
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  onNavigate: (page: 'home' | 'certificates' | 'blog') => void;
  currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = currentPage === 'home';
  const navColorClass = (isScrolled || !isHome) ? 'text-shilajit-brown' : 'text-white';
  const bgColorClass = (isScrolled || !isHome) ? 'bg-white shadow-md py-3' : 'bg-transparent py-6';

  const handleHomeAnchor = (e: React.MouseEvent, anchor: string) => {
    if (!isHome) {
      e.preventDefault();
      onNavigate('home');
      setTimeout(() => {
        window.location.hash = anchor;
      }, 100);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${bgColorClass}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div 
            className="flex items-center space-x-2 cursor-pointer z-50"
            onClick={() => { onNavigate('home'); setIsMobileMenuOpen(false); }}
          >
            <span className={`text-xl md:text-2xl font-bold tracking-tighter serif ${isMobileMenuOpen ? 'text-white' : navColorClass}`}>
              ANZIL
            </span>
          </div>
          
          <div className="flex items-center space-x-2 md:space-x-6">
            {/* Desktop Links */}
            <div className="hidden md:flex space-x-8 items-center font-medium text-xs uppercase tracking-widest">
              <a 
                href="#benefits" 
                onClick={(e) => handleHomeAnchor(e, 'benefits')}
                className={`${navColorClass} hover:text-gold-accent transition-colors`}
              >
                {t.nav.benefits}
              </a>
              <button 
                onClick={() => onNavigate('blog')}
                className={`${navColorClass} hover:text-gold-accent transition-colors ${currentPage === 'blog' ? 'text-gold-accent border-b-2 border-gold-accent' : ''}`}
              >
                {t.nav.blog}
              </button>
              <button 
                onClick={() => onNavigate('certificates')}
                className={`${navColorClass} hover:text-gold-accent transition-colors ${currentPage === 'certificates' ? 'text-gold-accent border-b-2 border-gold-accent' : ''}`}
              >
                {t.nav.certificates}
              </button>
            </div>

            {/* Persistent Language Switcher */}
            <div className={`flex items-center bg-stone-100/10 backdrop-blur-sm rounded-full p-0.5 border border-stone-200/20 ${isMobileMenuOpen ? 'hidden' : 'flex'}`}>
              <button 
                onClick={() => setLanguage('en')} 
                className={`text-[10px] font-bold px-2.5 py-1 rounded-full transition-all ${language === 'en' ? 'bg-gold-accent text-white shadow-sm' : navColorClass + ' opacity-40 hover:opacity-100'}`}
              >
                EN
              </button>
              <button 
                onClick={() => setLanguage('id')} 
                className={`text-[10px] font-bold px-2.5 py-1 rounded-full transition-all ${language === 'id' ? 'bg-gold-accent text-white shadow-sm' : navColorClass + ' opacity-40 hover:opacity-100'}`}
              >
                ID
              </button>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center space-x-1 md:space-x-4">
              <a href="#shop" onClick={(e) => handleHomeAnchor(e, 'shop')} className="hidden sm:block bg-gold-accent text-white px-5 py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-opacity-90 transition-all shadow-md">
                {t.nav.shop}
              </a>
              <button 
                className={`md:hidden z-50 p-2 transition-colors ${isMobileMenuOpen ? 'text-white' : 'text-gold-accent'}`} 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className={`fixed inset-0 z-[45] bg-shilajit-brown transition-transform duration-500 md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col items-center justify-center h-full space-y-8 text-center px-6">
          <button onClick={() => { onNavigate('home'); setIsMobileMenuOpen(false); }} className="text-3xl font-bold text-white serif">{t.nav.home}</button>
          <button onClick={() => { onNavigate('blog'); setIsMobileMenuOpen(false); }} className={`text-xl font-medium uppercase tracking-widest ${currentPage === 'blog' ? 'text-gold-accent' : 'text-white/70'}`}>{t.nav.blog}</button>
          <button onClick={() => { onNavigate('certificates'); setIsMobileMenuOpen(false); }} className={`text-xl font-medium uppercase tracking-widest ${currentPage === 'certificates' ? 'text-gold-accent' : 'text-white/70'}`}>{t.nav.certificates}</button>
          <a href="#shop" onClick={(e) => handleHomeAnchor(e, 'shop')} className="bg-gold-accent text-white w-full py-4 rounded-full text-xl font-bold shadow-xl">{t.nav.shop}</a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
