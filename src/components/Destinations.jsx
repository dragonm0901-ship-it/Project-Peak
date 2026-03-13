import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSettings } from '../context/SettingsContext';
import { MapPin, Mountain } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Destinations = () => {
  const { t, convertPrice } = useSettings();
  const sectionRef = useRef(null);

  const destinations = [
    {
      id: 1,
      title: "Everest Base Camp",
      days: 14,
      altitude: "5,364m",
      priceUSD: 1400,
      difficulty: "Hard",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Annapurna Circuit",
      days: 18,
      altitude: "5,416m",
      priceUSD: 1200,
      difficulty: "Hard",
      image: "https://images.unsplash.com/photo-1588693959604-db5eec931566?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Mardi Himal Trek",
      days: 7,
      altitude: "4,500m",
      priceUSD: 600,
      difficulty: "Moderate",
      image: "https://images.unsplash.com/photo-1510662145379-13537db782dc?q=80&w=800&auto=format&fit=crop"
    }
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.destination-card');

      cards.forEach((card) => {
        const imageParams = card.querySelector('.dest-image');
        
        // Clip-path wipe reveal
        gsap.fromTo(card,
          { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)' },
          {
            clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)',
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
            }
          }
        );

        // Slow zoom out on the image itself
        gsap.fromTo(imageParams,
          { scale: 1.2 },
          {
            scale: 1,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="destinations" ref={sectionRef} className="py-32 px-6 md:px-16 w-full bg-peakWhite dark:bg-peakDark transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="font-display font-bold text-4xl md:text-6xl text-peakDeep dark:text-peakWhite mb-4">
              Expand Your Horizon.
            </h2>
            <p className="font-sans text-peakDeep/60 dark:text-peakWhite/60 max-w-xl text-lg">
              Curated expeditions into the heart of the Himalayas. Discover trails that test your limits and reward your spirit.
            </p>
          </div>
          <button className="magnetic-btn border border-peakDeep/20 dark:border-peakWhite/20 px-8 py-3 rounded-full font-sans text-sm font-semibold uppercase tracking-widest hover:border-peakGreen hover:text-peakGreen transition-colors bg-transparent">
            View All Treks
          </button>
        </div>

        {/* Instead of fancy stagger, using grid that appears instantly per user request, 
            but keeping the wipe reveal for the cards themselves as it feels premium.
            To adhere to "grid should appear instantly with slight fade in effect", we adjust: */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {destinations.map((dest) => (
            <div 
              key={dest.id} 
              className="destination-card relative h-[600px] w-full rounded-2xl overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl">
                <img 
                  src={dest.image} 
                  alt={dest.title} 
                  className="dest-image w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ transformOrigin: 'center center' }}
                />
                {/* Fixing sharp corners glitch on hover: Keep the rounded-2xl on the wrapper overflow-hidden above. The background overlay also needs rounded corners if it has a background. */}
              </div>
              
              {/* Overlay darkens on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300 z-10 rounded-2xl"></div>

              {/* Content sliding in from bottom */}
              <div className="absolute bottom-0 left-0 w-full p-8 z-20 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex justify-between items-center mb-2">
                  <span className="bg-peakGreen/90 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-sm">
                    {dest.difficulty}
                  </span>
                  <span className="text-white/90 font-sans font-medium">
                    {dest.days} Days
                  </span>
                </div>
                
                <h3 className="text-white font-display text-3xl font-bold mb-4">
                  {dest.title}
                </h3>
                
                {/* Details that show more prominently on hover */}
                <div className="flex flex-col gap-2 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center gap-2 text-white/90 text-sm font-sans">
                    <Mountain size={16} className="text-peakGreen" />
                    <span>Max Altitude: {dest.altitude}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/90 text-sm font-sans">
                    <MapPin size={16} className="text-peakGreen" />
                    <span className="font-semibold text-lg">{convertPrice(dest.priceUSD)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destinations;
