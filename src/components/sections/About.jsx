import { motion } from 'framer-motion';
import Reveal from '../ui/Reveal.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';
import { skills, stats } from '../../data/profile.js';

export default function About() {
  return (
    <section className="relative border-t border-white/10 px-5 py-24" id="about">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <SectionHeading eyebrow="About Me">
            Backends built to scale, secure by default.
          </SectionHeading>
        </Reveal>
        <div className="grid gap-5">
          <Reveal className="rounded-lg border border-white/10 bg-white/[0.055] p-6 shadow-[0_0_70px_rgba(16,185,129,0.1)] backdrop-blur-xl" delay={0.08}>
            <p className="text-lg leading-9 text-slate-300">
              I&apos;m a backend-focused Node.js developer who designs scalable, secure, production-ready systems. Day to day that means high-performance REST and GraphQL APIs, JWT authentication with role-based authorization, well-modelled MongoDB and SQL schemas, and third-party integrations including payment gateways. I&apos;m comfortable across the full MERN stack, so I can carry a feature from database to React interface — and I care as much about query plans and error contracts as I do about how the UI feels.
            </p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map((stat, index) => (
              <Reveal className="rounded-lg border border-emerald-200/10 bg-emerald-200/[0.045] p-5 backdrop-blur-xl" delay={index * 0.08} key={stat.label}>
                <p className="text-3xl font-black text-emerald-100">{stat.value}</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">{stat.label}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="rounded-lg border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl" delay={0.15}>
            <div className="grid gap-5">
              {skills.map((skill) => (
                <div key={skill.label}>
                  <div className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-200">
                    <span>{skill.label}</span>
                    <span>{skill.value}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-300 via-teal-400 to-[#2F80ED] shadow-[0_0_24px_rgba(16,185,129,0.34)]"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
