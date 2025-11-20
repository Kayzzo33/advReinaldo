import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

export const Contact: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver(0.1);

  return (
    <section id="contato" ref={ref} className="py-24 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Contact Info */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <h2 className="text-amber-500 font-bold tracking-wider uppercase mb-2">Fale Conosco</h2>
            <h3 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">Agende Sua Consulta</h3>
            <p className="text-slate-400 text-lg mb-10">
              Não deixe suas dúvidas para depois. Entre em contato hoje mesmo e tenha uma análise preliminar do seu caso.
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-amber-500 transition-colors">
                  <Phone className="w-5 h-5 text-amber-500 group-hover:text-slate-900 transition-colors" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 uppercase font-bold">Ligue Agora</p>
                  <p className="text-white text-lg">(73) 9834-9560</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-amber-500 transition-colors">
                  <Mail className="w-5 h-5 text-amber-500 group-hover:text-slate-900 transition-colors" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 uppercase font-bold">Email</p>
                  <p className="text-white text-lg">contato@reinaldopereira.adv.br</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-amber-500 transition-colors">
                  <MapPin className="w-5 h-5 text-amber-500 group-hover:text-slate-900 transition-colors" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 uppercase font-bold">Escritório</p>
                  <p className="text-white text-lg">Rua Claudiana Silva da Fonseca, 99<br/>Maracás - BA, 45360-000</p>
                </div>
              </div>
            </div>

            <a 
              href="https://wa.me/557398349560?text=Ol%C3%A1%2C%20vim%20do%20site%20e%20gostaria%20de%20agendar%20uma%20consulta" 
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center w-full sm:w-auto gap-2 bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-green-600/20 transform hover:-translate-y-1"
            >
              <MessageCircle className="w-6 h-6" />
              Iniciar Atendimento via WhatsApp
            </a>
          </div>

          {/* Google Map Embed */}
          <div className={`h-[500px] rounded-2xl overflow-hidden border border-slate-700 shadow-2xl transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
             <iframe
                src="https://maps.google.com/maps?q=Rua%20Claudiana%20Silva%20da%20Fonseca%2C%2099%2C%20Marac%C3%A1s%20BA&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa de localização"
              ></iframe>
          </div>

        </div>
      </div>
    </section>
  );
};