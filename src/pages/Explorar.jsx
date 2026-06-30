//*"Importo contexto, Link y mi hook de API"*//
import { useContext } from "react";
import { Link } from "react-router-dom";
import useAPIConsultor from "../hooks/useAPIConsultor";
import { CarritoContext } from "../context/Carrito";

//*"Pagina de catalogo completo con filtro por busqueda y por categoria"*//
export default function Explorar() {
  //*"Pido todos los productos a la API"*//
  const { datos: productos, cargando, error } = useAPIConsultor("https://fakestoreapi.com/products");
  //*"Leo del contexto el texto buscado y la categoria elegida (vienen del Header)"*//
  const { busquedaGlobal, categoriaSeleccionada } = useContext(CarritoContext);

  if (cargando) return <div className="text-center mt-10 text-xl">Cargando catálogo...</div>;
  if (error) return <div className="text-center mt-10 text-red-500 text-xl">Error: {error}</div>;

  //*"Filtro los productos: deben coincidir con el texto buscado Y con la categoria"*//
  const productosFiltrados = productos?.filter((producto) => {
    const coincideBusqueda = producto.title.toLowerCase().includes(busquedaGlobal.toLowerCase());
    const coincideCategoria = categoriaSeleccionada === '' || producto.category === categoriaSeleccionada;
    return coincideBusqueda && coincideCategoria;
  });

  return (
    <div className="container mx-auto p-4 mb-12">
      {/* "Titulo que cambia segun haya o no categoria seleccionada" */}
      <h1 className="text-2xl font-extrabold mb-6 text-gray-900 tracking-tight">
        {categoriaSeleccionada === "" ? "Catálogo Completo" : `Categoría: ${categoriaSeleccionada}`}
      </h1>

      {/* "Grilla con cada producto ya filtrado" */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {productosFiltrados?.map((producto) => (
          <div key={producto.id} className='border p-4 rounded-xl shadow-sm bg-white flex flex-col justify-between border-gray-100'>
            <div>
              <img src={producto.image} alt={producto.title} className='h-48 w-full object-contain mb-4' />
              <h2 className='font-semibold text-sm line-clamp-2 text-gray-800'>{producto.title}</h2>
            </div>
            <div className='mt-4'>
              <p className='text-gray-900 font-bold text-lg'>${producto.price}</p>
              <Link to={`/products/${producto.id}`} className='block text-center w-full mt-2 bg-blue-600 text-white py-2 px-4 rounded-lg text-xs font-bold uppercase'>
                Ver detalles
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
