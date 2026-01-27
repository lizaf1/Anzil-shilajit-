
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BlogPost } from '../types';

interface BlogPageProps {
  onPostSelect: (postId: string) => void;
  posts: BlogPost[];
}

const BlogPage: React.FC<BlogPageProps> = ({ onPostSelect, posts }) => {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen bg-stone-50 pt-32 pb-20">
      <div className="container mx-auto px-6">
        <header className="max-w-3xl mb-16">
          <h1 className="text-5xl font-bold text-shilajit-brown mb-6 serif">{t.blog.title}</h1>
          <p className="text-xl text-stone-600 leading-relaxed">
            {t.blog.subtitle}
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-12">
          {posts.map((post) => (
            <article 
              key={post.id} 
              className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all border border-stone-200 cursor-pointer group flex flex-col h-full"
              onClick={() => onPostSelect(post.id)}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title[language]} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-shilajit-brown text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                    {t.blog.categories[post.category as keyof typeof t.blog.categories]}
                  </span>
                </div>
              </div>
              
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center space-x-4 text-xs text-stone-400 font-bold uppercase tracking-widest mb-4">
                  <span>{post.date}</span>
                  <span className="w-1 h-1 bg-stone-200 rounded-full"></span>
                  <span>{post.readTime}</span>
                </div>
                
                <h3 className="text-2xl font-bold text-shilajit-brown mb-4 serif group-hover:text-gold-accent transition-colors">
                  {post.title[language]}
                </h3>
                
                <p className="text-stone-500 mb-8 line-clamp-3">
                  {post.excerpt[language]}
                </p>

                <div className="mt-auto flex items-center text-gold-accent font-bold text-sm uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                  <span>{t.blog.readMore}</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
