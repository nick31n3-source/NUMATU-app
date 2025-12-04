import { Leaf, Instagram, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Leaf className="w-6 h-6 text-green-500" />
              <span className="text-2xl font-bold text-white">NUMATU</span>
            </div>
            <p className="text-sm text-gray-400">
              Logística Reversa Inteligente. Conectando empresas, coletores e compradores de materiais recicláveis.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              {[
                { label: "O que é", href: "#what-is" },
                { label: "Como Funciona", href: "#how-it-works" },
                { label: "Impacto", href: "#impact" },
                { label: "Parceiros", href: "#partners" },
              ].map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-green-500 transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                <a
                  href="tel:+558699586231"
                  className="text-gray-400 hover:text-green-500 transition-colors text-sm"
                >
                  (86) 99586-2231
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                <a
                  href="mailto:numatucorp@gmail.com"
                  className="text-gray-400 hover:text-green-500 transition-colors text-sm"
                >
                  numatucorp@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                <span className="text-gray-400 text-sm">Parnaíba, PI - Brasil</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-white mb-4">Redes Sociais</h4>
            <div className="space-y-3">
              <a
                href="https://www.instagram.com/tecnicos_logistica2024"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-pink-500 transition-colors"
              >
                <Instagram className="w-5 h-5" />
                <span className="text-sm">@tecnicos_logistica2024</span>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
            <div>
              <p>
                © {currentYear} NUMATU. Todos os direitos reservados.
              </p>
            </div>
            <div className="text-right">
              <p>
                Desenvolvido por alunos do Técnico em Logística - Senac Parnaíba
              </p>
            </div>
          </div>
        </div>

        {/* M.M Agency Credit */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500 text-sm mb-2">
            Site e Estratégia de Marketing desenvolvidos por
          </p>
          <p className="text-green-500 font-semibold text-lg">M.M Agency</p>
          <p className="text-gray-600 text-xs mt-2">
            Presente para o lançamento do NUMATU - Valor original: R$ 1.497,00
          </p>
        </div>
      </div>
    </footer>
  );
}
