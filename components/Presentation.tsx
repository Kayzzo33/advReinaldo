import React from "react";
import { ContainerScroll } from "./ui/container-scroll-animation";
import { Play } from "lucide-react";

export const Presentation: React.FC = () => {
  return (
    <div className="flex flex-col overflow-hidden bg-slate-950">
      <ContainerScroll
        titleComponent={
          <>
            <h2 className="text-amber-500 font-bold tracking-wider uppercase mb-2">Apresentação Institucional</h2>
            <h1 className="text-4xl font-semibold text-slate-300 dark:text-white mb-8">
              Conheça a Trajetória do <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none text-amber-500">
                Dr. Reinaldo Pereira
              </span>
            </h1>
          </>
        }
      >
        <div className="relative w-full h-full bg-slate-900 rounded-2xl flex items-center justify-center group cursor-pointer overflow-hidden">
            {/* Placeholder for video thumbnail */}
            <img 
                src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2600&auto=format&fit=crop" 
                alt="Dr. Reinaldo Presentation" 
                className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>
            
            <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-amber-500/90 flex items-center justify-center pl-2 shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-transform group-hover:scale-110">
                    <Play className="w-8 h-8 text-white fill-white" />
                </div>
                <span className="text-white font-bold text-xl tracking-wide">Assistir Apresentação</span>
            </div>
        </div>
      </ContainerScroll>
    </div>
  );
}