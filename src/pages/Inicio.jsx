import { useState } from "react";
import { Link } from "react-router-dom";
import useAPIConsultor from "../hooks/useAPIConsultor";


export default function Inicio() {
  const {datos: productos,cargando, error,} = useAPIConsultor("https://fakestoreapi.com/products");
  const [busqueda, setBusqueda] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');

  if (cargando) {
    return (
      <div className="text-center mt-10 text-xl">Cargando productos...</div>
    );
  }

   if (error) {
    return (
      <div className="text-center mt-10 text-red-500 text-xl">
        Error al cargar: {error}
      </div>
    );
  }

  const productosFiltrados = productos?.filter((producto) => {
    const coincideBusqueda = producto.title.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria = categoriaSeleccionada =='' || producto.category === categoriaSeleccionada;

    return coincideBusqueda && coincideCategoria;
  
  })


 
  return (
    <>
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <input 
      type="text"
      placeholder="Encuentra tu producto!..."
      value={busqueda}
      onChange={(e) => setBusqueda(e.target.value)}
      className="border p-2 rounded w-full sm:w-1/2"      
      />
      <select
    value={categoriaSeleccionada}
    onChange={(e) => setCategoriaSeleccionada(e.target.value)}
    className="border p-2 rounded w-full sm:w-1/4"
  >
    <option value="">Todas las categorías</option>
    <option value="electronics">Electrónica</option>
    <option value="jewelery">Joyería</option>
    <option value="men's clothing">Ropa de hombre</option>
    <option value="women's clothing">Ropa de mujer</option>
  </select>
</div>
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Catálogo de Productos
      </h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {productosFiltrados && productosFiltrados.map((producto) => (
          <div key={producto.id} className='border p-4 rounded-lg shadow-sm hover:shadow-md transition bg-white flex flex-col justify-between'>
            <div>
              <img src={producto.image} alt={producto.title} className='h-48 w-full object-contain mb-4' />
              <h2 className='font-semibold text-sm line-clamp-2'>{producto.title}</h2>
            </div>
            <div className='mt-4'>
              <p className='text-gray-900 font-bold text-lg'>${producto.price}</p>
              <Link 
                to={`/products/${producto.id}`} 
                className='block text-center w-full mt-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition text-sm'
              >
                Ver detalles
              </Link>
              </div>
            </div>
          ))}
      </div>
    {productosFiltrados?.length === 0 && (
        <div className='text-center mt-10 text-gray-500'>No se encontraron productos que coincidan con la búsqueda.</div>
      )}  
    </div>
    </>
  );
}
