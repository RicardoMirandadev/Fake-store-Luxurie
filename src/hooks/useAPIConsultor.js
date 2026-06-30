//*"Importo los hooks de React y axios para pedir datos a internet"*//
import { useState, useEffect } from 'react'
import axios from'axios'

//*"Mi hook reutilizable: le paso una URL y me devuelve datos, si carga, si hubo error y una funcion para reintentar"*//
export default function useAPIConsultor(url) {

    //*"Cajas de info: los datos que llegan, el aviso de cargando y el mensaje de error"*//
    const [datos,setDatos] = useState(null)
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)
    //*"Contador de reintentos: cada vez que sube, el useEffect vuelve a pedir la info"*//
    const [reintento, setReintento] = useState(0)

    //*"useEffect: pide la info cuando cambia la url o cuando pido reintentar"*//
    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                 setCargando(true)
                 //*"Limpio el error viejo antes de volver a intentar"*//
                 setError(null)
                  const respuesta = await axios.get(url)
                  setDatos(respuesta.data)
                } catch (err) {
                    //*"Si falla (API caida o sin red) guardo el mensaje del error"*//
                    setError(err.message)
                } finally {
                    setCargando(false)

                }
             }
             obtenerDatos()
            }, [url, reintento])

    //*"recargar: subo el contador para forzar otra peticion (lo usa el boton Reintentar)"*//
    const recargar = () => setReintento((n) => n + 1)

    //*"Devuelvo el resultado para usarlo en cualquier pagina"*//
    return { datos, cargando, error, recargar }
}
