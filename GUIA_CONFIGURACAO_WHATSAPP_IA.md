# Guia de Configuração - WhatsApp Business API e Agente de IA

**Autor:** Manus AI  
**Data:** 04 de Dezembro de 2025  
**Projeto:** NUMATU - Logística Reversa Inteligente

## 1. Visão Geral das Novas Funcionalidades

O projeto NUMATU foi atualizado com as seguintes melhorias:

### 1.1. Suporte Dual para Bancos de Dados
- **PostgreSQL** e **MySQL** são agora suportados automaticamente
- O tipo de banco de dados é detectado automaticamente baseado na URL em `DATABASE_URL`
- Não é necessário alterar configurações - apenas forneça a URL correta

### 1.2. Persistência de Dados de Parceiros
- Os dados dos formulários de parceiros agora são **salvos no banco de dados**
- Anteriormente, os dados eram apenas enviados por e-mail
- Isso permite o desenvolvimento futuro do Dashboard de Parceiros

### 1.3. Agente de IA Integrado
- Mensagens de boas-vindas são agora **geradas dinamicamente pela IA** (OpenAI)
- As mensagens são personalizadas baseadas no tipo de parceiro e informações fornecidas
- Suporte para responder perguntas de parceiros via IA

### 1.4. Integração WhatsApp + IA
- Quando um parceiro preenche o formulário, uma mensagem **personalizada pela IA** é enviada via WhatsApp
- O agente de IA pode responder perguntas dos parceiros em tempo real

---

## 2. Configuração do WhatsApp Business API

### 2.1. Obter Credenciais do WhatsApp

Para usar a integração com WhatsApp, você precisa de uma conta **WhatsApp Business** e criar uma aplicação no **Meta Developer Console**.

#### Passos:

1. **Acesse o Meta Developer Console**
   - Visite: https://developers.facebook.com/
   - Faça login com sua conta Meta/Facebook

2. **Crie uma Aplicação (se não tiver)**
   - Clique em "Meus Apps" → "Criar Aplicação"
   - Escolha "Negócios" como tipo
   - Preencha as informações da aplicação

3. **Configure WhatsApp Business**
   - Na seção "Produtos", procure por "WhatsApp"
   - Clique em "Configurar"
   - Siga o fluxo de configuração

4. **Obtenha as Credenciais**
   - **WHATSAPP_API_URL**: `https://graph.instagram.com/v18.0` (ou versão mais recente)
   - **WHATSAPP_PHONE_NUMBER_ID**: Encontre em "Configurações da API" → "Números de Telefone"
   - **WHATSAPP_API_TOKEN**: Gere um token de acesso em "Configurações" → "Tokens de Acesso"

### 2.2. Atualizar o Arquivo `.env.local`

Abra o arquivo `.env.local` na raiz do projeto e preencha as variáveis:

```env
# WhatsApp Business API Configuration
WHATSAPP_API_URL=https://graph.instagram.com/v18.0
WHATSAPP_API_TOKEN=seu-token-de-acesso-aqui
WHATSAPP_PHONE_NUMBER_ID=seu-phone-number-id-aqui
WHATSAPP_BUSINESS_ACCOUNT_ID=seu-business-account-id-aqui
```

### 2.3. Testar a Integração

Você pode testar enviando uma mensagem de teste:

```bash
curl -X POST "https://graph.instagram.com/v18.0/{WHATSAPP_PHONE_NUMBER_ID}/messages" \
  -H "Authorization: Bearer {WHATSAPP_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "messaging_product": "whatsapp",
    "to": "5586999999999",
    "type": "text",
    "text": {
      "body": "Olá! Esta é uma mensagem de teste."
    }
  }'
```

---

## 3. Configuração do Agente de IA (OpenAI)

### 3.1. Obter Chave de API do OpenAI

1. **Acesse OpenAI**
   - Visite: https://platform.openai.com/
   - Faça login ou crie uma conta

2. **Gere uma Chave de API**
   - Clique no seu perfil (canto superior direito)
   - Selecione "API keys"
   - Clique em "Create new secret key"
   - Copie a chave (ela será exibida apenas uma vez)

3. **Configure Billing**
   - Vá para "Billing" → "Overview"
   - Configure um método de pagamento
   - Defina limites de gastos se desejar

### 3.2. Atualizar o Arquivo `.env.local`

```env
# OpenAI Configuration (para o agente de IA)
OPENAI_API_KEY=sk-proj-seu-openai-key-aqui
```

### 3.3. Modelos Disponíveis

O projeto está configurado para usar o modelo **`gpt-4.1-mini`**, que oferece:
- ✅ Bom custo-benefício
- ✅ Respostas rápidas
- ✅ Qualidade suficiente para respostas personalizadas

Você pode alterar o modelo em `server/ai_agent.ts` se desejar usar um modelo diferente:

```typescript
// Alterar esta linha em server/ai_agent.ts
model: "gpt-4.1-mini",  // Mude para "gpt-4", "gpt-3.5-turbo", etc.
```

### 3.4. Estimativa de Custos

- **Custo por mensagem gerada**: ~$0.0001 - $0.001 (dependendo do modelo)
- **Exemplo**: 1000 parceiros gerando mensagens = ~$0.10 - $1.00

---

## 4. Estrutura de Dados Atualizada

### 4.1. Tabela `partners` (Atualizada)

A tabela `partners` agora inclui um novo campo:

