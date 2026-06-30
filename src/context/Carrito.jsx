//*"Importo lo necesario de React para crear el contexto y guardar estados"*//
import { createContext, useState } from "react";

//*"Creo la caja global (Context). Aqui vivira la info compartida del carrito y favoritos"*//
export const CarritoContext = createContext();

//*"Este Proveedor envuelve la app y reparte la info a quien la pida con useContext"*//
export function CarritoProvider({ children }) {
  //*"Aqui guardo la info en memoria: cada useState es una caja con su funcion para cambiarla"*//
  const [carrito, setCarrito] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [busquedaGlobal, setBusquedaGlobal] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");

  //*"Agregar al carrito: si el producto ya esta le sumo cantidad, si no lo meto nuevo con cantidad 1"*//
  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      if (existe) {
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: (item.cantidad || 1) + 1 }
            : item
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  //*"Cambiar cantidad de un producto. Si baja de 1 lo saco del carrito"*//
  const actualizarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad < 1) {
      eliminarDelCarrito(id);
      return;
    }
    setCarrito((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, cantidad: nuevaCantidad } : item
      )
    );
  };

  //*"Sacar un solo producto del carrito por su id"*//
  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  //*"Vaciar el carrito completo"*//
  const limpiarCarrito = () => {
    setCarrito([]);
  };

  //*"Favoritos tipo interruptor: si ya esta lo quito, si no esta lo meto (guardo el objeto entero)"*//
  const toggleFavorito = (producto) => {
    setFavoritos((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      if (existe) {

        return prev.filter((item) => item.id !== producto.id);
      }

      return [...prev, producto];
    });
  };

  //*"Aqui entrego toda la info y las funciones para que cualquier pagina las use"*//
  return (
    <CarritoContext.Provider value={{
      carrito,
      agregarAlCarrito,
      actualizarCantidad,
      eliminarDelCarrito,
      limpiarCarrito,
      favoritos,
      toggleFavorito,
      busquedaGlobal,
      setBusquedaGlobal,
      categoriaSeleccionada,
      setCategoriaSeleccionada
    }}>
      {children}
    </CarritoContext.Provider>
  );
}
