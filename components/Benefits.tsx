
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface BenefitsProps {
  content: {
    titleEn: string;
    titleId: string;
    subtitleEn: string;
    subtitleId: string;
    items: Array<{ titleEn: string; titleId: string; descEn: string; descId: string }>;
  };
}

const icons = [
  (<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>),
  (<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>),
  (<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.423 15.441c.024.058.05.114.078.17.523 1.042.964 2.088.93 3.586-.023 1.004-.375 1.98-1.024 2.801" /></svg>),
  (<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>)
];

const Benefits: React.FC<BenefitsProps> = ({ content }) => {
  const { language } = useLanguage();

  return (
    <section id="benefits" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-shilajit-brown serif">
            {language === 'en' ? content.titleEn : content.titleId}
          </h2>
          <p className="text-stone-500 text-lg">
            {language === 'en' ? content.subtitleEn : content.subtitleId}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {content.items.map((benefit, i) => (
            <div key={i} className="p-8 rounded-3xl border border-stone-100 hover:border-gold-accent transition-all duration-300 group hover:shadow-xl hover:-translate-y-2 bg-stone-50">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-gold-accent mb-6 shadow-sm group-hover:bg-gold-accent group-hover:text-white transition-colors duration-300">
                {icons[i % icons.length]}
              </div>
              <h3 className="text-xl font-bold mb-4 text-shilajit-brown serif">
                {language === 'en' ? benefit.titleEn : benefit.titleId}
              </h3>
              <p className="text-stone-600 leading-relaxed text-sm">
                {language === 'en' ? benefit.descEn : benefit.descId}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
