
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
import { blogPosts as initialBlogPosts } from './data/blog-posts';

type Page = 'home' | 'certificates' | 'blog' | 'blog-post' | 'admin';

const AppContent: React.FC = () => {
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [blogPosts, setBlogPosts] = useState(initialBlogPosts);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, selectedPostId]);

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    if (page !== 'blog-post') {
      setSelectedPostId(null);
    }
  };

  const handlePostSelect = (postId: string) => {
    setSelectedPostId(postId);
    setCurrentPage('blog-post');
  };

  const selectedPost = selectedPostId ? blogPosts.find(p => p.id === selectedPostId) : null;

  // Render Admin separately to avoid wrapping in public Navbar/Footer
  if (currentPage === 'admin') {
    return (
      <AdminPanel 
        onExit={() => navigateTo('home')} 
        blogPosts={blogPosts} 
        setBlogPosts={setBlogPosts}
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
          <Hero />
          
          <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
              <div className="flex flex-col md:flex-row items-center gap-16">
                <div className="md:w-1/2">
                  <div className="relative group">
                    <img 
                      src="https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&q=80&w=1000" 
                      alt="Artisanal Himalayan Sourcing" 
                      className="rounded-[3rem] shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                    <div className="absolute -bottom-6 -right-6 bg-gold-accent p-8 rounded-3xl shadow-xl hidden lg:block">
                      <p className="text-white font-bold text-xl serif">"{t.intro.quote}"</p>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <span className="text-gold-accent font-bold uppercase tracking-widest text-xs mb-4 block">{t.intro.tag}</span>
                  <h2 className="text-4xl md:text-5xl font-bold text-shilajit-brown mb-6 serif">{t.intro.title}</h2>
                  <p className="text-stone-600 text-lg leading-relaxed mb-8">
                    {t.intro.desc}
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

          <Benefits />
          <ProductFeature />

          <section id="faq" className="py-24 bg-white">
            <div className="container mx-auto px-6">
              <h2 className="text-4xl font-bold text-center text-shilajit-brown mb-16 serif">{t.faq.title}</h2>
              <div className="max-w-3xl mx-auto space-y-4">
                {t.faq.items.map((faq: any, i: number) => (
                  <details key={i} className="group p-6 rounded-2xl border border-stone-100 hover:border-stone-200 transition-all">
                    <summary className="list-none flex justify-between items-center cursor-pointer font-bold text-lg text-shilajit-brown serif">
                      {faq.q}
                      <span className="text-gold-accent group-open:rotate-45 transition-transform duration-300 text-2xl">+</span>
                    </summary>
                    <p className="mt-4 text-stone-500 leading-relaxed text-sm">{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        </main>
      )}

      {currentPage === 'certificates' && (
        <CertificatesPage onBack={() => navigateTo('home')} />
      )}

      {currentPage === 'blog' && (
        <BlogPage onPostSelect={handlePostSelect} posts={blogPosts} />
      )}

      {currentPage === 'blog-post' && selectedPost && (
        <BlogPostPage post={selectedPost} onBack={() => navigateTo('blog')} />
      )}

      <Footer onAdminClick={() => navigateTo('admin')} />
      
      <div className="md:hidden fixed bottom-6 left-6 right-6 z-50">
        <a href="#shop" className="bg-shilajit-brown text-white w-full py-4 rounded-full text-center font-bold shadow-2xl block border border-white/10 backdrop-blur-sm">
          {t.product.name}
        </a>
      </div>
    </div>
  );
};

const App: React.FC = () => (
  <LanguageProvider>
    <AppContent />
  </LanguageProvider>
);

export default App;
