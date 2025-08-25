import React from "react";
import { 
  Smartphone, 
  Tv, 
  Monitor, 
  Projector,
  Computer
} from "lucide-react";
import AppleIcon from "./AppleIcon";

const PlatformSupport = () => {
  const platforms = [
    { name: "LG", icon: Tv },
    { name: "Samsung", icon: Tv },
    { name: "Android", icon: Smartphone },
    { name: "Roku", icon: Monitor },
    { name: "Projetor de vídeo", icon: Projector },
    { name: "AndroidTV", icon: Tv },
    { name: "Apple", icon: AppleIcon },
    { name: "Computador", icon: Computer },
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text">
          Disponível em todos os SISTEMAS
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {platforms.map((platform, index) => {
            return (
              <div 
                key={platform.name}
                className="flex flex-col items-center justify-center p-6 rounded-lg hover:bg-background/50 transition-colors duration-300"
              >
                {(() => {
                  const IconComponent = platform.icon;
                  return <IconComponent className="w-12 h-12 mb-3 text-primary" />;
                })()}
                <span className="text-sm font-medium text-center text-foreground">
                  {platform.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PlatformSupport;