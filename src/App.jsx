import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// Custom Trekking Logo (Mountain & Compass style)
const Logo = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Mountains */}
    <path
      d="M10 80 L35 30 L55 60 L70 40 L90 80 Z"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinejoin="round"
    />
    <path
      d="M35 30 L45 50 M70 40 L75 55"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Sun/Compass */}
    <circle cx="50" cy="25" r="8" stroke="currentColor" strokeWidth="2" />
    <path d="M50 12 V15 M50 35 V38 M37 25 H40 M60 25 H63" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const Preloader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: onComplete
      });

      tl.to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out"
      })
      .to(textRef.current, {
        opacity: 0,
        y: -20,
        duration: 1,
        delay: 0.5,
        ease: "power3.in"
      })
      .to(bgRef.current, {
        height: 0,
        duration: 1.2,
        ease: "power4.inOut"
      }, "-=0.2");
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
      <div ref={bgRef} className="absolute inset-0 bg-deepVoid w-full h-full transform origin-top"></div>
      <div
        ref={textRef}
        className="relative z-10 flex flex-col items-center justify-center opacity-0 translate-y-10"
      >
        <Logo className="w-20 h-20 text-ghost mb-4" />
        <div className="font-drama text-ghost text-4xl md:text-6xl tracking-widest uppercase">
          We Travel Nepal
        </div>
      </div>
    </div>
  );
};

const CustomCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;

    const onMouseMove = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.8,
        ease: "power3.out"
      });
    };

    const handleHoverStart = () => {
       gsap.to(cursor, { scale: 3, opacity: 0.5, duration: 0.3, ease: "power2.out" });
    };

    const handleHoverEnd = () => {
       gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" });
    };

    window.addEventListener('mousemove', onMouseMove);

    const interactiveElements = document.querySelectorAll('a, button, .hover-target');
    interactiveElements.forEach(el => {
       el.addEventListener('mouseenter', handleHoverStart);
       el.addEventListener('mouseleave', handleHoverEnd);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      interactiveElements.forEach(el => {
         el.removeEventListener('mouseenter', handleHoverStart);
         el.removeEventListener('mouseleave', handleHoverEnd);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-4 h-4 rounded-full bg-plasma pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block"
    />
  );
};

const GlobalInteractions = () => {
  useEffect(() => {
    const handleMagneticMove = (e) => {
      const btn = e.target.closest('.magnetic-btn');
      if (!btn) return;

      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(btn, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.4,
        ease: "power2.out",
      });

      const text = btn.querySelector('span');
      if(text) {
         gsap.to(text, {
            x: x * 0.1,
            y: y * 0.1,
            duration: 0.4,
            ease: "power2.out"
         });
      }
    };

    const handleMagneticLeave = (e) => {
      const btn = e.target.closest('.magnetic-btn');
      if (!btn) return;

      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.3)",
      });

      const text = btn.querySelector('span');
      if(text) {
         gsap.to(text, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: "elastic.out(1, 0.3)"
         });
      }
    };

    document.body.addEventListener('mousemove', handleMagneticMove);
    document.body.addEventListener('mouseout', handleMagneticLeave);

    return () => {
      document.body.removeEventListener('mousemove', handleMagneticMove);
      document.body.removeEventListener('mouseout', handleMagneticLeave);
    };
  }, []);

  return null;
}

