// Utilitário para rastreamento de eventos do Google Analytics

// Tipos de eventos que podemos rastrear
export type EventCategory = 
  | 'engagement' 
  | 'conversion' 
  | 'navigation' 
  | 'video' 
  | 'pricing';

export type EventAction = 
  | 'click' 
  | 'view' 
  | 'scroll' 
  | 'play' 
  | 'pause' 
  | 'complete' 
  | 'signup' 
  | 'whatsapp_redirect';

// Interface para os parâmetros do evento
interface EventParams {
  category: EventCategory;
  action: EventAction;
  label?: string;
  value?: number;
  [key: string]: any; // Para parâmetros adicionais
}

/**
 * Envia um evento para o Google Analytics
 * @param params Parâmetros do evento
 */
export const trackEvent = (params: EventParams): void => {
  // Verifica se o gtag está disponível
  if (typeof window !== 'undefined' && (window as any).gtag) {
    const { category, action, label, value, ...rest } = params;
    
    // Envia o evento para o GA4
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      ...rest
    });
    
    console.log(`[Analytics] Evento rastreado: ${category} - ${action} - ${label || 'N/A'}`);
  } else {
    console.warn('[Analytics] Google Analytics não está disponível');
  }
};

/**
 * Rastreia uma visualização de página
 * @param pagePath Caminho da página
 * @param pageTitle Título da página
 */
export const trackPageView = (pagePath?: string, pageTitle?: string): void => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'page_view', {
      page_path: pagePath || window.location.pathname,
      page_title: pageTitle || document.title,
      page_location: window.location.href
    });
    
    console.log(`[Analytics] Visualização de página: ${pagePath || window.location.pathname}`);
  } else {
    console.warn('[Analytics] Google Analytics não está disponível');
  }
};

/**
 * Rastreia uma conversão (clique em botão de WhatsApp)
 * @param planName Nome do plano selecionado
 * @param planPrice Preço do plano
 */
export const trackWhatsAppConversion = (planName?: string, planPrice?: number): void => {
  trackEvent({
    category: 'conversion',
    action: 'whatsapp_redirect',
    label: planName || 'Não especificado',
    value: planPrice,
    plan_name: planName,
    plan_price: planPrice
  });
};

/**
 * Rastreia interações com vídeos
 * @param action Ação realizada (play, pause, complete)
 * @param videoTitle Título do vídeo
 * @param currentTime Tempo atual do vídeo em segundos
 */
export const trackVideoInteraction = (
  action: 'play' | 'pause' | 'complete',
  videoTitle?: string,
  currentTime?: number
): void => {
  trackEvent({
    category: 'video',
    action: action,
    label: videoTitle || 'Vídeo principal',
    value: currentTime,
    video_title: videoTitle,
    current_time: currentTime
  });
};

/**
 * Rastreia rolagem da página
 * @param depth Profundidade da rolagem em porcentagem (25, 50, 75, 100)
 */
export const trackScrollDepth = (depth: 25 | 50 | 75 | 100): void => {
  trackEvent({
    category: 'engagement',
    action: 'scroll',
    label: `Rolagem ${depth}%`,
    value: depth,
    scroll_depth: depth
  });
};