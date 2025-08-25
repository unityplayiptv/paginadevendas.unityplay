import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { preloadIconSprite } from './utils/iconLoader'

// Pré-carregar o sprite de ícones
preloadIconSprite();

createRoot(document.getElementById("root")!).render(<App />);
