import React, { useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useSettings } from '../context/SettingsContext';
import { Sun, Cloud, Globe, DollarSign } from 'lucide-react';
import gsap from 'gsap';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { currency, setCurrency, language, setLanguage, t } = useSettings();
  const iconRef = useRef(null);

  const handleThemeToggle = () => {
    gsap.to(iconRef.current, {
      rotation: "+=180",
      scale: 0.8,
      duration: 0.15,
      yoyo: true,
      repeat: 1,
      onComplete: toggleTheme
    });
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 py-4 w-full">
      <nav className="flex items-center justify-between px-6 py-4 rounded-full transition-all duration-300 w-full max-w-7xl mx-auto bg-white/10 dark:bg-black/20 backdrop-blur-md border border-black/5 dark:border-white/10 text-peakDeep dark:text-peakWhite shadow-lg">
        <div className="font-display text-2xl font-bold tracking-wider">PROJECT PEAK</div>
        
        <div className="hidden md:flex gap-8 items-center font-sans tracking-widest text-sm uppercase font-medium">
          <a href="#destinations" className="hover-lift hover:text-peakGreen transition-colors">{t('nav.discover')}</a>
          <a href="#experiences" className="hover-lift hover:text-peakGreen transition-colors">{t('nav.craft')}</a>
          <a href="#about" className="hover-lift hover:text-peakGreen transition-colors">{t('nav.atelier')}</a>
        </div>
        
        <div className="flex items-center gap-4">
          <select 
            className="bg-transparent border-none outline-none cursor-pointer font-sans text-sm font-semibold uppercase hover:text-peakGreen transition-colors appearance-none"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="NPR" className="text-peakDeep">NPR</option>
            <option value="USD" className="text-peakDeep">USD</option>
            <option value="EUR" className="text-peakDeep">EUR</option>
          </select>

          <select 
            className="bg-transparent border-none outline-none cursor-pointer font-sans text-sm font-semibold uppercase hover:text-peakGreen transition-colors appearance-none"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="EN" className="text-peakDeep">EN</option>
            <option value="FR" className="text-peakDeep">FR</option>
            <option value="DE" className="text-peakDeep">DE</option>
            <option value="ZH" className="text-peakDeep">ZH</option>
          </select>

          <button onClick={handleThemeToggle} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
            <div ref={iconRef}>
              {theme === 'light' ? <Sun size={20} /> : <Cloud size={20} />}
            </div>
          </button>

          <button className="magnetic-btn bg-peakGreen text-white px-6 py-2 rounded-full font-sans uppercase tracking-widest text-xs font-bold hover:shadow-lg hover:shadow-peakGreen/30 transition-all">
            <span className="relative z-10">{t('hero.book')}</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
