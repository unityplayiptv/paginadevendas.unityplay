import { useEffect, useRef, useState } from "react";

const ContentCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const animationRef = useRef<number>();

  const contentItems = [
    { id: 1, title: "O que houve com a secretária kim?", image: "/paginadevendas.unityplay/images/1.webp" },
    { id: 2, title: "Diário de um Vampiro", image: "/paginadevendas.unityplay/images/2.webp" },
    { id: 3, title: "One Piece", image: "/paginadevendas.unityplay/images/3.webp" },
    { id: 4, title: "The Walking Dead", image: "/paginadevendas.unityplay/images/4.webp" },
    { id: 5, title: "Quando o Telefone Toca", image: "/paginadevendas.unityplay/images/5.webp" },
    { id: 6, title: "Stranger Things", image: "/paginadevendas.unityplay/images/6.webp" },
    { id: 7, title: "The Witcher", image: "/paginadevendas.unityplay/images/7.webp" },
    { id: 8, title: "Sobrenatural", image: "/paginadevendas.unityplay/images/8.webp" },
    { id: 9, title: "Breaking Bad", image: "/paginadevendas.unityplay/images/9.webp" },
    { id: 10, title: "Game Of Thrones", image: "/paginadevendas.unityplay/images/10.webp" },
    { id: 11, title: "Master Chef EUA", image: "/paginadevendas.unityplay/images/11.webp" },
    { id: 12, title: "The Boys", image: "/paginadevendas.unityplay/images/12.webp" },
    { id: 13, title: "Pokémon", image: "/paginadevendas.unityplay/images/13.webp" },
    { id: 14, title: "Grey's Anatomy", image: "/paginadevendas.unityplay/images/14.webp" },
    { id: 15, title: "Origem", image: "/paginadevendas.unityplay/images/15.webp" },
    { id: 16, title: "Sorria 2", image: "/paginadevendas.unityplay/images/16.webp" },
    { id: 17, title: "Deadpool & Wolverine", image: "/paginadevendas.unityplay/images/17.webp" },
    { id: 18, title: "Round 6", image: "/paginadevendas.unityplay/images/18.webp" },
    { id: 19, title: "O Senhor dos Anéis", image: "/paginadevendas.unityplay/images/19.webp" },
    { id: 20, title: "Robot Selvagem", image: "/paginadevendas.unityplay/images/20.webp" },
    { id: 21, title: "Gladiador 2", image: "/paginadevendas.unityplay/images/21.webp" }
  ];

  // Duplicar os itens para criar o efeito infinito
  const duplicatedItems = [...contentItems, ...contentItems];

  // Função para iniciar o arrasto
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX);
    setScrollLeft(currentTranslate);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  // Função para mover durante o arrasto
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX;
    const walk = (x - startX) * 2; // Multiplicador para sensibilidade
    const newTranslate = scrollLeft + walk;
    setCurrentTranslate(newTranslate);
    
    if (scrollRef.current) {
      scrollRef.current.style.transform = `translateX(${newTranslate}px)`;
    }
  };

  // Função para finalizar o arrasto
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Função para quando o mouse sai do carrossel
  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollSpeed = 1.8;

    const animate = () => {
      if (!isDragging) {
        setCurrentTranslate(prev => {
          const newPosition = prev - scrollSpeed;
          
          // Reset quando chegar ao final da primeira sequência
          if (Math.abs(newPosition) >= scrollContainer.scrollWidth / 2) {
            return 0;
          }
          
          scrollContainer.style.transform = `translateX(${newPosition}px)`;
          return newPosition;
        });
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDragging]);

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-background overflow-hidden section-spacing">
      <div className="container mx-auto px-4 sm:px-6 mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-center gradient-text-enhanced">
          Dos clássicos aos mais recentes
        </h2>
      </div>
      <div className="relative w-full">
        <div className="overflow-hidden">
          <div
            ref={scrollRef}
            className={`flex gap-3 sm:gap-4 will-change-transform ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            style={{ width: `${duplicatedItems.length * 200}px` }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            {duplicatedItems.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="flex-shrink-0 w-40 sm:w-52 group cursor-pointer select-none"
              >
                <div className="relative rounded-lg overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-105">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-56 sm:h-72 object-cover"
                    loading="lazy"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                      <h3 className="text-high-contrast font-semibold text-sm sm:text-lg mb-2">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentCarousel;