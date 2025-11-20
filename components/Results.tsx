import React, { useState, useEffect } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const AnimatedCounter = ({ end, suffix }: { end: number, suffix: string }) => {
  const [count, setCount] = useState(0);
  const [ref, isVisible] = useIntersectionObserver(0.5);

  useEffect(() => {
    if (!isVisible) return;
    
    let startTime: number;
    const duration = 2000;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function for smoother animation
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      
      setCount(Math.floor(end * easeOutQuart));

      if (percentage < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [isVisible, end]);

  return (
    <div ref={ref} className="font-serif text-5xl md:text-6xl font-bold text-white mb-2">
      {count}{suffix}
    </div>
  );
};

export const Results: React.FC = () => {
  return (
    <section id="resultados" className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute inset-0 opacity-30">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 100 C 20 0 50 0 100 100 Z" fill="#1e293b" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-16">
          <h2 className="text-amber-500 font-bold tracking-wider uppercase mb-2">Nossos Números</h2>
          <h3 className="font-serif text-4xl md:text-5xl font-bold text-white">Resultados que Falam</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          <div className="flex flex-col items-center">
            <AnimatedCounter end={500} suffix="+" />
            <p className="text-amber-500 font-medium uppercase tracking-widest text-sm mt-2">Processos Ganhos</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-baseline">
              <span className="font-serif text-5xl md:text-6xl font-bold text-white mb-2">R$</span>
              <AnimatedCounter end={2} suffix=".5M+" />
            </div>
            <p className="text-amber-500 font-medium uppercase tracking-widest text-sm mt-2">Recuperados</p>
          </div>
          <div className="flex flex-col items-center">
            <AnimatedCounter end={98} suffix="%" />
            <p className="text-amber-500 font-medium uppercase tracking-widest text-sm mt-2">Taxa de Êxito</p>
          </div>
          <div className="flex flex-col items-center">
            <AnimatedCounter end={15} suffix=" Anos" />
            <p className="text-amber-500 font-medium uppercase tracking-widest text-sm mt-2">Experiência</p>
          </div>
        </div>
      </div>
    </section>
  );
};