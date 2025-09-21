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
      answer: "Sim! Consegue instalar nosso aplicativo em quantos dispositivos quiser, porém a quantidade de telas assistindo ao mesmo tempo varia dependendo do plano adquirido."
    },
    {
      question: "PRECISA DE INTERNET PARA FUNCIONAR?",
      answer: "Sim, é preciso ter conexão de internet no seu dispositivo para que o conteúdo possa ser reproduzido."
    },
    {
      question: "PRECISA DE ESPECIALISTA PARA CONFIGURAR?",
      answer: "Não! Nossa plataforma é super fácil de usar. Disponibilizamos um passo a passo para baixar o aplicativo, e se ainda sim você não conseguir instalar o aplicativo, temos o suporte disponível sempre que você   precisar."
    },
    {
      question: "O PAGAMENTO É MENSAL?",
      answer: "Oferecemos várias opções: Quinzenal, Mensal, Trimestral e Semestral. Escolha a maneira que fique mais prática para você."
    },
    {
      question: "POSSO CANCELAR A QUALQUER MOMENTO?",
      answer: "Sim! Você pode cancelar sua assinatura a qualquer momento, sem multas ou taxas de cancelamento. Basta entrar em contato conosco via WhatsApp e processaremos o cancelamento imediatamente."
    },
    {
      question: "COMO FUNCIONA O TESTE GRÁTIS?",
      answer: "Simples! Você adquire um de nossos planos, desfrute do sistema por completo e, dentro de 7 dias, se não gostar por algum motivo, nós nos comprometemos a devolver todo o valor do plano."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 sm:py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-card/50 section-spacing">
      <div className="max-w-5xl mx-auto">
        {/* Header centralizado com melhor espaçamento */}
        <div className="text-center mb-16 sm:mb-20 lg:mb-24">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 sm:mb-8 gradient-text-enhanced animate-fade-in-up">
            PERGUNTAS FREQUENTES
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up stagger-1">
            Tire suas dúvidas sobre nossos serviços
          </p>
        </div>

        {/* Container das FAQs com melhor organização */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4 sm:space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-primary/20 rounded-xl sm:rounded-2xl overflow-hidden bg-background/50 backdrop-blur-sm animate-scale-in shadow-lg hover:shadow-xl transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 sm:px-8 lg:px-10 py-4 sm:py-6 lg:py-7 text-left flex justify-between items-center hover:bg-primary/10 transition-all duration-300 group"
                >
                  <span className="font-semibold text-high-contrast text-sm sm:text-base lg:text-lg pr-4 group-hover:text-primary transition-colors">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-primary transition-all duration-300 flex-shrink-0 group-hover:scale-110 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                {openIndex === index && (
                  <div className="px-6 sm:px-8 lg:px-10 pb-4 sm:pb-6 lg:pb-7 text-medium-contrast animate-fade-in">
                    <div className="border-t border-primary/10 pt-4 sm:pt-6">
                      <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;