import { Card } from "@/components/ui/card";
import { ArrowRight, Calendar, User } from "lucide-react";

export default function Blog() {
  const articles = [
    {
      id: 1,
      title: "O que é Logística Reversa e Por Que Importa",
      excerpt: "Entenda como a logística reversa está transformando a forma como as empresas lidam com resíduos e sustentabilidade.",
      content: `A logística reversa é o processo de trazer produtos e materiais de volta para o ciclo produtivo, evitando que acabem em aterros sanitários. É uma estratégia essencial para empresas que desejam ser sustentáveis.

Com a logística reversa, você consegue:
- Reduzir custos operacionais
- Cumprir legislação ambiental
- Melhorar imagem da marca
- Gerar receita extra com venda de materiais

NUMATU automatiza todo esse processo, conectando empresas, coletores e compradores em uma plataforma integrada.`,
      category: "Sustentabilidade",
      author: "Equipe NUMATU",
      date: "15 de Dezembro de 2025",
      readTime: "5 min",
      image: "🌍",
    },
    {
      id: 2,
      title: "Estatísticas Alarmantes: A Crise do Lixo no Brasil",
      excerpt: "Descubra números impressionantes sobre geração de resíduos e reciclagem no Brasil e como NUMATU ajuda a resolver.",
      content: `Os números sobre resíduos no Brasil são preocupantes:

📊 79 milhões de toneladas de resíduos gerados anualmente
♻️ Apenas 3% é reciclado
🏭 Milhões de toneladas vão para aterros sanitários
💰 Bilhões em oportunidades perdidas

A boa notícia? Soluções como NUMATU estão mudando esse cenário:
- Aumentando taxa de reciclagem
- Criando oportunidades de renda
- Reduzindo impacto ambiental
- Gerando valor econômico

Cada empresa que adota logística reversa contribui para uma mudança real.`,
      category: "Dados e Análise",
      author: "Pesquisa NUMATU",
      date: "12 de Dezembro de 2025",
      readTime: "4 min",
      image: "📊",
    },
    {
      id: 3,
      title: "Como Empresas Reduzem Custos com Reciclagem",
      excerpt: "Casos reais de empresas que economizaram milhares com logística reversa e sustentabilidade.",
      content: `Muitas empresas ainda pensam que ser sustentável é caro. Mas a realidade é diferente!

Caso 1: Indústria de Alimentos
- Custos anteriores: R$ 5.000/mês com coleta
- Com NUMATU: R$ 2.750/mês
- Economia: R$ 2.250/mês = R$ 27 mil/ano

Caso 2: Varejo
- Custos anteriores: R$ 8.000/mês
- Com NUMATU: R$ 4.800/mês
- Economia: R$ 3.200/mês = R$ 38.400/ano

Além da economia, essas empresas:
✅ Melhoraram imagem no mercado
✅ Cumpriram legislação ambiental
✅ Aumentaram satisfação de clientes
✅ Geraram receita com venda de materiais

A sustentabilidade é um investimento, não um custo!`,
      category: "Casos de Sucesso",
      author: "Equipe NUMATU",
      date: "10 de Dezembro de 2025",
      readTime: "6 min",
      image: "💰",
    },
    {
      id: 4,
      title: "Legislação Ambiental: O Que Você Precisa Saber",
      excerpt: "Conheça as principais leis e regulamentações sobre responsabilidade ambiental e logística reversa.",
      content: `A legislação ambiental está cada vez mais rigorosa. Conheça as principais:

📋 Lei de Responsabilidade Estendida do Produtor (LREP)
- Obriga produtores a gerenciar fim de vida dos produtos
- Aplicável a diversos setores
- Multas pesadas para não conformidade

📋 Política Nacional de Resíduos Sólidos (PNRS)
- Define diretrizes para gestão de resíduos
- Obriga segregação e reciclagem
- Responsabilidade compartilhada

📋 Normas ISO 14001
- Padrão internacional de gestão ambiental
- Melhora credibilidade da empresa
- Acesso a novos mercados

Com NUMATU, você garante:
✅ Conformidade total com legislação
✅ Rastreabilidade completa
✅ Documentação automatizada
✅ Proteção contra multas

Não deixe sua empresa em risco!`,
      category: "Legislação",
      author: "Consultoria Ambiental",
      date: "08 de Dezembro de 2025",
      readTime: "7 min",
      image: "⚖️",
    },
    {
      id: 5,
      title: "Economia Circular: O Futuro dos Negócios",
      excerpt: "Entenda o conceito de economia circular e como sua empresa pode se beneficiar dessa tendência global.",
      content: `Economia circular é o modelo de negócio do futuro. Diferente da economia linear (produzir, usar, descartar), a economia circular busca:

🔄 Reutilizar materiais
♻️ Estender vida útil dos produtos
🌱 Minimizar desperdício
💚 Gerar valor contínuo

Benefícios da Economia Circular:
- Redução de custos de matéria-prima
- Acesso a novos mercados
- Melhoria de imagem corporativa
- Atração de investidores ESG
- Criação de empregos

Como NUMATU Facilita:
✅ Conecta você com fornecedores de materiais reciclados
✅ Otimiza rotas de coleta
✅ Automatiza processos
✅ Gera dados para decisões

Empresas líderes já adotaram economia circular. Sua empresa está pronta?`,
      category: "Inovação",
      author: "Equipe NUMATU",
      date: "05 de Dezembro de 2025",
      readTime: "5 min",
      image: "🔄",
    },
    {
      id: 6,
      title: "Dicas Práticas: Como Começar com Logística Reversa",
      excerpt: "Guia prático com 10 passos para implementar logística reversa na sua empresa hoje mesmo.",
      content: `Quer começar com logística reversa? Aqui estão 10 passos práticos:

1️⃣ Diagnóstico: Mapeie seus resíduos
2️⃣ Segregação: Separe por tipo
3️⃣ Armazenamento: Organize espaço
4️⃣ Parceiros: Encontre coletores
5️⃣ Documentação: Mantenha registros
6️⃣ Treinamento: Capacite equipe
7️⃣ Monitoramento: Acompanhe métricas
8️⃣ Otimização: Melhore continuamente
9️⃣ Comunicação: Divulgue iniciativa
🔟 Escala: Expanda para novos materiais

Com NUMATU, todos esses passos ficam mais fáceis:
✅ Plataforma integrada
✅ Conexão com parceiros
✅ Rastreabilidade automática
✅ Relatórios em tempo real

Comece hoje mesmo!`,
      category: "Guia Prático",
      author: "Equipe NUMATU",
      date: "03 de Dezembro de 2025",
      readTime: "8 min",
      image: "📋",
    },
  ];

  return (
    <section id="blog" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Blog <span className="text-green-600">NUMATU</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Artigos educativos sobre logística reversa, sustentabilidade e impacto ambiental.
          </p>
        </div>

        {/* Featured Article */}
        <div className="mb-16">
          <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 lg:p-12">
              <div className="flex items-center justify-center text-8xl">
                {articles[0].image}
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                    {articles[0].category}
                  </span>
                  <span className="text-gray-500 text-sm">{articles[0].readTime}</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  {articles[0].title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {articles[0].excerpt}
                </p>
                <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {articles[0].author}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {articles[0].date}
                  </div>
                </div>
                <button className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold group">
                  Ler Artigo Completo
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </Card>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.slice(1).map((article) => (
            <Card
              key={article.id}
              className="overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <div className="p-8 flex-1 flex flex-col">
                <div className="text-5xl mb-4">{article.image}</div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                    {article.category}
                  </span>
                  <span className="text-gray-400 text-xs">{article.readTime}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-gray-600 text-sm mb-6 flex-1 line-clamp-3">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="text-xs text-gray-500">
                    <p className="font-medium">{article.author}</p>
                    <p>{article.date}</p>
                  </div>
                  <button className="text-green-600 hover:text-green-700 transition-colors">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">
            Quer receber nossos artigos por email?
          </p>
          <div className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="seu@email.com"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
            />
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all">
              Inscrever
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
