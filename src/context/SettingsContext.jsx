import React, { createContext, useContext, useState } from 'react';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [currency, setCurrency] = useState('NPR'); // NPR, USD, EUR
  const [language, setLanguage] = useState('EN'); // EN, FR, DE, ZH

  // Simple exchange rates relative to USD
  const rates = {
    USD: 1,
    NPR: 133,
    EUR: 0.92,
  };

  // Convert USD base price to selected currency
  const convertPrice = (usdPrice) => {
    const rate = rates[currency];
    const converted = usdPrice * rate;
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0,
    }).format(converted);
  };

  const t = (key) => {
    const dict = {
      'hero.title': { EN: 'Elegance beyond', FR: 'L\'élégance au-delà', DE: 'Eleganz jenseits von', ZH: '超越优雅' },
      'hero.subtitle': { EN: 'Time.', FR: 'Le Temps.', DE: 'Zeit.', ZH: '时间。' },
      'hero.desc': { EN: 'Project Peak — a timeless architecture.', FR: 'Project Peak — une architecture intemporelle.', DE: 'Project Peak — zeitlose Architektur.', ZH: 'Project Peak — 永恒建筑。' },
      'hero.book': { EN: 'Discover Packages', FR: 'Découvrir les forfaits', DE: 'Pakete entdecken', ZH: '发现套餐' },
      // Added more translations
      'nav.design': { EN: 'Design', FR: 'Conception', DE: 'Design', ZH: '设计' },
      'nav.craft': { EN: 'Craft', FR: 'Métier', DE: 'Handwerk', ZH: '工艺' },
      'nav.atelier': { EN: 'Atelier', FR: 'Atelier', DE: 'Atelier', ZH: '工作室' },
      'nav.discover': { EN: 'Discover', FR: 'Découvrir', DE: 'Entdecken', ZH: '发现' },
    };
    return dict[key]?.[language] || dict[key]?.['EN'] || key;
  };

  return (
    <SettingsContext.Provider value={{ currency, setCurrency, language, setLanguage, convertPrice, t }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
