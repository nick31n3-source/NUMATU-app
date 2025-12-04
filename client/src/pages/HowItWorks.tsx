import { Card } from "@/components/ui/card";
import { Building2, Truck, ShoppingCart, ArrowRight } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      icon: Building2,
      title: "Empresas Cadastram",
      description: "Empresas e geradores de resíduos cadastram os materiais recicláveis disponíveis no aplicativo, informando tipo, quantidade e localização.",
      details: [
        "Cadastro de materiais recicláveis",
        "Informações de quantidade e tipo",
        "Localização da coleta",
        "Agendamento de coleta",
      ],
    },
    {
      number: 2,
      icon: Truck,
      title: "Coletores Recebem Rotas",
      description: "O algoritmo NUMATU otimiza as rotas de coleta, conectando coletores autônomos com os melhores pontos de coleta para maximizar eficiência.",
      details: [
        "Rotas otimizadas em tempo real",
        "Previsão de pontos de coleta",
        "Acompanhamento de coletas",
        "Histórico de operações",
      ],
    },
    {
      number: 3,
      icon: ShoppingCart,
      title: "Compradores Encontram",
      description: "Compradores de materiais recicláveis encontram fornecedores qualificados e negociam diretamente através da plataforma NUMATU.",
      details: [
        "Catálogo de materiais disponíveis",
        "Preços competitivos",
        "Negociação direta",
        "Transações seguras",
      ],
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-b from-white to-green-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Como <span className="text-green-600">Funciona</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Um fluxo simples e eficiente que conecta todos os atores da cadeia de reciclagem.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                {/* Arrow between steps */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-20 -right-4 text-green-600 z-10">
                    <ArrowRight className="w-8 h-8" />
                  </div>
                )}

                <Card className="h-full p-8 hover:shadow-lg transition-all hover:border-green-300">
                  {/* Step number */}
                  <div className="inline-block mb-6">
                    <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-lg">
                      {step.number}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="mb-6">
                    <div className="inline-block p-4 bg-green-100 rounded-lg">
                      <Icon className="w-8 h-8 text-green-600" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Details */}
                  <ul className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-green-600 font-bold">•</span>
                        <span className="text-gray-700 text-sm">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Visual flow diagram */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            O Fluxo Completo
          </h3>
          <div className="space-y-4">
            {/* Flow row 1 */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              <div className="flex-1 bg-blue-50 rounded-lg p-6 text-center">
                <p className="font-semibold text-gray-900">Empresa</p>
                <p className="text-sm text-gray-600 mt-2">Cadastra resíduos</p>
              </div>
              <ArrowRight className="w-6 h-6 text-green-600 hidden lg:block" />
              <div className="flex-1 bg-green-50 rounded-lg p-6 text-center">
                <p className="font-semibold text-gray-900">NUMATU</p>
                <p className="text-sm text-gray-600 mt-2">Otimiza rotas</p>
              </div>
              <ArrowRight className="w-6 h-6 text-green-600 hidden lg:block" />
              <div className="flex-1 bg-orange-50 rounded-lg p-6 text-center">
                <p className="font-semibold text-gray-900">Coletor</p>
                <p className="text-sm text-gray-600 mt-2">Coleta material</p>
              </div>
            </div>

            {/* Flow row 2 */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              <div className="flex-1 bg-purple-50 rounded-lg p-6 text-center">
                <p className="font-semibold text-gray-900">Comprador</p>
                <p className="text-sm text-gray-600 mt-2">Encontra fornecedor</p>
              </div>
              <ArrowRight className="w-6 h-6 text-green-600 hidden lg:block rotate-180" />
              <div className="flex-1 bg-yellow-50 rounded-lg p-6 text-center">
                <p className="font-semibold text-gray-900">Transação</p>
                <p className="text-sm text-gray-600 mt-2">Negócio fechado</p>
              </div>
              <ArrowRight className="w-6 h-6 text-green-600 hidden lg:block rotate-180" />
              <div className="flex-1 bg-green-100 rounded-lg p-6 text-center">
                <p className="font-semibold text-gray-900">Impacto</p>
                <p className="text-sm text-gray-600 mt-2">Sustentabilidade</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
