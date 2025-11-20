import { GoogleGenAI, Chat } from "@google/genai";
import { GeminiResponse, LeadAnalysis } from '../types';

let chatSession: Chat | null = null;

const API_KEY = process.env.API_KEY || '';

// O prompt agora instrui a IA a agir como um classificador de dados oculto
const SYSTEM_INSTRUCTION = `
Você é a Inteligência Artificial de triagem do escritório do Dr. Reinaldo Pereira.
O Dr. Reinaldo é especialista EXCLUSIVO em: Direito Trabalhista e Previdenciário.

SEU OBJETIVO:
Dialogar com o cliente para extrair 3 informações chave:
1. Nome do cliente.
2. Resumo do problema (O que aconteceu? Foi demitido? Acidente? INSS?).
3. Urgência (Está sem receber? Passando necessidade? Prazo vencendo?).

REGRAS DE INTERAÇÃO:
- Seja empático e profissional.
- Faça UMA pergunta por vez. Não interrogue o cliente.
- Se o cliente falar de Direito de Família (divórcio, pensão), Criminal ou Cível, explique educadamente que o escritório não atua nessas áreas e encerre o atendimento.

PROTOCOLO DE ANÁLISE DE DADOS (CRÍTICO):
Ao final de TODA resposta sua, você deve analisar mentalmente se já possui as informações (Nome + Problema + Urgência) OU se já identificou que o cliente NÃO é qualificado (área errada).

Se você tiver essas informações, você DEVE adicionar ao final da sua resposta um bloco JSON oculto estritamente neste formato:

[[LEAD_DATA: {
  "name": "Nome do Cliente",
  "summary": "Resumo curto do caso em 1 frase para o advogado ler no WhatsApp",
  "urgency": "Alta/Média/Baixa",
  "qualified": true/false,
  "reason": "Explicação breve da qualificação"
}]]

EXEMPLOS:
- Caso Trabalhista (Qualificado): "qualified": true
- Caso Divórcio (Não Qualificado): "qualified": false, "reason": "Cliente procura advogado de família"
- Apenas "Oi" (Incompleto): NÃO envie o bloco JSON ainda. Continue conversando.

IMPORTANTE: O bloco [[LEAD_DATA...]] deve ser a ÚLTIMA coisa da sua mensagem.
`;

export const initializeChat = async (): Promise<void> => {
  if (!API_KEY) {
    console.error("API Key is missing");
    return;
  }

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
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

export const sendMessageToGemini = async (message: string): Promise<GeminiResponse> => {
  if (!chatSession) {
    await initializeChat();
  }

  if (!chatSession) {
    return { text: "Erro de conexão. Por favor, recarregue a página." };
  }

  try {
    const result = await chatSession.sendMessage({ message });
    const fullText = result.text || "";

    // Lógica de Parsing para extrair o JSON oculto
    const jsonMatch = fullText.match(/\[\[LEAD_DATA:([\s\S]*?)\]\]/);
    
    let cleanText = fullText;
    let analysisData: LeadAnalysis | undefined;

    if (jsonMatch && jsonMatch[1]) {
      try {
        // Remove o JSON da mensagem visível para o usuário
        cleanText = fullText.replace(jsonMatch[0], '').trim();
        // Faz o parse dos dados
        analysisData = JSON.parse(jsonMatch[1]);
      } catch (e) {
        console.error("Erro ao processar dados do lead:", e);
      }
    }

    return { 
      text: cleanText, 
      analysis: analysisData 
    };

  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    return { text: "Ocorreu um erro momentâneo. Tente novamente." };
  }
};

export const generateWhatsAppLink = (data: LeadAnalysis) => {
  const phone = "557398349560";
  
  // Mensagem pré-formatada "humanizada" baseada na análise da IA
  const text = `Olá Dr. Reinaldo. Vim pelo site.
Meu nome é *${data.name}*.
*Situação:* ${data.summary}.
*Urgência:* ${data.urgency}.
  
Gostaria de saber se posso agendar uma análise.`;

  // USAR WA.ME PARA MELHOR COMPATIBILIDADE COM DESKTOP APP E WEB
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
};

// Simulação de envio de e-mail para leads desqualificados
export const sendUnqualifiedLeadReport = async (data: LeadAnalysis, chatHistory: string) => {
  // Em um cenário real, aqui usaríamos EmailJS ou uma API de backend
  console.log(`
    [EMAIL SIMULADO] Para: kaykysilva01.crf@gmail.com
    Assunto: Lead Desqualificado/Dúvida - ${data.name}
    
    Motivo: ${data.reason}
    Resumo: ${data.summary}
    
    -- Histórico --
    ${chatHistory}
  `);
  
  return true;
};