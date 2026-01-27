
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  customTitleEn?: string;
  customTitleId?: string;
}

const Hero: React.FC<HeroProps> = ({ customTitleEn, customTitleId }) => {
  const { language, t } = useLanguage();

  const displayPrefix = language === 'en' ? (customTitleEn || t.hero.title) : (customTitleId || t.hero.title);

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
            {displayPrefix} <br />
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
    </section>
  );
};

export default Hero;
