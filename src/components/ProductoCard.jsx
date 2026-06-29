import { useParams, Link } from 'react-router-dom';
import useAPIConsultor from '../hooks/useAPIConsultor';

export default function PagProducto() {
   const { id } = useParams();
   const { datos: producto, cargando, error } = useAPIConsultor(`https://fakestoreapi.com/products/${id}`);

  if (cargando) {
    return <div className='text-center mt-10 text-xl'>Cargando detalles del producto...</div>;
  }

  if (error) {
    return <div className='text-center mt-10 text-red-500 text-xl'>Error al cargar el producto: {error}</div>;
  }

 
  if (!producto) {
    return <div className='text-center mt-10 text-xl'>Producto no encontrado.</div>;
  }

  return (
    <div className='container mx-auto p-4 max-w-4xl'>
      
      <Link 
        to="/" 
        className='inline-block mb-6 bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300 transition text-sm font-medium'
      >
        ← Volver al catálogo
      </Link>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-lg shadow-md border'>
        
        
        <div className='flex justify-center items-center p-4 bg-gray-50 rounded-lg'>
          <img 
            src={producto.image} 
            alt={producto.title} 
            className='max-h-80 object-contain'
          />
        </div>

        
        <div className='flex flex-col justify-between'>
          <div>
            <span className='inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded uppercase tracking-wide mb-2'>
              {producto.category}
            </span>
            <h1 className='text-2xl font-bold text-gray-900 mb-4'>{producto.title}</h1>
            <p className='text-gray-600 leading-relaxed mb-6'>{producto.description}</p>
          </div>

          <div>
            <p className='text-3xl font-extrabold text-gray-900 mb-4'>${producto.price}</p>
            <button className='w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition'>
              Añadir al carrito
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}