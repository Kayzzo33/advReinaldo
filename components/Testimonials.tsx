import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { TestimonialCard } from './ui/testimonial-card';

const testimonials = [
  {
    author: {
      name: "Carlos Mendes",
      role: "Ex-Bancário",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    text: "Fui demitido injustamente após 10 anos de banco. O Dr. Reinaldo não só reverteu a justa causa como conseguiu uma indenização por danos morais que mudou minha vida."
  },
  {
    author: {
      name: "Ana Paula Souza",
      role: "Vendedora",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
    },
    text: "Excelente profissional. Muito atencioso, me explicou cada etapa do processo e conseguimos receber todas as horas extras que a empresa devia."
  },
  {
    author: {
      name: "Roberto Lima",
      role: "Operador de Máquinas",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    },
    text: "Sofri um acidente na fábrica e fui descartado. Dr. Reinaldo lutou pelos meus direitos e garantiu minha estabilidade e tratamento médico."
  },
   {
    author: {
      name: "Mariana Costa",
      role: "Enfermeira",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
    },
    text: "Profissional extremamente competente. Recuperou todos os meus direitos trabalhistas com agilidade e transparência."
  },
  {
    author: {
      name: "João Silva",
      role: "Motorista",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=face"
    },
    text: "Recomendo de olhos fechados. A equipe do Dr. Reinaldo me deu todo suporte necessário durante meu processo."
  },
  {
    author: {
      name: "Patricia Santos",
      role: "Gerente Comercial",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face"
    },
    text: "Consegui reverter meu pedido de demissão para rescisão indireta graças à estratégia do Dr. Reinaldo. Justiça foi feita!"
  }
];

export const Testimonials: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver(0.1);

  return (
    <section id="depoimentos" ref={ref} className="py-24 bg-slate-950 relative overflow-hidden">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-amber-500 font-bold tracking-wider uppercase mb-2">Depoimentos</h2>
            <h3 className="font-serif text-4xl md:text-5xl font-bold text-white">O Que Dizem Nossos Clientes</h3>
          </div>
        </div>

        <div className={`relative flex w-full flex-col items-center justify-center overflow-hidden transition-opacity duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="group flex overflow-hidden p-2 [--gap:2rem] [gap:var(--gap)] flex-row [--duration:60s]">
            <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]">
              {/* Repeat the list twice to create seamless loop */}
              {[...Array(2)].map((_, setIndex) => (
                testimonials.map((testimonial, i) => (
                  <TestimonialCard 
                    key={`${setIndex}-${i}`}
                    {...testimonial}
                  />
                ))
              ))}
            </div>
          </div>

          {/* Gradients for fading edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-slate-950 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-slate-950 to-transparent z-10" />
        </div>
    </section>
  );
};
