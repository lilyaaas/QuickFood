import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import App from './App.jsx'
import './index.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
        <App />
        <ToastContainer position="bottom-right" /> {/* Notifications */}
      </BrowserRouter>
  </StrictMode>,
)
