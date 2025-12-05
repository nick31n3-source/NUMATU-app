import axios from "axios";
import { Partner } from "../drizzle/schema";
import { generatePartnerResponse, generateContextualResponse } from "./ai_agent";

/**
 * WhatsApp Business API Integration
 * Sends welcome messages to new partners, now with AI-powered personalization
 */

interface WhatsAppMessage {
  phone: string;
  name: string;
  partnerType: "company" | "collector" | "buyer";
  email: string;
}

/**
 * Send welcome message via WhatsApp Business API with AI-generated content
 * This integrates with the AI agent to create personalized messages
 */
export async function sendWhatsAppWelcomeMessage(
  partner: Partner
): Promise<boolean> {
  try {
    // WhatsApp Business API endpoint
    const WHATSAPP_API_URL = process.env.WHATSAPP_API_URL;
    const WHATSAPP_API_TOKEN = process.env.WHATSAPP_API_TOKEN;
    const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const WHATSAPP_BUSINESS_ACCOUNT_ID = process.env.WHATSAPP_BUSINESS_ACCOUNT_ID;

    if (!WHATSAPP_API_URL || !WHATSAPP_API_TOKEN || !WHATSAPP_PHONE_NUMBER_ID || !WHATSAPP_BUSINESS_ACCOUNT_ID) {
      console.warn(
        "[WhatsApp] Missing configuration (WHATSAPP_API_URL, WHATSAPP_API_TOKEN, WHATSAPP_PHONE_NUMBER_ID, WHATSAPP_BUSINESS_ACCOUNT_ID). Skipping WhatsApp message."
      );
      return false;
    }

    // Format phone number (remove special characters and ensure international format)
    // Prioritize whatsappNumber, then phone.
    const rawPhone = partner.whatsappNumber || partner.phone;
    const formattedPhone = rawPhone?.replace(/\D/g, "");
    
    if (!formattedPhone || formattedPhone.length < 10) {
      console.warn(`[WhatsApp] Invalid phone number provided: ${rawPhone}`);
      return false;
    }

    // Generate AI-powered personalized message
    let messageText: string;
    
    try {
      const aiResponse = await generatePartnerResponse(partner);
      messageText = aiResponse.message;
    } catch (error) {
      console.warn("[WhatsApp] Failed to generate AI message, using default template");
      messageText = getDefaultWelcomeMessage(partner);
    }

    // Send message via WhatsApp Business API
    const response = await axios.post(
      `${WHATSAPP_API_URL}/${WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to: formattedPhone,
        type: "text",
        text: {
          body: messageText,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${WHATSAPP_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(
      `[WhatsApp] Message sent successfully to ${formattedPhone}`,
      response.data
    );
    return true;
  } catch (error) {
    console.error("[WhatsApp] Failed to send message:", error);
    // Don't throw - this should not block partner registration
    return false;
  }
}

/**
 * Get default welcome message template based on partner type
 */
function getDefaultWelcomeMessage(partner: Partner): string {
  const messages = {
    company: `Olá ${partner.name}! 👋\n\nBem-vindo à NUMATU! 🌿\n\nSua empresa foi cadastrada com sucesso como parceira. Aqui estão os próximos passos:\n\n1️⃣ Baixe o app NUMATU na App Store ou Google Play\n2️⃣ Faça login com seu email: ${partner.email}\n3️⃣ Configure seu perfil de empresa\n4️⃣ Comece a conectar com coletores\n\nBenefícios que você vai aproveitar:\n✅ Redução de até 40% em custos de coleta\n✅ Rotas otimizadas em tempo real\n✅ Conformidade ambiental garantida\n✅ Dashboard com métricas completas\n\nTem dúvidas? Ligue para (86) 99586-2231 ou envie email para numatucorp@gmail.com\n\nVamos transformar sua logística! 🚀`,

    collector: `Olá ${partner.name}! 👋\n\nBem-vindo à NUMATU! 🌿\n\nSeu cadastro como coletor foi aprovado! Aqui está o que você precisa fazer:\n\n1️⃣ Baixe o app NUMATU\n2️⃣ Faça login com seu email: ${partner.email}\n3️⃣ Complete seu perfil\n4️⃣ Comece a receber rotas otimizadas\n\nComo funciona:\n📱 Receba notificações de coletas disponíveis\n🗺️ Rotas otimizadas para máxima eficiência\n💰 Ganhe mais com menos tempo\n📊 Acompanhe seus ganhos em tempo real\n\nDica: Quanto mais rápido você responder às coletas, mais oportunidades receberá!\n\nSuporte: (86) 99586-2231\n\nBoa sorte! 💚`,

    buyer: `Olá ${partner.name}! 👋\n\nBem-vindo à NUMATU! 🌿\n\nSeu cadastro como comprador foi confirmado! Agora você tem acesso a:\n\n1️⃣ Rede de fornecedores qualificados\n2️⃣ Preços competitivos\n3️⃣ Logística integrada\n4️⃣ Garantia de qualidade\n\nPróximos passos:\n📱 Baixe o app NUMATU\n🔍 Explore fornecedores disponíveis\n💼 Negocie diretamente na plataforma\n✅ Feche negócios seguros\n\nBenefícios exclusivos:\n✅ Acesso a fornecedores pré-qualificados\n✅ Transparência total de preços\n✅ Suporte em negociações\n✅ Rastreabilidade completa\n\nDúvidas? Ligue: (86) 99586-2231\n\nVamos crescer juntos! 🚀`,
  };

  return messages[partner.partnerType] || messages.company;
}

/**
 * Send follow-up message after 24 hours with AI-generated content
 * This would typically be called by a scheduled job
 */
export async function sendFollowUpMessage(
  partner: Partner
): Promise<boolean> {
  try {
    const WHATSAPP_API_URL = process.env.WHATSAPP_API_URL;
    const WHATSAPP_API_TOKEN = process.env.WHATSAPP_API_TOKEN;
    const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const WHATSAPP_BUSINESS_ACCOUNT_ID = process.env.WHATSAPP_BUSINESS_ACCOUNT_ID;

    if (!WHATSAPP_API_URL || !WHATSAPP_API_TOKEN || !WHATSAPP_PHONE_NUMBER_ID || !WHATSAPP_BUSINESS_ACCOUNT_ID) {
      return false;
    }

    const rawPhone = partner.whatsappNumber || partner.phone;
    const formattedPhone = rawPhone?.replace(/\D/g, "");
    
    if (!formattedPhone || formattedPhone.length < 10) {
      return false;
    }

    const followUpMessage = `Olá ${partner.name}! 👋\n\nEspero que esteja aproveitando o NUMATU! 💚\n\nTem alguma dúvida ou dificuldade?\n\n📞 Ligue para: (86) 99586-2231\n📧 Email: numatucorp@gmail.com\n\nEstamos aqui para ajudar! 🚀`;

    const response = await axios.post(
      `${WHATSAPP_API_URL}/${WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to: formattedPhone,
        type: "text",
        text: {
          body: followUpMessage,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${WHATSAPP_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(
      `[WhatsApp] Follow-up message sent to ${formattedPhone}`,
      response.data
    );
    return true;
  } catch (error) {
    console.error("[WhatsApp] Failed to send follow-up message:", error);
    return false;
  }
}

/**
 * Send AI-generated response to partner query
 */
export async function sendAIResponse(
  partner: Partner,
  question: string
): Promise<boolean> {
  try {
    const WHATSAPP_API_URL = process.env.WHATSAPP_API_URL;
    const WHATSAPP_API_TOKEN = process.env.WHATSAPP_API_TOKEN;
    const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const WHATSAPP_BUSINESS_ACCOUNT_ID = process.env.WHATSAPP_BUSINESS_ACCOUNT_ID;

    if (!WHATSAPP_API_URL || !WHATSAPP_API_TOKEN || !WHATSAPP_PHONE_NUMBER_ID || !WHATSAPP_BUSINESS_ACCOUNT_ID) {
      return false;
    }

    const rawPhone = partner.whatsappNumber || partner.phone;
    const formattedPhone = rawPhone?.replace(/\D/g, "");
    
    if (!formattedPhone || formattedPhone.length < 10) {
      return false;
    }

    // Generate AI response
    const aiResponse = await generateContextualResponse(partner, question);

    const response = await axios.post(
      `${WHATSAPP_API_URL}/${WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to: formattedPhone,
        type: "text",
        text: {
          body: aiResponse,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${WHATSAPP_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(`[WhatsApp] AI response sent to ${formattedPhone}`);
    return true;
  } catch (error) {
    console.error("[WhatsApp] Failed to send AI response:", error);
    return false;
  }
}

/**
 * Send promotional message
 */
export async function sendPromoMessage(
  phone: string,
  message: string
): Promise<boolean> {
  try {
    const WHATSAPP_API_URL = process.env.WHATSAPP_API_URL;
    const WHATSAPP_API_TOKEN = process.env.WHATSAPP_API_TOKEN;
    const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const WHATSAPP_BUSINESS_ACCOUNT_ID = process.env.WHATSAPP_BUSINESS_ACCOUNT_ID;

    if (!WHATSAPP_API_URL || !WHATSAPP_API_TOKEN || !WHATSAPP_PHONE_NUMBER_ID || !WHATSAPP_BUSINESS_ACCOUNT_ID) {
      return false;
    }

    const formattedPhone = phone.replace(/\D/g, "");

    const response = await axios.post(
      `${WHATSAPP_API_URL}/${WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to: formattedPhone,
        type: "text",
        text: {
          body: message,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${WHATSAPP_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(`[WhatsApp] Promo message sent to ${formattedPhone}`);
    return true;
  } catch (error) {
    console.error("[WhatsApp] Failed to send promo message:", error);
    return false;
  }
}
