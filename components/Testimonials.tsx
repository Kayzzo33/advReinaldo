import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Star, Quote } from 'lucide-react';
import { Testimonial } from '../types';

const testimonials: Testimonial[] = [
  {
    name: "Carlos Mendes",
    role: "Ex-Bancário",
    text: "Fui demitido injustamente após 10 anos de banco. O Dr. Reinaldo não só reverteu a justa causa como conseguiu uma indenização por danos morais que mudou minha vida.",
    rating: 5,
    avatarInitial: "C"
  },
  {
    name: "Ana Paula Souza",
    role: "Vendedora",
    text: "Excelente profissional. Muito atencioso, me explicou cada etapa do processo e conseguimos receber todas as horas extras que a empresa devia.",
    rating: 5,
    avatarInitial: "A"
  },
  {
    name: "Roberto Lima",
    role: "Operador de Máquinas",
    text: "Sofri um acidente na fábrica e fui descartado. Dr. Reinaldo lutou pelos meus direitos e garantiu minha estabilidade e tratamento médico.",
    rating: 5,
    avatarInitial: "R"
  }
];

export const Testimonials: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver(0.1);

  return (
    <section id="depoimentos" ref={ref} className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-amber-500 font-bold tracking-wider uppercase mb-2">Depoimentos</h2>
          <h3 className="font-serif text-4xl md:text-5xl font-bold text-white">O Que Dizem Nossos Clientes</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div 
              key={idx}
              className={`bg-slate-900 p-8 rounded-2xl border border-slate-800 relative transition-all duration-700 hover:border-amber-500/30 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
              style={{ transitionDelay: `${idx * 200}ms` }}
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-slate-700 opacity-50" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                ))}
              </div>

              <p className="text-slate-300 mb-8 italic leading-relaxed">"{item.text}"</p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-slate-900 font-bold text-xl shadow-lg">
                  {item.avatarInitial}
                </div>
                <div>
                  <h4 className="text-white font-bold">{item.name}</h4>
                  <p className="text-sm text-slate-500">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};