const Navbar = () => {
  const navRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -80',
        end: 99999,
        toggleClass: {className: 'bg-ghost/80 backdrop-blur-md shadow-sm', targets: navRef.current}
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <nav ref={navRef} className="fixed top-0 w-full z-50 transition-all duration-300 px-8 py-6 flex justify-between items-center text-graphite mix-blend-difference hover:mix-blend-normal">
      <div className="font-drama text-2xl tracking-widest uppercase flex items-center gap-3">
        <Logo className="w-8 h-8 text-plasma" />
        <span className="text-white">We Travel Nepal</span>
      </div>
      <div className="hidden md:flex gap-12 font-sans text-xs uppercase tracking-[0.2em] font-medium text-white">
        <a href="#destinations" className="hover:text-plasma transition-colors">Destinations</a>
        <a href="#philosophy" className="hover:text-plasma transition-colors">Philosophy</a>
        <a href="#journey" className="hover:text-plasma transition-colors">The Journey</a>
      </div>
      <button className="magnetic-btn bg-plasma text-deepVoid px-6 py-3 rounded-full font-sans uppercase tracking-widest font-semibold text-xs flex items-center gap-2 hover-target shadow-lg">
        <span className="relative z-10">Book Trek</span>
      </button>
    </nav>
  );
};

// A helper for kinetic typography
const SplitText = ({ children, className }) => {
  const textRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
       const words = textRef.current.innerText.split(' ');
       textRef.current.innerHTML = '';

       words.forEach((word) => {
         const wordSpan = document.createElement('span');
         wordSpan.style.display = 'inline-block';
         wordSpan.style.overflow = 'hidden';
         wordSpan.style.paddingRight = '0.2em';

         const innerSpan = document.createElement('span');
         innerSpan.style.display = 'inline-block';
         innerSpan.innerText = word;
         innerSpan.className = 'word-inner translate-y-full';

         wordSpan.appendChild(innerSpan);
         textRef.current.appendChild(wordSpan);
       });

       gsap.to(textRef.current.querySelectorAll('.word-inner'), {
         y: 0,
         duration: 1.2,
         stagger: 0.05,
         ease: "power4.out",
         scrollTrigger: {
           trigger: textRef.current,
           start: "top 80%",
         }
       });
    }, textRef);
    return () => ctx.revert();
  }, [children]);

  return <span ref={textRef} className={className}>{children}</span>;
};

const Hero = ({ isReady }) => {
  const heroRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    if (!isReady) return;

    let ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.to(imageRef.current, {
        scale: 1,
        filter: 'blur(0px)',
        duration: 2,
        ease: 'power3.out'
      })
      .fromTo('.hero-text span',
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: 'power4.out' },
        "-=1.5"
      )
      .fromTo('.hero-sub',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        "-=0.8"
      );

      // Parallax effect
      gsap.to(imageRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }, heroRef);

    return () => ctx.revert();
  }, [isReady]);

  return (
    <header ref={heroRef} className="relative h-[100dvh] w-full overflow-hidden bg-deepVoid flex items-center justify-center">
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-[120%] -top-[10%] bg-[url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center scale-110 blur-sm brightness-75"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-deepVoid/60 via-transparent to-deepVoid/90" />

      <div className="relative z-10 flex flex-col items-center justify-center w-full px-8 text-center pt-24">
        <h1 className="hero-text font-drama text-6xl md:text-[8rem] leading-[0.9] text-ghost mb-8 uppercase tracking-widest overflow-hidden flex flex-col items-center">
          <span className="block mb-2">Conquer</span>
          <span className="block text-plasma">The Peaks</span>
        </h1>
        <p className="hero-sub font-sans font-light text-ghost/80 max-w-xl text-sm md:text-base leading-relaxed uppercase tracking-[0.2em]">
          Experience the majestic Himalayas. Curated trekking and expedition journeys for the modern adventurer.
        </p>
      </div>
    </header>
  );
};

