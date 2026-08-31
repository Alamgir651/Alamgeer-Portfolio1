import Reveal from '../ui/Reveal.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';
import { profile } from '../../data/profile.js';

function buildMailto({ name, email, projectType, message }) {
  const subject = encodeURIComponent(`Project inquiry${projectType ? `: ${projectType}` : ''}`);
  const bodyLines = [
    name && `Name: ${name}`,
    email && `Email: ${email}`,
    projectType && `Project type: ${projectType}`,
    '',
    message,
  ].filter(Boolean);
  const body = encodeURIComponent(bodyLines.join('\n'));

  return `mailto:${profile.email}?subject=${subject}&body=${body}`;
}

const contactChannels = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { label: 'Phone', value: profile.phone, href: profile.phoneHref },
  ...profile.socials.map((social) => ({
    label: social.label,
    value: social.href.replace(/^https?:\/\//, ''),
    href: social.href,
    external: true,
  })),
];

export default function Contact() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    window.location.href = buildMailto({
      name: form.get('name'),
      email: form.get('email'),
      projectType: form.get('projectType'),
      message: form.get('message'),
    });
  };

  return (
    <section className="relative border-t border-white/10 px-5 py-24" id="contact">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <SectionHeading eyebrow="Get In Touch">
            Let&apos;s build something that scales.
          </SectionHeading>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
            I&apos;m currently open to remote backend roles, API development projects, and SaaS work. Send a brief, a role description, or just say hello.
          </p>

          <div className="mt-8 grid gap-3 sm:max-w-md">
            {contactChannels.map((channel) => (
              <a
                className="group flex items-center justify-between gap-4 rounded-md border border-white/10 bg-white/[0.06] px-4 py-3.5 backdrop-blur-xl transition hover:border-emerald-200/50 hover:bg-white/[0.09]"
                href={channel.href}
                key={channel.label}
                rel={channel.external ? 'noopener noreferrer' : undefined}
                target={channel.external ? '_blank' : undefined}
              >
                <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-100">
                  {channel.label}
                </span>
                <span className="break-all text-right text-sm font-semibold text-slate-200 transition group-hover:text-emerald-50">
                  {channel.value}
                </span>
              </a>
            ))}
            <p className="rounded-md border border-white/5 bg-white/[0.03] px-4 py-3.5 text-sm text-slate-400">
              <span className="mr-3 text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                Based in
              </span>
              {profile.location}
            </p>
          </div>

          <div className="mt-5">
            <a
              className="inline-flex items-center gap-2 rounded-md border border-emerald-300/40 bg-emerald-300/10 px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-emerald-100 transition hover:border-emerald-200 hover:bg-emerald-300/20"
              download
              href={profile.resume}
              rel="noopener"
              target="_blank"
            >
              Download Résumé (PDF)
            </a>
          </div>
        </Reveal>
        <Reveal className="rounded-lg border border-white/10 bg-white/[0.06] p-5 shadow-[0_0_90px_rgba(16,185,129,0.12)] backdrop-blur-xl">
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <input className="rounded-md border border-white/10 bg-[#04131F]/70 px-4 py-4 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-200/60 focus:shadow-[0_0_30px_rgba(16,185,129,0.16)]" name="name" placeholder="Name" required type="text" />
              <input className="rounded-md border border-white/10 bg-[#04131F]/70 px-4 py-4 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-200/60 focus:shadow-[0_0_30px_rgba(16,185,129,0.16)]" name="email" placeholder="Email" required type="email" />
            </div>
            <input className="rounded-md border border-white/10 bg-[#04131F]/70 px-4 py-4 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-200/60 focus:shadow-[0_0_30px_rgba(16,185,129,0.16)]" name="projectType" placeholder="Project type" type="text" />
            <textarea className="min-h-40 resize-none rounded-md border border-white/10 bg-[#04131F]/70 px-4 py-4 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-200/60 focus:shadow-[0_0_30px_rgba(16,185,129,0.16)]" name="message" placeholder="Tell me about your idea" required />
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-slate-400">Opens your email app, addressed to me directly.</p>
              <button
                className="group relative inline-flex min-h-12 overflow-hidden rounded-md border border-emerald-300/60 bg-emerald-300 px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-[#04131F] shadow-[0_0_38px_rgba(16,185,129,0.32)] transition hover:bg-white"
                type="submit"
              >
                <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/45 to-transparent transition duration-700 group-hover:translate-x-[120%]" />
                <span className="relative z-10">Send Signal</span>
              </button>
            </div>
          </form>
        </Reveal>
      </div>
      <footer className="mx-auto mt-20 flex max-w-7xl flex-col gap-4 border-t border-white/10 pt-8 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-bold uppercase tracking-[0.2em] text-white">{profile.name}</p>
          <p className="mt-1.5 text-xs uppercase tracking-[0.18em] text-slate-500">{profile.role}</p>
        </div>
        <div className="flex flex-wrap items-center gap-5">
          {profile.socials.map((social) => (
            <a
              className="font-semibold transition hover:text-emerald-200"
              href={social.href}
              key={social.href}
              rel="noopener noreferrer"
              target="_blank"
            >
              {social.label}
            </a>
          ))}
          <a
            className="font-semibold transition hover:text-emerald-200"
            download
            href={profile.resume}
            rel="noopener"
            target="_blank"
          >
            Résumé
          </a>
          <span>© {new Date().getFullYear()} — Built with React, Tailwind &amp; Three.js.</span>
        </div>
      </footer>
    </section>
  );
}
