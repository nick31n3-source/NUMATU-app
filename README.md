# 🌿 NUMATU - Logística Reversa Inteligente

**Projeto Integrador** desenvolvido por alunos do curso Técnico em Logística do **Senac Parnaíba**.

NUMATU é um aplicativo inovador que conecta **empresas, coletores e compradores de materiais recicláveis**, otimizando a coleta e destinação de resíduos através de rotas inteligentes e logística reversa eficiente.

---

## 📋 Sobre o Projeto

### O que é NUMATU?

Um aplicativo de **logística reversa** que visa otimizar a coleta e destinação de materiais recicláveis, conectando diferentes atores do processo:

- **Empresas Geradoras de Resíduos** - Cadastram materiais para coleta
- **Coletores Autônomos** - Recebem rotas otimizadas em tempo real
- **Compradores de Materiais** - Encontram fornecedores de recicláveis

### Objetivos

✅ Conectar diferentes atores da cadeia de reciclagem  
✅ Otimizar rotas de coleta com inteligência artificial  
✅ Prever os melhores pontos de coleta  
✅ Maximizar o impacto ambiental positivo  
✅ Gerar oportunidades de negócio sustentável  

### Desenvolvido Por

👥 Alunos do Curso Técnico em Logística - Senac Parnaíba  
📅 Apresentado em Agosto de 2025  
🏆 Projeto Integrador - Demonstração de Habilidades Práticas  

---

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 19** - Interface de usuário
- **TypeScript** - Tipagem estática
- **Tailwind CSS 4** - Estilização responsiva
- **Shadcn/UI** - Componentes de alta qualidade
- **Wouter** - Roteamento leve
- **TanStack Query** - Gerenciamento de estado

### Backend
- **Express 4** - Servidor web
- **tRPC 11** - API type-safe
- **Drizzle ORM** - Gerenciamento de banco de dados
- **MySQL/TiDB** - Banco de dados relacional
- **Node.js** - Runtime JavaScript

### Integrações
- **Google Maps API** - Visualização de pontos de coleta
- **WhatsApp Business API** - Automação de mensagens
- **Manus OAuth** - Autenticação segura
- **Axios** - Cliente HTTP

---

## 📁 Estrutura do Projeto

```
numatu_app/
├── client/                      # Frontend React
│   ├── src/
│   │   ├── pages/              # Componentes de páginas
│   │   │   ├── Home.tsx        # Página inicial
│   │   │   ├── Hero.tsx        # Seção hero
│   │   │   ├── WhatIs.tsx      # Seção "O que é"
│   │   │   ├── HowItWorks.tsx  # Seção "Como funciona"
│   │   │   ├── MapSection.tsx  # Mapa integrado
│   │   │   ├── Testimonials.tsx # Depoimentos
│   │   │   ├── Blog.tsx        # Blog educativo
│   │   │   ├── PartnerForm.tsx # Formulário de cadastro
│   │   │   ├── Contact.tsx     # Seção de contato
│   │   │   ├── Developers.tsx  # Sobre desenvolvedores
│   │   │   └── Footer.tsx      # Footer
│   │   ├── components/         # Componentes reutilizáveis
│   │   ├── contexts/           # React contexts
│   │   ├── hooks/              # Custom hooks
│   │   ├── lib/                # Utilitários
│   │   ├── App.tsx             # Roteamento principal
│   │   ├── main.tsx            # Entry point
│   │   └── index.css           # Estilos globais
│   └── public/                 # Assets estáticos
│
├── server/                      # Backend Express + tRPC
│   ├── routers.ts              # Definição de rotas API
│   ├── db.ts                   # Funções de banco de dados
│   ├── email.ts                # Serviço de envio de emails
│   ├── whatsapp.ts             # Integração WhatsApp
│   ├── partners.submit.test.ts # Testes unitários
│   ├── auth.logout.test.ts     # Testes de autenticação
│   └── _core/                  # Framework core (não editar)
│
├── drizzle/                     # Migrações e schema
│   ├── schema.ts               # Definição de tabelas
│   └── migrations/             # Histórico de migrações
│
├── shared/                      # Código compartilhado
│   └── const.ts                # Constantes globais
│
├── storage/                     # Integração S3
│   └── index.ts                # Funções de armazenamento
│
├── package.json                # Dependências do projeto
├── tsconfig.json               # Configuração TypeScript
├── tailwind.config.ts          # Configuração Tailwind
├── vite.config.ts              # Configuração Vite
└── README.md                   # Este arquivo
```

---

## 🛠️ Instalação e Setup

### Pré-requisitos
- Node.js 18+
- pnpm (gerenciador de pacotes)
- Git

