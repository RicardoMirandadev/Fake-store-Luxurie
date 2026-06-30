//*"Importo hooks de React, herramientas de navegacion y la caja global del carrito"*//
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CarritoContext } from "../context/Carrito";

//*"Cabecera fija: logo, categorias, buscador e iconos de favoritos/carrito/perfil"*//
export default function Header() {
  //*"Saco del contexto la info que necesito mostrar y las funciones para cambiar busqueda/categoria"*//
  const {
  carrito,
  favoritos,
  busquedaGlobal,
  setBusquedaGlobal,
  categoriaSeleccionada,
  setCategoriaSeleccionada
} = useContext(CarritoContext);

  //*"navigate me deja cambiar de pagina por codigo. encimaHome controla el icono de home al pasar el mouse"*//
  const navigate = useNavigate();
  const [encimaHome, setEncimaHome] = useState(false);

  //*"Sumo todas las cantidades del carrito para el numerito rojo del icono"*//
  const totalArticulosCarrito = carrito?.reduce((acc, item) => acc + (item.cantidad || 1), 0) || 0;
  const totalFavoritos = favoritos?.length || 0;

  //*"Lista de categorias para los botones de navegacion"*//
  const categorias = [
    { id: "", nombre: "All" },
    { id: "electronics", nombre: "Electronics" },
    { id: "jewelery", nombre: "Jewelry" },
    { id: "men's clothing", nombre: "Men's" },
    { id: "women's clothing", nombre: "Women's" }
  ];

  //*"Al escribir en el buscador guardo el texto global y mando al usuario a Explorar"*//
  const manejarCambioBusqueda = (e) => {
    setBusquedaGlobal(e.target.value);
    navigate("/explore");
  };

  //*"Al elegir categoria la guardo global y mando a Explorar para ver el filtro"*//
  const manejarCambioCategoria = (id) => {
    setCategoriaSeleccionada(id);
    navigate("/explore");
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">

        {/* "Boton Home con icono que cambia al pasar el mouse" */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="p-1 hover:bg-blue-200 rounded-full transition flex items-center justify-center"
            onMouseEnter={() => setEncimaHome(true)}
            onMouseLeave={() => setEncimaHome(false)}
          >
            <img
              src={encimaHome ? "/home-hoover.svg" : "/home.svg"}
              alt="Home"
              className="w-6 h-6 object-contain"
            />
          </Link>

          {/* "Menu de categorias (se oculta en movil). La activa se pinta distinto" */}
          <nav className="hidden md:flex items-center gap-4 text-xs font-semibold text-gray-500">
            {categorias.map((cat) => {
              const estaActiva = categoriaSeleccionada === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => manejarCambioCategoria(cat.id)}
                  className={`hover:text-blue-400 hover:bg-blue-200 hover:text-shadow-blue-500 transition focus:outline-none ${
                    estaActiva ? "text-blue-900 font-bold" : "text-gray-500"
                  }`}
                >
                  {cat.nombre}
                </button>
              );
            })}
          </nav>
        </div>

        {/* "Buscador: lo que escribo aqui se guarda en el estado global" */}
        <div className="flex-1 max-w-md mx-4">
          <input
            type="text"
            value={busquedaGlobal || ""}
            onChange={manejarCambioBusqueda}
            placeholder="Encuentra tu producto..."
            className="w-full border hover:bg-blue-200 border-blue-200 px-4 py-2 rounded-lg text-blue-900 text-1 font-semibold bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-300"
          />
        </div>

        {/* "Iconos de la derecha: cambian de color y muestran un contador si hay items" */}
        <div className="flex items-center gap-4">

          <Link to="/wishlist" className="relative p-1 hover:bg-blue-200 rounded-full transition flex items-center justify-center">
            <img
              src={totalFavoritos > 0 ? "/corazon-color.svg" : "/corazon-bn.svg"}
              alt="Favoritos"
              className="w-5 h-5 object-contain"
            />
            {totalFavoritos > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                {totalFavoritos}
              </span>
            )}
          </Link>

          <Link to="/cesta" className="relative p-1 hover:bg-blue-200 rounded-full transition flex items-center justify-center">
            <img
              src={totalArticulosCarrito > 0 ? "/carrito-color.svg" : "/carrito-bn.svg"}
              alt="Carrito"
              className="w-5 h-5 object-contain"
            />
            {totalArticulosCarrito > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                {totalArticulosCarrito}
              </span>
            )}
          </Link>

          <Link to="/profile" className="p-1 hover:bg-blue-200 rounded-full transition flex items-center justify-center">
            <img src="/perfil.svg" alt="Perfil" className="w-6 h-6 object-contain" />
          </Link>
        </div>

      </div>
    </header>
  );
}
