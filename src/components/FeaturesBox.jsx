import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Plane, Wallet, Compass } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FeaturesBox = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.bento-item',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 px-6 md:px-16 w-full bg-peakWhite dark:bg-peakDark transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl md:text-5xl text-peakDeep dark:text-peakWhite mb-6">
            The Premier Experience
          </h2>
          <p className="font-sans text-peakDeep/60 dark:text-peakWhite/60 max-w-2xl mx-auto text-lg">
            We handle the unimaginable logistics of the Himalayas so you can focus on the ascent. From domestic flights to local permits.
          </p>
        </div>

        {/* Bento Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:grid-rows-2">
          
          {/* Large Item 1 */}
          <div className="bento-item md:col-span-2 md:row-span-2 bg-gradient-to-br from-white to-gray-50 dark:from-white/5 dark:to-white/0 border border-black/5 dark:border-white/10 rounded-3xl p-10 flex flex-col justify-between group overflow-hidden relative shadow-[inset_0_2px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] transition-all">
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-full bg-peakGreen/10 flex items-center justify-center mb-6 text-peakGreen">
                <Plane size={24} />
              </div>
              <h3 className="font-display font-bold text-3xl mb-4 text-peakDeep dark:text-peakWhite">
                Real-Time Flight Booking
              </h3>
              <p className="font-sans text-peakDeep/70 dark:text-peakWhite/70 leading-relaxed max-w-md">
                Direct API integration with Yeti Airlines and Buddha Air. Lock your seat to Lukla instantly; no more waiting days for an email quote.
              </p>
            </div>
            {/* Abstract decorative element */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-peakGreen/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          </div>

          {/* Medium Item 1 */}
          <div className="bento-item md:col-span-2 bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-3xl p-8 shadow-[inset_0_2px_20px_rgba(0,0,0,0.02)]">
            <div className="w-12 h-12 rounded-full bg-peakDeep/5 dark:bg-peakWhite/10 flex items-center justify-center mb-4 text-peakDeep dark:text-peakWhite">
               <Wallet size={20} />
            </div>
            <h3 className="font-display font-bold text-xl mb-2 text-peakDeep dark:text-peakWhite">Local & Global Payments</h3>
            <p className="font-sans text-peakDeep/70 dark:text-peakWhite/70 text-sm">
              Supporting Stripe and PayPal for international travelers, alongside eSewa, Fonepay, and Khalti for local Nepalese transactions.
            </p>
          </div>

          {/* Small Item 1 */}
          <div className="bento-item md:col-span-1 bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-3xl p-8 shadow-[inset_0_2px_20px_rgba(0,0,0,0.02)]">
            <div className="w-10 h-10 rounded-full bg-peakRed/10 flex items-center justify-center mb-4 text-peakRed">
               <Shield size={20} />
            </div>
            <h3 className="font-display font-bold text-lg mb-2 text-peakDeep dark:text-peakWhite">Permit Guaranteed</h3>
            <p className="font-sans text-peakDeep/70 dark:text-peakWhite/70 text-xs">
              TIMS cards and National Park permits pre-arranged before your arrival.
            </p>
          </div>

          {/* Small Item 2 */}
          <div className="bento-item md:col-span-1 bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-3xl p-8 shadow-[inset_0_2px_20px_rgba(0,0,0,0.02)]">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 text-blue-500">
               <Compass size={20} />
            </div>
            <h3 className="font-display font-bold text-lg mb-2 text-peakDeep dark:text-peakWhite">Live Weather Data</h3>
            <p className="font-sans text-peakDeep/70 dark:text-peakWhite/70 text-xs">
              Dynamic widgets pulling live altitude and weather API data for Everest Base Camp.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeaturesBox;
