import { optimizedIcon } from "@/utils/iconLoader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { trackWhatsAppConversion } from "@/utils/analytics";
import { TrendingDown, Check } from "lucide-react";

const PricingPlans = () => {
  const plans = [
    {
      name: "Quinzenal",
      price: "14,90",
      period: "15 dias",
      dailyPrice: "0,99",
      originalPrice: null,
      savings: null,
      features: [
        "Acesso a Canais, Filmes e Séries",
        "Qualidade SD, HD e FHD",
        "Apenas 1 tela",
        "Conteúdo adulto opcional"
      ],
      popular: false,
      limitedOffer: false
    },
    {
      name: "Mensal",
      price: "29,90",
      period: "30 dias",
      dailyPrice: "0,99",
      originalPrice: null,
      savings: null,
      features: [
        "Acesso a Canais, Filmes e Séries",
        "Qualidade SD, HD e FHD",
        "Acesso a 2 telas simultâneas",
        "Conteúdo adulto opcional"
      ],
      popular: true,
      limitedOffer: false
    },
    {
      name: "Trimestral",
      price: "77,90",
      period: "90 dias",
      dailyPrice: "0,86",
      originalPrice: "89,70",
      savings: "13%",
      features: [
        "Acesso a Canais, Filmes e Séries",
        "Qualidade SD, HD e FHD",
        "Acesso a 3 telas simultâneas",
        "Conteúdo adulto opcional"
      ],
      popular: false,
      limitedOffer: true
    },
    {
      name: "Semestral",
      price: "143,90",
      period: "180 dias",
      dailyPrice: "0,79",
      originalPrice: "179,40",
      savings: "20%",
      features: [
        "Acesso a Canais, Filmes e Séries",
        "Qualidade SD, HD, FHD e 4K",
        "Acesso a 3 telas simultâneas",
        "Conteúdo adulto opcional",
        "Esportes",
        "Conteúdo infantil"
      ],
      popular: false,
      limitedOffer: true
    }
  ];

  const handleWhatsAppRedirect = (planName: string, planPrice: string) => {
    // Converter o preço de string para número (substituindo vírgula por ponto)
    const numericPrice = parseFloat(planPrice.replace(',', '.'));
    
    // Rastrear a conversão antes de redirecionar
    trackWhatsAppConversion(planName, numericPrice);
    
    // Redirecionar para o WhatsApp
    const phoneNumber = "555194890289";
    const message = `Olá! Gostaria de contratar o plano ${planName} do Unity Play.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="pricing-plans" className="pt-12 pb-6 sm:pt-24 sm:pb-12 px-3 sm:px-6 section-spacing">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-6 gradient-text-enhanced animate-fade-in-up">
            Escolha Seu Plano
          </h2>
          <p className="text-base sm:text-xl text-medium-contrast animate-fade-in-up stagger-1 max-w-2xl mx-auto px-2">
            Desfrute de entretenimento ilimitado com a qualidade que você merece. 
            Cancele quando quiser.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={plan.name} 
              className={`plan-card animate-scale-in bg-background/80 backdrop-blur-sm border-primary/20 relative h-fit ${plan.popular ? 'ring-2 ring-primary' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >

              {plan.popular && (
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold">
                    Mais Popular
                  </div>
                </div>
              )}

              <CardHeader className="text-center pb-3 sm:pb-4 px-3 sm:px-6 pt-4 sm:pt-6">
                <CardTitle className="text-xl sm:text-2xl font-bold text-high-contrast mb-3 sm:mb-4">
                  {plan.name}
                </CardTitle>
                
                <div className="mb-3 sm:mb-6">
                  {plan.savings && (
                    <div className="flex items-center justify-center space-x-1 mb-2">
                      <TrendingDown className="w-4 h-4 text-green-500" />
                      <span className="text-green-500 font-semibold text-sm">Economize {plan.savings}</span>
                    </div>
                  )}
                  {plan.originalPrice && (
                    <div className="text-sm text-muted-foreground line-through mb-1">
                      De R${plan.originalPrice}
                    </div>
                  )}
                  <div className="text-2xl sm:text-4xl font-bold gradient-text">
                    R${plan.price}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                    {plan.period} • Apenas R${plan.dailyPrice}/dia
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-3 sm:space-y-4 px-3 sm:px-6 flex-grow">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2 sm:gap-3">
                    <Check 
                      className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-1" 
                      style={{ color: 'hsl(270 90% 65%)' }}
                    />
                    <span className="text-sm sm:text-base text-foreground leading-relaxed font-medium break-words">
                      {feature}
                    </span>
                  </div>
                ))}
              </CardContent>

              <CardFooter className="pt-4 sm:pt-6 px-3 sm:px-6 flex flex-col space-y-2 mt-auto">
                <Button 
                  onClick={() => handleWhatsAppRedirect(plan.name, plan.price)}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 sm:py-4 px-4 sm:px-8 min-h-[48px] sm:min-h-[56px] text-sm sm:text-base flex items-center justify-center text-center"
                >
                  🎁 Começar Teste Grátis
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  7 dias para testar • <span className="font-medium text-green-600">Cancele quando quiser</span>
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-6 sm:mt-12 animate-fade-in-up stagger-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-sm sm:text-base text-green-800 font-medium mb-2">
              ✅ Garantia de 7 dias • ✅ Cancele quando quiser • ✅ Suporte 24/7
            </p>
            <p className="text-xs sm:text-sm text-green-600">
              Sem compromisso • Sem taxas de cancelamento • 100% seguro
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;