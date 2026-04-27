
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onAdminClick?: () => void;
  onNavigate: (page: 'home' | 'certificates' | 'blog' | 'return-policy' | 'shipping-details') => void;
  currentPage: string;
  content: {
    whatsapp: string;
  };
}

const Footer: React.FC<FooterProps> = ({ onAdminClick, onNavigate, currentPage, content }) => {
  const { t } = useLanguage();

  const handleHomeAnchor = (e: React.MouseEvent, anchor: string) => {
    if (currentPage !== 'home') {
      e.preventDefault();
      onNavigate('home');
      setTimeout(() => {
        window.location.hash = anchor;
      }, 100);
    }
  };

  return (
    <footer className="bg-shilajit-brown text-stone-400 py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-5 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-white text-3xl font-bold serif mb-6">ANZIL</h2>
            <p className="max-w-md mb-8 leading-relaxed">{t.footer.mission}</p>
            <div className="flex space-x-4">
              <a href={`https://wa.me/${content.whatsapp}`} target="_blank" className="w-10 h-10 rounded-full border border-stone-700 flex items-center justify-center hover:bg-gold-accent hover:border-gold-accent transition-all text-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.539 2.016 2.069-.53c.961.547 1.916.946 3.22.947h.002c3.18 0 5.766-2.586 5.767-5.766 0-3.18-2.586-5.77-5.77-5.77zm3.367 8.24c-.149.42-.76.772-1.049.815-.29.043-.647.075-1.049-.056-.254-.082-.579-.199-1.012-.387-1.85-.805-3.044-2.69-3.136-2.812-.092-.122-.746-.992-.746-1.87 0-.878.458-1.31.621-1.492.164-.182.358-.228.477-.228.119 0 .239.001.343.006.108.005.253-.041.396.3.149.356.508 1.239.553 1.331.045.091.075.197.015.318-.06.121-.09.197-.18.303-.09.106-.188.236-.269.319-.09.091-.184.19-.079.371.106.182.471.777 1.012 1.258.697.621 1.284.815 1.466.906.182.091.289.076.396-.046.106-.122.457-.531.579-.714.122-.182.244-.152.41-.091.164.061 1.044.492 1.226.583.182.091.303.137.346.213.045.076.045.441-.104.86z"/></svg>
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Links</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="/#shop" onClick={(e) => handleHomeAnchor(e, 'shop')} className="hover:text-gold-accent transition-colors">Catalog</a></li>
              <li><a href="/#benefits" onClick={(e) => handleHomeAnchor(e, 'benefits')} className="hover:text-gold-accent transition-colors">Benefits</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Explore</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="/certificates" onClick={(e) => { e.preventDefault(); onNavigate('certificates'); }} className="hover:text-gold-accent transition-colors">Lab Results</a></li>
              <li><a href="/blog" onClick={(e) => { e.preventDefault(); onNavigate('blog'); }} className="hover:text-gold-accent transition-colors">Our Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Support</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="/return-policy" onClick={(e) => { e.preventDefault(); onNavigate('return-policy'); }} className="hover:text-gold-accent transition-colors">Return Policy</a></li>
              <li><a href="/shipping-details" onClick={(e) => { e.preventDefault(); onNavigate('shipping-details'); }} className="hover:text-gold-accent transition-colors">Shipping Details</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-12 border-t border-stone-800 flex justify-between items-center text-xs">
          <p>© 2024 Anzil. {t.footer.rights}</p>
          <a 
            href="/admin" 
            onClick={(e) => { e.preventDefault(); onAdminClick?.(); }} 
            className="opacity-10 hover:opacity-100 text-[10px] font-bold"
          >
            ADMIN
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
