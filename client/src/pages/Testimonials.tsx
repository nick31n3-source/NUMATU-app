import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Carlos Silva",
      role: "Diretor Executivo",
      company: "Indústria de Alimentos Silva",
      image: "👨‍💼",
      text: "Implementamos NUMATU há 6 meses e conseguimos reduzir custos de coleta em 45%. Além disso, nossos clientes reconhecem nosso compromisso com sustentabilidade.",
      rating: 5,
      metric: "R$ 50 mil economizados",
    },
    {
      id: 2,
      name: "Maria Santos",
      role: "Coletora Autônoma",
      company: "Reciclagem Santos",
      image: "👩‍🔧",
      text: "Com as rotas otimizadas do NUMATU, minha produtividade aumentou 50%. Agora consigo atender mais clientes e ganhar muito mais. Recomendo para todos os coletores!",
      rating: 5,
      metric: "50% mais renda",
    },
    {
      id: 3,
      name: "João Oliveira",
      role: "Gerente de Compras",
      company: "Recicladora Nordeste",
      image: "👨‍💼",
      text: "NUMATU nos conectou com fornecedores de qualidade que antes era impossível encontrar. Os preços são competitivos e a logística é muito mais eficiente.",
      rating: 5,
      metric: "30% redução de custos",
    },
    {
      id: 4,
      name: "Ana Costa",
      role: "Coordenadora de Sustentabilidade",
      company: "Varejo Costa",
      image: "👩‍💼",
      text: "NUMATU transformou nossa gestão de resíduos. Agora temos total rastreabilidade e conformidade com legislação ambiental. Excelente ferramenta!",
      rating: 5,
      metric: "100% conformidade",
    },
    {
      id: 5,
      name: "Pedro Ferreira",
      role: "Coletor Autônomo",
      company: "Coleta Inteligente",
      image: "👨‍🔧",
      text: "O app é muito fácil de usar. As notificações de coleta chegam em tempo real e consigo planejar melhor meu dia. Aumentei meu faturamento significativamente.",
      rating: 5,
      metric: "Faturamento +60%",
    },
    {
      id: 6,
      name: "Fernanda Lima",
      role: "Diretora de Operações",
      company: "Logística Verde",
      image: "👩‍💼",
      text: "Parceria com NUMATU foi estratégica. Conseguimos expandir nossos negócios, atingir mais clientes e ainda contribuir para sustentabilidade. Win-win!",
      rating: 5,
      metric: "3x crescimento",
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Histórias de <span className="text-green-600">Sucesso</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Veja como empresas, coletores e compradores estão transformando seus negócios com NUMATU.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="p-8 hover:shadow-xl transition-all duration-300 border-l-4 border-green-600"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "{testimonial.text}"
              </p>

              {/* Metric */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6">
                <p className="text-green-700 font-semibold text-center">
                  {testimonial.metric}
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="text-4xl">{testimonial.image}</div>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-xs text-green-600 font-medium">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">
            Pronto para sua história de sucesso?
          </p>
          <a
            href="#partners"
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold transition-all"
          >
            Cadastre-se Agora
          </a>
        </div>
      </div>
    </section>
  );
}