### Passo 1: Clonar o Repositório
```bash
git clone https://github.com/seu-usuario/numatu-app.git
cd numatu-app
```

### Passo 2: Instalar Dependências
```bash
pnpm install
```

### Passo 3: Configurar Variáveis de Ambiente
Crie um arquivo `.env.local` na raiz do projeto:
```env
DATABASE_URL=mysql://usuario:senha@localhost:3306/numatu
JWT_SECRET=sua-chave-secreta-aqui
VITE_APP_TITLE=NUMATU
VITE_APP_LOGO=https://seu-logo-url.com/logo.png
WHATSAPP_API_URL=https://api.whatsapp.com
WHATSAPP_API_TOKEN=seu-token-aqui
```

### Passo 4: Inicializar Banco de Dados
```bash
pnpm db:push
```

### Passo 5: Iniciar o Servidor de Desenvolvimento
```bash
pnpm dev
```

O servidor estará disponível em `http://localhost:3000`

---

## 📚 Documentação

### Guias Disponíveis

- **[GUIA_TRANSFERENCIA_NUMATU.md](./GUIA_TRANSFERENCIA_NUMATU.md)** - Como transferir para outra conta Manus
- **[GUIA_RAPIDO_EDICOES.md](./GUIA_RAPIDO_EDICOES.md)** - Guia rápido para edições comuns
- **[todo.md](./todo.md)** - Lista de features e tarefas

---

## 🔧 Comandos Úteis

```bash
# Desenvolvimento
pnpm dev              # Iniciar servidor de desenvolvimento
pnpm build            # Build para produção
pnpm start            # Iniciar servidor em produção

# Banco de Dados
pnpm db:push          # Atualizar schema do banco
pnpm db:studio        # Abrir Drizzle Studio

# Testes
pnpm test             # Executar testes com Vitest
pnpm test:watch       # Modo watch para testes

# Qualidade de Código
pnpm check            # Verificar erros TypeScript
pnpm format           # Formatar código com Prettier
pnpm lint             # Lint com ESLint (se configurado)
```

---

## 📊 Funcionalidades Principais

### Landing Page
- ✅ Hero section com CTA destacado
- ✅ Seção "O que é" explicando logística reversa
- ✅ Seção "Como funciona" com fluxo em 3 etapas
- ✅ Seção de impacto e credibilidade Senac
- ✅ Mapa integrado com pontos de coleta
- ✅ Depoimentos de parceiros
- ✅ Blog educativo sobre sustentabilidade

### Formulário de Cadastro
- ✅ Cadastro para Empresas, Coletores e Compradores
- ✅ Validação de dados em tempo real
- ✅ Envio automático de emails de confirmação
- ✅ Integração com WhatsApp Business
- ✅ Dados não persistem no banco (apenas enviados por email)

### Backend
- ✅ API tRPC type-safe
- ✅ Autenticação OAuth
- ✅ Envio de emails automático
- ✅ Integração WhatsApp
- ✅ Testes unitários com Vitest

---

## 🌐 Contato e Suporte

**Email:** numatucorp@gmail.com  
**Telefone:** (86) 99586-2231  
**Instagram:** [@tecnicos_logistica2024](https://instagram.com/tecnicos_logistica2024)  

---

## 📝 Licença

Este projeto é desenvolvido como parte do Projeto Integrador do Senac Parnaíba.

---

## 🤝 Contribuindo

Para contribuir com melhorias:

1. Faça um Fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📌 Status do Projeto

- ✅ Landing page completa
- ✅ Formulário de cadastro funcional
- ✅ Integração de emails
- ✅ Integração WhatsApp Business
- ✅ Mapa com pontos de coleta
- ✅ Blog educativo
- ⏳ Dashboard de parceiros (em desenvolvimento)
- ⏳ Sistema de rotas otimizadas (em desenvolvimento)
- ⏳ Integração com sistemas de pagamento (planejado)

---

## 🎯 Roadmap

### Q4 2025
- [ ] Dashboard para parceiros
- [ ] Sistema de rotas otimizadas
- [ ] Integração com Stripe

### Q1 2026
- [ ] App mobile (React Native)
- [ ] Sistema de notificações push
- [ ] Analytics avançado

### Q2 2026
- [ ] IA para previsão de demanda
- [ ] Integração com ERPs
- [ ] Marketplace de materiais

---

## 🙏 Agradecimentos

Agradecimentos especiais ao **Senac Parnaíba** e aos professores que orientaram este projeto.

Desenvolvido com ❤️ por alunos do Técnico em Logística.

---

**Versão:** 1.0.0  
**Data:** Dezembro 2025  
**Projeto:** NUMATU - Logística Reversa Inteligente
