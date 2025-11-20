import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Scale, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { sendMessageToGemini, generateWhatsAppLink, sendUnqualifiedLeadReport } from '../services/geminiService';
import { ChatMessage, LeadAnalysis } from '../types';

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      id: '1', 
      role: 'model', 
      text: 'Olá! Sou a assistente virtual do escritório. Posso fazer uma triagem rápida do seu caso para o Dr. Reinaldo? Qual é o seu nome?' 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Estado para armazenar a análise da IA
  const [leadStatus, setLeadStatus] = useState<LeadAnalysis | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Monitora a qualificação para disparar ações automáticas
  useEffect(() => {
    if (leadStatus && !leadStatus.qualified) {
      // Se for desqualificado, enviamos o "e-mail" de relatório silenciosamente
      const history = messages.map(m => `${m.role}: ${m.text}`).join('\n');
      sendUnqualifiedLeadReport(leadStatus, history);
    }
  }, [leadStatus, messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userText = inputValue;
    setInputValue('');
    
    // Adiciona mensagem do usuário
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: 'user',
      text: userText
    }]);
    setIsLoading(true);

    try {
      // Envia para a IA e aguarda resposta + dados
      const response = await sendMessageToGemini(userText);
      
      // Atualiza status se a IA retornou análise
      if (response.analysis) {
        console.log("Análise da IA recebida:", response.analysis);
        setLeadStatus(response.analysis);
      }

      // Adiciona resposta da IA
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: response.text
      }]);
      
    } catch (error) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'system',
        text: "Erro de conexão. Tente novamente.",
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsAppClick = () => {
    if (leadStatus && leadStatus.qualified) {
      const link = generateWhatsAppLink(leadStatus);
      window.open(link, '_blank');
    }
  };

  return (
    <>
      {/* Botão Flutuante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 bg-amber-500 hover:bg-amber-400 text-slate-900 p-4 rounded-full shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all duration-300 transform hover:scale-110 ${isOpen ? 'rotate-90 opacity-0 pointer-events-none' : 'rotate-0 opacity-100'}`}
      >
        <MessageCircle className="w-8 h-8" />
      </button>

      {/* Janela do Chat */}
      <div className={`fixed bottom-6 right-6 z-50 w-[90vw] sm:w-[400px] max-h-[600px] h-[80vh] bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 flex flex-col transition-all duration-500 origin-bottom-right overflow-hidden ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
        
        {/* Header */}
        <div className="bg-slate-950 p-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center">
              <Scale className="w-6 h-6 text-slate-900" />
            </div>
            <div>
              <h3 className="font-bold text-white">Triagem Jurídica</h3>
              <div className="flex items-center gap-1">
                <span className={`w-2 h-2 rounded-full animate-pulse ${leadStatus?.qualified === false ? 'bg-red-500' : 'bg-green-500'}`}></span>
                <span className="text-xs text-slate-400">
                  {leadStatus?.qualified === false ? 'Atendimento Encerrado' : 'Assistente Virtual'}
                </span>
              </div>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Área de Mensagens */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/50 scrollbar-thin scrollbar-thumb-slate-700">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-amber-600 text-white rounded-br-none' 
                    : msg.isError 
                      ? 'bg-red-900/50 text-red-200 border border-red-800'
                      : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          
          {/* Indicador de Digitação */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-800 p-3 rounded-2xl rounded-bl-none flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
                <span className="text-xs text-slate-400">Analisando resposta...</span>
              </div>
            </div>
          )}

          {/* Feedback Visual de Qualificação */}
          {leadStatus && leadStatus.qualified && (
            <div className="flex justify-center py-2 animate-fade-in">
              <div className="bg-green-900/30 border border-green-500/30 text-green-400 px-4 py-2 rounded-full text-xs flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Caso pré-qualificado para análise
              </div>
            </div>
          )}
          
           {/* Feedback Visual de Desqualificação */}
           {leadStatus && leadStatus.qualified === false && (
            <div className="flex justify-center py-2 animate-fade-in">
              <div className="bg-slate-800 border border-slate-700 text-slate-400 px-4 py-2 rounded-full text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Atendimento finalizado
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Área de Ações (Footer) */}
        <div className="p-4 bg-slate-950 border-t border-slate-800">
          
          {/* Cenário 1: Lead Qualificado -> Mostra Botão do WhatsApp em destaque */}
          {leadStatus?.qualified ? (
            <div className="animate-fade-in-up space-y-3">
              <p className="text-xs text-center text-green-400 font-medium">
                ✅ O Dr. Reinaldo já recebeu seu resumo. Clique abaixo para enviar:
              </p>
              <button 
                onClick={handleWhatsAppClick}
                className="w-full bg-green-600 hover:bg-green-500 text-white py-3 rounded-xl font-bold text-sm transition-all shadow-[0_0_20px_rgba(22,163,74,0.3)] flex items-center justify-center gap-2 animate-pulse"
              >
                <MessageCircle className="w-5 h-5" />
                Falar com Dr. Reinaldo Agora
              </button>
              <button 
                onClick={() => setLeadStatus(null)} 
                className="w-full text-xs text-slate-500 hover:text-slate-300 mt-2"
              >
                Voltar ao chat
              </button>
            </div>
          ) : leadStatus?.qualified === false ? (
            // Cenário 2: Lead Não Qualificado -> Mostra opção de reinício ou FAQ
            <div className="animate-fade-in text-center space-y-3">
              <p className="text-xs text-slate-400">
                Esperamos ter esclarecido sua dúvida.
              </p>
              <button 
                onClick={() => {
                  setMessages([{ id: Date.now().toString(), role: 'model', text: 'Olá novamente. Como posso ajudar?' }]);
                  setLeadStatus(null);
                }}
                className="w-full border border-slate-700 text-slate-300 py-2 rounded-xl text-sm hover:bg-slate-800 transition-colors"
              >
                Iniciar novo atendimento
              </button>
            </div>
          ) : (
            // Cenário 3: Conversa em andamento -> Input normal
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Digite sua mensagem..."
                className="flex-1 bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-amber-500 transition-colors text-sm"
                disabled={isLoading}
              />
              <button 
                onClick={handleSend}
                disabled={!inputValue.trim() || isLoading}
                className="bg-amber-500 hover:bg-amber-600 disabled:bg-slate-800 disabled:text-slate-600 text-slate-900 p-3 rounded-xl transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          )}

        </div>
      </div>
    </>
  );
};
