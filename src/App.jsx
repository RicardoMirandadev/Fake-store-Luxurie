//*"Importo el ruteador y las piezas para definir cada ruta/pagina"*//
import { BrowserRouter, Routes, Route } from 'react-router-dom'
//*"Aqui importo todas mis paginas y componentes para usarlos como rutas abajo"*//
import Inicio from './pages/Inicio'
import Explorar from './pages/Explorar'
import Favoritos from './pages/Favoritos'
import Cesta from './components/Cesta'
import NoVendemos from './pages/NoVendemos'
import PagProducto from './pages/PagProducto'
import Header from './components/Header'
import Footer from './components/Footer'
import Perfil from './pages/Perfil'

function App() {

  return (
    <>

   <BrowserRouter>
      {/* "Contenedor raiz con la imagen de fondo fija que envuelve toda la app" */}
      <div className="min-h-screen flex flex-col justify-between pb-16 md:pb-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/FondoLux.jpg')" }}
      >
        <div>
          {/* "Cabecera fija arriba (logo, buscador, iconos)" */}
          <Header />
          <main>
            {/* "Tabla de rutas: segun la URL del navegador se muestra una pagina u otra" */}
            <Routes>
              <Route path="/profile" element={<Perfil />} />
              <Route path="/" element={<Inicio />} />
              <Route path="/explore" element={<Explorar />} />
              <Route path="/wishlist" element={<Favoritos />} />
              <Route path="/cesta" element={<Cesta />} />
              {/* "Ruta de categoria: usa el endpoint /products/category/:category de la API" */}
              <Route path="/products/category/:category" element={<Explorar />} />
              {/* ":id es comodin: lee el numero del producto desde la URL" */}
              <Route path="/products/:id" element={<PagProducto />} />
              {/* "El * atrapa cualquier ruta que no exista y muestra el 404" */}
              <Route path="*" element={<NoVendemos />} />
            </Routes>
          </main>
        </div>
        {/* "Pie de pagina (y barra de navegacion en movil)" */}
        <Footer />
      </div>
    </BrowserRouter>
    </>
  )
}

//*"Exporto App para que main.jsx lo pueda montar"*//
export default App
