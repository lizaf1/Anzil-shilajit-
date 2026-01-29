
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ProductVariant } from '../App';

interface ProductFeatureProps {
  content: {
    titleEn: string;
    titleId: string;
    descEn: string;
    descId: string;
    image: string;
    whatsapp: string;
    variants: ProductVariant[];
  };
}

const ProductFeature: React.FC<ProductFeatureProps> = ({ content }) => {
  const { language, t } = useLanguage();
  // Ensure we have a fallback if variants are empty
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    content.variants?.[0] || { id: '0', size: 'N/A', priceIdr: 0, shopeeLink: '', tiktokLink: '' }
  );

  const formatIdr = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const shopeeTarget = selectedVariant.shopeeLink || '#';
  const tiktokTarget = selectedVariant.tiktokLink || '#';

  return (
    <section id="shop" className="py-16 md:py-24 bg-stone-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-white rounded-[2rem] md:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-stone-200">
          
          {/* Image Side */}
          <div className="lg:w-1/2 relative min-h-[350px] md:min-h-[500px] bg-stone-100 overflow-hidden">
            <img 
              src={content.image} 
              alt="Anzil Shilajit Premium Packaging" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-shilajit-brown/70 to-transparent flex items-end p-8 md:p-12">
              <div className="text-white">
                <span className="bg-gold-accent px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest mb-3 inline-block shadow-lg">
                  {t.product.bestseller}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold mb-1 serif">{t.product.name}</h3>
                <p className="text-white/80 text-xs font-medium tracking-wide">
                  {selectedVariant.size} • Himalayan Authentic Resin
                </p>
              </div>
            </div>
          </div>
          
          {/* Content Side */}
          <div className="lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            {/* Header: Title and Price */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-8 md:mb-10 gap-4">
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-bold text-shilajit-brown mb-2 serif">
                  {language === 'en' ? content.titleEn : content.titleId}
                </h2>
                <div className="flex items-center space-x-2">
                  <div className="flex text-gold-accent">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    ))}
                  </div>
                  <span className="text-stone-400 text-[9px] font-bold tracking-[0.2em] uppercase">{t.product.reviews}</span>
                </div>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gold-accent serif md:text-right">
                {formatIdr(selectedVariant.priceIdr)}
              </div>
            </div>

            {/* Variant Selector: Mobile Responsive Grid */}
            <div className="mb-8 md:mb-10 space-y-3">
              <label className="text-[9px] font-bold text-stone-400 uppercase tracking-widest block">Select Packaging Size</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {content.variants.map((v) => (
                  <button 
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    className={`px-4 py-3.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border-2 text-center flex items-center justify-center ${
                      selectedVariant.id === v.id 
                        ? 'bg-shilajit-brown border-shilajit-brown text-white shadow-xl scale-[1.02]' 
                        : 'bg-white border-stone-100 text-stone-400 hover:border-gold-accent hover:text-gold-accent'
                    }`}
                  >
                    {v.size}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-stone-600 mb-8 md:mb-10 leading-relaxed text-sm">
              {language === 'en' ? content.descEn : content.descId}
            </p>

            {/* Purchase Options */}
            <div className="grid grid-cols-1 gap-4 mb-8 md:mb-10">
              <a 
                href={`https://wa.me/${content.whatsapp}?text=Hello Anzil, I am interested in the ${selectedVariant.size} Shilajit Resin.`} 
                target="_blank" 
                className="flex items-center justify-between p-4 md:p-5 rounded-2xl border border-stone-200 bg-white hover:border-green-500 hover:shadow-xl transition-all group"
              >
                <div className="flex items-center space-x-4 md:space-x-5">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-green-500 rounded-xl md:rounded-2xl flex items-center justify-center text-white shadow-lg">
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.539 2.016 2.069-.53c.961.547 1.916.946 3.22.947h.002c3.18 0 5.766-2.586 5.767-5.766 0-3.18-2.586-5.77-5.77-5.77zm3.367 8.24c-.149.42-.76.772-1.049.815-.29.043-.647.075-1.049-.056-.254-.082-.579-.199-1.012-.387-1.85-.805-3.044-2.69-3.136-2.812-.092-.122-.746-.992-.746-1.87 0-.878.458-1.31.621-1.492.164-.182.358-.228.477-.228.119 0 .239.001.343.006.108.005.253-.041.396.3.149.356.508 1.239.553 1.331.045.091.075.197.015.318-.06.121-.09.197-.18.303-.09.106-.188.236-.269.319-.09.091-.184.19-.079.371.106.182.471.777 1.012 1.258.697.621 1.284.815 1.466.906.182.091.289.076.396-.046.106-.122.457-.531.579-.714.122-.182.244-.152.41-.091.164.061 1.044.492 1.226.583.182.091.303.137.346.213.045.076.045.441-.104.86z"/></svg>
                  </div>
                  <div>
                    <span className="font-bold text-shilajit-brown block text-sm">{t.product.channels.wa}</span>
                    <span className="text-[9px] text-stone-400 uppercase tracking-widest font-bold">{t.product.channels.waDesc}</span>
                  </div>
                </div>
                <div className="text-green-500 font-bold text-[10px] md:text-xs uppercase group-hover:translate-x-1 transition-transform">Buy Now →</div>
              </a>
              <div className="grid grid-cols-2 gap-3">
                <a href={shopeeTarget} target="_blank" className={`flex items-center justify-center p-4 md:p-5 rounded-xl md:rounded-2xl border border-stone-200 bg-white transition-all text-[10px] md:text-xs font-bold uppercase tracking-widest text-center ${shopeeTarget === '#' ? 'opacity-30 cursor-not-allowed' : 'hover:border-orange-500 hover:text-orange-500 shadow-sm'}`}>Shopee</a>
                <a href={tiktokTarget} target="_blank" className={`flex items-center justify-center p-4 md:p-5 rounded-xl md:rounded-2xl border border-stone-200 bg-white transition-all text-[10px] md:text-xs font-bold uppercase tracking-widest text-center ${tiktokTarget === '#' ? 'opacity-30 cursor-not-allowed' : 'hover:border-black hover:text-black shadow-sm'}`}>TikTok</a>
              </div>
            </div>

            <div className="pt-6 border-t border-stone-100 flex items-center justify-between">
              <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">Certified Origin</span>
              <span className="text-[9px] font-bold text-green-600 uppercase tracking-widest">{t.product.stock}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductFeature;
