
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface CertsProps {
  onBack: () => void;
  content: {
    titleEn: string;
    titleId: string;
    descEn: string;
    descId: string;
    items: Array<{ titleEn: string; titleId: string; descEn: string; descId: string; idNum: string; image: string }>;
  };
}

const CertificatesPage: React.FC<CertsProps> = ({ onBack, content }) => {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="container mx-auto px-6">
        <button 
          onClick={onBack}
          className="flex items-center space-x-2 text-stone-500 hover:text-gold-accent transition-colors mb-8 group"
        >
          <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-bold text-xs uppercase tracking-widest">{t.certs.back}</span>
        </button>

        <div className="max-w-4xl">
          <h1 className="text-5xl font-bold text-shilajit-brown mb-6 serif">
            {language === 'en' ? content.titleEn : content.titleId}
          </h1>
          <p className="text-xl text-stone-600 mb-12 leading-relaxed">
            {language === 'en' ? content.descEn : content.descId}
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {content.items.map((cert, i) => (
              <div key={i} className="p-8 rounded-3xl border border-stone-100 bg-stone-50 hover:border-gold-accent transition-all group">
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-24 h-32 bg-white rounded-2xl flex items-center justify-center p-3 shadow-sm border border-stone-100 group-hover:shadow-md transition-shadow overflow-hidden`}>
                    <img 
                      src={cert.image} 
                      alt={cert.titleEn} 
                      className={`max-h-full max-w-full object-contain ${i === 0 ? 'scale-110' : 'grayscale group-hover:grayscale-0'} transition-all duration-500`} 
                    />
                  </div>
                  <span className="text-[10px] font-bold bg-green-100 text-green-700 px-3 py-1 rounded-full uppercase tracking-widest">{t.certs.verified}</span>
                </div>
                <h3 className="text-xl font-bold text-shilajit-brown mb-1 serif">
                  {language === 'en' ? cert.titleEn : cert.titleId}
                </h3>
                <p className="text-gold-accent text-sm font-mono mb-4">{cert.idNum}</p>
                <p className="text-stone-600 text-sm leading-relaxed">
                  {language === 'en' ? cert.descEn : cert.descId}
                </p>
                <button className="mt-6 text-shilajit-brown font-bold text-xs uppercase tracking-widest border-b-2 border-gold-accent/30 pb-1 hover:border-gold-accent transition-colors">
                  {t.certs.view}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificatesPage;
