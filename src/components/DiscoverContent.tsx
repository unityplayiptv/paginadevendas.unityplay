import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/utils/analytics";

const DiscoverContent = () => {
  const handleDiscoverClick = () => {
    // Rastrear o clique no botão de descoberta
    trackEvent({ category: 'engagement', action: 'click', label: 'content_discovery_guia_de_conteudo' });
    window.open('https://guiadeconteudo.blog/', '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="max-w-4xl mx-auto text-center">
        <div className="animate-fade-in-up">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 leading-tight">
            Deseja saber <span className="gradient-text">TUDO</span> que encontrará<br />
            assinando a <span translate="no">Unity Play</span>?
          </h2>
          
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Quer saber se tem seus <span className="text-primary font-semibold">Canais</span>, 
            <span className="text-primary font-semibold"> Filmes</span> ou 
            <span className="text-primary font-semibold"> Séries Favoritos</span>?
          </p>

          <div className="flex justify-center animate-fade-in-up stagger-1">
            <Button
              onClick={handleDiscoverClick}
              className="relative group bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white drop-shadow-lg [text-shadow:_0_2px_4px_rgb(0_0_0_/_50%)] font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 animate-[pulse_2s_ease-in-out_infinite] [animation-iteration-count:infinite]"
              style={{animation: 'pulse-scale 2s ease-in-out infinite'}}
            >
              <span className="flex items-center gap-2">
                CLIQUE AQUI!
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 animate-[pulse_2s_ease-in-out_infinite] group-hover:animate-[scale_1s_ease-in-out_infinite]" style={{animation: 'pulse 2s ease-in-out infinite, scale 1.5s ease-in-out infinite'}} />
              </span>
              
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 to-amber-400 opacity-30 blur-md group-hover:opacity-50 transition-opacity duration-500"></div>
              
              {/* Smooth pulse effect */}
              <div className="absolute inset-0 rounded-full border-2 border-orange-300/50 animate-pulse opacity-60"></div>
              
              {/* Subtle breathing effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 animate-[pulse_3s_ease-in-out_infinite]"></div>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscoverContent;