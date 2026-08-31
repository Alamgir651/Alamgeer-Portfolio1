import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import MagneticButton from '../ui/MagneticButton.jsx';
import TypewriterText from '../ui/TypewriterText.jsx';
import { profile } from '../../data/profile.js';
import profileVisual from '../../assets/WhatsApp Image 2026-06-10 at 4.16.21 PM.jpeg';

const nameText = 'ALAMGEERKHAN';

const getWaterMotion = (index) => {
  const direction = index % 2 === 0 ? 1 : -1;

  return {
    x: [0, direction * 8, direction * -5, direction * 3, 0],
    y: [0, -14 - (index % 3) * 5, 8, -4, 0],
    rotate: [0, direction * 7, direction * -5, direction * 3, 0],
    scaleY: [1, 0.82, 1.18, 0.94, 1],
    filter: ['blur(0px)', 'blur(1.5px)', 'blur(0px)'],
    textShadow: [
      '0 0 0 rgba(16,185,129,0)',
      '0 0 28px rgba(45,212,191,0.8)',
      '0 0 18px rgba(47,128,237,0.6)',
      '0 0 0 rgba(16,185,129,0)',
    ],
    transition: {
      delay: index * 0.022,
      duration: 1.15,
      ease: [0.22, 1, 0.36, 1],
      repeat: Infinity,
      repeatDelay: 0.08,
    },
  };
};

const getWriteMotion = (isVisible) => ({
  opacity: isVisible ? 1 : 0,
  y: isVisible ? 0 : 36,
  filter: isVisible ? 'blur(0px)' : 'blur(10px)',
  transition: {
    duration: 0.36,
    ease: [0.22, 1, 0.36, 1],
  },
});

function WaterWord({ text, gradient = false, offset = 0, visibleCount, isHovering }) {
  return (
    <span className="inline-flex whitespace-nowrap">
      {text.split('').map((letter, index) => {
        const globalIndex = offset + index;
        const isVisible = visibleCount > globalIndex;

        return (
          <motion.span
            animate={isHovering && isVisible ? getWaterMotion(globalIndex) : getWriteMotion(isVisible)}
            className={`inline-block origin-bottom will-change-transform ${
              gradient
                ? 'bg-gradient-to-r from-emerald-200 via-teal-300 to-[#2F80ED] bg-clip-text text-transparent drop-shadow-[0_0_28px_rgba(16,185,129,0.24)]'
                : 'text-white'
            }`}
            key={`${text}-${letter}-${index}`}
          >
            {letter}
          </motion.span>
        );
      })}
    </span>
  );
}

