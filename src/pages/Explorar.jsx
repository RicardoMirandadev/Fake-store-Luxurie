//*"Importo contexto, Link, useParams (para leer la categoria de la URL), mi hook y los avisos de estado"*//
import { useContext } from "react";
import { useParams } from "react-router-dom";
import useAPIConsultor from "../hooks/useAPIConsultor";
import { CarritoContext } from "../context/Carrito";
import Cargando from "../components/Cargando";
import AvisoApi from "../components/AvisoApi";
import ProductoCard from "../components/ProductoCard";

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
      <h1 className="text-2xl font-extrabold mb-6 text-gray-900 tracking-tight">
        {category ? `Categoría: ${category}` : "Catálogo Completo"}
      </h1>

      {productosFiltrados?.length === 0 ? (
        <div className="text-center py-16 text-gray-400 text-sm">
          No encontramos productos que coincidan{busquedaGlobal ? ` con "${busquedaGlobal}"` : ""}.
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {productosFiltrados?.map((producto) => (
            <ProductoCard key={producto.id} producto={producto} />
          ))}
        </div>
      )}
    </div>
  );
}
