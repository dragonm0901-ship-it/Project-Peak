import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Destinations from './components/Destinations';
import FeaturesBox from './components/FeaturesBox';
import Footer from './components/Footer';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AltitudeProgress = () => {
  useEffect(() => {
    gsap.to('.trail-hiker', {
      y: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      }
    });
  }, []);

  return (
    <div className="fixed right-4 top-1/4 bottom-1/4 w-1 bg-black/10 dark:bg-white/10 rounded-full z-[90] hidden md:block">
      <div className="trail-hiker absolute top-0 -left-2 w-5 h-5 bg-peakGreen rounded-full shadow-[0_0_10px_rgba(22,101,52,0.5)] flex items-center justify-center">
        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
      </div>
    </div>
  );
};

const CustomCursor = () => {
  useEffect(() => {
    const cursor = document.querySelector('.custom-cursor');
    const moveCursor = (e) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
    };
    window.addEventListener('mousemove', moveCursor);

    const checkHover = () => {
        const interactiveElements = document.querySelectorAll('a, button, .hover-target, .destination-card, .bento-item, select');
        interactiveElements.forEach(el => {
            // Prevent binding multiple times
            if (!el.hasAttribute('data-cursor-bound')) {
                el.setAttribute('data-cursor-bound', 'true');
                el.addEventListener('mouseenter', () => {
                   gsap.to(cursor, { scale: 3, backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid white' });
                });
                el.addEventListener('mouseleave', () => {
                   gsap.to(cursor, { scale: 1, backgroundColor: 'white', border: 'none' });
                });
            }
        });
    }
    
    // Check initial and then on small delay for dynamic content
    checkHover();
    setTimeout(checkHover, 1000);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  return (
    <div className="custom-cursor fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>
  );
};

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <AltitudeProgress />
      <Navbar />
      <main>
        <Hero />
        <Destinations />
        <FeaturesBox />
      </main>
      <Footer />
    </>
  );
}

export default App;
