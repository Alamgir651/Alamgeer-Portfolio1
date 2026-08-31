import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function AnimatedCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const smoothX = useSpring(cursorX, { stiffness: 260, damping: 28, mass: 0.45 });
  const smoothY = useSpring(cursorY, { stiffness: 260, damping: 28, mass: 0.45 });
  const [active, setActive] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const move = (event) => {
      setHidden(false);
      cursorX.set(event.clientX - 22);
      cursorY.set(event.clientY - 22);
      dotX.set(event.clientX - 3);
      dotY.set(event.clientY - 3);
    };

    const over = (event) => {
      setActive(Boolean(event.target.closest('a, button, input, textarea, [data-cursor="hover"]')));
    };

    const leave = () => setHidden(true);

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', over);
    document.addEventListener('mouseout', over);
    document.addEventListener('mouseleave', leave);

    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout', over);
      document.removeEventListener('mouseleave', leave);
    };
  }, [cursorX, cursorY, dotX, dotY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[999] hidden md:block">
      <motion.div
        className="absolute rounded-full border border-emerald-200/70 mix-blend-screen shadow-[0_0_28px_rgba(16,185,129,0.38)]"
        animate={{
          height: active ? 76 : 44,
          opacity: hidden ? 0 : 1,
          width: active ? 76 : 44,
        }}
        style={{ x: smoothX, y: smoothY }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      />
      <motion.div
        className="absolute rounded-full bg-gradient-to-br from-emerald-200 to-[#2F80ED] shadow-[0_0_18px_rgba(45,212,191,0.8)]"
        animate={{
          height: active ? 10 : 6,
          opacity: hidden ? 0 : 1,
          width: active ? 10 : 6,
        }}
        style={{ x: dotX, y: dotY }}
        transition={{ type: 'spring', stiffness: 420, damping: 24 }}
      />
    </div>
  );
}
