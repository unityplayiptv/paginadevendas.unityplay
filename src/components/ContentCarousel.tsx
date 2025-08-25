import { useEffect, useRef } from "react";

const ContentCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const contentItems = [
    { id: 1, title: "O que houve com a secretária kim?", image: "public/images/1.webp" },
    { id: 2, title: "Diário de um Vampiro", image: "public/images/2.webp" },
    { id: 3, title: "One Piece", image: "public/images/3.webp" },
    { id: 4, title: "The Walking Dead", image: "public/images/4.webp" },
    { id: 5, title: "Quando o telefone toca", image: "public/images/5.webp" },
    { id: 6, title: "Stranger Things", image: "public/images/6.webp" },
    { id: 7, title: "The Witcher", image: "public/images/7.webp" },
    { id: 8, title: "Sobrenatural", image: "public/images/8.webp" },
    { id: 9, title: "Breaking Bad", image: "public/images/9.webp" },
    { id: 10, title: "Game Of Thrones", image: "public/images/10.webp" },
    { id: 11, title: "Master Chef EUA", image: "public/images/11.webp" },
    { id: 12, title: "The Boys", image: "public/images/12.webp" },
    { id: 13, title: "Pokémon", image: "public/images/13.webp" },
    { id: 14, title: "Grey's Anatomy", image: "public/images/14.webp" },
    { id: 15, title: "Origem", image: "public/images/15.webp" },
    { id: 16, title: "Sorria 2", image: "public/images/16.webp" },
    { id: 17, title: "Deadpool & Wolverine", image: "public/images/17.webp" },
    { id: 18, title: "Round 6", image: "public/images/18.webp" },
    { id: 19, title: "O Senhor dos Anéis", image: "public/images/19.webp" },
    { id: 20, title: "Robot Selvagem", image: "public/images/20.webp" },
    { id: 21, title: "Gladiador 2", image: "public/images/21.webp" }
  ];

  // Duplicar os itens para criar o efeito infinito
  const duplicatedItems = [...contentItems, ...contentItems];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 1.8;

    const animate = () => {
      scrollPosition -= scrollSpeed;
      
      // Reset quando chegar ao final da primeira sequência
      if (Math.abs(scrollPosition) >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }
      
      scrollContainer.style.transform = `translateX(${scrollPosition}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

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
            className="flex gap-3 sm:gap-4 will-change-transform"
            style={{ width: `${duplicatedItems.length * 200}px` }}
          >
            {duplicatedItems.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="flex-shrink-0 w-40 sm:w-52 group cursor-pointer"
              >
                <div className="relative rounded-lg overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-105">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-56 sm:h-72 object-cover"
                    loading="lazy"
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