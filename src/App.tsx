import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Flame, 
  BookOpen, 
  Music, 
  Scroll, 
  ChevronRight, 
  ChevronLeft,
  Search,
  Share2,
  Heart
} from 'lucide-react';
import { TabType, DevotionalContent, Verse } from './types';
import { CHALISA, BAJRANG_BAAN, AARTI, SUNDARKAND } from './constants';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('chalisa');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tabs = [
    { id: 'chalisa', label: 'हनुमान चालीसा', icon: BookOpen, content: CHALISA },
    { id: 'bajrang-baan', label: 'बजरंग बाण', icon: Scroll, content: BAJRANG_BAAN },
    { id: 'aarti', label: 'आरती', icon: Flame, content: AARTI },
    { id: 'sundarkand', label: 'सुन्दरकाण्ड', icon: Music, content: SUNDARKAND },
  ];

  const currentContent = tabs.find(t => t.id === activeTab)?.content || CHALISA;

  return (
    <div className="min-h-screen bg-[#FFFBF0] text-[#4A3B28] font-sans selection:bg-orange-200">
      {/* Background Patterns */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(#C2410C 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center shadow-lg shadow-orange-200">
              <Flame className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="font-serif text-xl font-bold text-orange-800 tracking-tight">हनुमान भक्ति</h1>
              <p className="text-[10px] uppercase tracking-widest text-orange-600 font-bold opacity-70">BY PRATHAM DADA</p>
            </div>
          </motion.div>

          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-orange-50 rounded-full transition-colors text-orange-800/60">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-orange-50 rounded-full transition-colors text-orange-800/60">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Navigation */}
      <nav className="pt-28 pb-6 px-4 sticky top-0 z-40 bg-[#FFFBF0]/60 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-orange-600 text-white shadow-md shadow-orange-100 scale-105' 
                    : 'bg-white text-orange-900/60 hover:bg-orange-50 border border-orange-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-orange-400'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Content Area */}
      <main className="max-w-3xl mx-auto px-4 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Page Header */}
            <div className="text-center mb-12">
              <motion.h2 
                layoutId="title"
                className="font-serif text-4xl md:text-5xl font-bold text-orange-900 mb-4"
              >
                {currentContent.title}
              </motion.h2>
              <div className="flex items-center justify-center gap-4">
                <div className="h-[1px] w-12 bg-orange-200" />
                <p className="text-orange-600 font-medium italic opacity-80">{currentContent.subtitle}</p>
                <div className="h-[1px] w-12 bg-orange-200" />
              </div>
            </div>

            {/* Content Sections */}
            <div className="space-y-16">
              {currentContent.sections.map((section, sIdx) => (
                <section key={sIdx} className="relative">
                  <div className="flex items-center gap-4 mb-8">
                    <h3 className="text-xs uppercase tracking-[0.3em] font-black text-orange-400/50 bg-orange-50 px-3 py-1 rounded">
                      {section.name}
                    </h3>
                    <div className="flex-grow h-[1px] bg-orange-100/50" />
                  </div>

                  <div className="space-y-6">
                    {section.items.map((item, iIdx) => (
                      <div key={iIdx}>
                        <VerseItem item={item} index={iIdx} />
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {/* Footer Text */}
            <div className="mt-20 text-center pb-10">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-inner">
                <Heart className="text-orange-600 fill-orange-600 w-6 h-6 animate-pulse" />
              </div>
              <p className="font-serif text-xl text-orange-950/40">जय श्री राम</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Back to Top Button */}
      {scrolled && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 w-12 h-12 bg-white text-orange-600 rounded-full shadow-xl border border-orange-100 flex items-center justify-center z-50 hover:bg-orange-50 active:scale-95 transition-all"
        >
          <ChevronLeft className="rotate-90" />
        </motion.button>
      )}
    </div>
  );
}

interface VerseItemProps {
  item: Verse;
  index: number;
}

function VerseItem({ item, index }: VerseItemProps) {
  const [clicked, setClicked] = useState(false);

  const isDoha = item.type === 'doha' || item.type === 'shloka';

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -10 : 10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      onClick={() => {
        setClicked(true);
        setTimeout(() => setClicked(false), 500);
      }}
      className={`relative group cursor-pointer transition-all duration-300`}
    >
      <div 
        className={`p-6 md:p-8 rounded-2xl transition-all duration-500 overflow-hidden ${
          isDoha 
            ? 'bg-gradient-to-br from-orange-600 to-red-600 text-white shadow-lg' 
            : 'bg-white text-orange-900 border border-orange-100/50 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/[0.05]'
        } ${clicked ? 'scale-[1.02] ring-4 ring-orange-400/20' : ''}`}
      >
        {/* Subtle Background Icon for Choupai */}
        {!isDoha && (
          <Scroll className="absolute -right-4 -bottom-4 w-24 h-24 text-orange-50/50 -rotate-12 pointer-events-none" />
        )}

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-2">
            <span className={`text-[10px] font-bold uppercase tracking-widest opacity-40 ${isDoha ? 'text-white' : 'text-orange-900'}`}>
              Verse {index + 1}
            </span>
            <ChevronRight className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 ${isDoha ? 'text-white' : 'text-orange-400'}`} />
          </div>
          
          <p className={`text-xl md:text-2xl font-bold leading-relaxed text-center whitespace-pre-wrap ${isDoha ? 'font-serif' : 'font-sans'}`}>
            {item.text}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
