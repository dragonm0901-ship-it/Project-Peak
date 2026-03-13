import React, { useEffect, useRef } from 'react';
import { useSettings } from '../context/SettingsContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const { t } = useSettings();
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // 1. GSAP Scroll Animation
    let ctx = gsap.context(() => {
      // Fade in text
      gsap.fromTo(
        textRef.current.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, stagger: 0.2, ease: 'power3.out', delay: 0.5 }
      );

      // Pin and scale background
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        animation: gsap.to(canvasRef.current, {
          scale: 1.15,
          opacity: 0.5,
          ease: 'none'
        })
      });
    }, heroRef);

    // 2. Three.js Distortion Effect
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    const setSize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    setSize();
    window.addEventListener('resize', setSize);

    // Texture loading
    const textureLoader = new THREE.TextureLoader();
    // Using a stunning hero image of the Himalayas
    const imageTexture = textureLoader.load('https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2000&auto=format&fit=crop');

    // Shader Material for distortion
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uTexture: { value: imageTexture },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uHover: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform sampler2D uTexture;
        uniform vec2 uMouse;
        uniform float uHover;
        varying vec2 vUv;

        void main() {
          vec2 uv = vUv;
          
          // Distortion based on mouse
          float dist = distance(uv, uMouse);
          float intensity = smoothstep(0.4, 0.0, dist) * uHover * 0.05;
          
          // Wave effect
          uv.x += sin(uv.y * 10.0 + uTime) * intensity;
          uv.y += cos(uv.x * 10.0 + uTime) * intensity;
          
          vec4 color = texture2D(uTexture, uv);
          
          // Subtle color grade for cinematic feel
          color.rgb = mix(color.rgb, vec3(color.r * 0.9, color.g * 0.95, color.b * 1.1), 0.3);
          
          gl_FragColor = color;
        }
      `
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Mouse tracking
    let targetMouse = new THREE.Vector2(0.5, 0.5);
    let currentMouse = new THREE.Vector2(0.5, 0.5);
    let targetHover = 0;
    
    const onMouseMove = (e) => {
      targetMouse.x = e.clientX / window.innerWidth;
      targetMouse.y = 1.0 - (e.clientY / window.innerHeight); // WebGL Y is inverted
      targetHover = 1;
    };
    const onMouseLeave = () => {
      targetHover = 0;
    };

    window.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('mouseleave', onMouseLeave);

    // Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const render = () => {
      const time = clock.getElapsedTime();
      
      // Smooth interpolation
      currentMouse.lerp(targetMouse, 0.05);
      material.uniforms.uHover.value += (targetHover - material.uniforms.uHover.value) * 0.05;
      
      material.uniforms.uTime.value = time;
      material.uniforms.uMouse.value.copy(currentMouse);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      ctx.revert();
      window.removeEventListener('resize', setSize);
      window.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animationFrameId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section ref={heroRef} className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Three.js Canvas Background */}
      <div className="absolute inset-0 z-0">
        <canvas ref={canvasRef} className="w-full h-full object-cover"></canvas>
        <div className="absolute inset-0 bg-gradient-to-t from-peakDeep via-transparent to-peakDeep/40 opacity-80 dark:opacity-100 mix-blend-multiply"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-32 text-center flex flex-col items-center">
        <div ref={textRef} className="flex flex-col items-center">
          <h1 className="text-peakWhite/90 font-sans font-medium text-xl md:text-3xl tracking-[0.2em] uppercase mb-4">
            {t('hero.title')}
          </h1>
          <h1 className="text-peakWhite font-display font-bold text-7xl md:text-[9rem] tracking-tight leading-none mb-8 drop-shadow-2xl">
            {t('hero.subtitle')}
          </h1>
          <p className="text-peakWhite/80 font-sans text-sm md:text-lg max-w-xl mx-auto tracking-wide mb-12">
            {t('hero.desc')}
          </p>
          <button className="magnetic-btn group bg-white text-peakDeep px-8 py-4 rounded-full font-sans uppercase tracking-widest font-bold text-sm flex items-center gap-3 hover-lift shadow-[0_10px_40px_-10px_rgba(255,255,255,0.3)]">
            <span className="relative z-10">{t('hero.book')}</span>
            <span className="relative z-10 block w-2 h-2 rounded-full bg-peakGreen group-hover:scale-150 transition-transform"></span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
