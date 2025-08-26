import React, { useEffect, useRef, useState } from 'react';

const ChannelLogos = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const animationRef = useRef<number>();

  const channels = [
    { name: 'Animal-planet', logo: '/paginadevendas.unityplay/images-logo/Animal-Planet.png', fallback: '🌐' },
    { name: 'AppleTV', logo: '/paginadevendas.unityplay/images-logo/AppleTV.png', fallback: '📺' },
    { name: 'Cartoon-Network', logo: '/paginadevendas.unityplay/images-logo/Cartoon-Network.png', fallback: '🔴' },
    { name: 'Combate', logo: '/paginadevendas.unityplay/images-logo/Combate.png', fallback: '📻' },
    { name: 'Disney+', logo: '/paginadevendas.unityplay/images-logo/Disney+.png', fallback: '🎬' },
    { name: 'ESPN', logo: '/paginadevendas.unityplay/images-logo/ESPN.png', fallback: '🏰' },
    { name: 'Globoplay', logo: '/paginadevendas.unityplay/images-logo/Globoplay.png', fallback: '📽️' },
    { name: 'History', logo: '/paginadevendas.unityplay/images-logo/History.png', fallback: '🎭' },
    { name: 'Max+', logo: '/paginadevendas.unityplay/images-logo/Max.png', fallback: '⭐' },
    { name: 'Netflix', logo: '/paginadevendas.unityplay/images-logo/Netflix.png', fallback: '🍎' },
    { name: 'Paramount', logo: '/paginadevendas.unityplay/images-logo/Paramount.png', fallback: '⚽' },
    { name: 'Prime-Video', logo: '/paginadevendas.unityplay/images-logo/Prime-video.png', fallback: '🏆' },
    { name: 'Sportv', logo: '/paginadevendas.unityplay/images-logo/Sportv.png', fallback: '🎨' },
    { name: 'Star+', logo: '/paginadevendas.unityplay/images-logo/Star+.png', fallback: '🔍' },
    { name: 'Tnt-Sports', logo: '/paginadevendas.unityplay/images-logo/Tnt-Sports.png', fallback: '🌍' }
  ];

  // Duplicar os itens para criar o efeito infinito
  const duplicatedChannels = [...channels, ...channels];

  const [imageErrors, setImageErrors] = React.useState<Set<string>>(new Set());

  const handleImageError = (channelName: string) => {
    setImageErrors(prev => new Set(prev).add(channelName));
  };

  // Função para obter coordenada X de mouse ou touch
  const getClientX = (e: React.MouseEvent | React.TouchEvent) => {
    return 'touches' in e ? e.touches[0].clientX : e.clientX;
  };

  // Função para iniciar o arrasto (mouse e touch)
  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    setStartX(getClientX(e));
    setScrollLeft(currentTranslate);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  // Função para mover durante o arrasto (mouse e touch)
  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = getClientX(e);
    const walk = (x - startX) * 2; // Multiplicador para sensibilidade
    const newTranslate = scrollLeft + walk;
    setCurrentTranslate(newTranslate);
    
    if (scrollRef.current) {
      scrollRef.current.style.transform = `translateX(${newTranslate}px)`;
    }
  };

  // Função para finalizar o arrasto (mouse e touch)
  const handleEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollSpeed = 1.2;

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
    <section className="py-8 sm:py-12 bg-gradient-to-b from-background/50 to-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 mb-8 sm:mb-12">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-high-contrast mb-2">
            Tenha acesso a mais de 80 mil conteúdos
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Incluindo os canais e plataformas mais populares do Brasil e do mundo
          </p>
        </div>
      </div>
      
      {/* Carrossel que ocupa toda a largura da tela */}
      <div className="relative w-full">
        <div className="overflow-hidden">
          <div
            ref={scrollRef}
            className={`flex gap-6 sm:gap-8 will-change-transform ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            style={{ width: `${duplicatedChannels.length * 140}px` }}
            onMouseDown={handleStart}
            onMouseMove={handleMove}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={handleStart}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}
          >
            {duplicatedChannels.map((channel, index) => (
              <div
                key={`${channel.name}-${index}`}
                className="flex-shrink-0 bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 select-none"
              >
                <div className="flex flex-col items-center space-y-1 sm:space-y-2">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                    {imageErrors.has(channel.name) ? (
                      <div className="text-2xl sm:text-3xl">{channel.fallback}</div>
                    ) : (
                      <img
                        src={channel.logo}
                        alt={`${channel.name} logo`}
                        className="w-full h-full object-contain"
                        loading="lazy"
                        onError={() => handleImageError(channel.name)}
                        draggable={false}
                      />
                    )}
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-center whitespace-nowrap">
                    {channel.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mt-6 sm:mt-8">
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2">
            <span className="text-primary font-semibold text-sm">✨ E muito mais!</span>
            <span className="text-xs text-muted-foreground">Catálogo sempre atualizado</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChannelLogos;