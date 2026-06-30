//*"Importo useState para controlar el estado de envio del formulario simulado"*//
import { useState } from "react";

//*"Contenedor de modales dinamicos con textos humoristicos y campos requeridos"*//
export default function ModalFooter({ tipo, alCerrar }) {
  const [enviado, setEnviado] = useState(false);

  if (!tipo) return null;

  const manejarEnvio = (e) => {
    e.preventDefault();
    setEnviado(true);
  };

  const contenidos = {
    soporte: {
      titulo: "CENTRO DE AYUDA",
      cuerpo: (
        <form onSubmit={manejarEnvio} className="flex flex-col gap-3 text-xs">
          <p className="text-gray-500 italic mb-2">Canal oficial para el procesamiento de quejas existenciales y dudas técnicas de alta ingeniería.</p>
          <input type="text" placeholder="Nombre completo" required className="border p-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
          <input type="email" placeholder="Your email address" required className="border p-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
          <textarea placeholder="Escriba aquí su respetable consulta..." required className="border p-2 rounded h-20 resize-none focus:outline-none focus:ring-1 focus:ring-blue-500" />
          <button type="submit" className="bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 transition">Enviar consulta</button>
        </form>
      )
    },
    envios: {
      titulo: "POLITICA DE ENVIOS",
      cuerpo: (
        <div className="text-xs text-gray-700 space-y-3">
          <p className="font-bold text-red-600 uppercase">Advertencia perentoria:</p>
          <p>Por medio del presente pliego condicional, el usuario reconoce y acepta con plena lucidez que lo comprado en esta web no llegará jamás a su domicilio físico.</p>
          <p>No obstante, nuestra infraestructura se encuentra plenamente facultada para realizar cobros exagerados si usted incurre en la osadía de dejar su tarjeta real en nuestro sistema.</p>
          <button onClick={alCerrar} className="w-full bg-red-600 text-white py-2 rounded font-bold mt-2 hover:bg-red-700 transition">Acepto las condiciones</button>
        </div>
      )
    },
    devoluciones: {
      titulo: "DEVOLUCIONES Y REEMBOLSOS",
      cuerpo: (
        <div className="text-xs text-gray-700 space-y-3 text-justify">
          <p className="italic">"Estimado e insigne comprador, la benevolencia es una virtud sublime, mas el balance de caja es un imperativo categórico ineludible."</p>
          <p>Con la mayor de las elegancias y amparados en una grandilocuencia corporativa inquebrantable, nos vemos en la sofisticada obligación de negarnos rotundamente a ser buenos con usted, cancelando cualquier tentativa de devolución monetaria.</p>
          <button onClick={alCerrar} className="w-full bg-gray-900 text-white py-2 rounded font-bold mt-2 hover:bg-gray-800 transition">Retirarse con elegancia</button>
        </div>
      )
    },
    seguimiento: {
      titulo: "SEGUIMIENTO DE PEDIDO",
      cuerpo: (
        <form onSubmit={manejarEnvio} className="flex flex-col gap-2 text-xs">
          <input type="text" placeholder="Nombre completo" required className="border p-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
          <input type="date" placeholder="Fecha de nacimiento" required className="border p-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
          <input type="text" placeholder="Producto comprado" required className="border p-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
          
          <div className="bg-gray-50 p-2 rounded border space-y-2 my-1 text-gray-500 font-medium">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" required className="rounded border-gray-300" /> <span>¿Ya pagó?</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" required className="rounded border-gray-300" /> <span>¿Ya comió?</span>
            </label>
          </div>
          
          <button type="submit" className="bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 transition">Rastrear ahora</button>
        </form>
      )
    },
    legales: {
      titulo: "TERMINOS, CONDICIONES Y COOKIES",
      cuerpo: (
        <div className="text-xs text-gray-600 space-y-2 max-h-60 overflow-y-auto pr-1">
          <p>**Politicas de privacidad:** Sus datos no nos pertenecen, pertenecen al flujo del libre mercado digital. Al navegar aquí, su IP ha sido registrada de forma simbólica.</p>
          <p>**Condiciones de servicio:** El servicio se provee tal cual, lo que significa que si algo falla, la responsabilidad metafísica recae sobre el usuario ejecutor.</p>
          <p>**Cookies:** No horneamos galletas; implantamos sofisticados registros binarios en su caché local para medir cuántas veces hace clic desesperadamente en el botón de favoritos.</p>
          <button onClick={alCerrar} className="w-full bg-gray-700 text-white py-2 rounded font-bold mt-2 hover:bg-gray-600 transition">Entendido</button>
        </div>
      )
    }
  };

  const actual = contenidos[tipo];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative border border-gray-100">
        
        <button onClick={alCerrar} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-sm focus:outline-none">✕</button>

        <h3 className="font-bold text-xs tracking-wider text-gray-900 mb-4 border-b pb-2 uppercase">{actual.titulo}</h3>

        {enviado ? (
          <div className="text-center py-6 space-y-3">
            <h4 className="font-bold text-gray-950 text-sm">[SIMULACIÓN]</h4>
            <p className="text-xs text-gray-500">Los flujos de datos han sido simulados e inyectados en una base de datos ficticia en memoria. Todo opera según los parámetros previstos.</p>
            <button onClick={alCerrar} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-700 transition">Volver al sitio</button>
          </div>
        ) : (
          actual.cuerpo
        )}
      </div>
    </div>
  );
}