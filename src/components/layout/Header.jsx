import { profile } from '../../data/profile.js';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Stack', href: '#stack' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 py-4">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-lg border border-white/10 bg-[#04131F]/55 px-4 py-3 shadow-[0_0_40px_rgba(16,185,129,0.08)] backdrop-blur-xl md:px-6">
        <a className="group flex items-center gap-3" data-cursor="hover" href="#">
          <span className="relative grid h-11 w-11 place-items-center rounded-xl border border-emerald-200/25 bg-[#04131F]/80 shadow-[0_0_34px_rgba(16,185,129,0.18)] transition duration-300 group-hover:-translate-y-0.5 group-hover:border-emerald-200/50 group-hover:shadow-[0_0_44px_rgba(16,185,129,0.3)]">
            <span className="absolute inset-1 rounded-lg bg-gradient-to-br from-emerald-300 via-teal-300 to-[#2F80ED] opacity-90" />
            <span className="absolute inset-[7px] rounded-md bg-[#04131F]/78 backdrop-blur-sm" />
            <span className="relative text-sm font-black tracking-[-0.04em] text-white drop-shadow-[0_0_12px_rgba(16,185,129,0.8)]">
              AK
            </span>
          </span>
          <span className="hidden leading-none sm:block">
            <span className="block text-sm font-black uppercase tracking-[0.18em] text-white">
              Alamgeer
            </span>
            <span className="mt-1 block text-[0.62rem] font-bold uppercase tracking-[0.24em] text-emerald-100/80">
              Node.js · Backend Dev
            </span>
          </span>
        </a>
        <div className="hidden items-center gap-6 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300 md:flex">
          {navItems.map((item) => (
            <a className="transition hover:text-emerald-200" href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <a
            className="hidden rounded-md border border-white/10 bg-white/[0.06] px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-200 transition hover:border-sky-200/50 hover:text-sky-100 sm:inline-flex"
            download
            href={profile.resume}
            rel="noopener"
            target="_blank"
          >
            Résumé
          </a>
          <a
            className="rounded-md border border-emerald-300/30 bg-emerald-300/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-emerald-100 transition hover:border-emerald-200 hover:bg-emerald-300/20"
            href={`mailto:${profile.email}`}
          >
            Hire Me
          </a>
        </div>
      </nav>
    </header>
  );
}
