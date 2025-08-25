/**
 * Utilitário para otimizar o carregamento de ícones
 * Este arquivo fornece funções para carregar ícones de forma otimizada
 * usando o sprite SVG criado em /src/assets/icons-sprite.svg
 */

/**
 * Carrega um ícone do sprite SVG
 * @param iconId - O ID do ícone no sprite SVG
 * @returns Um elemento SVG com referência ao ícone no sprite
 */
export const loadIcon = (iconId: string): SVGSVGElement => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  
  use.setAttributeNS(
    'http://www.w3.org/1999/xlink',
    'xlink:href',
    `/assets/icons-sprite.svg#${iconId}`
  );
  
  svg.appendChild(use);
  svg.setAttribute('class', 'icon');
  
  return svg;
};

/**
 * Pré-carrega o sprite SVG de ícones
 * Chame esta função no início da aplicação para garantir que o sprite esteja disponível
 */
export const preloadIconSprite = (): void => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = '/assets/icons-sprite.svg';
  link.as = 'image';
  link.type = 'image/svg+xml';
  document.head.appendChild(link);
};

/**
 * Substitui os ícones Lucide por ícones do sprite SVG
 * @param iconName - O nome do ícone Lucide a ser substituído
 * @param className - Classes CSS a serem aplicadas ao ícone
 * @returns Um elemento SVG com referência ao ícone no sprite
 */
export const optimizedIcon = (iconName: string, className: string = ''): SVGSVGElement => {
  const svg = loadIcon(iconName);
  if (className) {
    svg.setAttribute('class', `${svg.getAttribute('class')} ${className}`);
  }
  return svg;
};