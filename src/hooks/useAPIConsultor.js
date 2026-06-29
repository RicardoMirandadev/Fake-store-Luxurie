import { useState, useEffect } from 'react'
import axios from'axios' 

export default function useAPIConsultor(url) {
 
    const [datos,setDatos] = useState(null)
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)
 
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
            
            return { datos, cargando, error }
        }
