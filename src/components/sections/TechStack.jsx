import { motion } from 'framer-motion';
import Reveal from '../ui/Reveal.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';
import { technologies } from '../../data/profile.js';

const techStyles = {
  'Node.js': { short: 'Nd', color: '#10B981' },
  Express: { short: 'Ex', color: '#F8FAFC' },
  MongoDB: { short: 'Mg', color: '#22C55E' },
  MySQL: { short: 'My', color: '#2F80ED' },
  PostgreSQL: { short: 'Pg', color: '#7DD3FC' },
  GraphQL: { short: 'Gq', color: '#E535AB' },
  JWT: { short: 'Jw', color: '#F59E0B' },
  React: { short: 'Re', color: '#61DAFB' },
  JavaScript: { short: 'Js', color: '#FACC15' },
  Git: { short: 'Gt', color: '#F97316' },
};

export default function TechStack() {
  return (
    <section className="relative border-t border-white/10 px-5 py-24" id="stack">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <SectionHeading eyebrow="Tech Stack">
            The tools I reach for daily.
          </SectionHeading>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
            Node.js and Express at the core, wrapped in the databases, auth, and query layers that keep an API fast and safe in production — with React on the client when a feature needs to go end to end.
          </p>
        </Reveal>
        <Reveal className="relative mx-auto aspect-square w-full max-w-[620px]" data-cursor="hover">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.18),transparent_28%),radial-gradient(circle_at_58%_40%,rgba(47,128,237,0.18),transparent_36%)] blur-2xl" />
          <div className="absolute inset-10 rounded-full border border-emerald-200/20 bg-emerald-300/[0.025] shadow-[inset_0_0_90px_rgba(16,185,129,0.13),0_0_80px_rgba(47,128,237,0.09)]" />
          <div className="absolute inset-24 rounded-full border border-sky-200/20 shadow-[0_0_55px_rgba(47,128,237,0.16)]" />
          <motion.div
            className="absolute inset-[19%] rounded-full border border-dashed border-emerald-200/25"
            animate={{ rotate: -360 }}
            transition={{ duration: 44, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute left-1/2 top-1/2 h-[56%] w-[56%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_120deg,rgba(16,185,129,0.12),rgba(47,128,237,0.1),rgba(245,158,11,0.08),rgba(16,185,129,0.12))] opacity-80 blur-[1px]"
            animate={{ rotate: 360 }}
            transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
          >
            {technologies.map((tech, index) => {
              const angle = (index / technologies.length) * Math.PI * 2;
              const x = 50 + Math.cos(angle) * 39;
              const y = 50 + Math.sin(angle) * 39;
              const item = techStyles[tech] ?? { short: tech.slice(0, 2), color: '#7DD3FC' };

              return (
                <motion.div
                  className="group absolute -translate-x-1/2 -translate-y-1/2 rounded-xl border border-white/10 bg-[#061B29]/72 p-1.5 shadow-[0_18px_55px_rgba(0,0,0,0.28)] backdrop-blur-xl"
                  style={{ left: `${x}%`, top: `${y}%` }}
                  whileHover={{ scale: 1.16, zIndex: 10 }}
                  key={tech}
                >
                  <motion.div
                    className="grid h-20 w-20 place-items-center rounded-lg border text-center"
                    style={{
                      background: `radial-gradient(circle at 35% 25%, ${item.color}35, rgba(255,255,255,0.04) 42%, rgba(4,19,31,0.72))`,
                      borderColor: `${item.color}44`,
                      boxShadow: `0 0 32px ${item.color}24`,
                    }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
                  >
                    <span
                      className="text-xl font-black tracking-tight"
                      style={{ color: item.color, textShadow: `0 0 18px ${item.color}88` }}
                    >
                      {item.short}
                    </span>
                    <span className="-mt-5 text-[0.63rem] font-black uppercase tracking-[0.08em] text-slate-100">
                      {tech}
                    </span>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
          <div className="absolute left-1/2 top-1/2 grid h-44 w-44 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-emerald-200/25 bg-[#04131F]/72 text-center shadow-[0_0_110px_rgba(16,185,129,0.3)] backdrop-blur-xl">
            <div className="absolute inset-3 rounded-full bg-[conic-gradient(from_180deg,rgba(16,185,129,0.24),rgba(47,128,237,0.22),rgba(20,184,166,0.18),rgba(16,185,129,0.24))] opacity-80 blur-sm" />
            <div className="relative grid h-32 w-32 place-items-center rounded-full border border-white/10 bg-[radial-gradient(circle_at_35%_25%,rgba(16,185,129,0.28),rgba(4,19,31,0.88)_58%)]">
              <span className="text-sm font-black uppercase tracking-[0.24em] text-emerald-50 drop-shadow-[0_0_18px_rgba(16,185,129,0.8)]">
                Core
              </span>
              <span className="-mt-10 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-sky-100/80">
                Node.js
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
