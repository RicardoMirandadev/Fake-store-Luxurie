//*"Aqui importo las herramientas base de React para arrancar la app en el navegador"*//
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
//*"Importo el Proveedor del carrito: el que guarda y reparte la info global (carrito y favoritos)"*//
import { CarritoProvider } from './context/Carrito.jsx'

//*"Punto de arranque: monto toda la app dentro del root del index.html"*//
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* "Envuelvo App en CarritoProvider para que TODAS las paginas puedan leer el carrito y favoritos" */}
    <CarritoProvider>
    <App />
    </CarritoProvider>

  </StrictMode>,
)
