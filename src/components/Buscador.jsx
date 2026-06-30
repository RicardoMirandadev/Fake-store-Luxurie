//*"Importo useContext y la caja global del carrito"*//
import { useContext } from "react";
import { CarritoContext } from "../context/Carrito";

//*"Componente de buscador suelto: escribe en el texto de busqueda global"*//
export default function Buscador() {

  //*"Saco del contexto el texto buscado y su funcion para cambiarlo"*//
  const { busquedaGlobal, setBusquedaGlobal } = useContext(CarritoContext);

  //*"Caja de texto: lo que escribo se guarda en busquedaGlobal"*//
  return (
    <input
      type="text"
      placeholder="Encuentra tu producto..."
      value={busquedaGlobal}
      onChange={(e) => setBusquedaGlobal(e.target.value)}
      className="w-full border p-2 rounded bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}
