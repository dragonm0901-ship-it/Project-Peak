import React from 'react';
import { useSettings } from '../context/SettingsContext';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const { t } = useSettings();

  return (
    <footer className="w-full bg-peakDeep text-peakWhite pt-20 md:pt-24 pb-6 px-6 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12 md:gap-16 mb-16 md:mb-20">
        <div className="flex-1 max-w-sm">
          <h2 className="font-display font-bold text-2xl md:text-3xl mb-6 tracking-wide">
            PROJECT PEAK.
          </h2>
          <p className="font-sans text-peakWhite/60 mb-8 leading-relaxed text-sm">
            {t('footer.desc')}
          </p>
          
          <div className="flex flex-col gap-3 font-sans text-peakWhite/80 text-sm">
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-peakGreen shrink-0" />
              <span>Thamel, Kathmandu, Nepal</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={16} className="text-peakGreen shrink-0" />
              <a href="tel:+97714411123" className="hover:text-peakGreen transition-colors">+977 1 4411123</a>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-peakGreen shrink-0" />
              <a href="mailto:adventure@projectpeak.com" className="hover:text-peakGreen transition-colors">adventure@projectpeak.com</a>
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-12 md:gap-24 font-sans text-sm tracking-wide">
          <div className="flex flex-col gap-3">
            <span className="text-peakWhite font-bold uppercase mb-2 text-xs opacity-50 tracking-widest">{t('footer.treks')}</span>
            <a href="#destinations" className="text-peakWhite/70 hover:text-peakGreen transition-colors">{t('footer.everest')}</a>
            <a href="#destinations" className="text-peakWhite/70 hover:text-peakGreen transition-colors">{t('footer.annapurna')}</a>
            <a href="#destinations" className="text-peakWhite/70 hover:text-peakGreen transition-colors">{t('footer.langtang')}</a>
            <a href="#destinations" className="text-peakWhite/70 hover:text-peakGreen transition-colors">{t('footer.heli')}</a>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-peakWhite font-bold uppercase mb-2 text-xs opacity-50 tracking-widest">{t('footer.company')}</span>
            <a href="#" className="text-peakWhite/70 hover:text-peakGreen transition-colors">{t('footer.about')}</a>
            <a href="#" className="text-peakWhite/70 hover:text-peakGreen transition-colors">{t('footer.guides')}</a>
            <a href="#" className="text-peakWhite/70 hover:text-peakGreen transition-colors">{t('footer.sustain')}</a>
            <a href="#contact" className="text-peakWhite/70 hover:text-peakGreen transition-colors">{t('footer.contact')}</a>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 pb-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-sans text-xs text-peakWhite/40">
            © {new Date().getFullYear()} {t('footer.copyright')}
          </div>
          
          <div className="flex items-center gap-5 flex-wrap justify-center">
            <span className="font-display font-bold text-lg italic text-peakWhite/30 hover:text-[#635BFF] transition-colors cursor-default">stripe</span>
            <span className="font-display font-bold text-lg italic text-peakWhite/30 hover:text-[#003087] transition-colors cursor-default">PayPal</span>
            <span className="text-peakWhite/30 hover:text-[#60BB46] font-sans text-sm font-bold transition-colors cursor-default">eSewa</span>
            <span className="text-peakWhite/30 hover:text-[#5C2D91] font-sans text-sm font-bold transition-colors cursor-default">KHALTI</span>
            <span className="text-peakWhite/30 hover:text-[#DC2626] font-sans font-bold text-sm transition-colors cursor-default">fonepay</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
