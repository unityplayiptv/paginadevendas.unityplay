import React, { useEffect, useRef } from 'react';

const ChannelLogos = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const channels = [
    { name: 'Animal-planet', logo: '/images-logo/Animal-Planet.png', fallback: '🌐' },
    { name: 'AppleTV', logo: '/images-logo/AppleTV.png', fallback: '📺' },
    { name: 'Cartoon-Network', logo: '/images-logo/Cartoon-Network.png', fallback: '🔴' },
    { name: 'Combate', logo: '/images-logo/Combate.png', fallback: '📻' },
    { name: 'Disney+', logo: '/images-logo/Disney+.png', fallback: '🎬' },
    { name: 'ESPN', logo: '/images-logo/ESPN.png', fallback: '🏰' },
    { name: 'Globoplay', logo: '/images-logo/Globoplay.png', fallback: '📽️' },
    { name: 'History', logo: '/images-logo/History.png', fallback: '🎭' },
    { name: 'Max+', logo: '/images-logo/Max.png', fallback: '⭐' },
    { name: 'Netflix', logo: '/images-logo/Netflix.png', fallback: '🍎' },
    { name: 'Paramount', logo: '/images-logo/Paramount.png', fallback: '⚽' },
    { name: 'Prime-Video', logo: '/images-logo/Prime-video.png', fallback: '🏆' },
    { name: 'Sportv', logo: '/images-logo/Sportv.png', fallback: '🎨' },
    { name: 'Star+', logo: '/images-logo/Star+.png', fallback: '🔍' },
    { name: 'Tnt-Sports', logo: '/images-logo/Tnt-Sports.png', fallback: '🌍' }
  ];

  // Duplicar os itens para criar o efeito infinito
  const duplicatedChannels = [...channels, ...channels];

  const [imageErrors, setImageErrors] = React.useState<Set<string>>(new Set());

  const handleImageError = (channelName: string) => {
    setImageErrors(prev => new Set(prev).add(channelName));
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 1.2; // Velocidade um pouco mais lenta que o ContentCarousel

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
    <section className="py-8 sm:py-12 bg-gradient-to-b from-background/50 to-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-high-contrast mb-2">
            Tenha acesso a mais de 80 mil conteúdos
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Incluindo os canais e plataformas mais populares do Brasil e do mundo
          </p>
        </div>
        
        <div className="relative w-full">
          <div className="overflow-hidden">
            <div
              ref={scrollRef}
              className="flex gap-6 sm:gap-8 will-change-transform"
              style={{ width: `${duplicatedChannels.length * 120}px` }}
            >
              {duplicatedChannels.map((channel, index) => (
                <div
                  key={`${channel.name}-${index}`}
                  className="flex-shrink-0 bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20 hover:bg-white/20 transition-all duration-300"
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