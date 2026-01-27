
import React, { useState } from 'react';
import { BlogPost } from '../types';
import { EditableContent, ProductVariant } from '../App';

interface AdminPanelProps {
  onExit: () => void;
  blogPosts: BlogPost[];
  setBlogPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  siteContent: EditableContent;
  setSiteContent: React.Dispatch<React.SetStateAction<EditableContent>>;
  isAuthenticated: boolean;
  setAuthenticated: (val: boolean) => void;
}

type AdminTab = 'dashboard' | 'hero' | 'intro' | 'benefits' | 'faq' | 'certs' | 'product' | 'blog' | 'settings';

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
  const [passwordInput, setPasswordInput] = useState('');
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === siteContent.settings.adminPassword) {
      setAuthenticated(true);
    } else {
      alert('Invalid credentials');
    }
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

  const updateVariant = (index: number, field: keyof ProductVariant, value: any) => {
    const newVariants = [...siteContent.product.variants];
    newVariants[index] = { ...newVariants[index], [field]: value };
    updateContent('product', 'variants', newVariants);
  };

  const addVariant = () => {
    const newVariants = [...siteContent.product.variants, { id: Date.now().toString(), size: 'New Size', priceIdr: 0, shopeeLink: '', tiktokLink: '' }];
    updateContent('product', 'variants', newVariants);
  };

  const removeVariant = (id: string) => {
    const newVariants = siteContent.product.variants.filter(v => v.id !== id);
    updateContent('product', 'variants', newVariants);
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
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 outline-none"
              placeholder="Enter Password"
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

  const Field = ({ label, value, onChange, type = 'text' }: { label: string; value: string | number; onChange: (val: any) => void, type?: 'text' | 'textarea' | 'number' }) => (
    <div className="space-y-2">
      <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{label}</label>
      {type === 'textarea' ? (
        <textarea 
          value={value || ''} 
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 h-24 outline-none focus:ring-2 focus:ring-gold-accent transition-all"
        />
      ) : (
        <input 
          type={type} 
          value={value || ''} 
          onChange={(e) => onChange(type === 'number' ? Number(e.target.value) : e.target.value)}
          className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-gold-accent transition-all"
        />
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-50 flex">
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
          <div className="pt-4 pb-2 px-4 text-[10px] font-bold text-stone-500 uppercase tracking-widest">Shop & Blog</div>
          <SidebarLink active={activeTab === 'product'} onClick={() => setActiveTab('product')} icon="🛒">Product & Prices</SidebarLink>
          <SidebarLink active={activeTab === 'blog'} onClick={() => setActiveTab('blog')} icon="✍️">Blog Journal</SidebarLink>
          <div className="pt-4 pb-2 px-4 text-[10px] font-bold text-stone-500 uppercase tracking-widest">System</div>
          <SidebarLink active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} icon="⚙️">Settings</SidebarLink>
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
                <p className="text-stone-400 text-[10px] font-bold uppercase mb-2">Packaging Sizes</p>
                <p className="text-3xl font-bold text-shilajit-brown">{siteContent.product.variants.length}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'hero' && (
          <div className="space-y-8 animate-fade-in max-w-4xl">
            <SectionHeader title="Hero Section" subtitle="Hero imagery and primary calls to action." />
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
                <img src={siteContent.hero.image} className="mt-4 h-60 rounded-xl object-cover border border-stone-200" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'product' && (
          <div className="space-y-12 animate-fade-in max-w-4xl">
            <SectionHeader title="Product & Pricing (IDR)" subtitle="Manage packaging sizes, pricing, and specific marketplace links for each size." />
            
            <div className="bg-white p-10 rounded-[2rem] border border-stone-200 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-shilajit-brown serif border-b border-stone-100 pb-4">Product Imagery</h3>
              <Field label="Product Feature Image URL" value={siteContent.product.image} onChange={(v) => updateContent('product', 'image', v)} />
              <div className="mt-4 overflow-hidden rounded-2xl border border-stone-200 aspect-video bg-stone-100">
                <img src={siteContent.product.image} className="w-full h-full object-cover transition-transform hover:scale-105 duration-700" alt="Product Preview" />
              </div>
            </div>

            <div className="bg-white p-10 rounded-[2rem] border border-stone-200 shadow-sm space-y-8">
              <h3 className="text-xl font-bold text-shilajit-brown serif border-b border-stone-100 pb-4">Packaging Variants & Direct Links</h3>
              <div className="space-y-12">
                {siteContent.product.variants.map((v, idx) => (
                  <div key={v.id} className="p-8 bg-stone-50 rounded-[2rem] border border-stone-100 space-y-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="bg-shilajit-brown text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Variant #{idx + 1}</span>
                      <button onClick={() => removeVariant(v.id)} className="text-red-400 hover:text-red-600 font-bold text-xs uppercase tracking-widest">Remove Variant</button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <Field label="Size Label (e.g. 15 Grams)" value={v.size} onChange={(val) => updateVariant(idx, 'size', val)} />
                      <Field label="Price (IDR)" value={v.priceIdr} onChange={(val) => updateVariant(idx, 'priceIdr', val)} type="number" />
                      <div className="col-span-2">
                         <div className="p-6 bg-white rounded-2xl border border-stone-200 space-y-4">
                            <h4 className="text-xs font-bold text-shilajit-brown uppercase tracking-widest mb-2 flex items-center gap-2">
                               <span className="w-2 h-2 rounded-full bg-gold-accent"></span>
                               Marketplace Redirects (Unique for this size)
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                               <Field label="Shopee Link" value={v.shopeeLink || ''} onChange={(val) => updateVariant(idx, 'shopeeLink', val)} />
                               <Field label="TikTok Link" value={v.tiktokLink || ''} onChange={(val) => updateVariant(idx, 'tiktokLink', val)} />
                            </div>
                         </div>
                      </div>
                    </div>
                  </div>
                ))}
                <button onClick={addVariant} className="w-full py-8 border-2 border-dashed border-stone-200 rounded-[2rem] text-stone-400 font-bold text-sm hover:border-gold-accent hover:text-gold-accent transition-all group">
                   <span className="block text-2xl mb-2 group-hover:scale-125 transition-transform">+</span>
                   Add New Size / Price Variant
                </button>
              </div>
            </div>

            <div className="bg-white p-10 rounded-[2rem] border border-stone-200 shadow-sm space-y-8">
              <h3 className="text-xl font-bold text-shilajit-brown serif border-b border-stone-100 pb-4">Communication</h3>
              <div className="grid grid-cols-1 gap-6">
                <Field label="WhatsApp Number (Format: 62812...)" value={siteContent.product.whatsapp} onChange={(v) => updateContent('product', 'whatsapp', v)} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'intro' && (
          <div className="space-y-8 animate-fade-in max-w-4xl">
            <SectionHeader title="Intro Section" subtitle="Heritage and mountain sourcing narrative." />
            <div className="grid grid-cols-2 gap-8">
              <Field label="Section Title (EN)" value={siteContent.intro.titleEn} onChange={(v) => updateContent('intro', 'titleEn', v)} />
              <Field label="Section Title (ID)" value={siteContent.intro.titleId} onChange={(v) => updateContent('intro', 'titleId', v)} />
              <div className="col-span-2">
                <Field label="Body Text (EN)" value={siteContent.intro.descEn} onChange={(v) => updateContent('intro', 'descEn', v)} type="textarea" />
                <Field label="Body Text (ID)" value={siteContent.intro.descId} onChange={(v) => updateContent('intro', 'descId', v)} type="textarea" />
              </div>
              <Field label="Quote Overlay (EN)" value={siteContent.intro.quoteEn} onChange={(v) => updateContent('intro', 'quoteEn', v)} />
              <Field label="Quote Overlay (ID)" value={siteContent.intro.quoteId} onChange={(v) => updateContent('intro', 'quoteId', v)} />
              <div className="col-span-2">
                <Field label="Intro Feature Image" value={siteContent.intro.image} onChange={(v) => updateContent('intro', 'image', v)} />
                <img src={siteContent.intro.image} className="mt-4 h-60 rounded-2xl object-cover w-full border border-stone-200" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'benefits' && (
          <div className="space-y-12 animate-fade-in max-w-4xl">
            <SectionHeader title="Benefits Section" subtitle="The 4 unique value propositions." />
            <div className="grid grid-cols-2 gap-8 mb-8">
              <Field label="Section Header (EN)" value={siteContent.benefits.titleEn} onChange={(v) => updateContent('benefits', 'titleEn', v)} />
              <Field label="Section Header (ID)" value={siteContent.benefits.titleId} onChange={(v) => updateContent('benefits', 'titleId', v)} />
            </div>
            {siteContent.benefits.items.map((item, i) => (
              <div key={i} className="p-10 bg-white rounded-[2rem] border border-stone-200 shadow-sm space-y-6">
                <h3 className="font-bold text-gold-accent uppercase text-xs tracking-[0.2em]">Benefit Card #{i + 1}</h3>
                <div className="grid grid-cols-2 gap-6">
                  <Field label="Card Title (EN)" value={item.titleEn} onChange={(v) => updateNestedContent('benefits', i, 'titleEn', v)} />
                  <Field label="Card Title (ID)" value={item.titleId} onChange={(v) => updateNestedContent('benefits', i, 'titleId', v)} />
                  <div className="col-span-2">
                    <Field label="Card Body (EN)" value={item.descEn} onChange={(v) => updateNestedContent('benefits', i, 'descEn', v)} type="textarea" />
                    <Field label="Card Body (ID)" value={item.descId} onChange={(v) => updateNestedContent('benefits', i, 'descId', v)} type="textarea" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'faq' && (
          <div className="space-y-12 animate-fade-in max-w-4xl">
            <SectionHeader title="Frequently Asked Questions" subtitle="Expandable FAQ content management." />
            {siteContent.faq.items.map((item, i) => (
              <div key={i} className="p-8 bg-white rounded-[2rem] border border-stone-200 shadow-sm space-y-4">
                <Field label={`Q${i+1} (EN)`} value={item.qEn} onChange={(v) => updateNestedContent('faq', i, 'qEn', v)} />
                <Field label={`Q${i+1} (ID)`} value={item.qId} onChange={(v) => updateNestedContent('faq', i, 'qId', v)} />
                <Field label={`A${i+1} (EN)`} value={item.aEn} onChange={(v) => updateNestedContent('faq', i, 'aEn', v)} type="textarea" />
                <Field label={`A${i+1} (ID)`} value={item.aId} onChange={(v) => updateNestedContent('faq', i, 'aId', v)} type="textarea" />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'certs' && (
          <div className="space-y-12 animate-fade-in max-w-4xl">
            <SectionHeader title="Certificates & Quality" subtitle="Showcase official stamps and licenses." />
            <div className="grid grid-cols-2 gap-8">
              {siteContent.certs.items.map((item, i) => (
                <div key={i} className="p-8 bg-white rounded-[2rem] border border-stone-200 shadow-sm space-y-4">
                  <div className="flex items-center gap-4 mb-4">
                    <img src={item.image} className="w-16 h-16 object-contain" />
                    <Field label="Logo URL" value={item.image} onChange={(v) => updateNestedContent('certs', i, 'image', v)} />
                  </div>
                  <Field label="Cert Title (EN)" value={item.titleEn} onChange={(v) => updateNestedContent('certs', i, 'titleEn', v)} />
                  <Field label="Cert Title (ID)" value={item.titleId} onChange={(v) => updateNestedContent('certs', i, 'titleId', v)} />
                  <Field label="License / ID Num" value={item.idNum} onChange={(v) => updateNestedContent('certs', i, 'idNum', v)} />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'blog' && (
          <div className="space-y-8 animate-fade-in">
            <SectionHeader title="Scientific Journal" subtitle="Educational content and blog management." />
            {editingPost ? (
              <div className="bg-white p-10 rounded-[2rem] border border-stone-200 shadow-sm space-y-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold serif">Editing: {editingPost.title.en}</h3>
                  <button onClick={() => setEditingPost(null)} className="text-stone-400 font-bold text-xs uppercase underline">Cancel</button>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <Field label="Title (EN)" value={editingPost.title.en} onChange={(v) => setEditingPost({...editingPost, title: {...editingPost.title, en: v}})} />
                  <Field label="Title (ID)" value={editingPost.title.id} onChange={(v) => setEditingPost({...editingPost, title: {...editingPost.title, id: v}})} />
                  <div className="col-span-2">
                    <Field label="Excerpt (EN)" value={editingPost.excerpt.en} onChange={(v) => setEditingPost({...editingPost, excerpt: {...editingPost.excerpt, en: v}})} type="textarea" />
                    <Field label="Excerpt (ID)" value={editingPost.excerpt.id} onChange={(v) => setEditingPost({...editingPost, excerpt: {...editingPost.excerpt, id: v}})} type="textarea" />
                  </div>
                  <div className="col-span-2">
                    <Field label="Content HTML (EN)" value={editingPost.content.en} onChange={(v) => setEditingPost({...editingPost, content: {...editingPost.content, en: v}})} type="textarea" />
                    <Field label="Content HTML (ID)" value={editingPost.content.id} onChange={(v) => setEditingPost({...editingPost, content: {...editingPost.content, id: v}})} type="textarea" />
                  </div>
                  <Field label="Cover Image URL" value={editingPost.image} onChange={(v) => setEditingPost({...editingPost, image: v})} />
                </div>
                <button onClick={() => { setBlogPosts(p => p.map(bp => bp.id === editingPost.id ? editingPost : bp)); setEditingPost(null); }} className="w-full bg-shilajit-brown text-white py-4 rounded-xl font-bold shadow-lg hover:bg-gold-accent transition-all">Save Post</button>
              </div>
            ) : (
              <div className="bg-white rounded-[2rem] border border-stone-200 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-stone-50 border-b border-stone-200">
                    <tr><th className="px-6 py-4 text-[10px] font-bold uppercase text-stone-400 tracking-[0.2em]">Article</th><th className="px-6 py-4 text-[10px] font-bold uppercase text-stone-400 tracking-[0.2em] text-right">Actions</th></tr>
                  </thead>
                  <tbody>
                    {blogPosts.map(p => (
                      <tr key={p.id} className="border-b border-stone-50 hover:bg-stone-50 transition-colors">
                        <td className="px-6 py-4 font-bold text-shilajit-brown">{p.title.en}</td>
                        <td className="px-6 py-4 text-right">
                          <button onClick={() => setEditingPost(p)} className="text-gold-accent font-bold text-xs uppercase mr-6">Edit</button>
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

        {activeTab === 'settings' && (
          <div className="space-y-12 animate-fade-in max-w-4xl">
            <SectionHeader title="System Settings" subtitle="Configure administrator access and security." />
            
            <div className="bg-white p-10 rounded-[2rem] border border-stone-200 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-shilajit-brown serif border-b border-stone-100 pb-4">Security</h3>
              <Field 
                label="Administrator Password" 
                value={siteContent.settings.adminPassword} 
                onChange={(v) => updateContent('settings', 'adminPassword', v)} 
                type="text"
              />
              <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">
                * This password is used to access the Anzil CMS. Keep it secure.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

const SidebarLink: React.FC<{ active: boolean; onClick: () => void; icon: string; children: React.ReactNode }> = ({ active, onClick, icon, children }) => (
  <button onClick={onClick} className={`w-full flex items-center space-x-3 px-6 py-4 rounded-xl transition-all ${active ? 'bg-white/10 text-white shadow-inner' : 'text-stone-400 hover:text-white hover:bg-white/5'}`}>
    <span className="text-xl">{icon}</span><span className="font-bold text-[10px] uppercase tracking-[0.3em]">{children}</span>
  </button>
);

export default AdminPanel;
