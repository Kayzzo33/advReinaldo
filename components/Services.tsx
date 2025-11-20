import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Briefcase, Clock, ShieldAlert, UserX, Siren, Gavel } from 'lucide-react';
import { GlowingEffect } from './ui/glowing-effect';

const services = [
  {
    icon: <Briefcase className="w-6 h-6" />,
    title: "Verbas Rescisórias",
    description: "Cálculo minucioso e cobrança de todas as verbas não pagas na demissão.",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Horas Extras",
    description: "Recuperação de valores referentes a jornadas excessivas e intervalos não concedidos.",
  },
  {
    icon: <ShieldAlert className="w-6 h-6" />,
    title: "Acidente de Trabalho",
    description: "Defesa integral para garantir indenizações e estabilidade após acidentes.",
  },
  {
    icon: <UserX className="w-6 h-6" />,
    title: "Assédio Moral",
    description: "Combate a situações humilhantes e constrangedoras no ambiente laboral.",
  },
  {
    icon: <Siren className="w-6 h-6" />,
    title: "Reversão de Justa Causa",
    description: "Anulação de demissões punitivas aplicadas de forma indevida ou abusiva.",
  },
  {
    icon: <Gavel className="w-6 h-6" />,
    title: "Direito Previdenciário",
    description: "Auxílio na obtenção de benefícios e aposentadorias junto ao INSS.",
  }
];

export const Services: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver(0.1);

  return (
    <section id="servicos" ref={ref} className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-amber-500 font-bold tracking-wider uppercase mb-2">Áreas de Atuação</h2>
          <h3 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
            Soluções Jurídicas Completas
          </h3>
          <p className="text-slate-400 text-lg">
            Atuação estratégica para garantir que nenhum direito do trabalhador seja negligenciado.
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <li 
              key={idx} 
              className="min-h-[14rem] list-none"
              style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)', transition: `all 0.5s ease-out ${idx * 0.1}s` }}
            >
              <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-slate-800 p-2 md:rounded-[1.5rem] md:p-3">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={3}
                />
                <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] border-slate-800 bg-slate-900/50 p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] md:p-6">
                  <div className="relative flex flex-1 flex-col justify-start gap-4">
                    <div className="w-fit rounded-lg border-[0.75px] border-slate-700 bg-slate-800 p-3 text-amber-500">
                      {service.icon}
                    </div>
                    <div className="space-y-3">
                      <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-white">
                        {service.title}
                      </h3>
                      <h2 className="font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-slate-400">
                        {service.description}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
};