import { GoogleGenAI, ChatSession, GenerativeModel } from "@google/genai";
import { ChatMessage } from '../types';

let chatSession: ChatSession | null = null;
let model: GenerativeModel | null = null;

const API_KEY = process.env.API_KEY || '';

const SYSTEM_INSTRUCTION = `
Você é o assistente virtual jurídico do escritório do Dr. Reinaldo Pereira. 
Seu objetivo é realizar uma triagem inicial (qualificação) de clientes potenciais de forma empática, profissional e persuasiva.

O Dr. Reinaldo é especialista em:
- Direito Trabalhista (foco principal)
- Direito Previdenciário
- Direito Penal

REGRAS DE COMPORTAMENTO:
1. Seja cordial e profissional. Use uma linguagem acessível, mas que transmita autoridade.
2. Não dê conselhos jurídicos específicos ou garanta resultados. Diga que apenas o Dr. Reinaldo pode analisar o caso detalhadamente.
3. Seu objetivo principal é coletar informações para encaminhar para o WhatsApp.
4. Tente manter as respostas curtas (máximo 2 parágrafos).

FLUXO DA CONVERSA:
1. Se o usuário disser "Olá" ou começar a conversa, apresente-se e pergunte o nome.
2. Após o nome, pergunte brevemente qual é o problema (ex: demissão, acidente, horas extras).
3. Demonstre empatia pelo problema e pergunte se a pessoa ainda está trabalhando na empresa ou se já saiu.
4. Pergunte se a situação é urgente.
5. Ao final, baseando-se na gravidade, convide fortemente o usuário a clicar no botão de WhatsApp que aparecerá na tela para falar diretamente com o Dr. Reinaldo.

Se o usuário perguntar algo fora do contexto jurídico/trabalhista, redirecione gentilmente de volta para os serviços do escritório.
`;

export const initializeChat = async (): Promise<void> => {
  if (!API_KEY) {
    console.error("API Key is missing");
    return;
  }

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    // Using gemini-3-pro-preview for high quality conversational ability
    chatSession = ai.chats.create({
      model: 'gemini-3-pro-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
  } catch (error) {
    console.error("Failed to initialize Gemini chat:", error);
  }
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) {
    await initializeChat();
  }

  if (!chatSession) {
    return "Desculpe, estou tendo dificuldades para conectar ao servidor no momento. Por favor, utilize o botão do WhatsApp para contato direto.";
  }

  try {
    const result = await chatSession.sendMessage({ message });
    return result.text || "Não consegui processar sua resposta. Tente novamente.";
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    return "Ocorreu um erro momentâneo. Por favor, tente novamente ou contate-nos via WhatsApp.";
  }
};

export const generateWhatsAppLink = (data: { name?: string, summary?: string }) => {
  const phone = "5573999999999"; // Replace with real number
  const text = `Olá Dr. Reinaldo, vim pelo site. Meu nome é ${data.name || 'Cliente'} e gostaria de uma análise do meu caso sobre: ${data.summary || 'Direitos Trabalhistas'}.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
};
