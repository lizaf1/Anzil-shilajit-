
import React, { useState } from 'react';
import { BlogPost } from '../types';
import { SiteSettings } from '../App';

interface AdminPanelProps {
  onExit: () => void;
  blogPosts: BlogPost[];
  setBlogPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  siteSettings: SiteSettings;
  setSiteSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
  isAuthenticated: boolean;
  setAuthenticated: (val: boolean) => void;
}

type AdminTab = 'dashboard' | 'blog' | 'settings';

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  onExit, 
  blogPosts, 
  setBlogPosts, 
  siteSettings, 
  setSiteSettings, 
  isAuthenticated, 
  setAuthenticated 
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [password, setPassword] = useState('');
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setAuthenticated(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const deletePost = (id: string) => {
    if (window.confirm('Are you sure you want to delete this research article?')) {
      setBlogPosts(prev => prev.filter(p => p.id !== id));
    }
  };

  const savePostEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;
    setBlogPosts(prev => prev.map(p => p.id === editingPost.id ? editingPost : p));
    setEditingPost(null);
  };

  const addNewPost = () => {
    const newId = Date.now().toString();
    const newPost: BlogPost = {
      id: newId,
      slug: `new-article-${newId}`,
      category: "science",
      readTime: "5 min",
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      image: "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&q=80&w=1000",
      title: { en: "New Research Paper Title", id: "Judul Artikel Riset Baru" },
      excerpt: { en: "A brief summary of the new clinical findings regarding Shilajit.", id: "Ringkasan singkat temuan klinis baru tentang Shilajit." },
      content: { en: "<p>The core research content goes here...</p>", id: "<p>Konten riset utama di sini...</p>" }
    };
    setBlogPosts([newPost, ...blogPosts]);
    setEditingPost(newPost);
  };

  const handleSettingChange = (key: keyof SiteSettings, value: string) => {
    setSiteSettings(prev => ({ ...prev, [key]: value }));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-shilajit-brown flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-[2rem] p-10 shadow-2xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-shilajit-brown serif mb-2">Anzil Command Center</h1>
            <p className="text-stone-400 text-sm tracking-widest uppercase">Authorized Personnel Only</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Access Token</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-gold-accent outline-none"
                placeholder="••••••••"
              />
            </div>
            <button className="w-full bg-shilajit-brown text-white font-bold py-4 rounded-xl hover:bg-gold-accent transition-colors shadow-lg">
              Enter Dashboard
            </button>
            <button type="button" onClick={onExit} className="w-full text-stone-400 text-xs font-bold uppercase tracking-widest hover:text-shilajit-brown transition-colors">
              Return to Website
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-shilajit-brown text-white flex flex-col sticky top-0 h-screen">
        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold serif tracking-tighter">ANZIL ADMIN</h2>
          <p className="text-[10px] text-gold-accent tracking-[0.3em] font-bold mt-1">OPERATIONS v2.0</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          <SidebarLink active={activeTab === 'dashboard'} onClick={() => { setActiveTab('dashboard'); setEditingPost(null); }} icon="📊">Dashboard</SidebarLink>
          <SidebarLink active={activeTab === 'blog'} onClick={() => { setActiveTab('blog'); setEditingPost(null); }} icon="✍️">Content (Blog)</SidebarLink>
          <SidebarLink active={activeTab === 'settings'} onClick={() => { setActiveTab('settings'); setEditingPost(null); }} icon="⚙️">General Settings</SidebarLink>
        </nav>

        <div className="p-8 mt-auto border-t border-white/10">
          <button onClick={onExit} className="flex items-center space-x-3 text-stone-400 hover:text-white transition-colors">
            <span className="text-lg">←</span>
            <span className="text-xs font-bold uppercase tracking-widest">Live Site</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        {editingPost ? (
          <div className="max-w-4xl animate-fade-in">
            <div className="flex items-center justify-between mb-8">
              <button onClick={() => setEditingPost(null)} className="text-stone-400 font-bold text-xs uppercase tracking-widest hover:text-shilajit-brown flex items-center">
                <span className="mr-2">←</span> Back to List
              </button>
              <h2 className="text-3xl font-bold text-shilajit-brown serif">Edit Article</h2>
            </div>
            
            <form onSubmit={savePostEdit} className="space-y-8 bg-white p-10 rounded-[2rem] border border-stone-200 shadow-sm">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Title (EN)</label>
                  <input 
                    type="text" 
                    value={editingPost.title.en}
                    onChange={(e) => setEditingPost({...editingPost, title: {...editingPost.title, en: e.target.value}})}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-gold-accent"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Title (ID)</label>
                  <input 
                    type="text" 
                    value={editingPost.title.id}
                    onChange={(e) => setEditingPost({...editingPost, title: {...editingPost.title, id: e.target.value}})}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-gold-accent"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Image URL</label>
                <input 
                  type="text" 
                  value={editingPost.image}
                  onChange={(e) => setEditingPost({...editingPost, image: e.target.value})}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-gold-accent"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Excerpt (EN)</label>
                  <textarea 
                    value={editingPost.excerpt.en}
                    onChange={(e) => setEditingPost({...editingPost, excerpt: {...editingPost.excerpt, en: e.target.value}})}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 h-24 outline-none focus:ring-2 focus:ring-gold-accent"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Excerpt (ID)</label>
                  <textarea 
                    value={editingPost.excerpt.id}
                    onChange={(e) => setEditingPost({...editingPost, excerpt: {...editingPost.excerpt, id: e.target.value}})}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 h-24 outline-none focus:ring-2 focus:ring-gold-accent"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Content HTML (EN)</label>
                <textarea 
                  value={editingPost.content.en}
                  onChange={(e) => setEditingPost({...editingPost, content: {...editingPost.content, en: e.target.value}})}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 h-48 font-mono text-xs outline-none focus:ring-2 focus:ring-gold-accent"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Content HTML (ID)</label>
                <textarea 
                  value={editingPost.content.id}
                  onChange={(e) => setEditingPost({...editingPost, content: {...editingPost.content, id: e.target.value}})}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 h-48 font-mono text-xs outline-none focus:ring-2 focus:ring-gold-accent"
                />
              </div>

              <div className="pt-6">
                <button type="submit" className="w-full bg-shilajit-brown text-white font-bold py-4 rounded-xl hover:bg-gold-accent transition-colors shadow-lg">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        ) : activeTab === 'dashboard' && (
          <div className="space-y-10">
            <header className="flex justify-between items-end">
              <div>
                <h1 className="text-4xl font-bold text-shilajit-brown serif">Operational Overview</h1>
                <p className="text-stone-500">Managing {blogPosts.length} research articles and global settings.</p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-stone-200 shadow-sm flex items-center space-x-3">
                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-xs font-bold text-stone-600 uppercase tracking-widest">System Status: Optimal</span>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatCard title="Active Articles" value={blogPosts.length.toString()} delta="+1" />
              <StatCard title="Product Price" value={`$${siteSettings.price}`} delta="Live" />
              <StatCard title="Region Focus" value="Indonesia" delta="Primary" />
              <StatCard title="Inbound Leads" value="2.4k" delta="+12%" />
            </div>

            <div className="grid grid-cols-3 gap-8">
              <div className="col-span-2 bg-white rounded-[2rem] p-8 border border-stone-200 shadow-sm">
                <h3 className="text-xl font-bold text-shilajit-brown serif mb-6">Article Engagement</h3>
                <div className="space-y-4">
                  {blogPosts.slice(0, 3).map(p => (
                    <div key={p.id} className="flex items-center justify-between p-4 bg-stone-50 rounded-xl">
                      <span className="text-sm font-bold text-shilajit-brown truncate max-w-xs">{p.title.en}</span>
                      <span className="text-[10px] font-bold text-stone-400">842 Views</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-shilajit-brown rounded-[2rem] p-8 text-white">
                <h3 className="text-xl font-bold serif mb-6">Quick Actions</h3>
                <div className="space-y-3">
                  <button onClick={addNewPost} className="w-full bg-gold-accent py-3 rounded-xl text-xs font-bold uppercase tracking-widest">Add Blog Post</button>
                  <button onClick={() => setActiveTab('settings')} className="w-full bg-white/10 py-3 rounded-xl text-xs font-bold uppercase tracking-widest">Edit Links</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'blog' && !editingPost && (
          <div className="space-y-8">
            <header className="flex justify-between items-center">
              <div>
                <h1 className="text-4xl font-bold text-shilajit-brown serif">Anzil Journal CMS</h1>
                <p className="text-stone-500">Manage research papers and brand storytelling.</p>
              </div>
              <button 
                onClick={addNewPost}
                className="bg-shilajit-brown text-white px-6 py-3 rounded-full font-bold text-sm shadow-lg hover:bg-gold-accent transition-all"
              >
                + New Article
              </button>
            </header>

            <div className="bg-white rounded-[2rem] border border-stone-200 shadow-sm overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-stone-50 border-b border-stone-200">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-stone-400">Article</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-stone-400">Category</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-stone-400">Date</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-stone-400 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {blogPosts.map(post => (
                    <tr key={post.id} className="hover:bg-stone-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-4">
                          <img src={post.image} className="w-10 h-10 rounded-lg object-cover" />
                          <div className="font-bold text-shilajit-brown line-clamp-1 max-w-xs">{post.title.en}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest bg-stone-100 px-2 py-1 rounded text-stone-500">{post.category}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-stone-400">{post.date}</td>
                      <td className="px-6 py-4 text-right space-x-3">
                        <button 
                          onClick={() => setEditingPost(post)}
                          className="text-xs font-bold text-gold-accent hover:text-shilajit-brown"
                        >
                          Edit
                        </button>
                        <button onClick={() => deletePost(post.id)} className="text-xs font-bold text-red-400 hover:text-red-600">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-4xl space-y-10">
            <header>
              <h1 className="text-4xl font-bold text-shilajit-brown serif">General Settings</h1>
              <p className="text-stone-500">Update global store information, pricing, and contact links.</p>
            </header>

            <div className="grid grid-cols-2 gap-8">
              {/* Product Settings */}
              <div className="bg-white p-8 rounded-[2rem] border border-stone-200 shadow-sm space-y-6">
                <h3 className="text-lg font-bold text-shilajit-brown serif">E-Commerce & Pricing</h3>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Product Price (USD)</label>
                    <input 
                      type="text" 
                      value={siteSettings.price}
                      onChange={(e) => handleSettingChange('price', e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-gold-accent"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">WhatsApp Number (ID Format)</label>
                    <input 
                      type="text" 
                      value={siteSettings.whatsapp}
                      onChange={(e) => handleSettingChange('whatsapp', e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-gold-accent"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Shopee Mall URL</label>
                    <input 
                      type="text" 
                      value={siteSettings.shopee}
                      onChange={(e) => handleSettingChange('shopee', e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-gold-accent"
                    />
                  </div>
                </div>
              </div>

              {/* Identity Settings */}
              <div className="bg-white p-8 rounded-[2rem] border border-stone-200 shadow-sm space-y-6">
                <h3 className="text-lg font-bold text-shilajit-brown serif">Brand Identity</h3>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">TikTok Handle URL</label>
                    <input 
                      type="text" 
                      value={siteSettings.tiktok}
                      onChange={(e) => handleSettingChange('tiktok', e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-gold-accent"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Hero Title Prefix (EN)</label>
                    <input 
                      type="text" 
                      value={siteSettings.heroTitleEn}
                      onChange={(e) => handleSettingChange('heroTitleEn', e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-gold-accent"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Hero Title Prefix (ID)</label>
                    <input 
                      type="text" 
                      value={siteSettings.heroTitleId}
                      onChange={(e) => handleSettingChange('heroTitleId', e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-gold-accent"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-stone-900 p-8 rounded-[2rem] text-white flex justify-between items-center shadow-2xl">
              <div>
                <h4 className="font-bold text-xl serif">Configuration Storage</h4>
                <p className="text-stone-400 text-xs">All changes are saved to persistent local storage for your browser session.</p>
              </div>
              <button onClick={() => alert('Settings Saved to Browser Memory')} className="bg-gold-accent px-8 py-3 rounded-full font-bold text-sm">Save All Settings</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

const SidebarLink: React.FC<{ active: boolean; onClick: () => void; icon: string; children: React.ReactNode }> = ({ active, onClick, icon, children }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
      active ? 'bg-white/10 text-white shadow-inner' : 'text-stone-400 hover:text-white hover:bg-white/5'
    }`}
  >
    <span className="text-xl">{icon}</span>
    <span className="font-bold text-xs uppercase tracking-widest">{children}</span>
  </button>
);

const StatCard: React.FC<{ title: string; value: string; delta: string }> = ({ title, value, delta }) => (
  <div className="bg-white p-6 rounded-[2rem] border border-stone-200 shadow-sm flex flex-col justify-between h-32">
    <div className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">{title}</div>
    <div className="flex items-end justify-between">
      <div className="text-3xl font-bold text-shilajit-brown serif">{value}</div>
      <div className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">{delta}</div>
    </div>
  </div>
);

export default AdminPanel;
