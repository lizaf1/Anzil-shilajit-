
import React, { useState, useRef, useEffect } from 'react';
import { getWellnessResponse } from '../services/gemini';
import { useLanguage } from '../context/LanguageContext';
import { ChatMessage } from '../types';

// Fix: Use the expected global type name to avoid "Subsequent property declarations" errors.
// The error indicated that 'aistudio' must be of type 'AIStudio'.
declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }
  interface Window {
    aistudio?: AIStudio;
  }
}

const AIAssistant: React.FC = () => {
  const { language, t } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: t.ai.initial }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showKeyButton, setShowKeyButton] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if an API key is already selected on initial mount
    const checkInitialKey = async () => {
      if (window.aistudio && typeof window.aistudio.hasSelectedApiKey === 'function') {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        if (!hasKey) {
          setShowKeyButton(true);
        }
      }
    };
    checkInitialKey();
  }, []);

  useEffect(() => {
    // Reset messages when language changes
    setMessages([{ role: 'model', text: t.ai.initial }]);
    // Re-verify key status if language changes to ensure UI is consistent
    const checkKey = async () => {
      if (window.aistudio && typeof window.aistudio.hasSelectedApiKey === 'function') {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        setShowKeyButton(!hasKey);
      }
    };
    checkKey();
  }, [language, t.ai.initial]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleOpenKeyDialog = async () => {
    if (window.aistudio && typeof window.aistudio.openSelectKey === 'function') {
      await window.aistudio.openSelectKey();
      // Assume success after triggering selection to avoid race conditions
      setShowKeyButton(false);
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: language === 'id' ? "Kunci API telah dipilih. Silakan coba kirim pesan Anda lagi." : "API key selected. Please try sending your message again." 
      }]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    const result = await getWellnessResponse(userMessage, language);
    
    setIsLoading(false);
    setMessages(prev => [...prev, { role: 'model', text: result.text }]);
    
    // If auth is required, prompt user to select a key
    if (result.error === 'AUTH_REQUIRED') {
      setShowKeyButton(true);
    }
  };

  return (
    <section className="py-20 bg-stone-100" id="ai-assistant">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold mb-6 text-shilajit-brown serif">{t.ai.title}</h2>
            <p className="text-stone-600 mb-8 leading-relaxed">
              {t.ai.desc}
            </p>
            <div className="space-y-4">
              {t.ai.features.map((feat: string, i: number) => (
                <div key={i} className="flex items-center space-x-3 text-sm text-stone-500 font-medium uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
            
            {showKeyButton && (
              <div className="mt-8 p-6 bg-amber-50 border border-amber-200 rounded-2xl shadow-sm">
                <p className="text-amber-800 text-sm mb-4 font-medium">
                  {language === 'id' 
                    ? "Fitur AI memerlukan kunci API berbayar dari proyek GCP Anda."
                    : "AI features require a paid API key from your GCP project."}
                </p>
                <button 
                  onClick={handleOpenKeyDialog}
                  className="bg-gold-accent text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-opacity-90 transition-all shadow-md mb-4"
                >
                  {language === 'id' ? "Pilih Kunci API" : "Select API Key"}
                </button>
                <p className="text-[10px] text-amber-600 font-bold uppercase tracking-widest">
                  <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="underline hover:text-shilajit-brown">
                    Documentation: Billing Setup →
                  </a>
                </p>
              </div>
            )}
          </div>

          <div className="md:w-1/2 w-full">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200 h-[500px] flex flex-col">
              <div className="bg-shilajit-brown p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gold-accent flex items-center justify-center text-white font-bold serif">A</div>
                  <div>
                    <h4 className="text-white font-semibold">{t.ai.expertName}</h4>
                    <p className="text-white/60 text-xs">{t.ai.status}</p>
                  </div>
                </div>
                {showKeyButton && (
                  <button 
                    onClick={handleOpenKeyDialog}
                    className="bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold py-1 px-3 rounded-full border border-white/20 transition-all"
                  >
                    Select Key
                  </button>
                )}
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth" ref={scrollRef}>
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-gold-accent text-white rounded-tr-none' 
                        : 'bg-stone-100 text-stone-800 rounded-tl-none border border-stone-200'
                    }`}>
                      {msg.text}
                      {idx === messages.length - 1 && showKeyButton && (
                        <div className="mt-3 pt-3 border-t border-stone-200">
                          <button 
                            onClick={handleOpenKeyDialog}
                            className="text-gold-accent font-bold text-xs uppercase tracking-widest hover:text-shilajit-brown transition-colors"
                          >
                            Set API Key →
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-stone-100 p-4 rounded-2xl rounded-tl-none border border-stone-200 space-x-1 flex">
                      <div className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce [animation-delay:-.3s]"></div>
                      <div className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce [animation-delay:-.5s]"></div>
                    </div>
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit} className="p-4 bg-stone-50 border-t border-stone-200 flex space-x-2">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t.ai.placeholder}
                  className="flex-1 bg-white border border-stone-200 rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-accent"
                />
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="bg-gold-accent text-white p-3 rounded-full hover:bg-opacity-90 transition-all disabled:opacity-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-90" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAssistant;
