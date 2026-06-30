//*"Importo contexto, Link, useParams (para leer la categoria de la URL), mi hook y los avisos de estado"*//
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import useAPIConsultor from "../hooks/useAPIConsultor";
import { CarritoContext } from "../context/Carrito";
import Cargando from "../components/Cargando";
import AvisoApi from "../components/AvisoApi";

//*"Pagina de catalogo: muestra todos los productos o los de una categoria segun la URL"*//
export default function Explorar() {
  //*"Leo la categoria desde la URL. En /explore viene vacia; en /products/category/x trae la categoria"*//
  const { category } = useParams();

  //*"Si hay categoria pido al endpoint /products/category/:category; si no, pido todos los productos"*//
  const url = category
    ? `https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`
    : "https://fakestoreapi.com/products";

  const { datos: productos, cargando, error, recargar } = useAPIConsultor(url);
  //*"Del contexto solo necesito el texto del buscador (la categoria ya la filtra la API)"*//
  const { busquedaGlobal } = useContext(CarritoContext);

  //*"Estado cargando: muestro el spinner reutilizable"*//
  if (cargando) return <Cargando texto="Cargando catálogo..." />;
  //*"Estado error: muestro el aviso con boton Reintentar (le paso recargar del hook)"*//
  if (error) return <AvisoApi onReintentar={recargar} />;

  //*"Filtro solo por el texto buscado; la categoria ya viene resuelta desde la API"*//
  const productosFiltrados = productos?.filter((producto) =>
    producto.title.toLowerCase().includes(busquedaGlobal.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 mb-12">
      {/* "Titulo: cambia si estoy viendo el catalogo completo o una categoria" */}
      <h1 className="text-2xl font-extrabold mb-6 text-gray-900 tracking-tight">
        {category ? `Categoría: ${category}` : "Catálogo Completo"}
      </h1>

      {/* "Si el filtro no devolvio nada muestro un aviso; si hay resultados muestro la grilla" */}
      {productosFiltrados?.length === 0 ? (
        <div className="text-center py-16 text-gray-400 text-sm">
          No encontramos productos que coincidan{busquedaGlobal ? ` con "${busquedaGlobal}"` : ""}.
        </div>
      ) : (
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
      )}
    </div>
  );
}
