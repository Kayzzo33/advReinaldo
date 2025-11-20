import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Award, BookOpen, Users, GraduationCap } from 'lucide-react';

export const About: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver(0.2);

  return (
    <section id="sobre" ref={ref} className="py-24 bg-slate-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Side */}
          <div className={`relative transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="absolute -inset-4 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl rotate-3 opacity-20 blur-lg"></div>
            <div className="relative rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
              {/* Updated image as requested */}
              <img 
                src="https://res.cloudinary.com/dxhlvrach/image/upload/v1763658815/gemini-cleaned-8z1xy36_yoqlcb.png" 
                alt="Dr. Reinaldo Pereira" 
                className="w-full h-[600px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950 to-transparent p-8">
                <div className="flex items-center gap-4">
                  <div className="bg-amber-500 p-3 rounded-lg text-slate-900">
                    <Award className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-xl">Excelência Comprovada</p>
                    <p className="text-slate-300 text-sm">Reconhecido pelo IDPB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className={`space-y-8 transition-all duration-1000 delay-300 transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div>
              <h2 className="text-amber-500 font-bold tracking-wider uppercase mb-2">Sobre o Especialista</h2>
              <h3 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Dr. Reinaldo Pereira
              </h3>
              <p className="text-slate-400 text-lg leading-relaxed mb-6">
                Com uma trajetória marcada pela ética e combatividade, Dr. Reinaldo dedica sua carreira a equilibrar a balança da justiça em favor do trabalhador.
              </p>
              <p className="text-slate-400 text-lg leading-relaxed">
                Pós-graduado em <strong className="text-amber-500">Direito Previdenciário</strong> e <strong className="text-amber-500">Direito do Trabalho</strong>, possui também especialização em Direito Penal pelo renomado Instituto de Direito Penal Brasileiro (IDPB).
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { icon: GraduationCap, title: "Pós-Graduado", desc: "Direito do Trabalho e Previdenciário" },
                { icon: BookOpen, title: "Especialista IDPB", desc: "Instituto de Direito Penal Brasileiro" },
                { icon: Users, title: "Atendimento", desc: "Humanizado e Personalizado" },
                { icon: Award, title: "Resultados", desc: "Histórico de vitórias expressivas" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-amber-500/50 transition-colors">
                  <item.icon className="w-6 h-6 text-amber-500 mt-1 shrink-0" />
                  <div>
                    <h4 className="text-white font-bold">{item.title}</h4>
                    <p className="text-sm text-slate-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <a 
                href="https://www.instagram.com/advogadoreinaldopereira" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-amber-500 font-bold hover:text-amber-400 transition-colors"
              >
                Siga no Instagram
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};