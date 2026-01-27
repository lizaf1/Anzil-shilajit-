
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const BPOM_LOGO = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Logo_BPOM.svg/1200px-Logo_BPOM.svg.png";

const ProductFeature: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="shop" className="py-24 bg-stone-50">
      <div className="container mx-auto px-6">
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-stone-200">
          <div className="lg:w-1/2 relative min-h-[500px] bg-stone-100">
            <img 
              src="https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&q=80&w=1000" 
              alt="Anzil Shilajit Premium Packaging" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-shilajit-brown/40 to-transparent flex items-end p-12">
              <div className="text-white">
                <span className="bg-gold-accent px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 inline-block shadow-lg">{t.product.bestseller}</span>
                <h3 className="text-3xl font-bold mb-2 serif">{t.product.name}</h3>
                <p className="text-white/90 text-sm">{t.product.servings}</p>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 p-12 lg:p-16 flex flex-col justify-center">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-4xl font-bold text-shilajit-brown mb-2 serif">{t.product.sectionTitle}</h2>
                <div className="flex items-center space-x-2">
                  <div className="flex text-gold-accent">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    ))}
                  </div>
                  <span className="text-stone-400 text-xs font-semibold tracking-wider uppercase">{t.product.reviews}</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-shilajit-brown">$49.99</div>
            </div>

            <p className="text-stone-600 mb-8 leading-relaxed">
              {t.product.desc}
            </p>

            <div className="grid grid-cols-1 gap-4 mb-10">
              <a 
                href="https://wa.me/6281234567890"
                target="_blank"
                className="flex items-center justify-between p-4 rounded-2xl border border-stone-200 bg-white hover:border-gold-accent hover:shadow-md transition-all group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-white shadow-inner">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.539 2.016 2.069-.53c.961.547 1.916.946 3.22.947h.002c3.18 0 5.766-2.586 5.767-5.766 0-3.18-2.586-5.77-5.77-5.77zm3.367 8.24c-.149.42-.76.772-1.049.815-.29.043-.647.075-1.049-.056-.254-.082-.579-.199-1.012-.387-1.85-.805-3.044-2.69-3.136-2.812-.092-.122-.746-.992-.746-1.87 0-.878.458-1.31.621-1.492.164-.182.358-.228.477-.228.119 0 .239.001.343.006.108.005.253-.041.396.3.149.356.508 1.239.553 1.331.045.091.075.197.015.318-.06.121-.09.197-.18.303-.09.106-.188.236-.269.319-.09.091-.184.19-.079.371.106.182.471.777 1.012 1.258.697.621 1.284.815 1.466.906.182.091.289.076.396-.046.106-.122.457-.531.579-.714.122-.182.244-.152.41-.091.164.061 1.044.492 1.226.583.182.091.303.137.346.213.045.076.045.441-.104.86z"/></svg>
                  </div>
                  <div>
                    <span className="font-bold text-shilajit-brown block text-sm">{t.product.channels.wa}</span>
                    <span className="text-[10px] text-stone-400 uppercase tracking-widest font-semibold">{t.product.channels.waDesc}</span>
                  </div>
                </div>
                <svg className="w-4 h-4 text-stone-300 group-hover:text-gold-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
              </a>

              <div className="grid grid-cols-2 gap-4">
                <a 
                  href="https://shopee.co.id/anzil_official"
                  target="_blank"
                  className="flex items-center justify-center space-x-2 p-4 rounded-2xl border border-stone-200 bg-white hover:border-orange-200 transition-all group"
                >
                  <span className="font-bold text-stone-800 text-sm">{t.product.channels.shopee}</span>
                </a>
                <a 
                  href="https://www.tiktok.com/@anzil_wellness"
                  target="_blank"
                  className="flex items-center justify-center space-x-2 p-4 rounded-2xl border border-stone-200 bg-white hover:border-stone-900 transition-all group"
                >
                  <span className="font-bold text-stone-800 text-sm">{t.product.channels.tiktok}</span>
                </a>
              </div>
            </div>

            <div className="pt-6 border-t border-stone-100 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center p-1.5 shadow-sm border border-stone-100">
                  <img 
                    src={BPOM_LOGO} 
                    className="max-h-full max-w-full object-contain" 
                    alt="BPOM Certified Logo" 
                  />
                </div>
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">{t.product.batch}</span>
              </div>
              <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest">{t.product.stock}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductFeature;
