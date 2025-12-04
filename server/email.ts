import axios from "axios";

/**
 * Email Service for Partner Registrations
 * Sends partner data to numatucorp@gmail.com
 */

interface PartnerEmailData {
  name: string;
  email: string;
  phone?: string;
  partnerType: "company" | "collector" | "buyer";
  companyName?: string;
  city?: string;
  state?: string;
  message?: string;
}

/**
 * Send partner registration email to numatucorp@gmail.com
 */
export async function sendPartnerRegistrationEmail(
  partner: PartnerEmailData
): Promise<boolean> {
  try {
    const FORGE_API_URL = process.env.BUILT_IN_FORGE_API_URL;
    const FORGE_API_KEY = process.env.BUILT_IN_FORGE_API_KEY;

    if (!FORGE_API_URL || !FORGE_API_KEY) {
      console.warn("[Email] Missing Forge API configuration");
      return false;
    }

    // Format partner type in Portuguese
    const partnerTypeLabel = {
      company: "Empresa Geradora de Resíduos",
      collector: "Coletor Autônomo",
      buyer: "Comprador de Materiais",
    }[partner.partnerType];

    // Build email content
    const emailContent = `
<html>
  <head>
    <meta charset="UTF-8">
    <style>
      body { font-family: Arial, sans-serif; color: #333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f5f5; }
      .header { background: linear-gradient(135deg, #1B8A4A 0%, #4CAF50 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
      .content { background: white; padding: 30px; }
      .field { margin-bottom: 15px; }
      .label { font-weight: bold; color: #1B8A4A; }
      .value { color: #666; margin-top: 5px; }
      .footer { background: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #999; border-radius: 0 0 8px 8px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>🌿 Novo Cadastro de Parceiro NUMATU</h1>
      </div>
      <div class="content">
        <h2>Informações do Cadastro</h2>
        
        <div class="field">
          <div class="label">Tipo de Parceiro:</div>
          <div class="value">${partnerTypeLabel}</div>
        </div>

        <div class="field">
          <div class="label">Nome Completo:</div>
          <div class="value">${partner.name}</div>
        </div>

        <div class="field">
          <div class="label">Email:</div>
          <div class="value"><a href="mailto:${partner.email}">${partner.email}</a></div>
        </div>

        ${partner.phone ? `
        <div class="field">
          <div class="label">Telefone:</div>
          <div class="value"><a href="tel:${partner.phone}">${partner.phone}</a></div>
        </div>
        ` : ""}

        ${partner.companyName ? `
        <div class="field">
          <div class="label">Nome da Empresa:</div>
          <div class="value">${partner.companyName}</div>
        </div>
        ` : ""}

        ${partner.city ? `
        <div class="field">
          <div class="label">Cidade:</div>
          <div class="value">${partner.city}${partner.state ? ` - ${partner.state}` : ""}</div>
        </div>
        ` : ""}

        ${partner.message ? `
        <div class="field">
          <div class="label">Mensagem:</div>
          <div class="value">${partner.message.replace(/\n/g, "<br>")}</div>
        </div>
        ` : ""}

        <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">

        <p style="background: #f0f9f6; padding: 15px; border-left: 4px solid #1B8A4A; border-radius: 4px;">
          <strong>Ação recomendada:</strong> Entre em contato com o parceiro em breve para confirmar interesse e fornecer próximos passos.
        </p>
      </div>
      <div class="footer">
        <p>Este é um email automático do sistema NUMATU. Não responda este email.</p>
        <p>© 2025 NUMATU - Logística Reversa Inteligente</p>
      </div>
    </div>
  </body>
</html>
    `;

    // Send email via Forge API (Manus built-in email service)
    const response = await axios.post(
      `${FORGE_API_URL}/api/email/send`,
      {
        to: "numatucorp@gmail.com",
        subject: `Novo Cadastro de Parceiro: ${partnerTypeLabel}`,
        html: emailContent,
        from: "noreply@numatu.app",
      },
      {
        headers: {
          Authorization: `Bearer ${FORGE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(`[Email] Partner registration email sent to numatucorp@gmail.com`);
    return true;
  } catch (error) {
    console.error("[Email] Failed to send partner registration email:", error);
    // Don't throw - this should not block partner registration
    return false;
  }
}

/**
 * Send confirmation email to partner
 */
export async function sendPartnerConfirmationEmail(
  partnerEmail: string,
  partnerName: string,
  partnerType: "company" | "collector" | "buyer"
): Promise<boolean> {
  try {
    const FORGE_API_URL = process.env.BUILT_IN_FORGE_API_URL;
    const FORGE_API_KEY = process.env.BUILT_IN_FORGE_API_KEY;

    if (!FORGE_API_URL || !FORGE_API_KEY) {
      return false;
    }

    const confirmationMessages = {
      company: `
        <p>Sua empresa foi cadastrada com sucesso como parceira NUMATU!</p>
        <p>Em breve, nossa equipe entrará em contato para:</p>
        <ul>
          <li>Confirmar seu interesse</li>
          <li>Explicar os próximos passos</li>
          <li>Oferecer suporte na implementação</li>
        </ul>
      `,
      collector: `
        <p>Seu cadastro como coletor foi recebido com sucesso!</p>
        <p>Nossa equipe entrará em contato para:</p>
        <ul>
          <li>Validar suas informações</li>
          <li>Explicar como funciona o NUMATU</li>
          <li>Começar a enviar rotas otimizadas</li>
        </ul>
      `,
      buyer: `
        <p>Seu cadastro como comprador foi recebido com sucesso!</p>
        <p>Nossa equipe entrará em contato para:</p>
        <ul>
          <li>Confirmar seu interesse</li>
          <li>Apresentar fornecedores disponíveis</li>
          <li>Facilitar suas primeiras negociações</li>
        </ul>
      `,
    };

    const emailContent = `
<html>
  <head>
    <meta charset="UTF-8">
    <style>
      body { font-family: Arial, sans-serif; color: #333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f5f5; }
      .header { background: linear-gradient(135deg, #1B8A4A 0%, #4CAF50 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
      .content { background: white; padding: 30px; }
      .cta { background: #1B8A4A; color: white; padding: 15px 30px; text-align: center; border-radius: 8px; margin: 20px 0; }
      .cta a { color: white; text-decoration: none; font-weight: bold; }
      .footer { background: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #999; border-radius: 0 0 8px 8px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>🌿 Bem-vindo ao NUMATU!</h1>
      </div>
      <div class="content">
        <p>Olá ${partnerName},</p>
        
        ${confirmationMessages[partnerType]}

        <p style="margin-top: 20px;">
          <strong>Telefone para contato:</strong> (86) 99586-2231<br>
          <strong>Email:</strong> numatucorp@gmail.com
        </p>

        <div class="cta">
          <a href="https://numatu.app">Visite nosso site</a>
        </div>

        <p style="background: #f0f9f6; padding: 15px; border-left: 4px solid #1B8A4A; border-radius: 4px;">
          Obrigado por se cadastrar no NUMATU! Estamos comprometidos em transformar a logística reversa e criar oportunidades sustentáveis.
        </p>
      </div>
      <div class="footer">
        <p>© 2025 NUMATU - Logística Reversa Inteligente</p>
      </div>
    </div>
  </body>
</html>
    `;

    const response = await axios.post(
      `${FORGE_API_URL}/api/email/send`,
      {
        to: partnerEmail,
        subject: "Bem-vindo ao NUMATU! 🌿",
        html: emailContent,
        from: "noreply@numatu.app",
      },
      {
        headers: {
          Authorization: `Bearer ${FORGE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(`[Email] Confirmation email sent to ${partnerEmail}`);
    return true;
  } catch (error) {
    console.error("[Email] Failed to send confirmation email:", error);
    return false;
  }
}
