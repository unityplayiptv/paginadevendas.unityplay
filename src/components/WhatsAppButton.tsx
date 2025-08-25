import { MessageCircle } from "lucide-react";
import { trackWhatsAppConversion } from "@/utils/analytics";

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
  buttonLabel?: string;
  trackingLabel?: string;
}

const WhatsAppButton = ({ 
  phoneNumber = "555194890289", 
  message = "Olá! Gostaria de saber mais sobre os planos do Unity Play.",
  buttonLabel = "Botão flutuante",
  trackingLabel = "Botão WhatsApp Flutuante"
}: WhatsAppButtonProps) => {
  const handleWhatsAppClick = () => {
    // Rastrear a conversão
    trackWhatsAppConversion(trackingLabel, 0);
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    try {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Erro ao abrir WhatsApp:', error);
      // Fallback para copiar o link
      navigator.clipboard?.writeText(whatsappUrl).then(() => {
        alert('Link do WhatsApp copiado para a área de transferência!');
      }).catch(() => {
        alert('Não foi possível abrir o WhatsApp. Tente novamente.');
      });
    }
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="floating-whatsapp group"
      aria-label="Falar no WhatsApp"
      title="Falar no WhatsApp"
    >
      <MessageCircle className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
    </button>
  );
};

export default WhatsAppButton;