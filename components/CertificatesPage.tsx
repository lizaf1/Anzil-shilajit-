
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const BPOM_LOGO = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Logo_BPOM.svg/1200px-Logo_BPOM.svg.png";

const CertificatesPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { t } = useLanguage();
  
  const icons = [
    BPOM_LOGO,
    "https://cdn-icons-png.flaticon.com/512/3209/3209065.png",
    "https://cdn-icons-png.flaticon.com/512/3501/3501198.png",
    "https://cdn-icons-png.flaticon.com/512/2855/2855523.png"
  ];

  const ids = [
    "MD 867011001541",
    "Batch #ANZ-2024-08",
    "FSMS #99210",
    "Good Manufacturing Practice"
  ];

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
          <h1 className="text-5xl font-bold text-shilajit-brown mb-6 serif">{t.certs.title}</h1>
          <p className="text-xl text-stone-600 mb-12 leading-relaxed">
            {t.certs.desc}
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {t.certs.items.map((cert: any, i: number) => (
              <div key={i} className="p-8 rounded-3xl border border-stone-100 bg-stone-50 hover:border-gold-accent transition-all group">
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-24 h-32 bg-white rounded-2xl flex items-center justify-center p-3 shadow-sm border border-stone-100 group-hover:shadow-md transition-shadow overflow-hidden`}>
                    <img 
                      src={icons[i]} 
                      alt={cert.title} 
                      className={`max-h-full max-w-full object-contain ${i === 0 ? 'scale-110' : 'grayscale group-hover:grayscale-0'} transition-all duration-500`} 
                    />
                  </div>
                  <span className="text-[10px] font-bold bg-green-100 text-green-700 px-3 py-1 rounded-full uppercase tracking-widest">{t.certs.verified}</span>
                </div>
                <h3 className="text-xl font-bold text-shilajit-brown mb-1 serif">{cert.title}</h3>
                <p className="text-gold-accent text-sm font-mono mb-4">{ids[i]}</p>
                <p className="text-stone-600 text-sm leading-relaxed">{cert.desc}</p>
                <button className="mt-6 text-shilajit-brown font-bold text-xs uppercase tracking-widest border-b-2 border-gold-accent/30 pb-1 hover:border-gold-accent transition-colors">
                  {t.certs.view}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-20 p-12 rounded-[3rem] bg-shilajit-brown text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-6 serif">{t.certs.standardsTitle}</h2>
              <div className="space-y-4 text-stone-300">
                {t.certs.standards.map((std: string, i: number) => (
                  <p key={i} className="flex items-start">
                    <span className="text-gold-accent mr-3 mt-1.5 w-1.5 h-1.5 rounded-full bg-gold-accent flex-shrink-0"></span>
                    <span>{std}</span>
                  </p>
                ))}
              </div>
            </div>
            <div className="absolute right-0 bottom-0 opacity-5 transform translate-x-1/4 translate-y-1/4">
              <svg className="w-96 h-96" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificatesPage;
