import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function PlansSection() {
  const plans = [
    {
      name: "Plano Básico",
      price: "Gratuito",
      period: "Sempre",
      description: "Perfeito para começar",
      color: "from-green-50 to-white",
      borderColor: "border-green-200",
      features: [
        "Cadastro de empresa/coletor",
        "Acesso ao mapa de pontos",
        "Suporte por email",
        "Até 5 rotas/mês",
      ],
      cta: "Começar Agora",
      highlighted: false,
    },
    {
      name: "Plano Profissional",
      price: "R$ 99,90",
      period: "/mês",
      description: "Ideal para negócios em crescimento",
      color: "from-green-600 to-green-500",
      borderColor: "border-green-600",
      textColor: "text-white",
      features: [
        "Tudo do Plano Básico",
        "Rotas otimizadas ilimitadas",
        "Dashboard analítico",
        "Integração WhatsApp",
        "Suporte prioritário",
        "Relatórios mensais",
      ],
      cta: "Contratar Agora",
      highlighted: true,
    },
    {
      name: "Plano Empresarial",
      price: "R$ 299,90",
      period: "/mês",
      description: "Para grandes operações",
      color: "from-green-50 to-white",
      borderColor: "border-green-200",
      features: [
        "Tudo do Plano Profissional",
        "API customizada",
        "Múltiplos usuários",
        "Integrações avançadas",
        "Suporte 24/7",
        "Consultor dedicado",
        "Análise preditiva",
      ],
      cta: "Solicitar Demo",
      highlighted: false,
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Confira o melhor plano para você e monte sua rede de reciclagem agora mesmo!
          </h2>
          <p className="text-xl text-gray-600">
            Escolha o plano que melhor se adequa ao seu negócio
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, idx) => (
            <Card
              key={idx}
              className={`overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                plan.highlighted ? "md:scale-105 shadow-xl" : ""
              } border-2 ${plan.borderColor}`}
            >
              <div
                className={`bg-gradient-to-br ${plan.color} p-8 ${
                  plan.textColor || "text-gray-900"
                }`}
              >
                {plan.highlighted && (
                  <div className="bg-yellow-400 text-green-900 font-bold px-4 py-2 rounded-full inline-block mb-4 text-sm">
                    ⭐ Mais Popular
                  </div>
                )}

                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className={`text-sm opacity-75 mb-6`}>{plan.description}</p>

                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-sm opacity-75">{plan.period}</span>
                </div>

                <Button
                  className={`w-full font-bold py-6 text-lg rounded-lg transition-all ${
                    plan.highlighted
                      ? "bg-yellow-400 hover:bg-yellow-500 text-green-900"
                      : "bg-green-600 hover:bg-green-700 text-white"
                  }`}
                >
                  {plan.cta}
                </Button>
              </div>

              <div className="p-8">
                <p className="font-bold text-gray-900 mb-6">Incluso neste plano:</p>
                <ul className="space-y-4">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-2xl p-12 mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Por que escolher NUMATU?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "💳",
                title: "Múltiplos Pagamentos",
                desc: "Cartão, boleto, PIX e mais",
              },
              {
                icon: "🎨",
                title: "Personalizável",
                desc: "Adapte conforme seu negócio",
              },
              {
                icon: "🔒",
                title: "Segurança",
                desc: "Dados protegidos e confiáveis",
              },
              {
                icon: "📊",
                title: "Relatórios",
                desc: "Análise completa de dados",
              },
            ].map((benefit, idx) => (
              <div key={idx} className="text-center">
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h4 className="font-bold text-gray-900 mb-2">{benefit.title}</h4>
                <p className="text-gray-600 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-6">
            Pronto para transformar sua logística?
          </p>
          <Button className="bg-green-600 hover:bg-green-700 text-white font-bold text-lg px-8 py-6 rounded-lg">
            Confira nossos planos
          </Button>
        </div>
      </div>
    </section>
  );
}
