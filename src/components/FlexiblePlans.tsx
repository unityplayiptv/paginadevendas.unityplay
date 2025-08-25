import { DollarSign } from "lucide-react";

const FlexiblePlans = () => {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-background">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 text-foreground">
          Planos flexíveis para toda família
        </h2>
        
        <div className="max-w-md mx-auto">
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <div className="bg-primary rounded-lg p-2 flex-shrink-0">
                <DollarSign className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold text-primary mb-2">
                  Economia Garantida
                </h3>
                <p className="text-sm text-muted-foreground">
                  Economize até <span className="font-bold text-primary">R$2.160/ano</span> comparado a TV a cabo tradicional
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlexiblePlans;