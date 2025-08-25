import { ReactNode } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface FadeInSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const FadeInSection = ({ children, className = '', delay = 0 }: FadeInSectionProps) => {
  const { ref, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        hasIntersected
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8'
      } ${className}`}
      style={{
        transitionDelay: hasIntersected ? `${delay}ms` : '0ms'
      }}
    >
      {children}
    </div>
  );
};

export default FadeInSection;