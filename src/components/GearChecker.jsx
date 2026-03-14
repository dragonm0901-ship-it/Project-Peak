import React, { useState, useEffect } from 'react';
import { Check, AlertTriangle, ArrowRight, Backpack, ChevronLeft } from 'lucide-react';

const gearCategories = [
  {
    category: 'Essentials',
    items: [
      { name: 'Trekking backpack (40-60L)', essential: true },
      { name: 'Daypack (20L)', essential: true },
      { name: 'Passport & permits copy', essential: true },
      { name: 'Travel insurance docs', essential: true },
      { name: 'Cash (NPR & USD)', essential: true },
    ]
  },
  {
    category: 'Clothing',
    items: [
      { name: 'Moisture-wicking base layers (x3)', essential: true },
      { name: 'Insulating fleece/down jacket', essential: true },
      { name: 'Waterproof shell jacket', essential: true },
      { name: 'Trekking pants (x2)', essential: true },
      { name: 'Thermal underwear', essential: false },
      { name: 'Warm hat & sun hat', essential: true },
      { name: 'Gloves (liner + waterproof)', essential: true },
      { name: 'Warm socks (x5)', essential: true },
      { name: 'Gaiters', essential: false },
    ]
  },
  {
    category: 'Footwear',
    items: [
      { name: 'Broken-in trekking boots', essential: true },
      { name: 'Camp sandals/flip flops', essential: false },
      { name: 'Trekking poles (pair)', essential: true },
    ]
  },
  {
    category: 'Gear & Equipment',
    items: [
      { name: 'Sleeping bag (-15°C rated)', essential: true },
      { name: 'Headlamp + spare batteries', essential: true },
      { name: 'Sunglasses (UV400)', essential: true },
      { name: 'Water bottle / hydration system', essential: true },
      { name: 'Water purification tablets', essential: true },
      { name: 'First aid kit', essential: true },
      { name: 'Sunscreen (SPF 50+)', essential: true },
      { name: 'Lip balm with SPF', essential: false },
    ]
  },
  {
    category: 'Tech & Comfort',
    items: [
      { name: 'Camera / phone', essential: false },
      { name: 'Power bank (20,000mAh+)', essential: false },
      { name: 'Earplugs & eye mask', essential: false },
      { name: 'Snacks & energy bars', essential: false },
      { name: 'Notebook & pen', essential: false },
    ]
  },
];

const STORAGE_KEY = 'projectpeak_gear_checklist';

