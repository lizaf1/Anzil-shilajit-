
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  content: {
    titleEn: string;
    titleId: string;
    titleAccentEn: string;
    titleAccentId: string;
    descEn: string;
    descId: string;
    image: string;
  };
}

const Hero: React.FC<HeroProps> = ({ content }) => {
  const { language, t } = useLanguage();

  const title = language === 'en' ? content.titleEn : content.titleId;
  const titleAccent = language === 'en' ? content.titleAccentEn : content.titleAccentId;
  const desc = language === 'en' ? content.descEn : content.descId;

  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden pt-24 pb-16 md:pt-0 md:pb-0">
      <div className="absolute inset-0 z-0">
        <img 
          src={content.image} 
          alt="Himalayan Mountains" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 gradient-overlay"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 text-white mt-10 md:mt-0">
        <div className="max-w-3xl">
          <span className="text-gold-accent font-semibold tracking-[0.2em] md:tracking-[0.3em] uppercase mb-3 md:mb-4 block animate-fade-in text-xs md:text-base">
            {t.hero.subtitle}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 leading-tight serif">
            {title} <br />
            <span className="text-gold-accent">{titleAccent}</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 text-stone-200 leading-relaxed font-light">
            {desc}
          </p>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <a href="#shop" className="bg-gold-accent text-white px-8 md:px-10 py-3.5 md:py-4 rounded-full text-base md:text-lg font-semibold hover:bg-opacity-90 transition-all text-center shadow-lg">
              {t.hero.ctaPrimary}
            </a>
            <a href="#benefits" className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 md:px-10 py-3.5 md:py-4 rounded-full text-base md:text-lg font-semibold hover:bg-white/20 transition-all text-center">
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
