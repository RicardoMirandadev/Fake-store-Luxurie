//*"Importo useContext, la navegacion y la caja global del carrito"*//
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CarritoContext } from "../context/Carrito";

//*"Componente de categorias suelto: botones que filtran y mandan a Explorar"*//
export default function Categorias() {
  //*"navigate cambia de pagina; del contexto saco la categoria y su funcion para cambiarla"*//
  const navigate = useNavigate();
  const { categoriaSeleccionada, setCategoriaSeleccionada } = useContext(CarritoContext);

  //*"Lista de categorias disponibles"*//
  const opciones = [
    { id: "", nombre: "All" },
    { id: "electronics", nombre: "Electronics" },
    { id: "jewelery", nombre: "Jewelry" },
    { id: "men's clothing", nombre: "Men's" },
    { id: "women's clothing", nombre: "Women's" },
  ];

  //*"Al hacer click guardo la categoria global y mando al usuario a Explorar"*//
  const manejarClick = (id) => {
    setCategoriaSeleccionada(id);
    navigate("/explore");
  };

  return (
    <div className="flex items-center gap-4 text-sm font-medium text-gray-600">
      {/* "Recorro las opciones y pinto un boton por cada una; la activa se resalta" */}
      {opciones.map((opcion) => {
        const estaActivo = categoriaSeleccionada === opcion.id;

        return (
          <button
            key={opcion.id}
            type="button"
            onClick={() => manejarClick(opcion.id)}
            className={`transition hover:text-blue-600 focus:outline-none ${
              estaActivo
                ? "text-blue-600 font-bold border-b-2 border-blue-600"
                : "text-gray-500"
            }`}
          >
            {opcion.nombre}
          </button>
        );
      })}
    </div>
  );
}
