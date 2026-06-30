//*"Importo hooks de React y la caja global del carrito"*//
import { useContext, useState } from "react";
import { CarritoContext } from "../context/Carrito";

//*"Pagina del carrito de compras con su modal de pago simulado"*//
export default function Cesta() {
  //*"Saco del contexto el carrito y las funciones para modificarlo"*//
  const { carrito, actualizarCantidad, eliminarDelCarrito, limpiarCarrito } = useContext(CarritoContext);

  //*"Estado local: controla si la ventana (modal) de pago esta abierta o cerrada"*//
  const [modalAbierto, setModalAbierto] = useState(false);

  //*"Sumo precio x cantidad de cada producto para el total a pagar"*//
  const totalPagar = carrito?.reduce((acc, prod) => acc + (prod.price * (prod.cantidad || 1)), 0) || 0;

  //*"Al confirmar el pago: aviso, cierro el modal y vacio el carrito"*//
  const depararPagoSimulado = (e) => {
    e.preventDefault();
    alert("¡Pago procesado con éxito (Simulación)! Gracias por tu compra.");
    setModalAbierto(false);
    limpiarCarrito();
  };

  return (
    <div className="container mx-auto p-4 pb-28 max-w-2xl">
      <h1 className="text-2xl font-extrabold mb-6 text-gray-900 tracking-tight">
        Tu Carrito de Compras
      </h1>

      {/* "Si el carrito esta vacio muestro un aviso; si no, muestro la lista" */}
      {carrito?.length === 0 ? (
        <div className="text-center py-16 bg-white border border-dashed rounded-2xl text-gray-400 text-sm">
          ⚠️ Tu carrito está vacío. ¡Ve al catálogo a buscar algo genial!
        </div>
      ) : (
        <div className="flex flex-col gap-4">

          {/* "Boton para vaciar todo el carrito de golpe" */}
          <div className="flex justify-end">
            <button
              onClick={limpiarCarrito}
              className="text-xs font-bold text-red-500 hover:text-red-700 uppercase tracking-wider transition"
            >
              Vaciar Carrito 🗑️
            </button>
          </div>

          {/* "Lista de productos que estan en el carrito" */}
          <div className="flex flex-col gap-3">
            {carrito.map((item) => (
              <div key={item.id} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-center justify-between gap-4">
                <div className="w-16 h-16 bg-gray-50 p-1 rounded-lg shrink-0">
                  <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-xs md:text-sm text-gray-800 truncate">{item.title}</h3>
                  <p className="text-gray-900 font-bold text-xs mt-1">${item.price}</p>
                </div>

                {/* "Botones + y - para cambiar la cantidad de ese producto" */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => actualizarCantidad(item.id, (item.cantidad || 1) - 1)}
                    className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center font-bold text-sm text-gray-600 hover:bg-gray-200"
                  >
                    -
                  </button>
                  <span className="text-xs font-bold text-gray-800 w-4 text-center">
                    {item.cantidad || 1}
                  </span>
                  <button
                    onClick={() => actualizarCantidad(item.id, (item.cantidad || 1) + 1)}
                    className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center font-bold text-sm text-gray-600 hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>

                {/* "Boton para eliminar ese producto del carrito" */}
                <button
                  onClick={() => eliminarDelCarrito(item.id)}
                  className="text-gray-400 hover:text-red-500 text-sm p-1"
                >
                  ❌
                </button>
              </div>
            ))}
          </div>

          {/* "Resumen con el total y el boton para ir a pagar" */}
          <div className="bg-white rounded-xl border p-4 shadow-sm mt-4 flex flex-col gap-3">
            <div className="flex justify-between items-center text-gray-800 font-medium">
              <span>Total Estimado:</span>
              <span className="text-xl font-extrabold text-blue-600">${totalPagar.toFixed(2)}</span>
            </div>

            <button
              onClick={() => setModalAbierto(true)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition shadow-sm"
            >
              Proceder al Pago 💳
            </button>
          </div>

        </div>
      )}

      {/* "Modal de pago simulado: solo aparece cuando modalAbierto es verdadero" */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-extrabold text-gray-900 uppercase tracking-tight">Checkout Simulado</h2>
              <button onClick={() => setModalAbierto(false)} className="text-gray-400 hover:text-gray-600 text-lg">✕</button>
            </div>

            {/* "Formulario falso de tarjeta: al enviarlo corre el pago simulado" */}
            <form onSubmit={depararPagoSimulado} className="flex flex-col gap-3">
              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Nombre en la tarjeta</label>
                <input required type="text" placeholder="Ricardo Miranda" className="w-full border p-2.5 rounded-lg text-xs bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Número de Tarjeta</label>
                <input required type="text" maxLength="16" placeholder="4111 2222 3333 4444" className="w-full border p-2.5 rounded-lg text-xs bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Expiración</label>
                  <input required type="text" placeholder="MM/AA" className="w-full border p-2.5 rounded-lg text-xs bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">CVV</label>
                  <input required type="password" maxLength="3" placeholder="***" className="w-full border p-2.5 rounded-lg text-xs bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t flex flex-col gap-2">
                <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition">
                  Confirmar Pago (${totalPagar.toFixed(2)})
                </button>
                <button type="button" onClick={() => setModalAbierto(false)} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider transition">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
