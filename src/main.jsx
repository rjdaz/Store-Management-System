import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App'

const PUBLIC_URL = process.env.PUBLIC_URL || '/Store-Management-System';

createRoot(document.getElementById('root')).render( 
  <StrictMode>
    <BrowserRouter basename={PUBLIC_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>
);
