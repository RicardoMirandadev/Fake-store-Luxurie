//*"Importo contexto, Link y mi hook de API para traer los productos"*//
import { useContext } from "react";
import { Link } from "react-router-dom";
import useAPIConsultor from "../hooks/useAPIConsultor";
import { CarritoContext } from "../context/Carrito";

//*"Pagina de inicio: portada, novedades y accesos por categoria"*//
export default function Inicio() {
  //*"Pido todos los productos a la API"*//
  const { datos: productos, cargando } = useAPIConsultor("https://fakestoreapi.com/products");
  //*"Saco del contexto la funcion para guardar la categoria elegida"*//
  const { setCategoriaSeleccionada } = useContext(CarritoContext);

  //*"Me quedo solo con los primeros 4 productos como Nuevos Ingresos"*//
  const nuevosIngresos = productos ? productos.slice(0, 4) : [];

  return (
    <div className="w-full">

      {/* "Portada grande (hero) con imagen de fondo y botones al catalogo" */}
      <div className="relative bg-gray-900 text-white h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-40 bg-cover bg-center" style={{ backgroundImage: "url('/PagPrincipal.jpg')" }}></div>

        <div className="relative z-10 text-center px-4 max-w-2xl flex flex-col items-center">
          <span className="text-blue-500 text-xs font-bold tracking-widest uppercase mb-2">Nueva Temporada Verano 2026</span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 leading-tight">
            Redefine tu estilo! <br /> Aumenta tu confianza!
          </h1>
          <p className="text-gray-300 text-sm md:text-base mb-6 font-light max-w-md">
            Descubre la mejor manera de comprar productos Premium que cambiara tu vida!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
            <Link to="/explore" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-sm transition">
              CATALOGO
            </Link>
            <Link to="/explore" className="bg-gray-300 hover:bg-blue-700 text-gray-800 font-bold py-3 px-8 rounded-lg text-sm transition">
              Echar un vistazo
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4">

        {/* "Seccion Nuevos Ingresos: muestra los 4 productos recientes" */}
        <div className="my-10">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Nuevos Ingresos</h2>
              <p className="text-xs text-gray-400">Nuestros artículos más populares de la semana</p>
            </div>
            <Link to="/explore" className="text-blue-600 font-bold text-xs hover:underline flex items-center gap-1">
              Ver Todo →
            </Link>
          </div>

          {/* "Mientras carga muestro un aviso; cuando llega la data pinto la grilla" */}
          {cargando ? (
            <div className="text-center py-10 text-gray-400">Cargando novedades...</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {nuevosIngresos.map((producto) => (
                <div key={producto.id} className="border p-3 rounded-xl bg-white shadow-sm flex flex-col justify-between border-gray-100 relative group">
                  <div>
                    <div className="h-40 md:h-48 w-full bg-gray-50 rounded-lg p-2 mb-3 relative overflow-hidden">
                      <img src={producto.image} alt={producto.title} className="w-full h-full object-contain transition group-hover:scale-105" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block mb-1">{producto.category}</span>
                    <h3 className="font-semibold text-xs md:text-sm line-clamp-2 text-gray-800 h-8 md:h-10">{producto.title}</h3>
                  </div>
                  <div className="mt-2">
                    <p className="text-gray-900 font-bold text-sm md:text-base">${producto.price}</p>
                    <Link to={`/products/${producto.id}`} className="block text-center w-full mt-2 bg-gray-900 text-white py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-blue-600 transition">
                      Ver detalles
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <hr className="my-10 border-gray-100" />

        {/* "Seccion comprar por categoria: cada circulo lleva a la ruta de su categoria (o al catalogo si es Todas)" */}
        <div className="my-10">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Comprar por Categoría</h2>
          <div className="flex items-center gap-6 overflow-x-auto py-2">
            {[
              { id: "", nombre: "Todas", img: "/All.svg" },
              { id: "electronics", nombre: "Electrónica", img: "/Electronica.svg" },
              { id: "jewelery", nombre: "Joyería", img: "/Jewelry.svg" },
              { id: "men's clothing", nombre: "Caballeros", img: "/men's.svg" },
              { id: "women's clothing", nombre: "Damas", img: "/women's.svg" },
            ].map((cat) => (
              <Link
                key={cat.id}
                to={cat.id === "" ? "/explore" : `/products/category/${encodeURIComponent(cat.id)}`}
                onClick={() => setCategoriaSeleccionada(cat.id)}
                className="flex flex-col items-center gap-2 min-w-17.5 focus:outline-none"
              >
                <div className="w-14 h-14 rounded-full border bg-white flex items-center justify-center p-3 shadow-sm border-gray-200 hover:border-blue-600 transition">
                  <img src={cat.img} alt={cat.nombre} className="w-full h-full object-contain" />
                </div>
                <span className="text-xs tracking-tight text-gray-600">{cat.nombre}</span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
