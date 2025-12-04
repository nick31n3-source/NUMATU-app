import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf } from "lucide-react";

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full">
                <Leaf className="w-4 h-4 text-green-700" />
                <span className="text-sm font-medium text-green-700">Logística Reversa Inteligente</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                <span className="text-green-600">Reciclagem & Transformação</span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                NUMATU é o aplicativo que une empresas, coletores e compradores de materiais recicláveis. Otimizamos a coleta, maximizamos o impacto ambiental e geramos oportunidades de negócio sustentável.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => scrollToSection("partners")}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg rounded-lg flex items-center gap-2 transition-all"
              >
                Seja um Parceiro <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                onClick={() => scrollToSection("how-it-works")}
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-6 text-lg rounded-lg"
              >
                Como Funciona
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-200">
              <div>
                <div className="text-3xl font-bold text-green-600">3</div>
                <p className="text-sm text-gray-600">Atores Conectados</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600">∞</div>
                <p className="text-sm text-gray-600">Possibilidades</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600">1</div>
                <p className="text-sm text-gray-600">Propósito</p>
              </div>
            </div>
          </div>

          {/* Right visual */}
          <div className="relative h-96 lg:h-full flex items-center justify-center">
            <div className="relative w-full max-w-md">
              {/* Phone mockup */}
              <div className="relative bg-white rounded-3xl shadow-2xl p-3 border-8 border-gray-900">
                <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl p-6 h-96 flex flex-col items-center justify-center text-white">
                  <div className="text-center space-y-4">
                    <Leaf className="w-16 h-16 mx-auto" />
                    <h3 className="text-2xl font-bold">NUMATU</h3>
                    <p className="text-sm opacity-90">Logística Reversa Inteligente</p>
                    <div className="pt-4 space-y-2 text-xs">
                      <div className="bg-white/20 rounded px-3 py-2">🏢 Empresas</div>
                      <div className="bg-white/20 rounded px-3 py-2">♻️ Coletores</div>
                      <div className="bg-white/20 rounded px-3 py-2">🛒 Compradores</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating cards */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 max-w-xs">
                <p className="text-sm font-semibold text-gray-900">Rotas Otimizadas</p>
                <p className="text-xs text-gray-600">Coleta eficiente em tempo real</p>
              </div>
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 max-w-xs">
                <p className="text-sm font-semibold text-gray-900">Impacto Ambiental</p>
                <p className="text-xs text-gray-600">Transformação sustentável</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
