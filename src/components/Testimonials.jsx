import React from 'react';
import { useSettings } from '../context/SettingsContext';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Mitchell",
    country: "United States",
    trek: "Everest Base Camp",
    rating: 5,
    text: "An absolutely life-changing experience. The team handled everything from Lukla flights to lodge bookings. I just had to show up and walk!"
  },
  {
    name: "Thomas Weber",
    country: "Germany",
    trek: "Annapurna Circuit",
    rating: 5,
    text: "I was nervous about permits and logistics, but Project Peak made it seamless. Our guide Pemba was incredibly knowledgeable and kind."
  },
  {
    name: "Yuki Tanaka",
    country: "Japan",
    trek: "Mardi Himal Trek",
    rating: 5,
    text: "Perfect for a shorter trip. The views of Machhapuchhre were unreal. Booking through the website was quick and the WhatsApp support was instant."
  }
];

const Testimonials = () => {
  const { t } = useSettings();

  return (
    <section id="testimonials" className="py-24 md:py-32 px-6 md:px-16 w-full bg-gray-50 dark:bg-peakDeep/50 transition-colors">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-display font-bold text-3xl md:text-5xl text-peakDeep dark:text-peakWhite mb-12 md:mb-16 text-center">
          {t('test.title')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((item, i) => (
            <div key={i} className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl p-8 flex flex-col gap-4 hover:shadow-lg transition-shadow duration-300">
              <div className="flex gap-1">
                {Array.from({ length: item.rating }).map((_, j) => (
                  <Star key={j} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="font-sans text-peakDeep/80 dark:text-peakWhite/80 leading-relaxed text-sm flex-1">
                "{item.text}"
              </p>
              <div className="border-t border-black/5 dark:border-white/10 pt-4">
                <p className="font-sans font-bold text-peakDeep dark:text-peakWhite text-sm">{item.name}</p>
                <p className="font-sans text-peakDeep/50 dark:text-peakWhite/50 text-xs">{item.country} · {item.trek}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
