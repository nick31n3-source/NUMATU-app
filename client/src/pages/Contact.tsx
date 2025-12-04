import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-green-600 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                Pronto para Transformar sua Logística?
              </h2>
              <p className="text-lg text-green-100 leading-relaxed">
                Entre em contato conosco hoje e descubra como NUMATU pode revolucionar sua operação de reciclagem em Parnaíba-PI.
              </p>
            </div>

            {/* Contact info */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Phone className="w-6 h-6 text-green-200 mt-1" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Telefone</h3>
                  <a href="tel:+558699586231" className="text-green-100 hover:text-white transition-colors text-lg font-medium">
                    (86) 99586-2231
                  </a>
                  <p className="text-sm text-green-200 mt-1">Parnaíba - PI e região</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Mail className="w-6 h-6 text-green-200 mt-1" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Email</h3>
                  <a href="mailto:contato@numatu.com.br" className="text-green-100 hover:text-white transition-colors">
                    contato@numatu.com.br
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <MapPin className="w-6 h-6 text-green-200 mt-1" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Localização</h3>
                  <p className="text-green-100">Parnaíba, Piauí - Brasil</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Button
              onClick={() => {
                const element = document.getElementById("partners");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-white text-green-600 hover:bg-green-50 px-8 py-6 text-lg font-semibold rounded-lg transition-all w-full sm:w-auto"
            >
              Cadastre-se como Parceiro
            </Button>
          </div>

          {/* Right content - Stats */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 text-center">
              <div className="text-4xl font-bold mb-2">3</div>
              <p className="text-green-100">Tipos de Parceiros</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 text-center">
              <div className="text-4xl font-bold mb-2">∞</div>
              <p className="text-green-100">Possibilidades</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 text-center">
              <div className="text-4xl font-bold mb-2">24/7</div>
              <p className="text-green-100">Suporte Disponível</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 text-center">
              <div className="text-4xl font-bold mb-2">100%</div>
              <p className="text-green-100">Sustentável</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
