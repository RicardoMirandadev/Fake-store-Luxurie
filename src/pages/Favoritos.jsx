//*"Importo contexto y la tarjeta de producto para reutilizarla aqui"*//
import { useContext } from "react";
import { CarritoContext } from "../context/Carrito";
import ProductoCard from "../components/ProductoCard";

//*"Pagina que muestra los productos guardados como favoritos"*//
export default function Favoritos() {
  //*"Leo la lista de favoritos del contexto (ya son objetos completos, no hace falta llamar la API)"*//
  const { favoritos } = useContext(CarritoContext);

  return (
    <div className="container mx-auto p-4 pb-24 max-w-6xl">
      <h1 className="text-2xl font-extrabold mb-6 text-gray-900 tracking-tight flex items-center gap-2">
        <img src="/corazon-color.svg" alt="Favoritos" className="w-6 h-6 object-contain" />
        Mis Favoritos
      </h1>

      {/* "Si no hay favoritos muestro aviso; si hay, los pinto en una grilla con ProductoCard" */}
      {favoritos.length === 0 ? (
        <div className="text-center py-16 bg-white/80 rounded-2xl border border-gray-100 text-gray-400 text-sm shadow-sm flex flex-col items-center gap-3">
          <img src="/corazon-bn.svg" alt="Vacío" className="w-8 h-8 opacity-40" />
          <span>No tienes productos guardados en favoritos todavía.</span>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {favoritos.map((producto) => (
            <ProductoCard key={producto.id} producto={producto} />
          ))}
        </div>
      )}
    </div>
  );
}
