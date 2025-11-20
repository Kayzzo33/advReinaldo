import React from 'react';
import { Scale, Instagram, Linkedin, Facebook } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Scale className="w-6 h-6 text-amber-500" />
              <span className="font-serif text-xl font-bold text-white">Dr. Reinaldo Pereira</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Advocacia trabalhista especializada em defender quem constrói o país. Ética, transparência e combatividade em cada processo.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-amber-500 transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-slate-400 hover:text-amber-500 transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-slate-400 hover:text-amber-500 transition-colors"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Navegação</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><button onClick={() => document.getElementById('sobre')?.scrollIntoView({behavior: 'smooth'})} className="hover:text-amber-500 transition-colors">Sobre</button></li>
              <li><button onClick={() => document.getElementById('servicos')?.scrollIntoView({behavior: 'smooth'})} className="hover:text-amber-500 transition-colors">Áreas de Atuação</button></li>
              <li><button onClick={() => document.getElementById('resultados')?.scrollIntoView({behavior: 'smooth'})} className="hover:text-amber-500 transition-colors">Resultados</button></li>
              <li><button onClick={() => document.getElementById('contato')?.scrollIntoView({behavior: 'smooth'})} className="hover:text-amber-500 transition-colors">Contato</button></li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div>
            <h4 className="text-white font-bold mb-4">Informações Legais</h4>
            <p className="text-slate-500 text-xs leading-relaxed">
              Este site tem caráter meramente informativo e não substitui a consulta jurídica. Os resultados mencionados não garantem êxito em ações futuras, pois cada caso é analisado individualmente.
              <br /><br />
              OAB/BA 12345
            </p>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-8 text-center">
          <p className="text-slate-600 text-xs">
            &copy; {new Date().getFullYear()} Dr. Reinaldo Pereira. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};