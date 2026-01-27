
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const BPOM_LOGO = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Logo_BPOM.svg/1200px-Logo_BPOM.svg.png";

const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000" 
          alt="Himalayan Mountains" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 gradient-overlay"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-white">
        <div className="max-w-3xl">
          <span className="text-gold-accent font-semibold tracking-[0.3em] uppercase mb-4 block animate-fade-in">
            {t.hero.subtitle}
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight serif">
            {t.hero.title} <br />
            <span className="text-gold-accent">{t.hero.titleAccent}</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-stone-200 leading-relaxed font-light">
            {t.hero.desc}
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="#shop" className="bg-gold-accent text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-all text-center shadow-lg">
              {t.hero.ctaPrimary}
            </a>
            <a href="#benefits" className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-all text-center">
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-0 right-0 z-10 hidden lg:block">
        <div className="container mx-auto px-6 flex justify-between items-center text-white/80 text-xs font-bold tracking-widest uppercase border-t border-white/20 pt-8">
          <div className="flex items-center space-x-4 group">
            <div className="w-14 h-14 bg-white rounded-xl p-2 flex items-center justify-center shadow-2xl transition-transform group-hover:scale-105">
              <img 
                src={BPOM_LOGO} 
                alt="BPOM RI Logo" 
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-gold-accent tracking-widest">CERTIFIED</span>
              <span className="text-white/60">BPOM RI {t.hero.badges.lab}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-gold-accent" fill="currentColor" viewBox="0 0 20 20"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            <span>{t.hero.badges.minerals}</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-gold-accent" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            <span>{t.hero.badges.sourced}</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-gold-accent" fill="currentColor" viewBox="0 0 20 20"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.36a11.076 11.076 0 01.25 3.762 1 1 0 01-.89.89 8.976 8.976 0 00-1.05.174V10.12l1.69-.723" /></svg>
            <span>{t.hero.badges.grade}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
