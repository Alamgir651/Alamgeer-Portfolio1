import { motion } from 'framer-motion';
import Reveal from '../ui/Reveal.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';
import { education, experience } from '../../data/profile.js';

export default function Experience() {
  return (
    <section className="relative border-t border-white/10 px-5 py-24" id="experience">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-14 max-w-3xl">
          <SectionHeading eyebrow="Career Timeline">
            Two years of shipping backends that stay up.
          </SectionHeading>
        </Reveal>

        <div className="relative pl-6 sm:pl-10">
          <div className="absolute bottom-2 left-0 top-2 w-px bg-gradient-to-b from-emerald-300/70 via-[#2F80ED]/40 to-transparent" />

          <div className="grid gap-6">
            {experience.map((job, index) => (
              <Reveal delay={index * 0.06} key={`${job.company}-${job.period}`}>
                <motion.article
                  className="group relative rounded-lg border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl transition duration-300 hover:border-emerald-200/30 hover:bg-white/[0.07]"
                  whileHover={{ x: 6 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                >
                  <span
                    className={`absolute -left-6 top-8 grid h-3 w-3 place-items-center rounded-full sm:-left-10 ${
                      job.current
                        ? 'bg-emerald-300 shadow-[0_0_22px_rgba(16,185,129,0.85)]'
                        : 'bg-slate-500 shadow-[0_0_12px_rgba(148,163,184,0.4)]'
                    }`}
                  >
                    {job.current ? (
                      <span className="absolute h-3 w-3 animate-ping rounded-full bg-emerald-300/70" />
                    ) : null}
                  </span>

                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                    <div>
                      <h3 className="text-2xl font-black text-white">{job.role}</h3>
                      <p className="mt-1 text-sm font-bold uppercase tracking-[0.16em] text-emerald-100">
                        {job.company}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-slate-300">{job.period}</p>
                      <p className="mt-1 text-xs text-slate-500">{job.location}</p>
                    </div>
                  </div>

                  <ul className="mt-5 grid gap-2.5">
                    {job.points.map((point) => (
                      <li className="flex gap-3 text-sm leading-6 text-slate-300" key={point}>
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300/70" />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {job.stack.map((item) => (
                      <span
                        className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1 text-xs font-semibold text-slate-200"
                        key={item}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-4">
          {education.map((item) => (
            <Reveal
              className="rounded-lg border border-sky-200/15 bg-sky-200/[0.04] p-6 backdrop-blur-xl"
              key={item.degree}
            >
              <p className="text-xs font-black uppercase tracking-[0.22em] text-sky-100">Education</p>
              <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                <h3 className="text-xl font-black text-white">{item.degree}</h3>
                <p className="text-sm font-semibold text-slate-300">{item.period}</p>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-400">{item.school}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
