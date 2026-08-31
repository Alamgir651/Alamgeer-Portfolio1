import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import CinematicScene from './components/three/CinematicScene.jsx';
import Header from './components/layout/Header.jsx';
import Hero from './components/sections/Hero.jsx';
import About from './components/sections/About.jsx';
import Experience from './components/sections/Experience.jsx';
import Projects from './components/sections/Projects.jsx';
import Services from './components/sections/Services.jsx';
import TechStack from './components/sections/TechStack.jsx';
import Contact from './components/sections/Contact.jsx';
import AnimatedCursor from './components/ui/AnimatedCursor.jsx';
import Loader from './components/ui/Loader.jsx';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
    });

    const update = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    lenis.on('scroll', ScrollTrigger.update);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#04131F] text-white">
      <Loader />
      <CinematicScene />
      <AnimatedCursor />
      <div className="pointer-events-none fixed inset-0 z-10 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:96px_96px] opacity-20" />
      <div className="pointer-events-none fixed inset-0 z-10 bg-[radial-gradient(circle_at_18%_10%,rgba(16,185,129,0.12),transparent_30%),radial-gradient(circle_at_82%_12%,rgba(47,128,237,0.11),transparent_32%),linear-gradient(180deg,rgba(4,19,31,0.08)_0%,rgba(4,19,31,0.76)_58%,#04131F_100%)]" />
      <Header />
      <main className="relative z-20">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Services />
        <TechStack />
        <Contact />
      </main>
    </div>
  );
}
