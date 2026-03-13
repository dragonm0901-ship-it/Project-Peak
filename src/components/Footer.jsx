import React from 'react';
import { useSettings } from '../context/SettingsContext';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    const { t } = useSettings();

  return (
    <footer className="w-full bg-peakDeep text-peakWhite pt-24 pb-6 px-6 md:px-16 mt-0">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-16 mb-20">
        <div className="flex-1">
          <h2 className="font-display font-bold text-3xl mb-6 tracking-wide">
            PROJECT PEAK.
          </h2>
          <p className="font-sans text-peakWhite/60 max-w-sm mb-8 leading-relaxed">
            The high-performance booking engine for true Himalayan adventures. Experience Nepal with uncompromising quality.
          </p>
          
          <div className="flex flex-col gap-3 font-sans text-peakWhite/80 text-sm">
             <div className="flex items-center gap-3"><MapPin size={16} className="text-peakGreen"/> Thamel, Kathmandu, Nepal</div>
             <div className="flex items-center gap-3"><Phone size={16} className="text-peakGreen"/> +977 1 4411123</div>
             <div className="flex items-center gap-3"><Mail size={16} className="text-peakGreen"/> adventure@projectpeak.com</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-12 md:gap-24 font-sans text-sm tracking-wide">
          <div className="flex flex-col gap-4">
             <span className="text-peakWhite font-bold uppercase mb-2 text-xs opacity-50 tracking-widest">Treks</span>
             <a href="#" className="text-peakWhite/70 hover:text-peakGreen transition-colors">Everest Region</a>
             <a href="#" className="text-peakWhite/70 hover:text-peakGreen transition-colors">Annapurna Region</a>
             <a href="#" className="text-peakWhite/70 hover:text-peakGreen transition-colors">Langtang Region</a>
             <a href="#" className="text-peakWhite/70 hover:text-peakGreen transition-colors">Helicopter Tours</a>
          </div>
          <div className="flex flex-col gap-4">
             <span className="text-peakWhite font-bold uppercase mb-2 text-xs opacity-50 tracking-widest">Company</span>
             <a href="#" className="text-peakWhite/70 hover:text-peakGreen transition-colors">About Us</a>
             <a href="#" className="text-peakWhite/70 hover:text-peakGreen transition-colors">Our Guides</a>
             <a href="#" className="text-peakWhite/70 hover:text-peakGreen transition-colors">Sustainability</a>
             <a href="#" className="text-peakWhite/70 hover:text-peakGreen transition-colors">Contact</a>
          </div>
        </div>
      </div>

      {/* Trust Badges - User explicitly asked for logos at the bottom */}
      <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 pb-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="font-sans text-xs text-peakWhite/40">
                © {new Date().getFullYear()} Project Peak Booking Engine. All rights reserved.
            </div>
            
            <div className="flex items-center gap-6 saturate-0 opacity-60 hover:saturate-100 hover:opacity-100 transition-all duration-300">
                {/* SVG placeholders for payment gateways */}
                <span className="font-display font-bold text-xl italic text-[#635BFF]">stripe</span>
                <span className="font-display font-bold text-xl italic text-[#003087]">PayPal</span>
                <div className="flex items-center bg-[#60BB46] text-white px-2 py-0.5 rounded font-sans text-xs font-bold">eSewa</div>
                <div className="flex items-center text-[#E02424] font-sans text-sm font-bold border border-[#E02424] px-1 rounded-sm">KHALTI</div>
                <div className="flex items-center text-[#1E3A8A] font-sans font-bold text-sm">fone<span className="text-[#DC2626]">pay</span></div>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
