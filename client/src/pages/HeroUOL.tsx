import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function HeroUOL() {
  return (
    <section className="min-h-screen bg-gradient-to-r from-green-600 to-green-500 text-white pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-yellow-300">Logística Reversa</span>
                <br />
                com taxa <span className="text-yellow-300">ZERO</span>!
              </h1>
              <p className="text-xl text-green-100">
                Crie sua rede de reciclagem e comece a lucrar hoje mesmo.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold text-lg px-8 py-6 rounded-lg transition-all"
              >
                Confira nossos planos
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-green-600 font-bold text-lg px-8 py-6 rounded-lg"
              >
                Saiba mais
              </Button>
            </div>

            {/* Features */}
            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-yellow-300 flex-shrink-0" />
                <span className="text-lg">Diversos meios de pagamento</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-yellow-300 flex-shrink-0" />
                <span className="text-lg">Plataforma personalizável</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-yellow-300 flex-shrink-0" />
                <span className="text-lg">Segurança e confiança garantidas</span>
              </div>
            </div>
          </div>

          {/* Right Mockup */}
          <div className="relative hidden lg:block">
            <div className="bg-white rounded-3xl shadow-2xl p-6 transform hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-b from-green-600 to-green-500 rounded-2xl p-8 text-white space-y-6">
                <div className="text-center">
                  <div className="text-5xl mb-4">📱</div>
                  <h3 className="text-2xl font-bold">NUMATU</h3>
                  <p className="text-green-100">Logística Reversa Inteligente</p>
                </div>

                <div className="space-y-3">
                  <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold py-3 rounded-lg transition-all">
                    👥 Empresas
                  </button>
                  <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold py-3 rounded-lg transition-all">
                    🚚 Coletores
                  </button>
                  <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold py-3 rounded-lg transition-all">
                    🏭 Compradores
                  </button>
                </div>

                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <p className="text-sm text-green-100">Rotas Otimizadas</p>
                  <p className="text-lg font-bold">Coleta eficiente em tempo real</p>
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 max-w-xs">
              <p className="text-green-600 font-bold text-sm">Redução de Custos</p>
              <p className="text-2xl font-bold text-gray-900">40%</p>
            </div>
            <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-lg p-4 max-w-xs">
              <p className="text-green-600 font-bold text-sm">Impacto Ambiental</p>
              <p className="text-2xl font-bold text-gray-900">Positivo</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
