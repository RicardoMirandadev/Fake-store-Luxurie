//*"Importo Link para los enlaces y useLocation para saber en que pagina estoy"*//
import { Link, useLocation } from "react-router-dom";

//*"Pie de pagina en escritorio y barra de navegacion abajo en movil"*//
export default function Footer() {
  //*"location me dice la ruta actual para resaltar el boton activo en movil"*//
  const location = useLocation();

  //*"Lista de botones de la barra inferior en movil"*//
  const navegacionMovil = [
    { name: "INICIO", path: "/", icon: "/home.svg" },
    { name: "EXPLORAR", path: "/explore", icon: "/All.svg" },
    { name: "FAVORITOS", path: "/wishlist", icon: "/corazon-bn.svg" },
    { name: "PERFIL", path: "/profile", icon: "/perfil-bn.svg" }
  ];

  return (
    <footer className="w-full bg-white border-t mt-12 text-sm text-gray-600">

      {/* "Bloque grande del footer (solo visible en escritorio)" */}
      <div className="hidden md:grid container mx-auto px-4 py-12 grid-cols-1 md:grid-cols-4 gap-8 pb-24 md:pb-12">

        {/* "Columna de marca y redes" */}
        <div className="flex flex-col gap-3">
          <Link to="/" className="font-extrabold text-xl tracking-wider text-gray-900">
            Luxurie.
          </Link>
          <p className="text-gray-500 text-xs leading-relaxed max-w-xs">
            Referente Premium para productos de estilo de vida, desde joyería hasta electrónica. Calidad garantizada.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <button className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-50">
              <span className="text-xs">🔗</span>
            </button>
            <button className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-50">
              <span className="text-xs">🌐</span>
            </button>
          </div>
        </div>

        {/* "Columna de categorias" */}
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-gray-900 tracking-wider text-xs uppercase mb-1">Categorías</h3>
          <Link to="/explore" className="hover:text-blue-600 text-xs">Electrónica</Link>
          <Link to="/explore" className="hover:text-blue-600 text-xs">Joyería</Link>
          <Link to="/explore" className="hover:text-blue-600 text-xs">Ropa de Hombre</Link>
          <Link to="/explore" className="hover:text-blue-600 text-xs">Ropa de Mujer</Link>
        </div>

        {/* "Columna de soporte" */}
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-gray-900 tracking-wider text-xs uppercase mb-1">Soporte</h3>
          <Link to="/" className="hover:text-blue-600 text-xs">Centro de Ayuda</Link>
          <Link to="/" className="hover:text-blue-600 text-xs">Política de Envíos</Link>
          <Link to="/" className="hover:text-blue-600 text-xs">Devoluciones y Reembolsos</Link>
          <Link to="/" className="hover:text-blue-600 text-xs">Seguimiento de Pedido</Link>
        </div>

        {/* "Columna del boletin (newsletter)" */}
        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-gray-900 tracking-wider text-xs uppercase mb-1">Boletin</h3>
          <p className="text-gray-500 text-xs">Mantengase actualizado con nuestras ultimas odertas.</p>
          <div className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full border p-2 rounded bg-gray-50 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button className="w-full bg-blue-600 text-white font-semibold py-2 rounded text-xs hover:bg-blue-700 transition">
              Subscribirse
            </button>
          </div>
        </div>

      </div>

      {/* "Barra inferior con el copyright (solo escritorio)" */}
      <div className="border-t bg-gray-50 py-4 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center text-[11px] text-gray-400">
          <p>© 2026 Luxurie Store. Powered by FakeStore API. Ricardo Miranda</p>
          <div className="flex gap-4">
            <Link to="/" className="hover:underline">Condiciones de servicio</Link>
            <Link to="/" className="hover:underline">Politicas de privacidad</Link>
            <Link to="/" className="hover:underline">Cookies</Link>
          </div>
        </div>
      </div>

      {/* "Barra de navegacion fija abajo (solo movil). Resalta el boton de la pagina actual" */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center py-2 z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        {navegacionMovil.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.name} to={item.path} className="flex flex-col items-center gap-1">
              <img
                src={item.icon}
                alt={item.name}
                className={`w-5 h-5 ${isActive ? "text-blue-600 font-bold" : "opacity-70"}`}
              />
              <span className={`text-[10px] tracking-wider ${isActive ? "text-blue-600 font-bold" : "text-gray-500"}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

    </footer>
  );
}
