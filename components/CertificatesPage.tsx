
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CertStat } from '../App';

interface CertsProps {
  onBack: () => void;
  content: {
    titleEn: string;
    titleId: string;
    descEn: string;
    descId: string;
    footerTextEn: string;
    footerTextId: string;
    items: Array<{ titleEn: string; titleId: string; descEn: string; descId: string; idNum: string; image: string }>;
    stats: CertStat[];
  };
}

const CertificatesPage: React.FC<CertsProps> = ({ onBack, content }) => {
  const { language, t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const complianceLabel = language === 'en' ? content.footerTextEn : content.footerTextId;

  return (
    <div className="min-h-screen bg-stone-50 pt-32 pb-20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <button 
            onClick={onBack}
            className="flex items-center space-x-2 text-stone-400 hover:text-gold-accent transition-colors mb-12 group"
          >
            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-bold text-[10px] uppercase tracking-widest">{t.certs.back}</span>
          </button>

          <div className="text-center mb-16">
            <span className="text-gold-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Independent Verification</span>
            <h1 className="text-5xl font-bold text-shilajit-brown mb-6 serif">
              {language === 'en' ? content.titleEn : content.titleId}
            </h1>
            <p className="text-lg text-stone-500 max-w-2xl mx-auto leading-relaxed">
              {language === 'en' ? content.descEn : content.descId}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {content.items.map((cert, i) => (
              <div key={i} className="bg-white rounded-[3rem] p-4 shadow-sm border border-stone-100 hover:shadow-2xl transition-all duration-700 flex flex-col group">
                <div 
                  className="relative h-[500px] rounded-[2.5rem] overflow-hidden bg-stone-100 cursor-zoom-in group-hover:bg-white transition-colors"
                  onClick={() => setSelectedImage(cert.image)}
                >
                  <img 
                    src={cert.image} 
                    alt={cert.titleEn} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                    <div className="bg-white/95 backdrop-blur-md px-8 py-4 rounded-full shadow-2xl opacity-0 group-hover:opacity-100 transform translate-y-6 group-hover:translate-y-0 transition-all duration-500">
                       <p className="text-xs font-bold text-shilajit-brown uppercase tracking-widest flex items-center gap-2">
                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                         Inspect Test Results
                       </p>
                    </div>
                  </div>
                </div>

                <div className="p-10">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-shilajit-brown serif">
                      {language === 'en' ? cert.titleEn : cert.titleId}
                    </h3>
                    <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 border border-green-100 shadow-sm">
                       <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                       Authentic
                    </span>
                  </div>
                  <p className="text-stone-500 text-sm leading-relaxed mb-8">
                    {language === 'en' ? cert.descEn : cert.descId}
                  </p>
                  <div className="flex items-center justify-between pt-6 border-t border-stone-50">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Registration #</span>
                      <span className="font-mono text-xs font-bold text-shilajit-brown">{cert.idNum}</span>
                    </div>
                    <button 
                      onClick={() => setSelectedImage(cert.image)}
                      className="text-gold-accent font-bold text-[10px] uppercase tracking-widest hover:text-shilajit-brown transition-colors underline decoration-2 underline-offset-4"
                    >
                      Audit Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-24 text-center">
             <div className="inline-flex items-center gap-3 mb-12 bg-white px-6 py-2 rounded-full border border-stone-100 shadow-sm">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <p className="text-[10px] font-bold uppercase text-stone-400 tracking-widest">{complianceLabel}</p>
             </div>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-stone-200 pt-16">
                {content.stats && content.stats.map((stat, i) => (
                  <div key={i} className="text-center">
                    <p className="text-4xl font-bold text-shilajit-brown serif mb-2">{stat.value}</p>
                    <p className="text-[10px] font-bold uppercase text-stone-400 tracking-[0.2em]">
                      {language === 'en' ? stat.labelEn : stat.labelId}
                    </p>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>

      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-shilajit-brown/98 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-12 overflow-y-auto"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="fixed top-8 right-8 text-white/50 hover:text-white transition-colors z-[110]"
            onClick={() => setSelectedImage(null)}
          >
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          
          <div className="relative max-w-5xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="bg-stone-50 border-b border-stone-100 p-6 flex items-center justify-between">
              <h4 className="text-shilajit-brown font-bold uppercase tracking-widest text-xs">Laboratory Verification Document</h4>
              <button onClick={() => window.open(selectedImage, '_blank')} className="text-gold-accent font-bold text-[10px] uppercase tracking-widest hover:underline">Open Original</button>
            </div>
            <div className="p-2 md:p-6 bg-stone-200">
               <img src={selectedImage} className="w-full h-auto object-contain rounded-xl" alt="Document Viewer" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificatesPage;
