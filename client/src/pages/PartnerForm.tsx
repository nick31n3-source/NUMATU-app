import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { Loader2, MessageCircle } from "lucide-react";
import { IMaskInput } from "react-imask";

export default function PartnerForm() {
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    phone: string;
    whatsappNumber?: string;
    partnerType: "company" | "collector" | "buyer";
    companyName: string;
    city: string;
    state: string;
    message: string;
  }>({
    name: "",
    email: "",
    phone: "",
    whatsappNumber: "",
    partnerType: "company",
    companyName: "",
    city: "",
    state: "",
    message: "",
  });

  const submitMutation = trpc.partners.submit.useMutation({
    onSuccess: () => {
      toast.success("Cadastro realizado com sucesso! Você receberá um e-mail de confirmação em breve.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        partnerType: "company",
        companyName: "",
        city: "",
        state: "",
        message: "",
      });
    },
    onError: (error) => {
      console.error("Erro ao enviar formulário:", error);
      toast.error("Erro ao enviar formulário. Tente novamente.");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, partnerType: value as "company" | "collector" | "buyer" }));
  };

  const handlePhoneChange = (value: string) => {
    setFormData(prev => ({ ...prev, phone: value }));
  };



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.name || !formData.email || !formData.partnerType) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }



    submitMutation.mutate(formData);
  };

  const partnerTypes = [
    { value: "company", label: "Empresa Geradora de Resíduos" },
    { value: "collector", label: "Coletor Autônomo" },
    { value: "buyer", label: "Comprador de Materiais" },
  ];

  return (
    <section id="partners" className="py-20 bg-gradient-to-b from-white to-green-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Seja um <span className="text-green-600">Parceiro</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Junte-se à rede NUMATU e seja parte da transformação da logística reversa em Parnaíba-PI.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Benefits */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Por que se tornar parceiro?</h3>
            
            {[
              {
                title: "Para Empresas",
                benefits: [
                  "Redução de custos com coleta",
                  "Conformidade ambiental",
                  "Responsabilidade corporativa",
                  "Acesso a rede de coletores",
                ],
              },
              {
                title: "Para Coletores",
                benefits: [
                  "Rotas otimizadas",
                  "Maior eficiência operacional",
                  "Acesso a mais clientes",
                  "Aumento de renda",
                ],
              },
              {
                title: "Para Compradores",
                benefits: [
                  "Fornecedores qualificados",
                  "Preços competitivos",
                  "Negociação segura",
                  "Sustentabilidade garantida",
                ],
              },
            ].map((section, idx) => (
              <div key={idx}>
                <h4 className="font-semibold text-gray-900 mb-3">{section.title}</h4>
                <ul className="space-y-2">
                  {section.benefits.map((benefit, bidx) => (
                    <li key={bidx} className="flex items-start gap-3">
                      <span className="text-green-600 font-bold mt-1">✓</span>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Info Box */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-8">
              <div className="flex gap-3">
                <MessageCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-green-900 mb-1">Confirmação por E-mail</h4>
                  <p className="text-sm text-green-700">
                    Após se cadastrar, você receberá um e-mail de boas-vindas com informações sobre os próximos passos e como começar sua parceria com a NUMATU.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <Card className="p-8 sticky top-20">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Cadastre-se Agora</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Partner Type */}
              <div className="space-y-2">
                <Label htmlFor="partnerType" className="text-gray-700 font-semibold">
                  Tipo de Parceiro <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.partnerType} onValueChange={handleSelectChange}>
                  <SelectTrigger id="partnerType" className="border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {partnerTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700 font-semibold">
                  Nome Completo <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Seu nome"
                  required
                  className="border-gray-300"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-semibold">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  required
                  className="border-gray-300"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-700 font-semibold">
                  Telefone
                </Label>
                <IMaskInput
                  mask="(00) 00000-0000"
                  value={formData.phone}
                  onAccept={handlePhoneChange}
                  placeholder="(86) 9 9999-9999"
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                />
              </div>



              {/* Company Name */}
              <div className="space-y-2">
                <Label htmlFor="companyName" className="text-gray-700 font-semibold">
                  Nome da Empresa (opcional)
                </Label>
                <Input
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Sua empresa"
                  className="border-gray-300"
                />
              </div>

              {/* City and State */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-gray-700 font-semibold">
                    Cidade
                  </Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Parnaíba"
                    className="border-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state" className="text-gray-700 font-semibold">
                    Estado
                  </Label>
                  <Input
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="PI"
                    maxLength={2}
                    className="border-gray-300"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-gray-700 font-semibold">
                  Mensagem (opcional)
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Conte-nos mais sobre seu interesse em NUMATU"
                  className="border-gray-300 resize-none"
                  rows={4}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={submitMutation.isPending}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg font-semibold rounded-lg transition-all"
              >
                {submitMutation.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Enviar Cadastro"
                )}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                Seus dados serão usados apenas para contato sobre parcerias NUMATU.
                <br />
                <span className="text-red-500">* Campos obrigatórios</span>
              </p>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
}
