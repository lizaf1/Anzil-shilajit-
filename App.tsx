
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
import FloatingWhatsApp from './components/FloatingWhatsApp';
import { blogPosts as initialBlogPosts } from './data/blog-posts';
import { translations } from './translations';

export interface ProductVariant {
  id: string;
  size: string;
  priceIdr: number;
  image?: string;
  shopeeLink?: string;
  tiktokLink?: string;
}

export interface CertStat {
  value: string;
  labelEn: string;
  labelId: string;
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
    statAltitude: string;
    statPotency: string;
  };
  product: {
    titleEn: string;
    titleId: string;
    descEn: string;
    descId: string;
    image: string;
    whatsapp: string;
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
    footerTextEn: string;
    footerTextId: string;
    items: Array<{ titleEn: string; titleId: string; descEn: string; descId: string; idNum: string; image: string }>;
    stats: CertStat[];
  };
  settings: {
    adminPassword: string;
    globalLogo?: string;
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
    statAltitude: "16,000 ft",
    statPotency: "100% Raw",
  },
  product: {
    titleEn: translations.en.product.sectionTitle,
    titleId: translations.id.product.sectionTitle,
    descEn: translations.en.product.desc,
    descId: translations.id.product.desc,
    image: "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&q=80&w=1000",
    whatsapp: "628883748626",
    variants: [
      { id: '1', size: '15 Grams', priceIdr: 250000, shopeeLink: 'https://shopee.co.id/product/anzil/15g', tiktokLink: 'https://tiktok.com/shop/anzil/15g', image: "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&q=80&w=1000" },
      { id: '2', size: '30 Grams', priceIdr: 450000, shopeeLink: 'https://shopee.co.id/product/anzil/30g', tiktokLink: 'https://tiktok.com/shop/anzil/30g' },
      { id: '3', size: '50 Grams', priceIdr: 700000, shopeeLink: 'https://shopee.co.id/product/anzil/50g', tiktokLink: 'https://tiktok.com/shop/anzil/50g' },
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
    footerTextEn: "Global Safety Standard Compliant",
    footerTextId: "Patuh Terhadap Standar Keamanan Global",
    items: [
      {
        titleEn: "BPOM P-IRT Certified",
        titleId: "Sertifikasi BPOM P-IRT",
        descEn: "Indonesian Home Industry Food Permit verifying safe production standards.",
        descId: "Izin P-IRT memastikan standar produksi pangan yang aman.",
        idNum: "P-IRT 2093275010688-26",
        image: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80&w=1200"
      }
    ],
    stats: [
      { value: "65%+", labelEn: "Fulvic Acid", labelId: "Asam Fulvat" },
      { value: "0.0%", labelEn: "ETO Residue", labelId: "Residu ETO" },
      { value: "84+", labelEn: "Trace Minerals", labelId: "Mineral Jejak" },
      { value: "<0.5", labelEn: "Heavy Metals (PPM)", labelId: "Logam Berat (PPM)" }
    ]
  },
  settings: {
    adminPassword: "admin123",
    globalLogo: ""
  }
};

type Page = 'home' | 'certificates' | 'blog' | 'blog-post' | 'admin';

