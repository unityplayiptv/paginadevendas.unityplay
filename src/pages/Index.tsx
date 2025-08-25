import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ChannelLogos from "@/components/ChannelLogos";
import PlatformSupport from "@/components/PlatformSupport";
import PricingPlans from "@/components/PricingPlans";
import ContentShowcase from "@/components/ContentShowcase";
import ContentCarousel from "@/components/ContentCarousel";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import FadeInSection from "@/components/FadeInSection";
import GuaranteeBadge from "@/components/GuaranteeBadge";
import FlexiblePlans from "@/components/FlexiblePlans";
import CustomVideoPlayer from "@/components/CustomVideoPlayer";
import SocialProofNotification from "@/components/SocialProofNotification";
import { trackPageView, trackScrollDepth } from "@/utils/analytics";

const Index = () => {
  // Rastrear visualização de página quando o componente é montado
  useEffect(() => {
    trackPageView();
  }, []);

  // Configurar rastreamento de profundidade de rolagem
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
      
      // Rastrear em marcos de 25%, 50%, 75% e 100%
      if (scrollPercent >= 25 && scrollPercent < 50) {
        if (sessionStorage.getItem('scrollDepth25') !== 'tracked') {
          trackScrollDepth(25);
          sessionStorage.setItem('scrollDepth25', 'tracked');
        }
      } else if (scrollPercent >= 50 && scrollPercent < 75) {
        if (sessionStorage.getItem('scrollDepth50') !== 'tracked') {
          trackScrollDepth(50);
          sessionStorage.setItem('scrollDepth50', 'tracked');
        }
      } else if (scrollPercent >= 75 && scrollPercent < 100) {
        if (sessionStorage.getItem('scrollDepth75') !== 'tracked') {
          trackScrollDepth(75);
          sessionStorage.setItem('scrollDepth75', 'tracked');
        }
      } else if (scrollPercent >= 99) {
        if (sessionStorage.getItem('scrollDepth100') !== 'tracked') {
          trackScrollDepth(100);
          sessionStorage.setItem('scrollDepth100', 'tracked');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <FadeInSection>
        <ChannelLogos />
      </FadeInSection>
      <FadeInSection delay={100}>
        <PlatformSupport />
      </FadeInSection>
      <FadeInSection delay={200}>
        <ContentShowcase />
      </FadeInSection>
      {/* DiscoverContent seção removida */}
      <FadeInSection delay={600}>
        <ContentCarousel />
      </FadeInSection>
      <FadeInSection delay={600}>
        <div className="py-8 bg-background">
          <GuaranteeBadge />
        </div>
      </FadeInSection>
      <FadeInSection>
        <Testimonials />
      </FadeInSection>
      <FadeInSection delay={200}>
        <FAQ />
      </FadeInSection>
      <FadeInSection delay={300}>
        <FlexiblePlans />
      </FadeInSection>
      <FadeInSection delay={400}>
        <PricingPlans />
      </FadeInSection>
      <Footer />
      <WhatsAppButton />
      <SocialProofNotification />
    </div>
  );
};

export default Index;
