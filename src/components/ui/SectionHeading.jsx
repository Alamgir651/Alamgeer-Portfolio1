export default function SectionHeading({ eyebrow, children, className = '' }) {
  return (
    <div className={className}>
      <p className="inline-flex rounded-full border border-emerald-200/15 bg-emerald-200/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-emerald-100 shadow-[0_0_28px_rgba(16,185,129,0.08)] backdrop-blur-xl">
        {eyebrow}
      </p>
      <h2 className="mt-5 bg-gradient-to-r from-white via-emerald-100 to-[#7DD3FC] bg-clip-text text-4xl font-black leading-tight text-transparent drop-shadow-[0_0_26px_rgba(16,185,129,0.14)] md:text-6xl">
        {children}
      </h2>
      <div className="mt-5 h-px w-32 bg-gradient-to-r from-emerald-300 via-teal-300 to-transparent shadow-[0_0_20px_rgba(16,185,129,0.44)]" />
    </div>
  );
}