export default function Hero() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [isHeadingHovering, setIsHeadingHovering] = useState(false);

  useEffect(() => {
    let intervalId;
    setVisibleCount(0);

    const timeoutId = window.setTimeout(() => {
      let nextCount = 0;
      intervalId = window.setInterval(() => {
        nextCount += 1;
        setVisibleCount(nextCount);

        if (nextCount >= nameText.length) {
          window.clearInterval(intervalId);
        }
      }, 90);
    }, 420);

    return () => {
      window.clearTimeout(timeoutId);
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden px-5 pb-14 pt-28">
      <div className="absolute left-6 top-28 h-48 w-48 rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="absolute bottom-24 right-12 h-64 w-64 rounded-full bg-[#2F80ED]/10 blur-3xl" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[0.96fr_0.78fr]">
        <div className="relative z-10">
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 inline-flex rounded-full border border-emerald-200/15 bg-emerald-200/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-emerald-100 backdrop-blur-xl"
            initial={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.7 }}
          >
            {profile.role}
          </motion.p>

          <motion.h1
            aria-label="Alamgeer Khan"
            className="hero-heading-font group relative max-w-4xl text-[clamp(2.25rem,5vw,4.45rem)] font-black leading-[0.94] text-white"
            data-cursor="hover"
            onHoverEnd={() => setIsHeadingHovering(false)}
            onHoverStart={() => setIsHeadingHovering(true)}
          >
            <span className="pointer-events-none absolute -inset-x-3 inset-y-2 rounded-[2rem] bg-[radial-gradient(circle_at_35%_45%,rgba(16,185,129,0.2),transparent_34%),radial-gradient(circle_at_70%_55%,rgba(47,128,237,0.16),transparent_32%)] opacity-0 blur-2xl transition duration-500 group-hover:opacity-100" />
            <span className="relative block overflow-visible" aria-hidden="true">
              <WaterWord text="ALAMGEER" visibleCount={visibleCount} isHovering={isHeadingHovering} />
            </span>
            <span className="relative block overflow-visible" aria-hidden="true">
              <WaterWord
                text="KHAN"
                gradient
                offset={8}
                visibleCount={visibleCount}
                isHovering={isHeadingHovering}
              />
            </span>
          </motion.h1>

          <motion.p
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg"
            initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
            transition={{ duration: 0.8, delay: 0.45 }}
          >
            <TypewriterText text={profile.tagline} />
          </motion.p>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 flex flex-wrap gap-2.5"
            initial={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.7, delay: 0.56 }}
          >
            {['Node.js', 'Express', 'MongoDB', 'REST & GraphQL', 'JWT Auth'].map((item) => (
              <span
                className="rounded-full border border-white/10 bg-white/[0.055] px-3.5 py-1.5 text-sm font-semibold text-slate-200 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-emerald-200/40 hover:bg-emerald-200/10 hover:text-emerald-50 hover:shadow-[0_12px_34px_rgba(16,185,129,0.14)]"
                data-cursor="hover"
                key={item}
              >
                {item}
              </span>
            ))}
          </motion.div>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mt-7 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.7, delay: 0.68 }}
          >
            <MagneticButton href="#projects">Explore Work</MagneticButton>
            <MagneticButton
              download
              href={profile.resume}
              rel="noopener"
              target="_blank"
              variant="secondary"
            >
              Download Résumé
            </MagneticButton>
            <MagneticButton href="#contact" variant="secondary">
              Start a Project
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          className="relative mx-auto w-full max-w-[460px]"
          data-cursor="hover"
          initial={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 1.1, delay: 0.25 }}
          whileHover={{ y: -8, rotateX: 2, rotateY: -2 }}
        >
          <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-emerald-300/18 via-teal-300/8 to-[#2F80ED]/18 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.065] p-3 shadow-[0_34px_120px_rgba(0,0,0,0.34)] backdrop-blur-xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_15%,rgba(16,185,129,0.24),transparent_34%),radial-gradient(circle_at_80%_75%,rgba(47,128,237,0.2),transparent_36%)]" />
            <div className="relative overflow-hidden rounded-[1.45rem] border border-white/10 bg-[#061B29]">
              <img
                alt="Alamgeer Khan"
                className="h-[360px] w-full object-cover object-top sm:h-[440px]"
                src={profileVisual}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#04131F]/82 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-white/10 bg-[#04131F]/70 p-4 backdrop-blur-xl">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-emerald-100">
                  {profile.availability}
                </p>
                <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
                  <p className="text-xl font-black text-white">Node.js / MERN Developer</p>
                  <span className="rounded-full bg-emerald-300 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[#04131F]">
                    Open
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -left-4 top-7 hidden rounded-lg border border-emerald-200/20 bg-[#04131F]/72 px-4 py-3 shadow-[0_20px_70px_rgba(16,185,129,0.16)] backdrop-blur-xl sm:block">
            <p className="text-xs uppercase tracking-[0.22em] text-emerald-100">Backend</p>
            <p className="mt-1.5 text-lg font-black">Node APIs</p>
          </div>
          <div className="absolute -right-4 top-1/2 hidden rounded-lg border border-sky-200/20 bg-[#04131F]/72 px-4 py-3 shadow-[0_20px_70px_rgba(47,128,237,0.16)] backdrop-blur-xl sm:block">
            <p className="text-xs uppercase tracking-[0.22em] text-sky-100">Databases</p>
            <p className="mt-1.5 text-lg font-black">Mongo · SQL</p>
          </div>
        </motion.div>
      </div>

      <motion.a
        animate={{ y: [0, 12, 0] }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-emerald-100 md:flex"
        href="#about"
        transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
      >
        Scroll
        <span className="h-12 w-px bg-gradient-to-b from-emerald-200 to-transparent" />
      </motion.a>
    </section>
  );
}
