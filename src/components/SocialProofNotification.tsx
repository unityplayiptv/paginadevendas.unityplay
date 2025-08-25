import { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

const SocialProofNotification = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentNotification, setCurrentNotification] = useState('');

  const nomes = [
    'Ana Silva', 'Carlos Oliveira', 'Maria Santos', 'João Pereira',
    'Fernanda Costa', 'Rafael Lima', 'Juliana Rodrigues', 'Pedro Almeida',
    'Camila Ferreira', 'Lucas Barbosa', 'Beatriz Ribeiro', 'Gabriel Martins',
    'Larissa Souza', 'Felipe Cardoso', 'Isabela Gomes', 'Thiago Nascimento',
    'Amanda Rocha', 'Bruno Dias', 'Vitória Carvalho', 'Mateus Fernandes'
  ];

  const planos = ['Quinzenal', 'Mensal', 'Trimestral', 'Semestral'];

  const generateNotification = () => {
    const nome = nomes[Math.floor(Math.random() * nomes.length)];
    const plano = planos[Math.floor(Math.random() * planos.length)];
    return `${nome} acabou de adquirir o Plano ${plano}`;
  };

  useEffect(() => {
    // Primeira exibição após 12 segundos
    const initialTimer = setTimeout(() => {
      setCurrentNotification(generateNotification());
      setIsVisible(true);
      
      // Esconde após 6 segundos
      setTimeout(() => {
        setIsVisible(false);
      }, 6000);
    }, 12000);

    // Exibições subsequentes a cada 30 segundos
    const interval = setInterval(() => {
      setCurrentNotification(generateNotification());
      setIsVisible(true);
      
      // Esconde após 6 segundos
      setTimeout(() => {
        setIsVisible(false);
      }, 6000);
    }, 30000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-24 right-4 z-40 max-w-sm bg-card border border-border rounded-lg shadow-lg p-4 transition-all duration-500 ease-in-out ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
    }`}>
      <div className="flex items-center gap-3">
        <CheckCircle className="w-6 h-6 text-green-500 animate-pulse" />
        <div>
          <p className="text-sm font-medium text-foreground">
            {currentNotification}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Há poucos segundos
          </p>
        </div>
      </div>
    </div>
  );
};

export default SocialProofNotification;