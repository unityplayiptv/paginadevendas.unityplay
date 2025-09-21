import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import contentImageDesktop from "@/assets/content-showcase.jpg";
import contentImageMobile from "@/assets/content-showcase2.jpg";
const ContentShowcase = () => {
  const categories = ["Filmes Lançamentos", "Séries Populares", "Documentários", "Conteúdo Infantil", "ESPORTES", "Novelas", "Canais ao Vivo", "Conteúdo Adulto"];
  return <section className="py-16 sm:py-24 px-4 sm:px-6 bg-muted/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 gradient-text animate-fade-in-up">
            Conteúdo Ilimitado
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground animate-fade-in-up stagger-1 max-w-2xl mx-auto px-2">
            Milhares de títulos atualizados constantemente. Sempre algo novo para assistir.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-16 animate-fade-in-up stagger-2">
          {categories.map((category, index) => <Button key={category} variant="outline" className="border-primary/20 hover:border-primary hover:bg-primary/10 transition-all" style={{
          animationDelay: `${index * 0.1}s`
        }}>
              {category}
            </Button>)}
        </div>

        {/* Main Content Image */}
        <div className="relative mb-12 sm:mb-16 rounded-2xl overflow-hidden animate-scale-in stagger-3">
          {/* Mobile Image */}
          <img 
            src={contentImageMobile} 
            alt="Content Showcase Mobile" 
            className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-cover object-center block sm:hidden" 
          />
          {/* Desktop Image */}
          <img 
            src={contentImageDesktop} 
            alt="Content Showcase Desktop" 
            className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-cover object-center hidden sm:block" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
          
          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 text-foreground">
              Catálogo Premium em 4K
            </h3>
            
            <div className="flex justify-center">
              <Button className="hero-button text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 w-auto" onClick={() => {
              const phoneNumber = "555194890289";
              const message = "Olá! Gostaria de saber mais sobre os planos do Unity Play.";
              const encodedMessage = encodeURIComponent(message);
              const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
              window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
            }}>
                <Play className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-2" />
                TESTAR AGORA
              </Button>
            </div>
          </div>
        </div>

        {/* Featured Content Grid */}
        

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-12 sm:mt-16 animate-fade-in-up stagger-4">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text mb-2">18,000+</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Filmes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text mb-2">6,000+</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Séries</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text mb-2">1,000+</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Documentários</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text mb-2">2000+</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Canais</div>
          </div>
        </div>
      </div>
    </section>;
};
export default ContentShowcase;