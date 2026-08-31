import { motion } from 'framer-motion';
import Reveal from '../ui/Reveal.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';
import { services } from '../../data/profile.js';

export default function Services() {
  return (
    <section className="relative border-t border-white/10 px-5 py-24" id="services">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-12 max-w-3xl">
          <SectionHeading eyebrow="What I Do">
            Services built around the API layer.
          </SectionHeading>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <Reveal delay={index * 0.05} key={service.title}>
              <motion.article
                className="group relative min-h-56 overflow-hidden rounded-lg border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl"
                whileHover={{ y: -8, rotateX: 3, rotateY: index % 2 ? -3 : 3 }}
                transition={{ type: 'spring', stiffness: 170, damping: 18 }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(16,185,129,0.18),transparent_34%),radial-gradient(circle_at_80%_70%,rgba(47,128,237,0.2),transparent_36%)] opacity-50 transition group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-10 grid h-12 w-12 place-items-center rounded-md border border-emerald-200/20 bg-emerald-200/10 text-lg font-black text-emerald-100">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-2xl font-black">{service.title}</h3>
                  <p className="mt-4 leading-7 text-slate-400">{service.description}</p>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
