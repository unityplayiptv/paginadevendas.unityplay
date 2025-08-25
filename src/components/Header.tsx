import { HelpCircle, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import unityLogo from "@/assets/unity-logo.png";

const Header = () => {
  const handleHelp = () => {
    // Implementar lógica de ajuda
    console.log("Ajuda solicitada");
  };

  const handleRepresentative = () => {
    const phoneNumber = "555194890289";
    const message = "Olá! Gostaria de falar com um representante do Unity Play.";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <header className="relative z-10 flex justify-between items-center py-1 px-4 sm:py-2 sm:px-6 bg-background/80 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <img 
            src={unityLogo} 
            alt="Unity Play Logo" 
            className="w-6 h-6 sm:w-8 sm:h-8"
          />
          <h1 className="text-lg sm:text-xl font-bold gradient-text" translate="no">Unity Play</h1>
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Button 
            variant="ghost" 
            onClick={handleHelp}
            className="text-foreground transition-colors text-sm sm:text-base p-1.5 sm:p-2"
          >
            <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 sm:mr-2" />
            <span className="hidden sm:inline">Ajuda</span>
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleRepresentative}
            className="border-primary/20 hover:border-primary hover:bg-primary/10 transition-all text-xs sm:text-sm p-1.5 sm:p-2"
          >
            <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 sm:mr-2" />
            <span className="hidden sm:inline">Falar com um Representante</span>
            <span className="sm:hidden">Contato</span>
          </Button>
        </div>
      </header>
   );
};

export default Header;