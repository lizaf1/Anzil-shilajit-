import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import ProductFeature from './components/ProductFeature';
import Footer from './components/Footer';
import CertificatesPage from './components/CertificatesPage';
import BlogPage from './components/BlogPage';
import BlogPostPage from './components/BlogPostPage';
import AdminPanel from './components/AdminPanel';
import AIAssistant from './components/AIAssistant';
import { blogPosts as initialBlogPosts } from './data/blog-posts';
import { translations } from './translations';

export interface ProductVariant {
  id: string;
  size: string;
  priceIdr: number;
}

export interface EditableContent {
  hero: {
    titleEn: string;
    titleId: string;
    titleAccentEn: string;
    titleAccentId: string;
    descEn: string;
    descId: string;
    image: string;
  };
  intro: {
    titleEn: string;
    titleId: string;
    descEn: string;
    descId: string;
    image: string;
    quoteEn: string;
    quoteId: string;
  };
  product: {
    titleEn: string;
    titleId: string;
    descEn: string;
    descId: string;
    image: string;
    whatsapp: string;
    shopee: string;
    tiktok: string;
    variants: ProductVariant[];
  };
  benefits: {
    titleEn: string;
    titleId: string;
    subtitleEn: string;
    subtitleId: string;
    items: Array<{ titleEn: string; titleId: string; descEn: string; descId: string }>;
  };
  faq: {
    titleEn: string;
    titleId: string;
    items: Array<{ qEn: string; qId: string; aEn: string; aId: string }>;
  };
  certs: {
    titleEn: string;
    titleId: string;
    descEn: string;
    descId: string;
    items: Array<{ titleEn: string; titleId: string; descEn: string; descId: string; idNum: string; image: string }>;
  };
}

const DEFAULT_CONTENT: EditableContent = {
  hero: {
    titleEn: translations.en.hero.title,
    titleId: translations.id.hero.title,
    titleAccentEn: translations.en.hero.titleAccent,
    titleAccentId: translations.id.hero.titleAccent,
    descEn: translations.en.hero.desc,
    descId: translations.id.hero.desc,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000",
  },
  intro: {
    titleEn: translations.en.intro.title,
    titleId: translations.id.intro.title,
    descEn: translations.en.intro.desc,
    descId: translations.id.intro.desc,
    image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&q=80&w=1000",
    quoteEn: translations.en.intro.quote,
    quoteId: translations.id.intro.quote,
  },
  product: {
    titleEn: translations.en.product.sectionTitle,
    titleId: translations.id.product.sectionTitle,
    descEn: translations.en.product.desc,
    descId: translations.id.product.desc,
    image: "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&q=80&w=1000",
    whatsapp: "6281234567890",
    shopee: "https://shopee.co.id/anzil_official",
    tiktok: "https://www.tiktok.com/@anzil_wellness",
    variants: [
      { id: '1', size: '15 Grams', priceIdr: 250000 },
      { id: '2', size: '30 Grams', priceIdr: 450000 },
      { id: '3', size: '50 Grams', priceIdr: 700000 },
    ],
  },
  benefits: {
    titleEn: translations.en.benefits.title,
    titleId: translations.id.benefits.title,
    subtitleEn: translations.en.benefits.subtitle,
    subtitleId: translations.id.benefits.subtitle,
    items: (translations.en.benefits.items || []).map((item: any, i: number) => ({
      titleEn: item.title,
      titleId: translations.id.benefits.items?.[i]?.title || "",
      descEn: item.desc,
      descId: translations.id.benefits.items?.[i]?.desc || "",
    })),
  },
  faq: {
    titleEn: translations.en.faq.title,
    titleId: translations.id.faq.title,
    items: (translations.en.faq.items || []).map((item: any, i: number) => ({
      qEn: item.q,
      qId: translations.id.faq.items?.[i]?.q || "",
      aEn: item.a,
      aId: translations.id.faq.items?.[i]?.a || "",
    })),
  },
  certs: {
    titleEn: translations.en.certs.title,
    titleId: translations.id.certs.title,
    descEn: translations.en.certs.desc,
    descId: translations.id.certs.desc,
    items: (translations.en.certs.items || []).map((item: any, i: number) => ({
      titleEn: item.title,
      titleId: translations.id.certs.items?.[i]?.title || "",
      descEn: item.desc,
      descId: translations.id.certs.items?.[i]?.desc || "",
      idNum: ["MD 867011001541", "Batch #ANZ-2024-08", "FSMS #99210", "Good Manufacturing Practice"][i] || "Cert-ID",
      image: [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Logo_BPOM.svg/1200px-Logo_BPOM.svg.png",
        "https://cdn-icons-png.flaticon.com/512/3209/3209065.png",
        "https://cdn-icons-png.flaticon.com/512/3501/3501198.png",
        "https://cdn-icons-png.flaticon.com/512/2855/2855523.png"
      ][i] || "https://placehold.co/100",
    })),
  },
};

type Page = 'home' | 'certificates' | 'blog' | 'blog-post' | 'admin';

