import { OpenAI } from "openai";
import { Partner } from "../drizzle/schema";

/**
 * AI Agent Service para gerar respostas automáticas aos parceiros
 * Utiliza OpenAI para criar mensagens personalizadas baseadas nas informações do parceiro
 */

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface AIAgentResponse {
  message: string;
  summary: string;
  suggestedActions: string[];
}

/**
 * Gera uma resposta automática personalizada para um parceiro
 * @param partner - Dados do parceiro que preencheu o formulário
 * @returns Mensagem gerada pela IA
 */
export async function generatePartnerResponse(partner: Partner): Promise<AIAgentResponse> {
  try {
    const partnerTypeLabel = {
      company: "Empresa Geradora de Resíduos",
      collector: "Coletor Autônomo",
      buyer: "Comprador de Materiais",
    }[partner.partnerType] || "Parceiro";

    const prompt = `
Você é um agente de IA da NUMATU, uma plataforma de logística reversa inteligente que conecta empresas, coletores e compradores de materiais recicláveis.

Um novo ${partnerTypeLabel} se registrou no sistema com as seguintes informações:

Nome: ${partner.name}
Email: ${partner.email}
Telefone: ${partner.phone || "Não fornecido"}
Tipo de Parceiro: ${partnerTypeLabel}
${partner.companyName ? `Empresa: ${partner.companyName}` : ""}
Cidade: ${partner.city || "Não fornecida"}
Estado: ${partner.state || "Não fornecido"}
${partner.message ? `Mensagem: ${partner.message}` : ""}

Gere uma resposta de boas-vindas personalizada e profissional em português que:
1. Agradeça o interesse em se juntar à NUMATU
2. Reconheça o tipo de parceiro e seus potenciais benefícios
3. Ofereça próximos passos claros
4. Seja amigável mas profissional
5. Tenha no máximo 150 palavras

Responda em JSON com a seguinte estrutura:
{
  "message": "A mensagem de boas-vindas aqui",
  "summary": "Um resumo de uma linha do que foi comunicado",
  "suggestedActions": ["Ação 1", "Ação 2", "Ação 3"]
}
`;

    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: "Você é um agente de IA profissional e amigável da NUMATU. Sempre responda em JSON válido.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const content = response.choices[0]?.message?.content || "";

    // Extrair JSON da resposta
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Resposta da IA não contém JSON válido");
    }

    const parsedResponse = JSON.parse(jsonMatch[0]) as AIAgentResponse;

    return {
      message: parsedResponse.message || content,
      summary: parsedResponse.summary || "Resposta gerada com sucesso",
      suggestedActions: parsedResponse.suggestedActions || [],
    };
  } catch (error) {
    console.error("[AI Agent] Erro ao gerar resposta:", error);

    // Retornar uma resposta padrão em caso de erro
    return {
      message: `Olá ${partner.name}! Obrigado por se interessar em se juntar à NUMATU. Estamos entusiasmados em trabalhar com você. Um membro do nosso time entrará em contato em breve para discutir como podemos ajudá-lo.`,
      summary: "Resposta padrão de boas-vindas",
      suggestedActions: [
        "Aguardar contato do time NUMATU",
        "Verificar email de confirmação",
        "Acessar o portal de parceiros",
      ],
    };
  }
}

/**
 * Gera uma resposta contextualizada baseada em uma pergunta do parceiro
 * @param partner - Dados do parceiro
 * @param question - Pergunta do parceiro
 * @returns Resposta gerada pela IA
 */
export async function generateContextualResponse(
  partner: Partner,
  question: string
): Promise<string> {
  try {
    const partnerTypeLabel = {
      company: "Empresa Geradora de Resíduos",
      collector: "Coletor Autônomo",
      buyer: "Comprador de Materiais",
    }[partner.partnerType] || "Parceiro";

    const prompt = `
Você é um agente de IA da NUMATU, uma plataforma de logística reversa inteligente.

Contexto do parceiro:
- Nome: ${partner.name}
- Tipo: ${partnerTypeLabel}
- ${partner.companyName ? `Empresa: ${partner.companyName}` : ""}
- Localização: ${partner.city}, ${partner.state}

Pergunta do parceiro: "${question}"

Responda de forma clara, concisa e profissional em português. Máximo 100 palavras.
`;

    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: "Você é um agente de IA profissional da NUMATU que responde perguntas de parceiros sobre logística reversa e reciclagem.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 200,
    });

    return response.choices[0]?.message?.content || "Desculpe, não consegui processar sua pergunta.";
  } catch (error) {
    console.error("[AI Agent] Erro ao gerar resposta contextualizada:", error);
    return "Desculpe, estou temporariamente indisponível. Por favor, tente novamente em alguns momentos.";
  }
}
