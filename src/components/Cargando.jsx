//*"Spinner reutilizable que muestro mientras se cargan los datos de la API"*//
export default function Cargando({ texto = "Cargando..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-gray-400">
      {/* "El circulo que gira: borde gris con un lado azul + animate-spin de Tailwind" */}
      <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
      <span className="text-sm">{texto}</span>
    </div>
  );
}
