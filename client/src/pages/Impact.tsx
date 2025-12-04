import { Card } from "@/components/ui/card";
import { Award, Users, Lightbulb, Globe } from "lucide-react";

export default function Impact() {
  const achievements = [
    {
      icon: Award,
      title: "Projeto Integrador",
      description: "Desenvolvido como parte prática do curso Técnico em Logística do Senac Parnaíba",
    },
    {
      icon: Users,
      title: "Equipe Dedicada",
      description: "Alunos apaixonados por sustentabilidade e inovação em logística",
    },
    {
      icon: Lightbulb,
      title: "Inovação Acadêmica",
      description: "Aplicação prática de conhecimentos teóricos em um projeto real",
    },
    {
      icon: Globe,
      title: "Impacto Local",
      description: "Transformando a forma como Parnaíba-PI lida com reciclagem",
    },
  ];

  return (
    <section id="impact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Nosso <span className="text-green-600">Impacto</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Um projeto desenvolvido por alunos do Senac Parnaíba que está transformando a realidade da logística reversa na região.
          </p>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900">
              Desenvolvido com Propósito
            </h3>
            <p className="text-gray-600 leading-relaxed">
              O NUMATU é resultado do trabalho dedicado de alunos do curso Técnico em Logística do Senac Parnaíba. Apresentado em agosto de 2025 no auditório do Senac Parnaíba, o projeto demonstra as habilidades práticas e o compromisso com a sustentabilidade desenvolvidos durante o curso.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Mais do que um aplicativo, NUMATU representa a capacidade dos jovens profissionais de identificar problemas reais e criar soluções inovadoras que geram impacto positivo na comunidade.
            </p>

            <div className="space-y-4 pt-4">
              <div className="border-l-4 border-green-600 pl-4">
                <h4 className="font-semibold text-gray-900">Apresentação Oficial</h4>
                <p className="text-sm text-gray-600">Agosto de 2025 - Auditório do Senac Parnaíba</p>
              </div>
              <div className="border-l-4 border-green-600 pl-4">
                <h4 className="font-semibold text-gray-900">Público-Alvo</h4>
                <p className="text-sm text-gray-600">Parnaíba-PI e região circunvizinha</p>
              </div>
              <div className="border-l-4 border-green-600 pl-4">
                <h4 className="font-semibold text-gray-900">Objetivo</h4>
                <p className="text-sm text-gray-600">Revolucionar a logística reversa através da tecnologia</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 flex items-center justify-center">
            <div className="text-center space-y-8">
              <div>
                <div className="text-5xl font-bold text-green-600 mb-2">2025</div>
                <p className="text-gray-700 font-semibold">Ano de Lançamento</p>
              </div>
              <div className="space-y-4 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  <span className="text-gray-700">Desenvolvido por alunos do Senac</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  <span className="text-gray-700">Apresentado em evento acadêmico</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  <span className="text-gray-700">Pronto para transformar Parnaíba</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  <span className="text-gray-700">Escalável para outras regiões</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  <div className="inline-block p-3 bg-green-100 rounded-lg">
                    <Icon className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {achievement.title}
                </h3>
                <p className="text-gray-600 text-sm">{achievement.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
