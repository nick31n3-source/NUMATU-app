import nodemailer from "nodemailer";
import { Partner } from "../drizzle/schema";

/**
 * Email Service for NUMATU
 * Sends partner registration information to numatucorp@gmail.com
 */

let transporter: any = null;

/**
 * Initialize the email transporter
 */
function initializeTransporter() {
  if (transporter) return transporter;

  const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = parseInt(process.env.SMTP_PORT || "587");
  const smtpUser = process.env.SMTP_USER;
  const smtpPassword = process.env.SMTP_PASSWORD;

  if (!smtpUser || !smtpPassword) {
    console.warn("[Email] SMTP credentials not configured. Email service will be disabled.");
    return null;
  }

  transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465, // true for 465, false for other ports
    auth: {
      user: smtpUser,
      pass: smtpPassword,
    },
  });

  return transporter;
}

/**
 * Send partner registration email to numatucorp@gmail.com
 */
export async function sendPartnerRegistrationEmail(partner: Partner): Promise<boolean> {
  try {
    const transporter = initializeTransporter();
    if (!transporter) {
      console.warn("[Email] Email service not configured. Skipping email notification.");
      return false;
    }

    const partnerTypeLabel = {
      company: "Empresa",
      collector: "Coletor",
      buyer: "Comprador",
    }[partner.partnerType] || "Parceiro";

    const emailContent = `
      <h2>Novo Cadastro de Parceiro - NUMATU</h2>
      
      <p><strong>Tipo de Parceiro:</strong> ${partnerTypeLabel}</p>
      
      <h3>Informações Pessoais</h3>
      <ul>
        <li><strong>Nome:</strong> ${partner.name}</li>
        <li><strong>Email:</strong> ${partner.email}</li>
        <li><strong>Telefone:</strong> ${partner.phone || "Não informado"}</li>
        <li><strong>WhatsApp:</strong> ${partner.whatsappNumber || "Não informado"}</li>
      </ul>
      
      <h3>Informações Profissionais</h3>
      <ul>
        <li><strong>Empresa:</strong> ${partner.companyName || "Não informado"}</li>
        <li><strong>Cidade:</strong> ${partner.city || "Não informado"}</li>
        <li><strong>Estado:</strong> ${partner.state || "Não informado"}</li>
      </ul>
      
      <h3>Mensagem</h3>
      <p>${partner.message || "Sem mensagem adicional"}</p>
      
      <hr>
      <p><small>Cadastro realizado em: ${new Date().toLocaleString("pt-BR")}</small></p>
    `;

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: "numatucorp@gmail.com",
      subject: `Novo Cadastro de Parceiro - ${partnerTypeLabel}`,
      html: emailContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[Email] Partner registration email sent successfully. Message ID: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error("[Email] Failed to send partner registration email:", error);
    return false;
  }
}

/**
 * Send welcome email to partner
 */
export async function sendPartnerWelcomeEmail(partner: Partner): Promise<boolean> {
  try {
    const transporter = initializeTransporter();
    if (!transporter) {
      console.warn("[Email] Email service not configured. Skipping welcome email.");
      return false;
    }

    const partnerTypeMessage = {
      company: "Bem-vindo à NUMATU! Sua empresa foi cadastrada com sucesso como parceira.",
      collector: "Bem-vindo à NUMATU! Seu cadastro como coletor foi aprovado.",
      buyer: "Bem-vindo à NUMATU! Seu cadastro como comprador foi confirmado.",
    }[partner.partnerType] || "Bem-vindo à NUMATU!";

    const emailContent = `
      <h2>Bem-vindo à NUMATU! 🌿</h2>
      
      <p>Olá ${partner.name},</p>
      
      <p>${partnerTypeMessage}</p>
      
      <h3>Próximos Passos</h3>
      <ol>
        <li>Acesse o portal NUMATU em https://numatu.com.br</li>
        <li>Faça login com seu email: ${partner.email}</li>
        <li>Complete seu perfil</li>
        <li>Comece a colaborar com a NUMATU</li>
      </ol>
      
      <h3>Suporte</h3>
      <p>Se tiver dúvidas ou precisar de ajuda, entre em contato conosco:</p>
      <ul>
        <li>Email: numatucorp@gmail.com</li>
        <li>Telefone: (86) 99586-2231</li>
      </ul>
      
      <p>Obrigado por fazer parte da NUMATU!</p>
      
      <hr>
      <p><small>Reciclar é transformar. Vamos juntos! 💚</small></p>
    `;

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: partner.email,
      subject: "Bem-vindo à NUMATU!",
      html: emailContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[Email] Welcome email sent to ${partner.email}. Message ID: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error("[Email] Failed to send welcome email:", error);
    return false;
  }
}
