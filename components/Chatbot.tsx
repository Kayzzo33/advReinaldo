import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Scale, Loader2 } from 'lucide-react';
import { sendMessageToGemini, generateWhatsAppLink } from '../services/geminiService';
import { ChatMessage } from '../types';

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      id: '1', 
      role: 'model', 
      text: 'Olá! Sou o assistente virtual do Dr. Reinaldo Pereira. Estou aqui para entender seu caso trabalhista e agilizar seu atendimento. Qual é o seu nome?' 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userText = inputValue;
    setInputValue('');
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: userText
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Sending context to Gemini to maintain conversation flow
      const responseText = await sendMessageToGemini(userText);
      
      const modelMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText
      };
      
      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'system',
        text: "Desculpe, ocorreu um erro. Por favor, use o botão de WhatsApp abaixo.",
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsAppDirect = () => {
    window.open(generateWhatsAppLink({ name: "Visitante" }), '_blank');
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 bg-amber-500 hover:bg-amber-400 text-slate-900 p-4 rounded-full shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all duration-300 transform hover:scale-110 ${isOpen ? 'rotate-90 opacity-0 pointer-events-none' : 'rotate-0 opacity-100'}`}
      >
        <MessageCircle className="w-8 h-8" />
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-6 right-6 z-50 w-[90vw] sm:w-[400px] max-h-[600px] h-[80vh] bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 flex flex-col transition-all duration-500 origin-bottom-right overflow-hidden ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
        
        {/* Header */}
        <div className="bg-slate-950 p-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center">
              <Scale className="w-6 h-6 text-slate-900" />
            </div>
            <div>
              <h3 className="font-bold text-white">Dr. Reinaldo IA</h3>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-xs text-slate-400">Online agora</span>
              </div>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-amber-600 text-white rounded-br-none' 
                    : msg.isError 
                      ? 'bg-red-500/20 text-red-200 border border-red-500'
                      : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-800 p-3 rounded-2xl rounded-bl-none flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
                <span className="text-xs text-slate-400">Digitando...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Actions */}
        <div className="p-4 bg-slate-950 border-t border-slate-800">
          {/* Input */}
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Digite sua mensagem..."
              className="flex-1 bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-full focus:outline-none focus:border-amber-500 transition-colors text-sm"
            />
            <button 
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}
              className="bg-amber-500 hover:bg-amber-600 disabled:bg-slate-700 disabled:text-slate-500 text-slate-900 p-2 rounded-full transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          
          {/* Force Conversion Button */}
          <button 
            onClick={handleWhatsAppDirect}
            className="w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            Falar com Humano no WhatsApp
          </button>
        </div>

      </div>
    </>
  );
};