import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Instagram, ExternalLink } from "lucide-react";

export default function Developers() {
  return (
    <section id="developers" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Conheça os <span className="text-green-600">Desenvolvedores</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            NUMATU é resultado do trabalho dedicado de alunos do curso Técnico em Logística do Senac Parnaíba, que transformaram conhecimento acadêmico em solução inovadora.
          </p>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900">
              Alunos do Técnico em Logística
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Durante o curso Técnico em Logística do Senac Parnaíba, um grupo de alunos identificou um problema real na cadeia de reciclagem da região: a falta de conexão eficiente entre empresas geradoras de resíduos, coletores autônomos e compradores de materiais recicláveis.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Com determinação e criatividade, desenvolveram NUMATU como seu projeto integrador, aplicando na prática todos os conhecimentos adquiridos sobre logística, otimização de rotas, gestão de operações e sustentabilidade.
            </p>

            <div className="space-y-4 pt-4">
              <h4 className="font-semibold text-gray-900 text-lg">Competências Aplicadas:</h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "Logística Reversa",
                  "Otimização de Rotas",
                  "Gestão de Operações",
                  "Sustentabilidade",
                  "Inovação Tecnológica",
                  "Trabalho em Equipe",
                ].map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span className="text-gray-700">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Card className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <div className="space-y-6">
              <div>
                <h4 className="text-2xl font-bold text-gray-900 mb-2">Apresentação Oficial</h4>
                <div className="space-y-2 text-gray-700">
                  <p><span className="font-semibold">Data:</span> Agosto de 2025</p>
                  <p><span className="font-semibold">Local:</span> Auditório do Senac Parnaíba</p>
                  <p><span className="font-semibold">Evento:</span> Apresentação de Projetos Integradores</p>
                </div>
              </div>

              <div className="border-t border-green-200 pt-6">
                <h4 className="font-semibold text-gray-900 mb-4">Acompanhe o Projeto</h4>
                <Button
                  onClick={() => window.open("https://www.instagram.com/tecnicos_logistica2024", "_blank")}
                  className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white py-6 text-lg font-semibold rounded-lg flex items-center justify-center gap-2 transition-all"
                >
                  <Instagram className="w-5 h-5" />
                  @tecnicos_logistica2024
                  <ExternalLink className="w-4 h-4" />
                </Button>
                <p className="text-sm text-gray-600 text-center mt-4">
                  Siga para acompanhar as novidades e atualizações do projeto
                </p>
              </div>

              <div className="border-t border-green-200 pt-6">
                <h4 className="font-semibold text-gray-900 mb-3">Valores do Projeto</h4>
                <ul className="space-y-2">
                  {[
                    "Inovação com propósito",
                    "Sustentabilidade em primeiro lugar",
                    "Impacto social positivo",
                    "Excelência técnica",
                  ].map((value, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-green-600 font-bold mt-1">•</span>
                      <span className="text-gray-700">{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* Team highlights */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Por que NUMATU é Especial
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Desenvolvido por Alunos",
                description: "Projeto prático de alunos do Técnico em Logística, demonstrando aplicação real de conhecimentos acadêmicos.",
              },
              {
                title: "Solução Local",
                description: "Criado especificamente para resolver problemas reais da comunidade de Parnaíba-PI e região.",
              },
              {
                title: "Escalável",
                description: "Arquitetura pensada para crescimento e replicação em outras regiões e contextos.",
              },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 font-bold text-lg">{idx + 1}</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
