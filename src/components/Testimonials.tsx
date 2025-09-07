import { useState, useEffect, useRef } from "react";
import { Star, Quote, Shield, Clock } from "lucide-react";

const testimonials = [
  {
    id: 1,
    text: "Meus filhos adoram! Tem desenho, filme, série... tudo em um lugar só. E o suporte é muito bom, sempre me ajudam.",
    name: "João Santos",
    location: "Rio de Janeiro, RJ",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format"
  },
  {
    id: 2,
    text: "Qualidade 4K incrível! Nunca mais tive problemas com travamentos. Vale muito a pena o investimento.",
    name: "Maria Silva",
    location: "São Paulo, SP",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face&auto=format"
  },
  {
    id: 3,
    text: "Funciona perfeitamente em todos os dispositivos da casa. Smart TV, celular, tablet... Excelente serviço!",
    name: "Carlos Oliveira",
    location: "Belo Horizonte, MG",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format"
  },
  {
    id: 4,
    text: "O catálogo é gigantesco! Sempre tem algo novo pra assistir. Minha família toda está satisfeita.",
    name: "Ana Costa",
    location: "Brasília, DF",
    avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop&crop=face&auto=format"
  },
  {
    id: 5,
    text: "Preço justo e qualidade excelente. Cancelei outros serviços depois que conheci este. Recomendo!",
    name: "Pedro Lima",
    location: "Fortaleza, CE",
    avatar: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=150&h=150&fit=crop&crop=face&auto=format"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Função para iniciar o intervalo automático
  const startAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 8000);
  };

  // Função para parar o intervalo automático
  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  // Função para navegar para o próximo depoimento
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  // Função para navegar para o depoimento anterior
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  // Handlers para touch/swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsDragging(true);
    stopAutoSlide(); // Para a navegação automática durante o swipe
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    const deltaX = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50; // Distância mínima para considerar um swipe

    if (Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0) {
        // Swipe para a esquerda - próximo depoimento
        goToNext();
      } else {
        // Swipe para a direita - depoimento anterior
        goToPrevious();
      }
    }

    setIsDragging(false);
    // Reinicia a navegação automática após 3 segundos
    setTimeout(() => {
      startAutoSlide();
    }, 3000);
  };

  // Handler para clique nas bolinhas
  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    stopAutoSlide();
    // Reinicia a navegação automática após 5 segundos
    setTimeout(() => {
      startAutoSlide();
    }, 5000);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-background section-spacing">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-high-contrast mb-2 sm:mb-4">
            O que nossos clientes dizem
          </h2>
          <p className="text-medium-contrast text-sm sm:text-base md:text-lg">
            Mais de 50.000 famílias satisfeitas
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div 
            className="bg-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12 relative select-none"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ touchAction: 'pan-y' }} // Permite scroll vertical, mas captura swipe horizontal
          >
            <Quote className="text-emerald-500 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mb-4 sm:mb-6" />
            
            <div className="flex justify-center mb-4 sm:mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-yellow-400 fill-current" />
              ))}
            </div>

            <blockquote className="text-high-contrast text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-center mb-6 sm:mb-8 italic transition-opacity duration-300">
              "{currentTestimonial.text}"
            </blockquote>

            <div className="flex items-center justify-center gap-3 sm:gap-4">
              <img
                src={currentTestimonial.avatar}
                alt={currentTestimonial.name}
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full object-cover transition-opacity duration-300"
              />
              <div className="text-center">
                <h4 className="text-high-contrast font-semibold text-sm sm:text-base md:text-lg transition-opacity duration-300">
                  {currentTestimonial.name}
                </h4>
                <p className="text-medium-contrast text-xs sm:text-sm transition-opacity duration-300">
                  {currentTestimonial.location}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-4 sm:mt-6 md:mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-emerald-500 scale-110"
                    : "bg-slate-600 hover:bg-slate-500 hover:scale-105"
                }`}
                aria-label={`Ir para depoimento ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Barra de prova social */}
          <div className="bg-primary/10 border border-primary/20 rounded-lg py-3 px-4 sm:px-6 mt-6 sm:mt-8">
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between text-xs sm:text-sm text-center gap-3 sm:gap-0">
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mb-0 sm:mb-0">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-muted-foreground whitespace-nowrap">4.9/5 (12.847 avaliações)</span>
                </div>
                <span className="text-muted-foreground text-center">📺 Mais de 50.000 famílias assistindo</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-3 h-3 text-green-500" />
                  <span className="text-muted-foreground whitespace-nowrap">100% Seguro</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3 text-blue-500" />
                  <span className="text-muted-foreground font-medium whitespace-nowrap">Suporte 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;