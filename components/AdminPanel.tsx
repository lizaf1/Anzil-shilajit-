
import React, { useState } from 'react';
import { BlogPost } from '../types';

interface AdminPanelProps {
  onExit: () => void;
  blogPosts: BlogPost[];
  setBlogPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  isAuthenticated: boolean;
  setAuthenticated: (val: boolean) => void;
}

type AdminTab = 'dashboard' | 'blog' | 'settings';

const AdminPanel: React.FC<AdminPanelProps> = ({ onExit, blogPosts, setBlogPosts, isAuthenticated, setAuthenticated }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [password, setPassword] = useState('');
  const [isEditing, setIsEditing] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') { // Simple demo password
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

  const addNewPost = () => {
    const newId = (blogPosts.length + 1).toString();
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
    setActiveTab('blog');
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
        <div className="p-8">
          <h2 className="text-2xl font-bold serif tracking-tighter">ANZIL ADMIN</h2>
          <p className="text-[10px] text-gold-accent tracking-[0.3em] font-bold mt-1">OPERATIONS v1.0</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          <SidebarLink active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon="📊">Dashboard</SidebarLink>
          <SidebarLink active={activeTab === 'blog'} onClick={() => setActiveTab('blog')} icon="✍️">Content (Blog)</SidebarLink>
          <SidebarLink active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} icon="⚙️">System Settings</SidebarLink>
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
        {activeTab === 'dashboard' && (
          <div className="space-y-10">
            <header className="flex justify-between items-end">
              <div>
                <h1 className="text-4xl font-bold text-shilajit-brown serif">Operational Overview</h1>
                <p className="text-stone-500">Real-time engagement metrics for Anzil Himalayan Shilajit.</p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-stone-200 shadow-sm flex items-center space-x-3">
                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-xs font-bold text-stone-600 uppercase tracking-widest">API Server Online</span>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard title="Product Views" value="12,842" delta="+12%" />
              <StatCard title="AI Wellness Inquiries" value="843" delta="+24%" />
              <StatCard title="Lead Conversion" value="8.4%" delta="+2%" />
            </div>

            <div className="bg-white rounded-[2rem] p-8 border border-stone-200 shadow-sm">
              <h3 className="text-xl font-bold text-shilajit-brown serif mb-6">Regional Interest Map</h3>
              <div className="h-64 bg-stone-50 rounded-2xl flex items-center justify-center text-stone-300 font-bold uppercase tracking-widest text-xs italic">
                Interactive Geospatial Data Visualisation Hidden in Demo
              </div>
            </div>
          </div>
        )}

        {activeTab === 'blog' && (
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
                        <button className="text-xs font-bold text-gold-accent hover:text-shilajit-brown">Edit</button>
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
          <div className="max-w-2xl space-y-8">
            <h1 className="text-4xl font-bold text-shilajit-brown serif">Site Configurations</h1>
            <div className="space-y-6">
              <div className="p-6 bg-white border border-stone-200 rounded-2xl shadow-sm">
                <h4 className="font-bold text-shilajit-brown mb-4">Gemini AI Configuration</h4>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-stone-500">Active Model</span>
                  <span className="font-mono text-gold-accent bg-gold-accent/5 px-2 py-0.5 rounded">gemini-3-flash-preview</span>
                </div>
                <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between text-sm">
                  <span className="text-stone-500">API Key Status</span>
                  <span className="text-green-600 font-bold uppercase text-[10px] tracking-widest">Active & Verified</span>
                </div>
              </div>

              <div className="p-6 bg-white border border-stone-200 rounded-2xl shadow-sm">
                <h4 className="font-bold text-shilajit-brown mb-4">Store Integration</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-stone-500">WhatsApp Primary</span>
                    <span className="text-stone-800 font-medium">+62 812 3456 7890</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-stone-500">TikTok Shop Username</span>
                    <span className="text-stone-800 font-medium">@anzil_wellness</span>
                  </div>
                </div>
              </div>
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
