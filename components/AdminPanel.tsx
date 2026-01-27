
import React, { useState } from 'react';
import { BlogPost } from '../types';
import { EditableContent } from '../App';

interface AdminPanelProps {
  onExit: () => void;
  blogPosts: BlogPost[];
  setBlogPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  siteContent: EditableContent;
  setSiteContent: React.Dispatch<React.SetStateAction<EditableContent>>;
  isAuthenticated: boolean;
  setAuthenticated: (val: boolean) => void;
}

type AdminTab = 'dashboard' | 'hero' | 'intro' | 'benefits' | 'faq' | 'certs' | 'product' | 'blog';

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  onExit, 
  blogPosts, 
  setBlogPosts, 
  siteContent, 
  setSiteContent, 
  isAuthenticated, 
  setAuthenticated 
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [password, setPassword] = useState('');
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') setAuthenticated(true);
    else alert('Invalid credentials');
  };

  const updateContent = (section: keyof EditableContent, field: string, value: any) => {
    setSiteContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const updateNestedContent = (section: keyof EditableContent, index: number, field: string, value: any) => {
    const currentSection = siteContent[section] as any;
    const newItems = [...currentSection.items];
    newItems[index] = { ...newItems[index], [field]: value };
    updateContent(section, 'items', newItems);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-shilajit-brown flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-[2rem] p-10 shadow-2xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-shilajit-brown serif mb-2">Anzil Command Center</h1>
            <p className="text-stone-400 text-sm tracking-widest uppercase">Admin Login</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 outline-none"
              placeholder="Password (admin123)"
            />
            <button className="w-full bg-shilajit-brown text-white font-bold py-4 rounded-xl hover:bg-gold-accent transition-colors">Login</button>
            <button type="button" onClick={onExit} className="w-full text-stone-400 text-xs font-bold uppercase tracking-widest">Exit</button>
          </form>
        </div>
      </div>
    );
  }

  const SectionHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
    <header className="mb-10">
      <h1 className="text-4xl font-bold text-shilajit-brown serif">{title}</h1>
      <p className="text-stone-500">{subtitle}</p>
    </header>
  );

  const Field = ({ label, value, onChange, type = 'text' }: { label: string; value: string; onChange: (val: string) => void, type?: 'text' | 'textarea' }) => (
    <div className="space-y-2">
      <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{label}</label>
      {type === 'text' ? (
        <input 
          type="text" 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-gold-accent transition-all"
        />
      ) : (
        <textarea 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 h-24 outline-none focus:ring-2 focus:ring-gold-accent transition-all"
        />
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-shilajit-brown text-white flex flex-col sticky top-0 h-screen overflow-y-auto">
        <div className="p-8 text-center border-b border-white/5">
          <h2 className="text-2xl font-bold serif">ANZIL CMS</h2>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <SidebarLink active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon="📊">Overview</SidebarLink>
          <div className="pt-4 pb-2 px-4 text-[10px] font-bold text-stone-500 uppercase tracking-widest">Main Pages</div>
          <SidebarLink active={activeTab === 'hero'} onClick={() => setActiveTab('hero')} icon="🏔️">Hero Section</SidebarLink>
          <SidebarLink active={activeTab === 'intro'} onClick={() => setActiveTab('intro')} icon="📖">Intro Section</SidebarLink>
          <SidebarLink active={activeTab === 'benefits'} onClick={() => setActiveTab('benefits')} icon="✨">Benefits</SidebarLink>
          <SidebarLink active={activeTab === 'faq'} onClick={() => setActiveTab('faq')} icon="❓">FAQ</SidebarLink>
          <SidebarLink active={activeTab === 'certs'} onClick={() => setActiveTab('certs')} icon="📜">Certificates</SidebarLink>
          <div className="pt-4 pb-2 px-4 text-[10px] font-bold text-stone-500 uppercase tracking-widest">Shop & News</div>
          <SidebarLink active={activeTab === 'product'} onClick={() => setActiveTab('product')} icon="🛒">Product & Sales</SidebarLink>
          <SidebarLink active={activeTab === 'blog'} onClick={() => setActiveTab('blog')} icon="✍️">Blog Journal</SidebarLink>
        </nav>
        <button onClick={onExit} className="m-4 p-3 rounded-xl bg-white/5 text-stone-400 text-xs font-bold uppercase hover:bg-white/10 transition-all">← Back to Site</button>
      </aside>

      <main className="flex-1 p-12 overflow-y-auto">
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fade-in">
            <SectionHeader title="Dashboard" subtitle="Global performance and content status." />
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
                <p className="text-stone-400 text-[10px] font-bold uppercase mb-2">Website Health</p>
                <p className="text-3xl font-bold text-shilajit-brown">98%</p>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
                <p className="text-stone-400 text-[10px] font-bold uppercase mb-2">Total Articles</p>
                <p className="text-3xl font-bold text-shilajit-brown">{blogPosts.length}</p>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
                <p className="text-stone-400 text-[10px] font-bold uppercase mb-2">Price Point</p>
                <p className="text-3xl font-bold text-shilajit-brown">${siteContent.product.price}</p>
              </div>
            </div>
            <div className="bg-stone-900 text-white p-10 rounded-[3rem] shadow-2xl">
              <h3 className="text-2xl font-bold serif mb-4">Storage Information</h3>
              <p className="text-stone-400 mb-6">All edits you make here are stored in your browser's persistent storage. If you clear your site data, changes will revert to defaults.</p>
              <button onClick={() => window.location.reload()} className="bg-gold-accent text-white px-8 py-3 rounded-full font-bold text-sm">Force Refresh Site</button>
            </div>
          </div>
        )}

        {activeTab === 'hero' && (
          <div className="space-y-8 animate-fade-in max-w-4xl">
            <SectionHeader title="Hero Section" subtitle="Edit the first thing users see on the site." />
            <div className="grid grid-cols-2 gap-8">
              <Field label="Main Title (EN)" value={siteContent.hero.titleEn} onChange={(v) => updateContent('hero', 'titleEn', v)} />
              <Field label="Main Title (ID)" value={siteContent.hero.titleId} onChange={(v) => updateContent('hero', 'titleId', v)} />
              <Field label="Accent Title (EN)" value={siteContent.hero.titleAccentEn} onChange={(v) => updateContent('hero', 'titleAccentEn', v)} />
              <Field label="Accent Title (ID)" value={siteContent.hero.titleAccentId} onChange={(v) => updateContent('hero', 'titleAccentId', v)} />
              <div className="col-span-2">
                <Field label="Description (EN)" value={siteContent.hero.descEn} onChange={(v) => updateContent('hero', 'descEn', v)} type="textarea" />
                <Field label="Description (ID)" value={siteContent.hero.descId} onChange={(v) => updateContent('hero', 'descId', v)} type="textarea" />
              </div>
              <div className="col-span-2">
                <Field label="Hero Image URL" value={siteContent.hero.image} onChange={(v) => updateContent('hero', 'image', v)} />
                <img src={siteContent.hero.image} className="mt-4 h-40 rounded-xl object-cover" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'intro' && (
          <div className="space-y-8 animate-fade-in max-w-4xl">
            <SectionHeader title="Intro Section" subtitle="The story behind Anzil Shilajit." />
            <div className="grid grid-cols-2 gap-8">
              <Field label="Title (EN)" value={siteContent.intro.titleEn} onChange={(v) => updateContent('intro', 'titleEn', v)} />
              <Field label="Title (ID)" value={siteContent.intro.titleId} onChange={(v) => updateContent('intro', 'titleId', v)} />
              <Field label="Description (EN)" value={siteContent.intro.descEn} onChange={(v) => updateContent('intro', 'descEn', v)} type="textarea" />
              <Field label="Description (ID)" value={siteContent.intro.descId} onChange={(v) => updateContent('intro', 'descId', v)} type="textarea" />
              <Field label="Featured Quote (EN)" value={siteContent.intro.quoteEn} onChange={(v) => updateContent('intro', 'quoteEn', v)} />
              <Field label="Featured Quote (ID)" value={siteContent.intro.quoteId} onChange={(v) => updateContent('intro', 'quoteId', v)} />
              <div className="col-span-2">
                <Field label="Intro Image URL" value={siteContent.intro.image} onChange={(v) => updateContent('intro', 'image', v)} />
                <img src={siteContent.intro.image} className="mt-4 h-40 rounded-xl object-cover" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'benefits' && (
          <div className="space-y-12 animate-fade-in max-w-4xl">
            <SectionHeader title="Benefits" subtitle="Manage the 4 key benefits showcased on the homepage." />
            <div className="grid grid-cols-2 gap-8 mb-12">
              <Field label="Section Title (EN)" value={siteContent.benefits.titleEn} onChange={(v) => updateContent('benefits', 'titleEn', v)} />
              <Field label="Section Title (ID)" value={siteContent.benefits.titleId} onChange={(v) => updateContent('benefits', 'titleId', v)} />
              <Field label="Subtitle (EN)" value={siteContent.benefits.subtitleEn} onChange={(v) => updateContent('benefits', 'subtitleEn', v)} />
              <Field label="Subtitle (ID)" value={siteContent.benefits.subtitleId} onChange={(v) => updateContent('benefits', 'subtitleId', v)} />
            </div>
            {siteContent.benefits.items.map((item, i) => (
              <div key={i} className="p-8 bg-white rounded-3xl border border-stone-100 shadow-sm space-y-4">
                <h3 className="font-bold text-gold-accent uppercase text-xs">Benefit Card #{i + 1}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Title (EN)" value={item.titleEn} onChange={(v) => updateNestedContent('benefits', i, 'titleEn', v)} />
                  <Field label="Title (ID)" value={item.titleId} onChange={(v) => updateNestedContent('benefits', i, 'titleId', v)} />
                  <div className="col-span-2">
                    <Field label="Description (EN)" value={item.descEn} onChange={(v) => updateNestedContent('benefits', i, 'descEn', v)} type="textarea" />
                    <Field label="Description (ID)" value={item.descId} onChange={(v) => updateNestedContent('benefits', i, 'descId', v)} type="textarea" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'faq' && (
          <div className="space-y-12 animate-fade-in max-w-4xl">
            <SectionHeader title="FAQ" subtitle="Common user questions." />
            <div className="grid grid-cols-2 gap-8">
              <Field label="Section Title (EN)" value={siteContent.faq.titleEn} onChange={(v) => updateContent('faq', 'titleEn', v)} />
              <Field label="Section Title (ID)" value={siteContent.faq.titleId} onChange={(v) => updateContent('faq', 'titleId', v)} />
            </div>
            {siteContent.faq.items.map((item, i) => (
              <div key={i} className="p-8 bg-white rounded-3xl border border-stone-100 shadow-sm space-y-4">
                <h3 className="font-bold text-gold-accent uppercase text-xs">Question #{i + 1}</h3>
                <Field label="Question (EN)" value={item.qEn} onChange={(v) => updateNestedContent('faq', i, 'qEn', v)} />
                <Field label="Question (ID)" value={item.qId} onChange={(v) => updateNestedContent('faq', i, 'qId', v)} />
                <Field label="Answer (EN)" value={item.aEn} onChange={(v) => updateNestedContent('faq', i, 'aEn', v)} type="textarea" />
                <Field label="Answer (ID)" value={item.aId} onChange={(v) => updateNestedContent('faq', i, 'aId', v)} type="textarea" />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'certs' && (
          <div className="space-y-12 animate-fade-in max-w-4xl">
            <SectionHeader title="Certificates" subtitle="Authenticity markers and lab standards." />
            <div className="grid grid-cols-2 gap-8 mb-8">
              <Field label="Main Title (EN)" value={siteContent.certs.titleEn} onChange={(v) => updateContent('certs', 'titleEn', v)} />
              <Field label="Main Title (ID)" value={siteContent.certs.titleId} onChange={(v) => updateContent('certs', 'titleId', v)} />
              <div className="col-span-2">
                <Field label="Description (EN)" value={siteContent.certs.descEn} onChange={(v) => updateContent('certs', 'descEn', v)} type="textarea" />
                <Field label="Description (ID)" value={siteContent.certs.descId} onChange={(v) => updateContent('certs', 'descId', v)} type="textarea" />
              </div>
            </div>
            {siteContent.certs.items.map((item, i) => (
              <div key={i} className="p-8 bg-white rounded-3xl border border-stone-100 shadow-sm space-y-4">
                <h3 className="font-bold text-gold-accent uppercase text-xs">Certificate #{i + 1}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Title (EN)" value={item.titleEn} onChange={(v) => updateNestedContent('certs', i, 'titleEn', v)} />
                  <Field label="Title (ID)" value={item.titleId} onChange={(v) => updateNestedContent('certs', i, 'titleId', v)} />
                  <Field label="ID / License Number" value={item.idNum} onChange={(v) => updateNestedContent('certs', i, 'idNum', v)} />
                  <Field label="Logo URL" value={item.image} onChange={(v) => updateNestedContent('certs', i, 'image', v)} />
                  <div className="col-span-2">
                    <Field label="Description (EN)" value={item.descEn} onChange={(v) => updateNestedContent('certs', i, 'descEn', v)} type="textarea" />
                    <Field label="Description (ID)" value={item.descId} onChange={(v) => updateNestedContent('certs', i, 'descId', v)} type="textarea" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'product' && (
          <div className="space-y-8 animate-fade-in max-w-4xl">
            <SectionHeader title="Product & Sales" subtitle="E-commerce integration and product details." />
            <div className="grid grid-cols-2 gap-8">
              <Field label="Price (USD String)" value={siteContent.product.price} onChange={(v) => updateContent('product', 'price', v)} />
              <Field label="WhatsApp (Include Country Code)" value={siteContent.product.whatsapp} onChange={(v) => updateContent('product', 'whatsapp', v)} />
              <Field label="Shopee Link" value={siteContent.product.shopee} onChange={(v) => updateContent('product', 'shopee', v)} />
              <Field label="TikTok Link" value={siteContent.product.tiktok} onChange={(v) => updateContent('product', 'tiktok', v)} />
              <div className="col-span-2 space-y-8 mt-4 pt-8 border-t border-stone-200">
                <Field label="Product Name / Title (EN)" value={siteContent.product.titleEn} onChange={(v) => updateContent('product', 'titleEn', v)} />
                <Field label="Product Name / Title (ID)" value={siteContent.product.titleId} onChange={(v) => updateContent('product', 'titleId', v)} />
                <Field label="Detailed Description (EN)" value={siteContent.product.descEn} onChange={(v) => updateContent('product', 'descEn', v)} type="textarea" />
                <Field label="Detailed Description (ID)" value={siteContent.product.descId} onChange={(v) => updateContent('product', 'descId', v)} type="textarea" />
                <Field label="Featured Product Image" value={siteContent.product.image} onChange={(v) => updateContent('product', 'image', v)} />
                <img src={siteContent.product.image} className="mt-4 h-60 rounded-xl object-cover" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'blog' && (
          <div className="space-y-8 animate-fade-in">
            <SectionHeader title="Blog Journal" subtitle="Research articles and brand stories." />
            {/* Existing Blog Logic Remains but integrated here */}
            {editingPost ? (
              <form onSubmit={(e) => { e.preventDefault(); setBlogPosts(p => p.map(bp => bp.id === editingPost.id ? editingPost : bp)); setEditingPost(null); }} className="space-y-6 bg-white p-8 rounded-3xl border border-stone-100 shadow-sm">
                <Field label="Title (EN)" value={editingPost.title.en} onChange={(v) => setEditingPost({...editingPost, title: {...editingPost.title, en: v}})} />
                <Field label="Title (ID)" value={editingPost.title.id} onChange={(v) => setEditingPost({...editingPost, title: {...editingPost.title, id: v}})} />
                <Field label="Excerpt (EN)" value={editingPost.excerpt.en} onChange={(v) => setEditingPost({...editingPost, excerpt: {...editingPost.excerpt, en: v}})} type="textarea" />
                <button className="bg-shilajit-brown text-white px-8 py-3 rounded-xl font-bold">Save Post</button>
              </form>
            ) : (
              <div className="bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-stone-50 border-b border-stone-200">
                    <tr>
                      <th className="px-6 py-4 text-[10px] font-bold uppercase text-stone-400">Title</th>
                      <th className="px-6 py-4 text-[10px] font-bold uppercase text-stone-400 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blogPosts.map(p => (
                      <tr key={p.id} className="border-b border-stone-50">
                        <td className="px-6 py-4 font-bold text-shilajit-brown">{p.title.en}</td>
                        <td className="px-6 py-4 text-right">
                          <button onClick={() => setEditingPost(p)} className="text-gold-accent font-bold text-xs uppercase mr-4">Edit</button>
                          <button onClick={() => setBlogPosts(prev => prev.filter(bp => bp.id !== p.id))} className="text-red-400 font-bold text-xs uppercase">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

const SidebarLink: React.FC<{ active: boolean; onClick: () => void; icon: string; children: React.ReactNode }> = ({ active, onClick, icon, children }) => (
  <button onClick={onClick} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${active ? 'bg-white/10 text-white' : 'text-stone-400 hover:text-white hover:bg-white/5'}`}>
    <span className="text-lg">{icon}</span>
    <span className="font-bold text-[10px] uppercase tracking-widest">{children}</span>
  </button>
);

export default AdminPanel;