const Features = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.feature-item');

      items.forEach((item) => {
        gsap.fromTo(item,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            }
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const treks = [
    {
      title: "Everest Base Camp",
      desc: "Stand at the foot of the world's highest peak. A legendary trail through Sherpa villages and ancient monasteries.",
      img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop"
    },
    {
      title: "Annapurna Circuit",
      desc: "Traverse diverse landscapes from subtropical jungles to high alpine passes. The ultimate trekking experience.",
      img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop"
    },
    {
      title: "Langtang Valley",
      desc: "The valley of glaciers. A deeply cultural and spiritually enriching journey close to the Tibetan border.",
      img: "https://images.unsplash.com/photo-1526080676457-4544cb095810?q=80&w=1200&auto=format&fit=crop"
    }
  ];

  return (
    <section id="destinations" ref={sectionRef} className="py-32 px-8 md:px-16 bg-ghost w-full">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-graphite/10 pb-8">
          <h2 className="font-drama text-5xl md:text-6xl text-graphite max-w-2xl uppercase tracking-widest">
            <SplitText>Legendary Trails.</SplitText>
          </h2>
          <p className="font-sans text-sm text-graphite/60 max-w-sm mt-8 md:mt-0 uppercase tracking-widest leading-relaxed">
             Meticulously planned itineraries ensuring safety, comfort, and an authentic Himalayan experience.
          </p>
        </div>

        <div className="flex flex-col gap-16 md:gap-32">
          {treks.map((trek, i) => (
            <div key={i} className="feature-item group flex flex-col md:flex-row gap-8 md:gap-16 items-center">
              <div className="flex-1 overflow-hidden rounded-lg aspect-[4/3] w-full">
                 <img
                   src={trek.img}
                   alt={trek.title}
                   className="w-full h-full object-cover transform transition-transform duration-[2s] group-hover:scale-110 filter saturate-50 group-hover:saturate-100"
                 />
              </div>
              <div className="flex-1 space-y-6">
                 <span className="text-plasma font-sans text-xs uppercase tracking-[0.3em] font-semibold">Trek 0{i+1}</span>
                 <h3 className="font-drama text-4xl text-graphite uppercase tracking-wider">{trek.title}</h3>
                 <p className="font-sans text-graphite/70 leading-relaxed font-light">{trek.desc}</p>
                 <button className="magnetic-btn border border-graphite/20 px-8 py-3 rounded-full font-sans text-xs uppercase tracking-widest hover:bg-graphite hover:text-ghost transition-colors duration-300">
                    <span className="block">Explore Itinerary</span>
                 </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Philosophy = () => {
  return (
    <section id="philosophy" className="py-40 px-8 md:px-16 bg-graphite text-ghost w-full relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
         <Logo className="w-full h-full scale-150 text-plasma translate-x-1/4 -translate-y-1/4" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <h2 className="font-sans text-plasma text-xs uppercase tracking-[0.3em] font-semibold mb-8">Our Philosophy</h2>
        <p className="font-drama text-4xl md:text-6xl leading-[1.2] tracking-wide mb-16 uppercase">
          <SplitText>We believe in travel that transforms.</SplitText>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
          <p className="font-sans font-light text-ghost/70 leading-relaxed md:text-lg">
            Every step in the Himalayas should be profound. We go beyond standard tourism, fostering a deep connection between our trekkers and the majestic landscapes, the resilient Sherpa culture, and the sacred peaks.
          </p>
          <p className="font-sans font-light text-ghost/70 leading-relaxed md:text-lg">
            Safety, sustainability, and absolute respect for the mountains are our core pillars. Our expert guides ensure that your journey is not just an expedition, but a pilgrimage of the soul.
          </p>
        </div>
      </div>
    </section>
  );
};

const Journey = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.journey-card');
      
      cards.forEach((card, i) => {
        if (i < cards.length - 1) {
          ScrollTrigger.create({
            trigger: card,
            start: "top top",
            endTrigger: ".journey-container",
            end: "bottom bottom",
            pin: true,
            pinSpacing: false,
            animation: gsap.to(card, {
              scale: 0.9,
              opacity: 0.5,
              filter: "blur(10px)",
              ease: "none"
            }),
            scrub: true,
          });
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="journey" ref={containerRef} className="journey-container relative w-full bg-ghost">
      
      {/* Card 1 */}
      <div className="journey-card h-[100dvh] w-full flex items-center justify-center sticky top-0 bg-ghost px-8 md:px-16 border-b border-graphite/5">
        <div className="w-full max-w-5xl flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 w-full h-[30rem] relative flex items-center justify-center overflow-hidden rounded-2xl shadow-2xl">
            <img src="https://images.unsplash.com/photo-1582294970634-92762283bf3b?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover filter brightness-90 hover:scale-105 transition-transform duration-[1.5s]" alt="Kathmandu Arrival" />
          </div>
          <div className="flex-1">
            <span className="font-sans text-plasma text-xs uppercase tracking-[0.3em] font-bold mb-4 block">Day 01 - 03</span>
            <h2 className="font-drama text-4xl md:text-5xl text-graphite mb-6 uppercase tracking-wider">Arrival & Culture</h2>
            <p className="font-sans font-light text-graphite/70 leading-relaxed text-sm md:text-base">
              Touch down in the vibrant valley of Kathmandu. Explore ancient durbar squares, sacred stupas, and prepare your gear for the ascent.
            </p>
          </div>
        </div>
      </div>

      {/* Card 2 */}
      <div className="journey-card h-[100dvh] w-full flex items-center justify-center sticky top-0 bg-ghost px-8 md:px-16 border-b border-graphite/5">
        <div className="w-full max-w-5xl flex flex-col md:flex-row-reverse items-center gap-16">
          <div className="flex-1 w-full h-[30rem] relative flex items-center justify-center overflow-hidden rounded-2xl shadow-2xl">
             <img src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover filter brightness-90 hover:scale-105 transition-transform duration-[1.5s]" alt="The Ascent" />
          </div>
          <div className="flex-1 text-left md:text-right">
            <span className="font-sans text-plasma text-xs uppercase tracking-[0.3em] font-bold mb-4 block">Day 04 - 10</span>
            <h2 className="font-drama text-4xl md:text-5xl text-graphite mb-6 uppercase tracking-wider">The Ascent</h2>
            <p className="font-sans font-light text-graphite/70 leading-relaxed text-sm md:text-base">
              Step by step into the thin air. Trek through rhododendron forests, cross suspension bridges, and acclimatize in traditional tea houses.
            </p>
          </div>
        </div>
      </div>

      {/* Card 3 */}
      <div className="journey-card h-[100dvh] w-full flex items-center justify-center sticky top-0 bg-ghost px-8 md:px-16">
        <div className="w-full max-w-5xl flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 w-full h-[30rem] relative flex items-center justify-center overflow-hidden rounded-2xl shadow-2xl">
             <img src="https://images.unsplash.com/photo-1522163182402-834f871fd851?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover filter brightness-90 hover:scale-105 transition-transform duration-[1.5s]" alt="The Summit" />
          </div>
          <div className="flex-1">
            <span className="font-sans text-plasma text-xs uppercase tracking-[0.3em] font-bold mb-4 block">Day 11 - 15</span>
            <h2 className="font-drama text-4xl md:text-5xl text-graphite mb-6 uppercase tracking-wider">The Apex</h2>
            <p className="font-sans font-light text-graphite/70 leading-relaxed text-sm md:text-base">
              Reach the base camps and high passes. Witness the sun rising over the roof of the world. A moment of absolute triumph and stillness.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section id="cta" className="py-48 px-8 md:px-16 w-full flex flex-col items-center justify-center bg-deepVoid text-ghost relative z-10 overflow-hidden">
      <div className="absolute inset-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
      <div className="max-w-3xl text-center flex flex-col items-center relative z-20">
        <h2 className="font-drama text-5xl md:text-7xl mb-6 tracking-widest uppercase text-white">Begin Your Journey.</h2>
        <p className="font-sans font-light text-ghost/60 text-sm md:text-base mb-12 max-w-xl uppercase tracking-widest leading-relaxed">
          Contact our expedition experts to tailor your ultimate Himalayan adventure.
        </p>
        <button className="magnetic-btn bg-plasma text-deepVoid px-10 py-5 rounded-full font-sans uppercase tracking-[0.2em] font-bold text-sm flex items-center gap-3 hover-lift shadow-[0_10px_40px_-10px_#E17055]">
          <span className="relative z-10">Plan Your Trek</span>
          <svg className="relative z-10 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
        </button>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="w-full bg-graphite text-ghost px-8 md:px-16 pt-24 pb-12 relative z-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-16 mb-24">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
             <Logo className="w-10 h-10 text-plasma" />
             <h2 className="font-drama text-3xl tracking-widest uppercase">We Travel Nepal</h2>
          </div>
          <p className="font-sans font-light text-sm text-ghost/60 max-w-xs leading-relaxed uppercase tracking-wider">
            Premium trekking expeditions in the heart of the Himalayas.
          </p>
        </div>
        <div className="flex gap-16 font-sans text-sm tracking-widest uppercase">
          <div className="flex flex-col gap-4">
             <span className="text-plasma mb-2 font-semibold tracking-[0.3em]">Explore</span>
             <a href="#destinations" className="text-ghost/70 hover:text-plasma transition-colors">Destinations</a>
             <a href="#philosophy" className="text-ghost/70 hover:text-plasma transition-colors">Philosophy</a>
             <a href="#journey" className="text-ghost/70 hover:text-plasma transition-colors">The Journey</a>
          </div>
          <div className="flex flex-col gap-4">
             <span className="text-plasma mb-2 font-semibold tracking-[0.3em]">Agency</span>
             <a href="#" className="text-ghost/70 hover:text-plasma transition-colors">About Us</a>
             <a href="#" className="text-ghost/70 hover:text-plasma transition-colors">Contact</a>
             <a href="#" className="text-ghost/70 hover:text-plasma transition-colors">Terms</a>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-ghost/10 gap-4">
        <div className="font-sans font-light text-xs text-ghost/40 tracking-wider">© {new Date().getFullYear()} We Travel Nepal. All rights reserved.</div>
      </div>
    </footer>
  );
};

function App() {
  const lineRef = useRef(null);
  const [preloaderDone, setPreloaderDone] = useState(false);

  useEffect(() => {
    const lenis = new Lenis();

    if (!preloaderDone) {
      lenis.stop();
    } else {
      lenis.start();
    }

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(raf);
    };
  }, [preloaderDone]);

  useEffect(() => {
    if (!preloaderDone) return;

    let ctx = gsap.context(() => {
      const path = lineRef.current;
      if(path) {
         const length = path.getTotalLength();
         gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

         gsap.to(path, {
           strokeDashoffset: 0,
           ease: "none",
           scrollTrigger: {
             trigger: "body",
             start: "top top",
             end: "bottom bottom",
             scrub: 1
           }
         });
      }
    });
    return () => ctx.revert();
  }, [preloaderDone]);

  return (
    <>
      <GlobalInteractions />
      {!preloaderDone && <Preloader onComplete={() => setPreloaderDone(true)} />}
      <CustomCursor />

      {/* Scroll Tracking Path - Redesigned as a Trail Map Line */}
      <div
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-[5] opacity-40 mix-blend-difference hidden md:block"
        style={{ opacity: preloaderDone ? 0.4 : 0, transition: 'opacity 1s ease-in-out' }}
      >
         <svg viewBox="0 0 100 1000" preserveAspectRatio="none" className="w-full h-[300vh] absolute top-0 left-0">
           <path
             ref={lineRef}
             d="M 50 0 Q 30 100 50 200 T 80 400 T 20 600 T 50 800 T 50 1000"
             stroke="#E17055"
             strokeWidth="0.8"
             fill="none"
             strokeDasharray="4 4"
             vectorEffect="non-scaling-stroke"
           />
         </svg>
      </div>

      <div style={{ opacity: preloaderDone ? 1 : 0, transition: 'opacity 0.8s ease-in-out' }}>
        <Navbar />
        <main>
          <Hero isReady={preloaderDone} />
          <Features />
          <Philosophy />
          <Journey />
          <CTA />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;