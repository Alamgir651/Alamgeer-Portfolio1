import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function MagneticButton({ children, href, variant = 'primary', ...props }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 16, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 180, damping: 16, mass: 0.6 });

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.28);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.28);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const styles = {
    primary:
      'border-emerald-300/60 bg-emerald-300 text-[#04131F] shadow-[0_0_38px_rgba(16,185,129,0.32)] hover:bg-white',
    secondary:
      'border-white/15 bg-white/[0.06] text-white shadow-[0_0_30px_rgba(47,128,237,0.18)] hover:border-sky-200/60',
  };

  return (
    <motion.a
      className={`group relative inline-flex min-h-12 overflow-hidden rounded-md border px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] transition ${styles[variant]}`}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.97 }}
      {...props}
    >
      <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/45 to-transparent transition duration-700 group-hover:translate-x-[120%]" />
      <span className="relative z-10">{children}</span>
    </motion.a>
  );
}
