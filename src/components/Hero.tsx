import { Play, Star, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-streaming-no-text.jpg";
import videoSrc from "@/assets/vls-unity.mp4";
import { useState, useRef, useEffect } from "react";
import { trackEvent, trackVideoInteraction, trackWhatsAppConversion } from "@/utils/analytics";

const Hero = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
      setShowButton(false);
      setVideoEnded(false);
      trackVideoInteraction('play', 'Vídeo de apresentação', videoRef.current.currentTime);
    }
  };

  const handleRestartClick = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setVideoEnded(false);
      setIsPlaying(true);
      setShowButton(false);
    }
  };

  // Event listener para o fim do vídeo
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVideoEnd = () => {
      console.log('Vídeo terminou');
      setVideoEnded(true);
      setIsPlaying(false);
      trackVideoInteraction('complete', 'Vídeo de apresentação');
    };

    video.addEventListener('ended', handleVideoEnd);

    return () => {
      video.removeEventListener('ended', handleVideoEnd);
    };
  }, []);

  // Prevenir interações durante a reprodução
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const preventContextMenu = (e: Event) => {
      if (isPlaying) {
        e.preventDefault();
      }
    };

    const preventKeyboard = (e: KeyboardEvent) => {
      if (isPlaying) {
        if (e.code === 'Space' || e.code === 'KeyK' || e.code === 'ArrowLeft' || e.code === 'ArrowRight' || e.code === 'ArrowUp' || e.code === 'ArrowDown' || e.code === 'KeyM' || e.code === 'KeyF' || e.code === 'Escape') {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    };

    if (isPlaying) {
      video.addEventListener('contextmenu', preventContextMenu);
      document.addEventListener('keydown', preventKeyboard, true);
    }

    return () => {
      video.removeEventListener('contextmenu', preventContextMenu);
      document.removeEventListener('keydown', preventKeyboard, true);
    };
  }, [isPlaying]);



  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Streaming Service Hero" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/50 sm:bg-gradient-to-r sm:from-background/90 sm:to-background/50"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 flex flex-col justify-between min-h-[100svh] py-16 sm:py-20">
        {/* Title Section - Moved higher */}
        <div className="pt-0 -mt-8 sm:-mt-20">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-6xl font-bold mb-3 sm:mb-6 animate-fade-in-up text-high-contrast drop-shadow-lg text-shadow-glow">
            Excelência em Streaming
          </h1>
          
          <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-medium-contrast mb-4 sm:mb-12 animate-fade-in-up stagger-1 max-w-2xl mx-auto px-2">
            Milhares de filmes, séries e novelas em qualidade 4K. 
            Oferecemos uma infinidade de conteúdo para toda a família.
          </p>
        </div>

        {/* Video Section - Added in the middle */}
        <div className="flex-1 flex items-center justify-center max-w-3xl mx-auto w-full -mt-8 sm:mt-0">
          <div className="w-full">
            <div className="text-center mb-3 sm:mb-6 animate-fade-in-up">
              <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-4 gradient-text">
              Confira o que nosso sistema lhe oferecerá
              </h2>
            </div>

            <div className="relative">
              <div className="relative p-1 sm:p-2 bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20 rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl">
                <div className="relative bg-background/90 rounded-lg sm:rounded-xl overflow-hidden video-container">
                  <video 
                    ref={videoRef} 
                    className="w-full h-auto aspect-video bg-black rounded-xl" 
                    preload="metadata" 
                    playsInline 
                    controls={false} 
                    loop={false}
                    controlsList="nodownload" 
 
                    onContextMenu={e => isPlaying && e.preventDefault()} 
                    style={{ pointerEvents: isPlaying ? 'none' : 'auto' }}
                    onLoadedMetadata={() => {
                      if (videoRef.current) {
                        videoRef.current.controls = false;
                        videoRef.current.setAttribute('controlsList', 'nodownload');
                      }
                    }}
                  >
                    <source src={videoSrc} type="video/mp4" />
                    Seu navegador não suporta o elemento de vídeo.
                  </video>
                  
                  {/* Custom fullscreen button for browsers that don't support webkit controls */}
                  <button 
                    className="custom-fullscreen-btn"
                    onClick={() => {
                      if (videoRef.current) {
                        if (videoRef.current.requestFullscreen) {
                          videoRef.current.requestFullscreen();
                        } else if ((videoRef.current as any).webkitRequestFullscreen) {
                          (videoRef.current as any).webkitRequestFullscreen();
                        } else if ((videoRef.current as any).msRequestFullscreen) {
                          (videoRef.current as any).msRequestFullscreen();
                        }
                      }
                    }}
                    title="Tela cheia"
                  >
                    <Maximize className="w-4 h-4" />
                  </button>

                  {/* Custom play button overlay */}
                  {showButton && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg sm:rounded-xl">
                      <Button 
                        onClick={handlePlayClick} 
                        className="hero-button text-sm sm:text-lg px-4 sm:px-8 py-2 sm:py-4 shadow-lg sm:shadow-2xl transform hover:scale-105 transition-all duration-300"
                      >
                        <Play className="w-4 h-4 sm:w-6 sm:h-6 mr-2 sm:mr-3 fill-current" />
                        Assistir agora
                      </Button>
                    </div>
                  )}

                  {/* Video ended restart message */}
                  {videoEnded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-lg sm:rounded-xl">
                      <Button 
                        onClick={handleRestartClick} 
                        className="hero-button text-xs sm:text-lg px-4 sm:px-8 py-2 sm:py-4 shadow-lg sm:shadow-2xl transform hover:scale-105 transition-all duration-300"
                      >
                        <Play className="w-4 h-4 sm:w-6 sm:h-6 mr-2 sm:mr-3 fill-current" />
                        <span className="text-xs sm:text-base">Assistir novamente</span>
                      </Button>
                    </div>
                  )}




                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons Section - At bottom limit */}
        <div className="pb-2 sm:pb-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center animate-fade-in-up stagger-2 mb-4 sm:mb-12 mt-8 sm:mt-16">
            <Button 
              className="hero-button group w-full sm:w-auto text-sm sm:text-base py-2 sm:py-3"
              onClick={() => {
                // Rastrear o evento de conversão
                trackWhatsAppConversion('Botão Hero', 0);
                
                const phoneNumber = "555194890289";
                const message = "Olá! Gostaria de contratar um plano do Unity Play.";
                const encodedMessage = encodeURIComponent(message);
                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
                window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
              }}
            >
              <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 group-hover:scale-110 transition-transform" />
              Começar Agora
            </Button>
            
            <Button 
              variant="outline" 
              className="border-white/20 text-foreground hover:bg-white/10 w-full sm:w-auto text-sm sm:text-base py-2 sm:py-3"
              onClick={() => {
                // Rastrear o evento de navegação
                trackEvent({
                  category: 'navigation',
                  action: 'click',
                  label: 'Ver Planos (Hero)'
                });
                
                setTimeout(() => {
                  const plansSection = document.getElementById('pricing-plans');
                  if (plansSection) {
                    plansSection.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start',
                      inline: 'nearest'
                    });
                  }
                }, 100);
              }}
            >
              <Star className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
              Ver Planos
            </Button>
          </div>

        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-10 sm:top-20 left-2 sm:left-10 w-12 h-12 sm:w-20 sm:h-20 bg-primary/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-10 sm:bottom-20 right-2 sm:right-10 w-16 h-16 sm:w-32 sm:h-32 bg-brand-blue/20 rounded-full blur-xl animate-float stagger-1"></div>
    </section>
  );
};

export default Hero;