| Campo | Tipo | Descrição |
| :--- | :--- | :--- |
| `id` | INTEGER | ID único do parceiro (chave primária) |
| `name` | VARCHAR(255) | Nome do parceiro |
| `email` | VARCHAR(320) | Email do parceiro |
| `phone` | VARCHAR(20) | Telefone do parceiro |
| **`whatsappNumber`** | VARCHAR(20) | **NOVO**: Número de WhatsApp (pode ser diferente do telefone) |
| `partnerType` | ENUM | Tipo de parceiro (company, collector, buyer) |
| `companyName` | VARCHAR(255) | Nome da empresa (opcional) |
| `city` | VARCHAR(100) | Cidade do parceiro |
| `state` | VARCHAR(2) | Estado do parceiro |
| `message` | TEXT | Mensagem adicional do parceiro |
| `createdAt` | TIMESTAMP | Data de criação |
| `updatedAt` | TIMESTAMP | Data de última atualização |

---

## 5. Fluxo de Funcionamento

### 5.1. Quando um Parceiro Preenche o Formulário

```
1. Parceiro preenche o formulário no frontend
   ↓
2. Dados são enviados para a rota `/partners/submit`
   ↓
3. Dados são validados e salvos no banco de dados
   ↓
4. IA gera uma mensagem personalizada baseada nos dados do parceiro
   ↓
5. Mensagem é enviada via WhatsApp Business API
   ↓
6. Proprietário recebe notificação por email
   ↓
7. Parceiro recebe mensagem de boas-vindas no WhatsApp
```

### 5.2. Quando um Parceiro Faz uma Pergunta

```
1. Parceiro envia uma pergunta via formulário ou WhatsApp
   ↓
2. Pergunta é enviada para a rota `/partners/askQuestion`
   ↓
3. IA gera uma resposta contextualizada
   ↓
4. Resposta é enviada via WhatsApp Business API
```

---

## 6. Variáveis de Ambiente Completas

Aqui está o arquivo `.env.local` completo com todas as variáveis necessárias:

```env
# Database Configuration (PostgreSQL ou MySQL)
DATABASE_URL=postgresql://usuario:senha@host:porta/banco_de_dados
# OU
DATABASE_URL=mysql://usuario:senha@host:porta/banco_de_dados

# JWT Configuration
JWT_SECRET=sua-chave-secreta-aqui

# Application Configuration
VITE_APP_TITLE=NUMATU
VITE_APP_LOGO=https://seu-logo-url.com/logo.png

# WhatsApp Business API Configuration
WHATSAPP_API_URL=https://graph.instagram.com/v18.0
WHATSAPP_API_TOKEN=seu-token-whatsapp-aqui
WHATSAPP_PHONE_NUMBER_ID=seu-phone-number-id-aqui
WHATSAPP_BUSINESS_ACCOUNT_ID=seu-business-account-id-aqui

# OpenAI Configuration (para o agente de IA)
OPENAI_API_KEY=sk-proj-seu-openai-key-aqui

# Owner Configuration
OWNER_OPEN_ID=seu-owner-id-aqui
```

---

## 7. Testes Locais

### 7.1. Testar Sem WhatsApp Real

Se você não tiver credenciais reais do WhatsApp, o sistema funcionará normalmente:
- Os dados do parceiro serão salvos no banco de dados ✅
- A IA gerará mensagens personalizadas ✅
- O WhatsApp falhará silenciosamente (não bloqueará o fluxo) ⚠️

### 7.2. Testar Com Mock

Para testar sem usar tokens reais, você pode modificar `server/whatsapp.ts` para retornar `true` quando as credenciais estiverem faltando:

```typescript
if (!WHATSAPP_API_URL || !WHATSAPP_API_TOKEN || !WHATSAPP_PHONE_NUMBER_ID) {
  console.log("[WhatsApp] Mock: Mensagem enviada com sucesso");
  return true; // Retornar true para simular sucesso
}
```

---

## 8. Troubleshooting

### 8.1. "DATABASE_URL is required"

**Problema**: A variável `DATABASE_URL` não está definida.

**Solução**: Adicione a variável ao arquivo `.env.local`:
```env
DATABASE_URL=postgresql://usuario:senha@host:porta/banco_de_dados
```

### 8.2. "Failed to connect to database"

**Problema**: O banco de dados não está acessível.

**Solução**: 
- Verifique se a URL está correta
- Verifique se o banco de dados está rodando
- Verifique as credenciais (usuário/senha)

### 8.3. "OPENAI_API_KEY is not set"

**Problema**: A chave de API do OpenAI não está configurada.

**Solução**: Adicione ao `.env.local`:
```env
OPENAI_API_KEY=sk-proj-seu-openai-key-aqui
```

### 8.4. "WhatsApp message failed to send"

**Problema**: A mensagem WhatsApp não foi enviada.

**Solução**:
- Verifique se `WHATSAPP_API_TOKEN` é válido
- Verifique se `WHATSAPP_PHONE_NUMBER_ID` está correto
- Verifique se o número de telefone do parceiro está no formato correto (com código de país)
- Verifique se a conta WhatsApp está ativa

---

## 9. Próximas Etapas

Com essa configuração, você tem:
- ✅ Persistência de dados de parceiros
- ✅ Agente de IA para gerar respostas personalizadas
- ✅ Integração com WhatsApp Business API
- ✅ Suporte para PostgreSQL e MySQL

**Próximas funcionalidades sugeridas**:
1. Dashboard de Parceiros para visualizar dados salvos
2. Sistema de agendamento para enviar mensagens de follow-up
3. Análise de sentimento das mensagens dos parceiros
4. Integração com CRM para gerenciar relacionamento com parceiros

---

## 10. Referências

- [Meta Developer Console](https://developers.facebook.com/)
- [WhatsApp Business API Documentation](https://developers.facebook.com/docs/whatsapp/cloud-api/get-started)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)

---

**Versão**: 1.0.0  
**Última Atualização**: 04 de Dezembro de 2025
