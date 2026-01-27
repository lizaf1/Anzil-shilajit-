
import React, { useState } from 'react';
import { BlogPost } from '../types';
import { EditableContent, ProductVariant, CertStat } from '../App';

interface AdminPanelProps {
  onExit: () => void;
  blogPosts: BlogPost[];
  setBlogPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  siteContent: EditableContent;
  setSiteContent: React.Dispatch<React.SetStateAction<EditableContent>>;
  isAuthenticated: boolean;
  setAuthenticated: (val: boolean) => void;
}

type AdminTab = 'dashboard' | 'hero' | 'intro' | 'benefits' | 'ai' | 'faq' | 'certs' | 'product' | 'blog' | 'settings';

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

  const updateCertStat = (index: number, field: keyof CertStat, value: string) => {
    const newStats = [...siteContent.certs.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    updateContent('certs', 'stats', newStats);
  };

  const addCertStat = () => {
    const newStats = [...(siteContent.certs.stats || []), { value: '0%', labelEn: 'New Metric', labelId: 'Metrik Baru' }];
    updateContent('certs', 'stats', newStats);
  };

  const removeCertStat = (index: number) => {
    const newStats = siteContent.certs.stats.filter((_, i) => i !== index);
    updateContent('certs', 'stats', newStats);
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

  const addCert = () => {
    const newCerts = [...siteContent.certs.items, { titleEn: 'New Test', titleId: 'Uji Baru', descEn: '', descId: '', idNum: 'ID-000', image: '' }];
    updateContent('certs', 'items', newCerts);
  };

  const removeCert = (index: number) => {
    const newCerts = siteContent.certs.items.filter((_, i) => i !== index);
    updateContent('certs', 'items', newCerts);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => callback(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-shilajit-brown flex items-center justify-center p-6 text-center">
        <div className="max-w-md w-full bg-white rounded-[3rem] p-12 shadow-2xl">
          <h1 className="text-3xl font-bold text-shilajit-brown serif mb-2">Anzil CMS</h1>
          <p className="text-stone-400 text-xs font-bold uppercase tracking-widest mb-10">Restricted Access</p>
          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              type="password" 
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-4 outline-none text-center"
              placeholder="Enter Password"
            />
            <button className="w-full bg-shilajit-brown text-white font-bold py-4 rounded-xl hover:bg-gold-accent transition-all shadow-lg">Login</button>
            <button type="button" onClick={onExit} className="text-stone-300 text-[10px] font-bold uppercase tracking-widest">Return to site</button>
          </form>
        </div>
      </div>
    );
  }

  const SidebarLink = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: string, label: string }) => (
    <button onClick={onClick} className={`w-full flex items-center space-x-3 px-6 py-4 rounded-xl transition-all ${active ? 'bg-white/10 text-white shadow-inner' : 'text-stone-500 hover:text-white hover:bg-white/5'}`}>
      <span className="text-xl">{icon}</span>
      <span className="font-bold text-[10px] uppercase tracking-[0.2em]">{label}</span>
    </button>
  );

  const Field = ({ label, value, onChange, type = 'text' }: { label: string, value: string | number, onChange: (v: any) => void, type?: 'text' | 'textarea' | 'number' }) => (
    <div className="space-y-2">
      <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{label}</label>
      {type === 'textarea' ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 h-32 outline-none focus:ring-2 focus:ring-gold-accent" />
      ) : (
        <input type={type} value={value} onChange={e => onChange(type === 'number' ? Number(e.target.value) : e.target.value)} className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-gold-accent" />
      )}
    </div>
  );

  const SectionHeader = ({ title, desc }: { title: string, desc: string }) => (
    <div className="mb-10">
      <h1 className="text-4xl font-bold serif text-shilajit-brown mb-2">{title}</h1>
      <p className="text-stone-500 text-sm">{desc}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-50 flex">
      <aside className="w-64 bg-shilajit-brown text-white flex flex-col sticky top-0 h-screen">
        <div className="p-10 border-b border-white/5"><h2 className="text-2xl font-bold serif">ANZIL</h2></div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <SidebarLink active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon="📊" label="Overview" />
          <SidebarLink active={activeTab === 'hero'} onClick={() => setActiveTab('hero')} icon="🏔️" label="Hero Section" />
          <SidebarLink active={activeTab === 'intro'} onClick={() => setActiveTab('intro')} icon="📖" label="Intro" />
          <SidebarLink active={activeTab === 'benefits'} onClick={() => setActiveTab('benefits')} icon="✨" label="Benefits" />
          <SidebarLink active={activeTab === 'ai'} onClick={() => setActiveTab('ai')} icon="🤖" label="AI Assistant" />
          <SidebarLink active={activeTab === 'faq'} onClick={() => setActiveTab('faq')} icon="❓" label="FAQ" />
          <SidebarLink active={activeTab === 'certs'} onClick={() => setActiveTab('certs')} icon="📜" label="Certificates" />
          <SidebarLink active={activeTab === 'product'} onClick={() => setActiveTab('product')} icon="🛒" label="Pricing" />
          <SidebarLink active={activeTab === 'blog'} onClick={() => setActiveTab('blog')} icon="✍️" label="Blog Journal" />
          <SidebarLink active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} icon="⚙️" label="Security" />
        </nav>
        <button onClick={onExit} className="m-6 p-3 rounded-xl bg-white/5 text-stone-400 text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all">← Back to Site</button>
      </aside>

      <main className="flex-1 p-16 overflow-y-auto">
        {activeTab === 'dashboard' && (
          <div className="animate-fade-in">
            <SectionHeader title="Overview" desc="Summary of your digital wellness center." />
            <div className="grid grid-cols-3 gap-8">
              <div className="bg-white p-10 rounded-[2.5rem] border border-stone-200 shadow-sm">
                <p className="text-stone-400 text-[10px] font-bold uppercase mb-2">Platform Version</p>
                <p className="text-3xl font-bold text-shilajit-brown">v2.5.0</p>
              </div>
              <div className="bg-white p-10 rounded-[2.5rem] border border-stone-200 shadow-sm">
                <p className="text-stone-400 text-[10px] font-bold uppercase mb-2">Total Journal Articles</p>
                <p className="text-3xl font-bold text-shilajit-brown">{blogPosts.length}</p>
              </div>
              <div className="bg-white p-10 rounded-[2.5rem] border border-stone-200 shadow-sm">
                <p className="text-stone-400 text-[10px] font-bold uppercase mb-2">Product Variants</p>
                <p className="text-3xl font-bold text-shilajit-brown">{siteContent.product.variants.length}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'hero' && (
          <div className="animate-fade-in max-w-4xl space-y-12">
            <SectionHeader title="Hero Section" desc="First impression and main call to actions." />
            <div className="grid grid-cols-2 gap-8">
              <Field label="Main Title (EN)" value={siteContent.hero.titleEn} onChange={v => updateContent('hero', 'titleEn', v)} />
              <Field label="Main Title (ID)" value={siteContent.hero.titleId} onChange={v => updateContent('hero', 'titleId', v)} />
              <Field label="Accent Title (EN)" value={siteContent.hero.titleAccentEn} onChange={v => updateContent('hero', 'titleAccentEn', v)} />
              <Field label="Accent Title (ID)" value={siteContent.hero.titleAccentId} onChange={v => updateContent('hero', 'titleAccentId', v)} />
              <div className="col-span-2">
                <Field label="Description (EN)" value={siteContent.hero.descEn} onChange={v => updateContent('hero', 'descEn', v)} type="textarea" />
                <Field label="Description (ID)" value={siteContent.hero.descId} onChange={v => updateContent('hero', 'descId', v)} type="textarea" />
              </div>
              <div className="col-span-2">
                 <Field label="Hero Image URL" value={siteContent.hero.image} onChange={v => updateContent('hero', 'image', v)} />
                 <input type="file" onChange={e => handleImageUpload(e, url => updateContent('hero', 'image', url))} className="mt-2 text-xs" />
                 {siteContent.hero.image && (
                   <img src={siteContent.hero.image} className="mt-4 h-60 rounded-2xl object-cover w-full border border-stone-200" alt="Hero Preview" />
                 )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'intro' && (
          <div className="animate-fade-in max-w-4xl space-y-12">
            <SectionHeader title="Intro Section" desc="Heritage and sourcing storytelling." />
            <div className="grid grid-cols-2 gap-8">
              <Field label="Title (EN)" value={siteContent.intro.titleEn} onChange={v => updateContent('intro', 'titleEn', v)} />
              <Field label="Title (ID)" value={siteContent.intro.titleId} onChange={v => updateContent('intro', 'titleId', v)} />
              <div className="col-span-2">
                <Field label="Body (EN)" value={siteContent.intro.descEn} onChange={v => updateContent('intro', 'descEn', v)} type="textarea" />
                <Field label="Body (ID)" value={siteContent.intro.descId} onChange={v => updateContent('intro', 'descId', v)} type="textarea" />
              </div>
              <Field label="Altitude Label" value={siteContent.intro.statAltitude} onChange={v => updateContent('intro', 'statAltitude', v)} />
              <Field label="Potency Label" value={siteContent.intro.statPotency} onChange={v => updateContent('intro', 'statPotency', v)} />
              <Field label="Quote (EN)" value={siteContent.intro.quoteEn} onChange={v => updateContent('intro', 'quoteEn', v)} />
              <Field label="Quote (ID)" value={siteContent.intro.quoteId} onChange={v => updateContent('intro', 'quoteId', v)} />
              <div className="col-span-2 space-y-4">
                 <Field label="Intro Feature Image URL" value={siteContent.intro.image} onChange={v => updateContent('intro', 'image', v)} />
                 <div className="flex items-center gap-4">
                   <label className="bg-stone-100 px-4 py-2 rounded-lg cursor-pointer hover:bg-stone-200 transition-all text-[10px] font-bold uppercase tracking-widest">
                     Upload New Image
                     <input type="file" onChange={e => handleImageUpload(e, url => updateContent('intro', 'image', url))} className="hidden" />
                   </label>
                   <span className="text-[9px] text-stone-400">Recommended: Square or 4:3 aspect ratio</span>
                 </div>
                 {siteContent.intro.image && (
                   <div className="relative group">
                     <img src={siteContent.intro.image} className="h-80 w-full rounded-[2rem] object-cover border border-stone-200 shadow-md" alt="Intro Preview" />
                     <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem] flex items-center justify-center">
                        <span className="bg-white/90 backdrop-blur px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest text-shilajit-brown">Current Active Image</span>
                     </div>
                   </div>
                 )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'benefits' && (
           <div className="animate-fade-in max-w-4xl space-y-12">
              <SectionHeader title="Benefits Cards" desc="Manage the 4 core value propositions." />
              {siteContent.benefits.items.map((item, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl border border-stone-200 space-y-4">
                  <h3 className="font-bold text-gold-accent uppercase text-[10px]">Benefit #{i+1}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Title (EN)" value={item.titleEn} onChange={v => updateNestedContent('benefits', i, 'titleEn', v)} />
                    <Field label="Title (ID)" value={item.titleId} onChange={v => updateNestedContent('benefits', i, 'titleId', v)} />
                  </div>
                  <Field label="Description (EN)" value={item.descEn} onChange={v => updateNestedContent('benefits', i, 'descEn', v)} type="textarea" />
                  <Field label="Description (ID)" value={item.descId} onChange={v => updateNestedContent('benefits', i, 'descId', v)} type="textarea" />
                </div>
              ))}
           </div>
        )}

        {activeTab === 'ai' && (
          <div className="animate-fade-in max-w-4xl space-y-12">
            <SectionHeader title="AI Wellness Expert" desc="Configure your automated specialist." />
            <div className="grid grid-cols-2 gap-8">
              <Field label="Expert Name (EN)" value={siteContent.aiAssistant.expertNameEn} onChange={v => updateContent('aiAssistant', 'expertNameEn', v)} />
              <Field label="Expert Name (ID)" value={siteContent.aiAssistant.expertNameId} onChange={v => updateContent('aiAssistant', 'expertNameId', v)} />
              <Field label="Status Text (EN)" value={siteContent.aiAssistant.statusEn} onChange={v => updateContent('aiAssistant', 'statusEn', v)} />
              <Field label="Status Text (ID)" value={siteContent.aiAssistant.statusId} onChange={v => updateContent('aiAssistant', 'statusId', v)} />
              <div className="col-span-2">
                <Field label="Initial Greeting (EN)" value={siteContent.aiAssistant.initialEn} onChange={v => updateContent('aiAssistant', 'initialEn', v)} type="textarea" />
                <Field label="Initial Greeting (ID)" value={siteContent.aiAssistant.initialId} onChange={v => updateContent('aiAssistant', 'initialId', v)} type="textarea" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'faq' && (
          <div className="animate-fade-in max-w-4xl space-y-12">
            <SectionHeader title="FAQ" desc="Frequently asked questions list." />
            {siteContent.faq.items.map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-stone-200 space-y-4">
                <Field label={`Q${i+1} (EN)`} value={item.qEn} onChange={v => updateNestedContent('faq', i, 'qEn', v)} />
                <Field label={`Q${i+1} (ID)`} value={item.qId} onChange={v => updateNestedContent('faq', i, 'qId', v)} />
                <Field label={`A${i+1} (EN)`} value={item.aEn} onChange={v => updateNestedContent('faq', i, 'aEn', v)} type="textarea" />
                <Field label={`A${i+1} (ID)`} value={item.aId} onChange={v => updateNestedContent('faq', i, 'aId', v)} type="textarea" />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'certs' && (
          <div className="animate-fade-in max-w-4xl space-y-12">
            <SectionHeader title="Certificates" desc="Lab results and compliance data." />
            
            <div className="bg-white p-10 rounded-[2rem] border border-stone-200 space-y-8 shadow-sm">
               <h3 className="text-xl font-bold serif border-b pb-4">Global Metrics (Editable Stats)</h3>
               <div className="grid grid-cols-2 gap-8">
                 {siteContent.certs.stats.map((s, i) => (
                   <div key={i} className="p-6 bg-stone-50 rounded-2xl space-y-4 relative group">
                     <button onClick={() => removeCertStat(i)} className="absolute top-2 right-2 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold">Remove</button>
                     <Field label="Stat Value" value={s.value} onChange={v => updateCertStat(i, 'value', v)} />
                     <Field label="Label (EN)" value={s.labelEn} onChange={v => updateCertStat(i, 'labelEn', v)} />
                     <Field label="Label (ID)" value={s.labelId} onChange={v => updateCertStat(i, 'labelId', v)} />
                   </div>
                 ))}
               </div>
               <button onClick={addCertStat} className="w-full py-4 border-2 border-dashed rounded-xl text-stone-300 font-bold uppercase tracking-widest hover:border-gold-accent hover:text-gold-accent transition-all">+ Add Stat Metric</button>
            </div>

            <div className="bg-white p-10 rounded-[2rem] border border-stone-200 space-y-8 shadow-sm">
               <h3 className="text-xl font-bold serif border-b pb-4">Footer Compliance Label</h3>
               <div className="grid grid-cols-2 gap-8">
                 <Field label="Compliance Text (EN)" value={siteContent.certs.footerTextEn} onChange={v => updateContent('certs', 'footerTextEn', v)} />
                 <Field label="Compliance Text (ID)" value={siteContent.certs.footerTextId} onChange={v => updateContent('certs', 'footerTextId', v)} />
               </div>
            </div>

            <div className="space-y-8">
               <h3 className="text-xl font-bold serif">Document Items</h3>
               {siteContent.certs.items.map((item, i) => (
                 <div key={i} className="p-10 bg-white rounded-[2rem] border border-stone-200 shadow-sm relative">
                    <button onClick={() => removeCert(i)} className="absolute top-8 right-8 text-red-400 font-bold text-[10px] uppercase">Remove</button>
                    <div className="grid grid-cols-2 gap-8">
                       <Field label="Doc ID" value={item.idNum} onChange={v => updateNestedContent('certs', i, 'idNum', v)} />
                       <Field label="Title (EN)" value={item.titleEn} onChange={v => updateNestedContent('certs', i, 'titleEn', v)} />
                       <div className="col-span-2">
                         <Field label="Image URL" value={item.image} onChange={v => updateNestedContent('certs', i, 'image', v)} />
                         <input type="file" onChange={e => handleImageUpload(e, url => updateNestedContent('certs', i, 'image', url))} className="mt-2 text-xs" />
                       </div>
                    </div>
                 </div>
               ))}
               <button onClick={addCert} className="w-full py-10 border-4 border-dashed rounded-[2rem] text-stone-300 font-bold uppercase tracking-widest hover:border-gold-accent hover:text-gold-accent transition-all">+ Add Document</button>
            </div>
          </div>
        )}

        {activeTab === 'product' && (
          <div className="animate-fade-in max-w-4xl space-y-12">
             <SectionHeader title="Product & Pricing" desc="Packaging variants and marketplace links." />
             <div className="space-y-8">
                {siteContent.product.variants.map((v, i) => (
                  <div key={v.id} className="p-8 bg-white rounded-[2rem] border border-stone-200 shadow-sm relative group">
                    <button onClick={() => removeVariant(v.id)} className="absolute top-4 right-4 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold">Delete Variant</button>
                    <div className="grid grid-cols-2 gap-8">
                       <Field label="Size Label" value={v.size} onChange={val => updateVariant(i, 'size', val)} />
                       <Field label="Price (IDR)" value={v.priceIdr} onChange={val => updateVariant(i, 'priceIdr', val)} type="number" />
                       <Field label="Shopee URL" value={v.shopeeLink || ''} onChange={val => updateVariant(i, 'shopeeLink', val)} />
                       <Field label="TikTok URL" value={v.tiktokLink || ''} onChange={val => updateVariant(i, 'tiktokLink', val)} />
                    </div>
                  </div>
                ))}
                <button onClick={addVariant} className="w-full py-6 border-2 border-dashed rounded-xl text-stone-300 font-bold">+ Add Variant</button>
             </div>
          </div>
        )}

        {activeTab === 'blog' && (
           <div className="animate-fade-in max-w-4xl space-y-8">
              <SectionHeader title="Blog Journal" desc="Educational content management." />
              {blogPosts.map(p => (
                <div key={p.id} className="p-8 bg-white border border-stone-200 rounded-3xl flex justify-between items-center group">
                   <p className="font-bold text-shilajit-brown">{p.title.en}</p>
                   <button onClick={() => setBlogPosts(prev => prev.filter(bp => bp.id !== p.id))} className="text-red-400 font-bold uppercase text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">Delete</button>
                </div>
              ))}
              <p className="text-stone-400 text-xs italic">Full blog post editing is currently read-only in this demo. Contact engineering for advanced CMS integration.</p>
           </div>
        )}

        {activeTab === 'settings' && (
           <div className="animate-fade-in max-w-4xl space-y-12">
              <SectionHeader title="Security" desc="Configure access control." />
              <div className="bg-white p-10 rounded-[2rem] border border-stone-200 shadow-sm">
                <Field label="Admin Password" value={siteContent.settings.adminPassword} onChange={v => updateContent('settings', 'adminPassword', v)} />
              </div>
           </div>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;
