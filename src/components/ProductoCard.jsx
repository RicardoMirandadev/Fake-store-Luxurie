//*"Importo useContext para leer la info global, Link para navegar y la caja del carrito"*//
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CarritoContext } from "../context/Carrito";

//*"Tarjeta pequena del catalogo: recibe un producto por props desde la pagina que la usa"*//
export default function ProductoCard({ producto }) {
  //*"Saco del contexto global las funciones y la lista de favoritos"*//
  const { agregarAlCarrito, favoritos, toggleFavorito } = useContext(CarritoContext);

  //*"Reviso con .some() si este producto ya esta en favoritos (para pintar el corazon a color)"*//
  const esFavorito = favoritos.some((p) => p.id === producto.id);

  return (
    <div className="border border-gray-100 p-3 rounded-xl bg-white shadow-sm flex flex-col justify-between relative group">
      {/* "Boton flotante izquierdo: corazon de favorito" */}
      <button
        type="button"
        onClick={() => toggleFavorito(producto)}
        className="absolute top-3 left-3 z-10 w-8 h-8 bg-white/80 backdrop-blur-xs rounded-full border shadow-xs flex items-center justify-center transition hover:scale-110"
      >
        <img
          src={esFavorito ? "/corazon-color.svg" : "/corazon-bn.svg"}
          alt="Favorito"
          className="w-4 h-4"
        />
      </button>

      {/* "Boton flotante derecho: agregar rapido al carrito" */}
      <button
        type="button"
        onClick={() => agregarAlCarrito(producto)}
        className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/80 backdrop-blur-xs rounded-full border shadow-xs flex items-center justify-center transition hover:scale-110"
      >
        <img src="/carrito-bn.svg" alt="Agregar al carrito" className="w-4 h-4" />
      </button>

      {/* "Cuerpo: imagen, categoria y titulo recortado del producto" */}
      <div>
        <div className="h-40 md:h-48 w-full bg-gray-50 rounded-lg p-2 mb-3 overflow-hidden">
          <img
            src={producto.image}
            alt={producto.title}
            className="w-full h-full object-contain transition group-hover:scale-105"
          />
        </div>
        <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block mb-1">
          {producto.category}
        </span>
        <h3 className="font-semibold text-xs md:text-sm line-clamp-2 text-gray-800 h-8 md:h-10">
          {producto.title}
        </h3>
      </div>

      {/* "Precio y enlace que lleva a la pagina de detalle de este producto" */}
      <div className="mt-2">
        <p className="text-gray-900 font-bold text-sm md:text-base">${producto.price}</p>
        <Link
          to={`/products/${producto.id}`}
          className="block text-center w-full mt-2 bg-gray-900 text-white py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-blue-600 transition"
        >
          Ver detalles
        </Link>
      </div>
    </div>
  );
}
