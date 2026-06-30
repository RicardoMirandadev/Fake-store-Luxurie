//*"Aviso reutilizable para cuando la API falla o no hay conexion, con boton para reintentar"*//
export default function AvisoApi({ mensaje, onReintentar }) {
  return (
    <div className="text-center py-16 bg-white/80 rounded-2xl border border-gray-100 text-gray-500 text-sm shadow-sm flex flex-col items-center gap-3 max-w-md mx-auto mt-10">
      <span className="text-3xl">⚠️</span>
      <h2 className="font-bold text-gray-800">No pudimos cargar la información</h2>
      {/* "Si me pasan un mensaje lo muestro; si no, uno generico" */}
      <p className="text-xs text-gray-400 max-w-xs">
        {mensaje || "Parece que no hay conexión o la API está caída. Intenta de nuevo en un momento."}
      </p>
      {/* "El boton solo aparece si la pagina me paso la funcion onReintentar" */}
      {onReintentar && (
        <button
          type="button"
          onClick={onReintentar}
          className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg text-xs uppercase tracking-wider transition"
        >
          Reintentar
        </button>
      )}
    </div>
  );
}
