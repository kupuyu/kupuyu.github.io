import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/zcool-kuaile/400.css';
import '@fontsource/caveat/500.css';
import '@fontsource/caveat/600.css';
import '@fontsource/manrope/latin-300.css';
import '@fontsource/manrope/latin-400.css';
import '@fontsource/manrope/latin-500.css';
import './site-v2.css';
import './forest-hero.css';
import './modal-cards.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
