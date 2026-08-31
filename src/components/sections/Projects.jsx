import MagneticButton from '../ui/MagneticButton.jsx';
import Reveal from '../ui/Reveal.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';
import TiltCard from '../ui/TiltCard.jsx';
import ProjectPreview from '../three/ProjectPreview.jsx';
import { projects } from '../../data/profile.js';

export default function Projects() {
  return (
    <section className="relative border-t border-white/10 px-5 py-24" id="projects">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-12 max-w-3xl">
          <SectionHeading eyebrow="Selected Work">
            Systems I&apos;ve designed, built, and tuned.
          </SectionHeading>
        </Reveal>
        <div className="grid gap-6 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal delay={index * 0.08} key={project.title}>
              <TiltCard className="group relative min-h-[520px] overflow-hidden rounded-lg border border-white/10 bg-white/[0.055] p-4 shadow-[0_24px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl">
                <div
                  className="absolute inset-0 opacity-0 blur-3xl transition duration-500 group-hover:opacity-100"
                  style={{ background: `radial-gradient(circle at 50% 30%, ${project.accent}2e, transparent 60%)` }}
                />
                <div className="relative z-10 flex h-full min-h-[488px] flex-col">
                  <div
                    className="relative h-56 overflow-hidden rounded-md border border-white/10 bg-[#061B29]"
                    style={{ boxShadow: `inset 0 0 60px ${project.accent}22` }}
                  >
                    <ProjectPreview color={project.accent} shape={project.shape} />
                  </div>
                  <p className="mt-6 text-xs font-bold uppercase tracking-[0.22em] text-emerald-100">{project.category}</p>
                  <h3 className="mt-3 text-3xl font-black text-white">{project.title}</h3>
                  <p className="mt-4 flex-1 leading-7 text-slate-300">{project.description}</p>
                  <div className="mb-6 mt-5 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold text-slate-100" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <MagneticButton href="#contact">Discuss This Build</MagneticButton>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
