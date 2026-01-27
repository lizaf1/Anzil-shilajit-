
import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BlogPost } from '../types';

interface BlogPostPageProps {
  post: BlogPost;
  onBack: () => void;
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ post, onBack }) => {
  const { language, t } = useLanguage();

  // Dynamic SEO Meta Tags Update
  useEffect(() => {
    const originalTitle = document.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    const originalDescription = metaDescription?.getAttribute('content') || '';

    // Set new SEO values based on post and language
    const pageTitle = `${post.title[language]} | Anzil Himalayan Shilajit`;
    const pageDescription = post.excerpt[language];

    document.title = pageTitle;
    if (metaDescription) {
      metaDescription.setAttribute('content', pageDescription);
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'description';
      newMeta.content = pageDescription;
      document.head.appendChild(newMeta);
    }

    // Cleanup: Restore original tags when leaving the post page
    return () => {
      document.title = originalTitle;
      if (metaDescription) {
        metaDescription.setAttribute('content', originalDescription);
      }
    };
  }, [post, language]);

  const shareUrl = window.location.href;
  const shareTitle = post.title[language];

  const handleShare = (platform: 'facebook' | 'twitter' | 'linkedin' | 'whatsapp') => {
    let url = '';
    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'whatsapp':
        url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`;
        break;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <button 
            onClick={onBack}
            className="flex items-center space-x-2 text-stone-400 hover:text-shilajit-brown transition-colors mb-12 group"
          >
            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-bold text-xs uppercase tracking-widest">{t.blog.backToBlog}</span>
          </button>

          <div className="flex items-center space-x-4 text-xs text-gold-accent font-bold uppercase tracking-widest mb-6">
            <span>{t.blog.categories[post.category as keyof typeof t.blog.categories]}</span>
            <span className="w-1 h-1 bg-stone-200 rounded-full"></span>
            <span className="text-stone-400">{post.date}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-shilajit-brown mb-8 serif leading-tight">
            {post.title[language]}
          </h1>

          <img 
            src={post.image} 
            alt={post.title[language]} 
            className="w-full h-[400px] object-cover rounded-[2rem] shadow-xl mb-12"
          />

          <article 
            className="prose prose-stone prose-lg max-w-none text-stone-600 leading-relaxed 
            prose-headings:serif prose-headings:text-shilajit-brown prose-h1:text-5xl
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-strong:text-shilajit-brown
            prose-p:mb-6 prose-li:mb-2"
            dangerouslySetInnerHTML={{ __html: post.content[language] }}
          />

          <div className="mt-20 pt-12 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
               <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">Share this wisdom</span>
               <div className="flex space-x-2">
                 {/* Facebook */}
                 <button 
                   onClick={() => handleShare('facebook')}
                   className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 hover:bg-[#1877F2] hover:text-white transition-all shadow-sm"
                   title="Share on Facebook"
                 >
                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3l-1 3h-2v6.8c4.56-.93 8-4.96 8-9.8z"/></svg>
                 </button>
                 {/* Twitter / X */}
                 <button 
                   onClick={() => handleShare('twitter')}
                   className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 hover:bg-black hover:text-white transition-all shadow-sm"
                   title="Share on X (Twitter)"
                 >
                   <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                 </button>
                 {/* LinkedIn */}
                 <button 
                   onClick={() => handleShare('linkedin')}
                   className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 hover:bg-[#0077b5] hover:text-white transition-all shadow-sm"
                   title="Share on LinkedIn"
                 >
                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a2.7 2.7 0 0 0-2.7-2.7c-1.2 0-1.8.6-2.1 1.1v-.8h-2.5v7.7h2.5v-4.1c0-.2 0-.4.1-.6.1-.4.5-.8 1.1-.8.7 0 1 .5 1 1.3v4.2h2.5M7 19h2.5V11H7v8m1.2-9.2A1.4 1.4 0 1 0 7 8.4a1.4 1.4 0 0 0 1.2 1.4z"/></svg>
                 </button>
                 {/* WhatsApp */}
                 <button 
                   onClick={() => handleShare('whatsapp')}
                   className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 hover:bg-[#25D366] hover:text-white transition-all shadow-sm"
                   title="Share on WhatsApp"
                 >
                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.539 2.016 2.069-.53c.961.547 1.916.946 3.22.947h.002c3.18 0 5.766-2.586 5.767-5.766 0-3.18-2.586-5.77-5.77-5.77zm3.367 8.24c-.149.42-.76.772-1.049.815-.29.043-.647.075-1.049-.056-.254-.082-.579-.199-1.012-.387-1.85-.805-3.044-2.69-3.136-2.812-.092-.122-.746-.992-.746-1.87 0-.878.458-1.31.621-1.492.164-.182.358-.228.477-.228.119 0 .239.001.343.006.108.005.253-.041.396.3.149.356.508 1.239.553 1.331.045.091.075.197.015.318-.06.121-.09.197-.18.303-.09.106-.188.236-.269.319-.09.091-.184.19-.079.371.106.182.471.777 1.012 1.258.697.621 1.284.815 1.466.906.182.091.289.076.396-.046.106-.122.457-.531.579-.714.122-.182.244-.152.41-.091.164.061 1.044.492 1.226.583.182.091.303.137.346.213.045.076.045.441-.104.86z"/></svg>
                 </button>
               </div>
            </div>
            <button 
              onClick={() => { window.location.hash = '#shop'; onBack(); }}
              className="bg-gold-accent text-white px-8 py-3 rounded-full font-bold text-sm shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
            >
              {t.nav.shop}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
