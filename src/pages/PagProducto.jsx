//*"Importo lo que necesito: contexto, lectura de la URL, Link, mi hook de API y la caja global"*//
import { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import useAPIConsultor from "../hooks/useAPIConsultor";
import { CarritoContext } from "../context/Carrito";

//*"Pantalla de detalle de UN producto"*//
export default function PagProducto() {
  //*"useParams lee el id que viene en la URL (/products/5 -> id = 5)"*//
  const { id } = useParams();
  //*"Con ese id le pido a la API solo ese producto"*//
  const { datos: producto, cargando } = useAPIConsultor(`https://fakestoreapi.com/products/${id}`);

  //*"Saco del contexto global las herramientas de carrito y favoritos"*//
  const { agregarAlCarrito, favoritos, toggleFavorito } = useContext(CarritoContext);

  if (cargando) return <div className="text-center mt-10 text-xs text-gray-400">Cargando producto...</div>;
  if (!producto) return <div className="text-center mt-10 text-xs text-red-500">Producto no encontrado</div>;

  //*"Reviso con .some() si este producto ya esta marcado como favorito"*//
  const esFavorito = favoritos.some((p) => p.id === producto.id);

  //*"Contenedor de pantalla completa con la imagen de fondo detras de la tarjeta"*//
  return (
    <div
    className="w-full min-h-[calc(100vh-4rem)] py-8 px-4 bg-center bg-cover flex justify-center items-center"
    style={{ backgroundImage: "url('/FondoTar.jpg')" }}>
      <div className="container mx-auto max-w-2xl">

        {/* "Boton para regresar al catalogo" */}
        <Link to="/explore" className="inline-block bg-white border px-4 py-2 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50 mb-6 transition">
          ← Volver al catálogo
        </Link>

        {/* "Tarjeta grande con la imagen y los datos del producto" */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-md flex flex-col md:flex-row gap-6 relative overflow-hidden">

          {/* "Boton flotante izquierdo: favorito" */}
          <button
            type="button"
            onClick={() => toggleFavorito(producto)}
            className="absolute top-4 left-4 z-10 w-8 h-8 bg-white/80 backdrop-blur-xs rounded-full border shadow-xs flex items-center justify-center transition hover:scale-110"
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
            className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/80 backdrop-blur-xs rounded-full border shadow-xs flex items-center justify-center transition hover:scale-110"
          >
            <img src="/carrito-bn.svg" alt="Agregar" className="w-4 h-4" />
          </button>

          {/* "Lado de la imagen del producto" */}
          <div className="w-full md:w-1/2 h-64 bg-gray-50 rounded-xl p-4 flex items-center justify-center shrink-0">
            <img src={producto.image} alt={producto.title} className="max-h-full max-w-full object-contain" />
          </div>

          {/* "Lado del contenido: categoria, titulo y descripcion" */}
          <div className="flex flex-col justify-between flex-1">
            <div>
              <span className="inline-block bg-blue-50 text-blue-600 text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded mb-3">
                {producto.category}
              </span>
              <h1 className="text-lg md:text-xl font-extrabold text-gray-900 tracking-tight leading-snug mb-3">
                {producto.title}
              </h1>
              <p className="text-gray-500 text-xs leading-relaxed font-light mb-4 line-clamp-6">
                {producto.description}
              </p>
            </div>

            <div>
              <p className="text-2xl font-black text-gray-900 mb-4">${producto.price}</p>

              {/* "Boton verde grande para anadir al carrito" */}
              <button
                type="button"
                onClick={() => agregarAlCarrito(producto)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl text-xs uppercase tracking-wider transition shadow-xs flex items-center justify-center gap-2"
              >
                <span>🛒</span> Añadir al carrito
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
