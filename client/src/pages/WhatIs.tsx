import { Card } from "@/components/ui/card";
import { Recycle, Network, Target, TrendingUp } from "lucide-react";

export default function WhatIs() {
  const features = [
    {
      icon: Recycle,
      title: "Logística Reversa",
      description: "Um processo inovador que otimiza o fluxo de materiais recicláveis, desde sua origem até o destino final, gerando valor econômico e ambiental.",
    },
    {
      icon: Network,
      title: "Conexão Inteligente",
      description: "Conectamos empresas geradores de resíduos, coletores autônomos e compradores de materiais em uma plataforma única e eficiente.",
    },
    {
      icon: Target,
      title: "Otimização de Rotas",
      description: "Algoritmos inteligentes preveem os melhores pontos de coleta, reduzindo custos operacionais e maximizando a eficiência da coleta.",
    },
    {
      icon: TrendingUp,
      title: "Impacto Mensurável",
      description: "Acompanhe em tempo real o volume de materiais coletados, o impacto ambiental gerado e as oportunidades de negócio criadas.",
    },
  ];

  return (
    <section id="what-is" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            O que é <span className="text-green-600">NUMATU</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Um aplicativo de logística reversa que revoluciona a forma como empresas, coletores e compradores interagem no mercado de reciclagem.
          </p>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">
              Transformando Resíduos em Oportunidades
            </h3>
            <p className="text-gray-600 leading-relaxed">
              A logística reversa é o processo de retorno de produtos ou materiais do consumidor final até o produtor, gerando valor em cada etapa. NUMATU torna esse processo inteligente, eficiente e acessível para todos os atores da cadeia.
            </p>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-md bg-green-600 text-white">
                    ✓
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Sustentabilidade</h4>
                  <p className="text-gray-600">Reduz desperdícios e impacto ambiental</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-md bg-green-600 text-white">
                    ✓
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Eficiência</h4>
                  <p className="text-gray-600">Otimiza rotas e reduz custos operacionais</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-md bg-green-600 text-white">
                    ✓
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Lucratividade</h4>
                  <p className="text-gray-600">Gera receita através da venda de materiais</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 flex items-center justify-center">
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-block p-4 bg-green-600 rounded-full text-white mb-4">
                  <Recycle className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-gray-900">Ciclo Completo</h4>
                <p className="text-sm text-gray-600 mt-2">
                  De resíduo a recurso valioso
                </p>
              </div>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span>Geração de resíduos</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span>Coleta otimizada</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span>Triagem e processamento</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span>Venda para compradores</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="mb-4">
                  <div className="inline-block p-3 bg-green-100 rounded-lg">
                    <Icon className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
