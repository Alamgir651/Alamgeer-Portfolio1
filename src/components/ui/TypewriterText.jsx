import { useEffect, useState } from 'react';

export default function TypewriterText({ text, className = '', speed = 24, delay = 500 }) {
  const [value, setValue] = useState('');

  useEffect(() => {
    let index = 0;
    let intervalId;
    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        index += 1;
        setValue(text.slice(0, index));

        if (index >= text.length) {
          window.clearInterval(intervalId);
        }
      }, speed);
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
      window.clearInterval(intervalId);
    };
  }, [delay, speed, text]);

  return (
    <span className={className}>
      {value}
      <span className="ml-1 inline-block h-[1.1em] w-px translate-y-1 bg-emerald-200 align-middle shadow-[0_0_14px_rgba(16,185,129,0.8)] motion-safe:animate-pulse" />
    </span>
  );
}
