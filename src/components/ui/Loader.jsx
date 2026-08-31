import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Loader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setVisible(false), 1700);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[1000] grid place-items-center bg-[#04131F]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(12px)' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative grid place-items-center">
            <motion.div
              className="absolute h-28 w-28 rounded-full border border-emerald-200/15 border-t-emerald-300 shadow-[0_0_40px_rgba(16,185,129,0.24)]"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="grid h-20 w-20 place-items-center rounded-2xl border border-white/10 bg-white/[0.06] shadow-[0_0_50px_rgba(47,128,237,0.14)] backdrop-blur-xl"
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.45 }}
            >
              <span className="bg-gradient-to-r from-emerald-200 via-teal-300 to-[#2F80ED] bg-clip-text text-2xl font-black tracking-[-0.06em] text-transparent">
                AK
              </span>
            </motion.div>
            <div className="mt-12 h-1 w-40 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-emerald-300 via-teal-300 to-[#2F80ED]"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
