import { ChevronDown } from "lucide-react";
import { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "POSSO TESTAR O SERVIÇO ANTES DE ASSINAR?",
      answer: "Sim! Oferecemos 7 dias gratuitos para você testar todos os recursos da nossa plataforma antes de assinar qualquer plano."
    },
    {
      question: "ONDE CONSIGO ASSISTIR?",
      answer: "Você pode assistir em qualquer dispositivo: smartphones, tablets, smart TVs, computadores e videogames. Disponível para iOS, Android, Windows, Mac e mais."
    },
    {
      question: "CONSIGO ASSISTIR EM MAIS DE 1 APARELHO?",
      answer: "Sim! Dependendo do seu plano, você pode assistir simultaneamente em 1 a 4 telas diferentes. Cada plano oferece um número específico de telas simultâneas."
    },
    {
      question: "PRECISA DE INTERNET PARA FUNCIONAR?",
      answer: "Para streaming ao vivo, sim. Mas você pode baixar conteúdo para assistir offline quando não tiver internet disponível."
    },
    {
      question: "PRECISA DE ESPECIALISTA PARA CONFIGURAR?",
      answer: "Não! Nossa plataforma é super fácil de usar. Basta criar sua conta, escolher seu plano e começar a assistir em segundos."
    },
    {
      question: "O PAGAMENTO É MENSAL?",
      answer: "Oferecemos várias opções: quinzenal (R$14,90), mensal (R$29,90), trimestral (R$77,90) e semestral (R$143,90). Você escolhe o que funciona melhor para você."
    },
    {
      question: "POSSO CANCELAR A QUALQUER MOMENTO?",
      answer: "Sim! Você pode cancelar sua assinatura a qualquer momento, sem multas ou taxas de cancelamento. Basta entrar em contato conosco via WhatsApp e processaremos o cancelamento imediatamente."
    },
    {
      question: "COMO FUNCIONA O TESTE GRÁTIS?",
      answer: "Simples! Você recebe 7 dias de acesso completo e gratuito a toda nossa plataforma. Durante este período, pode testar todos os canais, filmes e séries. Se não gostar, é só cancelar antes do 7º dia e não será cobrado nada."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-10 sm:py-16 lg:py-24 px-4 sm:px-6 bg-card/50 section-spacing">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 gradient-text-enhanced animate-fade-in-up">
            PERGUNTAS FREQUENTES
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-primary/20 rounded-lg overflow-hidden bg-background/50 backdrop-blur-sm animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex justify-between items-center hover:bg-primary/10 transition-colors"
              >
                <span className="font-semibold text-high-contrast text-sm sm:text-base">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 sm:w-5 sm:h-5 text-primary transition-transform duration-200 flex-shrink-0 ml-2 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              {openIndex === index && (
                <div className="px-4 sm:px-6 pb-3 sm:pb-4 text-medium-contrast animate-fade-in text-sm sm:text-base">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;