const GearChecker = () => {
  const [checked, setChecked] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
  }, [checked]);

  const toggleItem = (name) => {
    setChecked(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const totalItems = gearCategories.reduce((acc, cat) => acc + cat.items.length, 0);
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const essentialItems = gearCategories.flatMap(c => c.items.filter(i => i.essential));
  const essentialsMissing = essentialItems.filter(i => !checked[i.name]);
  const progress = Math.round((checkedCount / totalItems) * 100);

  const resetAll = () => setChecked({});

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <section id="gear-checker" className="py-24 md:py-32 px-6 md:px-16 w-full bg-peakWhite dark:bg-peakDark transition-colors">
      <div 
        onClick={() => setIsOpen(true)}
        className="max-w-4xl mx-auto bg-white dark:bg-peakDeep border border-black/5 dark:border-white/10 rounded-[2rem] p-8 md:p-12 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-peakGreen/10 transition-all duration-300 group flex flex-col md:flex-row items-center gap-8 md:gap-12"
      >
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center justify-center p-4 bg-peakGreen/10 text-peakGreen rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
            <Backpack size={40} />
          </div>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-peakDeep dark:text-peakWhite mb-4 group-hover:text-peakGreen transition-colors">
            Gear & Equipment
          </h2>
          <p className="font-sans text-peakDeep/60 dark:text-peakWhite/60 text-base md:text-lg mb-6 md:mb-0">
            Don't leave Kathmandu without ticking everything off. Access your interactive packing list to ensure you have all the essentials for your trek.
          </p>
        </div>
        
        {/* Visual summary in the box */}
        <div className="w-full md:w-72 bg-peakWhite dark:bg-white/5 rounded-2xl p-6 border border-black/5 dark:border-white/10 relative overflow-hidden">
          <div className="flex justify-between items-center mb-3 relative z-10">
            <span className="font-sans text-sm font-semibold text-peakDeep dark:text-peakWhite">Items Packed</span>
            <span className="font-sans text-sm font-bold text-peakGreen">{progress}%</span>
          </div>
          <div className="w-full h-2.5 bg-black/5 dark:bg-white/10 rounded-full overflow-hidden relative z-10 mb-4">
            <div className="h-full bg-peakGreen rounded-full transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="font-sans text-xs text-peakDeep/60 dark:text-peakWhite/60 relative z-10">
            {checkedCount} out of {totalItems} items saved
          </p>
          
          <div className="flex items-center justify-between mt-6 relative z-10 text-peakDeep dark:text-peakWhite group-hover:text-peakGreen transition-colors">
             <span className="font-sans text-sm font-bold uppercase tracking-wider">Open Checklist</span>
             <ArrowRight size={20} className="transform group-hover:translate-x-2 transition-transform" />
          </div>
          
          {/* Decorative background element */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-peakGreen/5 rounded-full blur-2xl group-hover:bg-peakGreen/10 transition-colors pointer-events-none"></div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[200] bg-peakWhite dark:bg-peakDark overflow-y-auto w-full h-full" data-lenis-prevent="true">
          <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 relative min-h-full">
            <button 
              onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
              className="absolute top-6 left-6 md:top-12 md:left-0 flex items-center gap-2 text-peakDeep/60 dark:text-peakWhite/60 hover:text-peakGreen transition-colors font-sans font-bold uppercase tracking-wider text-sm mb-8"
            >
              <ChevronLeft size={20} />
              Back to Home
            </button>

            <div className="text-center mb-12 mt-12 md:mt-0">
              <h2 className="font-display font-bold text-3xl md:text-5xl text-peakDeep dark:text-peakWhite mb-4">
                Interactive Checklist
              </h2>
              <p className="font-sans text-peakDeep/60 dark:text-peakWhite/60 text-base md:text-lg">
                Your checklist is saved automatically.
              </p>
            </div>

            {/* Progress bar */}
            <div className="mb-8 bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 p-6 rounded-2xl shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <span className="font-sans text-sm font-semibold text-peakDeep dark:text-peakWhite">{checkedCount} / {totalItems} items packed</span>
                <span className="font-sans text-sm font-bold text-peakGreen">{progress}%</span>
              </div>
              <div className="w-full h-3 bg-black/5 dark:bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-peakGreen rounded-full transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
              </div>
            </div>

            {/* Essentials warning */}
            {essentialsMissing.length > 0 && checkedCount > 0 && (
              <div className="flex items-start gap-3 p-4 mb-8 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/30">
                <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
                <p className="font-sans text-sm text-amber-800 dark:text-amber-200">
                  <strong>{essentialsMissing.length} essential item{essentialsMissing.length > 1 ? 's' : ''}</strong> still missing. These are critical for your safety on the trail.
                </p>
              </div>
            )}

            {/* Categories */}
            <div className="flex flex-col gap-6">
              {gearCategories.map((cat, catIndex) => (
                <div key={catIndex} className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl p-6">
                  <h3 className="font-display font-bold text-lg text-peakDeep dark:text-peakWhite mb-4">{cat.category}</h3>
                  <div className="flex flex-col gap-1">
                    {cat.items.map((item, itemIndex) => {
                      const isChecked = checked[item.name];
                      return (
                        <button
                          key={itemIndex}
                          onClick={(e) => { e.stopPropagation(); toggleItem(item.name); }}
                          className={`flex items-center gap-3 py-2.5 px-3 rounded-lg text-left transition-all hover:bg-black/[0.02] dark:hover:bg-white/5 group ${isChecked ? 'opacity-60' : ''}`}
                        >
                          <div className={`w-5 h-5 rounded shrink-0 flex items-center justify-center transition-all ${isChecked ? 'bg-peakGreen' : 'border-2 border-black/15 dark:border-white/20 group-hover:border-peakGreen'}`}>
                            {isChecked && <Check size={14} className="text-white" strokeWidth={3} />}
                          </div>
                          <span className={`font-sans text-sm flex-1 ${isChecked ? 'line-through text-peakDeep/40 dark:text-peakWhite/40' : 'text-peakDeep dark:text-peakWhite'}`}>
                            {item.name}
                          </span>
                          {item.essential && !isChecked && (
                            <span className="text-[10px] uppercase tracking-wider font-bold text-peakRed/70 dark:text-red-400/70">Essential</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Reset */}
            <div className="text-center mt-8 pb-12">
              <button onClick={(e) => { e.stopPropagation(); resetAll(); }} className="font-sans text-sm text-peakDeep/50 dark:text-peakWhite/50 hover:text-peakRed transition-colors underline-offset-4 hover:underline">
                Reset checklist
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GearChecker;