const AppContent: React.FC = () => {
  const { language, t } = useLanguage();
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const [blogPosts, setBlogPosts] = useState(() => {
    const saved = localStorage.getItem('anzil_blog_posts');
    return saved ? JSON.parse(saved) : initialBlogPosts;
  });

  const [siteContent, setSiteContent] = useState<EditableContent>(() => {
    const saved = localStorage.getItem('anzil_site_content');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Deep merge logic to ensure new features don't crash with old data
        return {
          ...DEFAULT_CONTENT,
          ...parsed,
          hero: { ...DEFAULT_CONTENT.hero, ...parsed.hero },
          intro: { ...DEFAULT_CONTENT.intro, ...parsed.intro },
          product: { ...DEFAULT_CONTENT.product, ...parsed.product },
          benefits: { ...DEFAULT_CONTENT.benefits, ...parsed.benefits },
          faq: { ...DEFAULT_CONTENT.faq, ...parsed.faq },
          certs: { ...DEFAULT_CONTENT.certs, ...parsed.certs },
        };
      } catch (e) {
        console.error("Failed to parse site content", e);
        return DEFAULT_CONTENT;
      }
    }
    return DEFAULT_CONTENT;
  });

  useEffect(() => {
    localStorage.setItem('anzil_blog_posts', JSON.stringify(blogPosts));
  }, [blogPosts]);

  useEffect(() => {
    localStorage.setItem('anzil_site_content', JSON.stringify(siteContent));
  }, [siteContent]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, selectedPostId]);

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    if (page !== 'blog-post') setSelectedPostId(null);
  };

  const selectedPost = selectedPostId ? blogPosts.find((p: any) => p.id === selectedPostId) : null;

  if (currentPage === 'admin') {
    return (
      <AdminPanel 
        onExit={() => navigateTo('home')} 
        blogPosts={blogPosts} 
        setBlogPosts={setBlogPosts}
        siteContent={siteContent}
        setSiteContent={setSiteContent}
        isAuthenticated={isAdminAuthenticated}
        setAuthenticated={setIsAdminAuthenticated}
      />
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar onNavigate={navigateTo} currentPage={currentPage} />
      
      {currentPage === 'home' && (
        <main>
          <Hero content={siteContent.hero} />
          
          <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
              <div className="flex flex-col md:flex-row items-center gap-16">
                <div className="md:w-1/2">
                  <div className="relative group">
                    <img 
                      src={siteContent.intro.image} 
                      alt="Artisanal Himalayan Sourcing" 
                      className="rounded-[3rem] shadow-2xl transition-transform duration-700 group-hover:scale-[1.02] w-full aspect-square object-cover"
                    />
                    <div className="absolute -bottom-6 -right-6 bg-gold-accent p-8 rounded-3xl shadow-xl hidden lg:block max-w-xs">
                      <p className="text-white font-bold text-xl serif">"{language === 'en' ? siteContent.intro.quoteEn : siteContent.intro.quoteId}"</p>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <span className="text-gold-accent font-bold uppercase tracking-widest text-xs mb-4 block">{t.intro.tag}</span>
                  <h2 className="text-4xl md:text-5xl font-bold text-shilajit-brown mb-6 serif">
                    {language === 'en' ? siteContent.intro.titleEn : siteContent.intro.titleId}
                  </h2>
                  <p className="text-stone-600 text-lg leading-relaxed mb-8">
                    {language === 'en' ? siteContent.intro.descEn : siteContent.intro.descId}
                  </p>
                  <div className="grid grid-cols-2 gap-8 border-t border-stone-100 pt-8">
                    <div>
                      <h4 className="text-2xl font-bold text-shilajit-brown mb-1 serif">16,000 ft</h4>
                      <p className="text-stone-400 text-[10px] font-bold uppercase tracking-widest">{t.intro.stats.altitude}</p>
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-shilajit-brown mb-1 serif">100% Raw</h4>
                      <p className="text-stone-400 text-[10px] font-bold uppercase tracking-widest">{t.intro.stats.potency}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Benefits content={siteContent.benefits} />
          <ProductFeature content={siteContent.product} />
          
          <AIAssistant />

          <section id="faq" className="py-24 bg-white">
            <div className="container mx-auto px-6">
              <h2 className="text-4xl font-bold text-center text-shilajit-brown mb-16 serif">
                {language === 'en' ? siteContent.faq.titleEn : siteContent.faq.titleId}
              </h2>
              <div className="max-w-3xl mx-auto space-y-4">
                {siteContent.faq.items.map((faq, i) => (
                  <details key={i} className="group p-6 rounded-2xl border border-stone-100 hover:border-stone-200 transition-all">
                    <summary className="list-none flex justify-between items-center cursor-pointer font-bold text-lg text-shilajit-brown serif">
                      {language === 'en' ? faq.qEn : faq.qId}
                      <span className="text-gold-accent group-open:rotate-45 transition-transform duration-300 text-2xl">+</span>
                    </summary>
                    <p className="mt-4 text-stone-500 leading-relaxed text-sm">
                      {language === 'en' ? faq.aEn : faq.aId}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        </main>
      )}

      {currentPage === 'certificates' && (
        <CertificatesPage onBack={() => navigateTo('home')} content={siteContent.certs} />
      )}

      {currentPage === 'blog' && (
        <BlogPage onPostSelect={(id) => { setSelectedPostId(id); setCurrentPage('blog-post'); }} posts={blogPosts} />
      )}

      {currentPage === 'blog-post' && selectedPost && (
        <BlogPostPage post={selectedPost} onBack={() => navigateTo('blog')} />
      )}

      <Footer content={siteContent.product} onAdminClick={() => navigateTo('admin')} />
    </div>
  );
};

const App: React.FC = () => (
  <LanguageProvider>
    <AppContent />
  </LanguageProvider>
);

export default App;