const AppContent: React.FC = () => {
  const { language, t } = useLanguage();
  const [currentPage, setCurrentPage] = useState<Page>(() => {
    return window.location.hash === '#admin' ? 'admin' : 'home';
  });
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const [blogPosts, setBlogPosts] = useState<any[]>(initialBlogPosts);
  const [siteContent, setSiteContent] = useState<EditableContent>(DEFAULT_CONTENT);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Fetch from Turso database on mount
  useEffect(() => {
    async function loadData() {
      try {
        const [contentRes, blogRes] = await Promise.all([
          fetch('/api/store/siteContent', { cache: 'no-store' }).then(r => r.json()),
          fetch('/api/store/blogPosts', { cache: 'no-store' }).then(r => r.json())
        ]);
        
        if (contentRes.data) {
          try {
            const parsed = contentRes.data;
            setSiteContent({
              ...DEFAULT_CONTENT,
              ...parsed,
              hero: { ...DEFAULT_CONTENT.hero, ...parsed.hero },
              intro: { ...DEFAULT_CONTENT.intro, ...parsed.intro },
              product: { ...DEFAULT_CONTENT.product, ...parsed.product },
              benefits: { ...DEFAULT_CONTENT.benefits, ...parsed.benefits },
              faq: { ...DEFAULT_CONTENT.faq, ...parsed.faq },
              certs: { 
                ...DEFAULT_CONTENT.certs, 
                ...parsed.certs,
                stats: parsed.certs?.stats || DEFAULT_CONTENT.certs.stats 
              },
              settings: { ...DEFAULT_CONTENT.settings, ...parsed.settings },
            });
          } catch (e) {
            console.error(e);
          }
        } else {
          // Fallback to old localStorage for migration if DB is empty
          const savedLocal = localStorage.getItem('anzil_site_content');
          if (savedLocal) {
            setSiteContent(JSON.parse(savedLocal));
          }
        }
        
        if (blogRes.data) {
          setBlogPosts(blogRes.data);
        } else {
          const savedLocalB = localStorage.getItem('anzil_blog_posts');
          if (savedLocalB) {
            setBlogPosts(JSON.parse(savedLocalB));
          }
        }
      } catch (e) {
        console.error("Failed to fetch from DB:", e);
      } finally {
        setIsLoading(false);
        setIsInitialLoad(false);
      }
    }
    loadData();
  }, []);

  // Save to Turso database with debounce
  useEffect(() => {
    if (isInitialLoad) return;
    
    // Also save to localStorage as a fallback locally
    try {
      localStorage.setItem('anzil_blog_posts', JSON.stringify(blogPosts));
    } catch (e) {
      console.warn("Local storage quota exceeded, falling back exclusively to Turso");
    }
    
    const timer = setTimeout(() => {
      fetch('/api/store/blogPosts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: blogPosts })
      }).catch(e => console.error("Database save failed", e));
    }, 1000);
    return () => clearTimeout(timer);
  }, [blogPosts, isInitialLoad]);

  useEffect(() => {
    if (isInitialLoad) return;
    
    // Also save to localStorage as a fallback locally
    try {
      localStorage.setItem('anzil_site_content', JSON.stringify(siteContent));
    } catch (e) {
      console.warn("Local storage quota exceeded, falling back exclusively to Turso");
    }
    
    const timer = setTimeout(() => {
      fetch('/api/store/siteContent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: siteContent })
      }).catch(e => console.error("Database save failed", e));
    }, 1000);
    return () => clearTimeout(timer);
  }, [siteContent, isInitialLoad]);

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
    if (page !== 'blog-post') setSelectedPostId(null);
  };

  const selectedPost = selectedPostId ? blogPosts.find((p: any) => p.id === selectedPostId) : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, selectedPostId]);

  // Sync Global Settings with Document Head
  useEffect(() => {
    if (siteContent.settings.globalLogo) {
      // Favicon
      let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = siteContent.settings.globalLogo;

      // Meta tags (Twitter & OpenGraph)
      const twitterImg = document.querySelector("meta[property='twitter:image']") as HTMLMetaElement;
      if (twitterImg) twitterImg.content = siteContent.settings.globalLogo;
      
      const ogImg = document.querySelector("meta[property='og:image']") as HTMLMetaElement;
      if (ogImg) ogImg.content = siteContent.settings.globalLogo;
    }
  }, [siteContent.settings.globalLogo]);

  // Dynamic Document SEO & AEO (Artificial Engine Optimization) Engine
  useEffect(() => {
    let title = "Anzil | Resin Shilajit Himalaya Premium";
    let desc = "Rasakan khasiat alam dengan Resin Shilajit Himalaya Anzil. Teruji klinis, kaya akan asam fulvat.";
    
    if (currentPage === 'blog') {
      title = "Anzil Journal | Pengetahuan seputar Shilajit";
      desc = "Edukasi, sains, dan pengetahuan mendalam seputar Resin Shilajit Himalaya.";
    } else if (currentPage === 'certificates') {
      title = "Sertifikasi & Uji Klinis | Anzil Shilajit";
      desc = "Dokumen resmi standar keamanan global dan kualitas uji lab Anzil Shilajit.";
    } else if (currentPage === 'blog-post' && selectedPost) {
      title = `${selectedPost.title[language]} | Anzil Journal`;
      desc = `${selectedPost.excerpt[language]}`;
    }

    document.title = title;
    
    const metaDesc = document.querySelector("meta[name='description']");
    if (metaDesc) metaDesc.setAttribute('content', desc);

    const ogTitle = document.querySelector("meta[property='og:title']");
    if (ogTitle) ogTitle.setAttribute('content', title);

    const ogDesc = document.querySelector("meta[property='og:description']");
    if (ogDesc) ogDesc.setAttribute('content', desc);

    const twitterTitle = document.querySelector("meta[property='twitter:title']");
    if (twitterTitle) twitterTitle.setAttribute('content', title);

    const twitterDesc = document.querySelector("meta[property='twitter:description']");
    if (twitterDesc) twitterDesc.setAttribute('content', desc);

    // --- AEO (Artificial Engine Optimization) JSON-LD SCHEMA INJECTION ---
    // Remove all old schema tags to prevent duplicates
    document.querySelectorAll("script[type='application/ld+json']").forEach(el => el.remove());

    const schemas: any[] = [];
    const siteUrl = window.location.origin;

    // 1. Organization Schema
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Anzil",
      "url": siteUrl,
      "logo": siteContent.settings.globalLogo || `${siteUrl}/favicon.ico`,
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": `+${siteContent.product.whatsapp}`,
        "contactType": "customer service"
      }
    });

    if (currentPage === 'home') {
      // 2. Product Schema
      const offers = siteContent.product.variants.map(v => ({
        "@type": "Offer",
        "name": `Anzil Shilajit ${v.size}`,
        "priceCurrency": "IDR",
        "price": v.priceIdr,
        "availability": "https://schema.org/InStock",
        "url": v.shopeeLink || v.tiktokLink || siteUrl
      }));

      schemas.push({
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Anzil Resin Shilajit Himalaya",
        "image": siteContent.product.image,
        "description": desc,
        "brand": { "@type": "Brand", "name": "Anzil" },
        "offers": offers.length > 0 ? offers : {
          "@type": "Offer",
          "priceCurrency": "IDR",
          "price": "250000",
          "availability": "https://schema.org/InStock",
          "url": siteUrl
        }
      });

      // 3. FAQ Schema (Highly critical for Perplexity & Google SGE direct answers)
      if (siteContent.faq.items.length > 0) {
        schemas.push({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": siteContent.faq.items.map(faq => ({
            "@type": "Question",
            "name": language === 'id' ? faq.qId : faq.qEn,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": language === 'id' ? faq.aId : faq.aEn
            }
          }))
        });
      }
    } else if (currentPage === 'blog-post' && selectedPost) {
      // 4. Article / BlogPosting Schema (Crucial for AI knowledge extraction)
      schemas.push({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": selectedPost.title[language],
        "image": selectedPost.image,
        "datePublished": selectedPost.date,
        "dateModified": selectedPost.date,
        "author": {
          "@type": "Organization",
          "name": "Anzil Editorial"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Anzil",
          "logo": {
            "@type": "ImageObject",
            "url": siteContent.settings.globalLogo || `${siteUrl}/favicon.ico`
          }
        },
        "description": selectedPost.excerpt[language],
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": window.location.href
        }
      });
    }

    // Inject all schemas into the head
    schemas.forEach(schema => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    });

  }, [currentPage, selectedPost, language, siteContent]);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setCurrentPage('admin');
      } else if (window.location.hash === '') {
        setCurrentPage('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-shilajit-brown/20 border-t-shilajit-brown rounded-full animate-spin mb-4"></div>
          <p className="text-shilajit-brown font-bold tracking-widest uppercase text-xs">Loading Content...</p>
        </div>
      </div>
    );
  }

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
          
          <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
                <div className="md:w-1/2 w-full">
                  <div className="relative group">
                    <img 
                      src={siteContent.intro.image} 
                      alt="Artisanal Himalayan Sourcing" 
                      className="rounded-[2rem] md:rounded-[3rem] shadow-2xl transition-transform duration-700 group-hover:scale-[1.02] w-full aspect-square object-cover"
                    />
                    <div className="absolute -bottom-6 -right-6 bg-gold-accent p-8 rounded-3xl shadow-xl hidden lg:block max-w-xs">
                      <p className="text-white font-bold text-xl serif">"{language === 'en' ? siteContent.intro.quoteEn : siteContent.intro.quoteId}"</p>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2 w-full mt-4 md:mt-0">
                  <span className="text-gold-accent font-bold uppercase tracking-widest text-xs mb-3 md:mb-4 block">{t.intro.tag}</span>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-shilajit-brown mb-4 md:mb-6 serif">
                    {language === 'en' ? siteContent.intro.titleEn : siteContent.intro.titleId}
                  </h2>
                  <p className="text-stone-600 text-base md:text-lg leading-relaxed mb-6 md:mb-8">
                    {language === 'en' ? siteContent.intro.descEn : siteContent.intro.descId}
                  </p>
                  <div className="grid grid-cols-2 gap-6 md:gap-8 border-t border-stone-100 pt-6 md:pt-8">
                    <div>
                      <h4 className="text-xl md:text-2xl font-bold text-shilajit-brown mb-1">{siteContent.intro.statAltitude}</h4>
                      <p className="text-[9px] md:text-[10px] font-bold uppercase text-stone-400 tracking-widest">{t.intro.stats.altitude}</p>
                    </div>
                    <div>
                      <h4 className="text-xl md:text-2xl font-bold text-shilajit-brown mb-1">{siteContent.intro.statPotency}</h4>
                      <p className="text-[9px] md:text-[10px] font-bold uppercase text-stone-400 tracking-widest">{t.intro.stats.potency}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Benefits content={siteContent.benefits} />
          <ProductFeature content={siteContent.product} />

          <section className="py-16 md:py-24 bg-stone-50" id="faq">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold text-shilajit-brown mb-8 md:mb-12 text-center serif">{language === 'en' ? siteContent.faq.titleEn : siteContent.faq.titleId}</h2>
                <div className="space-y-4 md:space-y-6">
                  {siteContent.faq.items.map((item, i) => (
                    <div key={i} className="bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl border border-stone-200 shadow-sm">
                      <h4 className="text-base md:text-lg font-bold text-shilajit-brown mb-2 md:mb-3 serif">{language === 'en' ? item.qEn : item.qId}</h4>
                      <p className="text-stone-600 text-xs md:text-sm leading-relaxed">{language === 'en' ? item.aEn : item.aId}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {currentPage === 'certificates' && (
        <CertificatesPage onBack={() => navigateTo('home')} content={siteContent.certs} />
      )}
      
      {currentPage === 'blog' && (
        <BlogPage onPostSelect={(id) => { setSelectedPostId(id); navigateTo('blog-post'); }} posts={blogPosts} />
      )}

      {currentPage === 'blog-post' && selectedPost && (
        <BlogPostPage post={selectedPost} onBack={() => navigateTo('blog')} />
      )}

      <Footer 
        content={{ whatsapp: siteContent.product.whatsapp }} 
        onAdminClick={() => navigateTo('admin')} 
        onNavigate={navigateTo}
        currentPage={currentPage}
      />
      <FloatingWhatsApp phoneNumber={siteContent.product.whatsapp || "628883748626"} />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
