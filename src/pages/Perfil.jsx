//*"Pagina de perfil con datos de usuario inventados (simulados)"*//
export default function Perfil() {
  //*"Guardo aqui los datos falsos del usuario para mostrarlos abajo"*//
  const usuarioSimulado = {
    nombre: "Ricardo Miranda",
    email: "ricardo@luxurie.com",
    tipoCuenta: "Cliente Premium",
    fechaRegistro: "Junio 2026",
    avatar: "/perfil.svg"
  };

  return (
    <div className="container mx-auto p-4 pb-24 max-w-md">
      <h1 className="text-2xl font-extrabold mb-6 text-gray-900 tracking-tight">
        Mi Perfil
      </h1>

      {/* "Tarjeta con avatar, nombre, correo y datos de la cuenta" */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-md flex flex-col items-center text-center gap-4">

        <div className="w-20 h-20 bg-gray-50 border rounded-full p-4 flex items-center justify-center shadow-sm">
          <img src={usuarioSimulado.avatar} alt="Avatar" className="w-full h-full object-contain" />
        </div>

        <div className="w-full">
          <h2 className="text-lg font-bold text-gray-900">{usuarioSimulado.nombre}</h2>
          <p className="text-xs text-gray-400">{usuarioSimulado.email}</p>

          <div className="mt-2 inline-block bg-blue-50 text-blue-600 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full">
            {usuarioSimulado.tipoCuenta}
          </div>
        </div>

        <hr className="w-full border-gray-100 my-2" />

        {/* "Datos extra de la cuenta" */}
        <div className="w-full text-left flex flex-col gap-3 text-xs">
          <div className="flex justify-between text-gray-600">
            <span>Miembro desde:</span>
            <span className="font-semibold text-gray-900">{usuarioSimulado.fechaRegistro}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Estado de cuenta:</span>
            <span className="font-semibold text-emerald-600">Activo</span>
          </div>
        </div>

        {/* "Boton de cerrar sesion (solo muestra un aviso, es simulado)" */}
        <button
          type="button"
          onClick={() => alert("Sesión cerrada (Simulación).")}
          className="w-full mt-4 bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition"
        >
          Cerrar Sesión
        </button>

      </div>
    </div>
  );
}
