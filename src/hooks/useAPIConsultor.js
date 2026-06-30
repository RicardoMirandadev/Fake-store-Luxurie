//*"Importo los hooks de React y axios para pedir datos a internet"*//
import { useState, useEffect } from 'react'
import axios from'axios'

//*"Mi hook reutilizable: le paso una URL y el me devuelve los datos, si esta cargando y si hubo error"*//
export default function useAPIConsultor(url) {

    //*"Tres cajas: los datos que llegan, el aviso de cargando y el mensaje de error"*//
    const [datos,setDatos] = useState(null)
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)

    //*"useEffect: se ejecuta solo cuando cambia la url para volver a pedir la info"*//
    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                 setCargando(true)
                  const respuesta = await axios.get(url)
                  setDatos(respuesta.data)
                } catch (err) {
                    setError(err.message)
                } finally {
                    setCargando(false)

                }
             }
             obtenerDatos()
            }, [url])

            //*"Exporto/devuelvo el resultado para usarlo en cualquier pagina"*//
            return { datos, cargando, error }
        }
