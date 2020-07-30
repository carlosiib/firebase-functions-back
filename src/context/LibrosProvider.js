import React from 'react'
import { db } from "../firebase"

export const LibrosContext = React.createContext()

const LibrosProvider = (props) => {

  const [libros, setLibros] = React.useState([])

  React.useEffect(() => {
    fetchLibros()
  }, [])

  const fetchLibros = async () => {
    try {
      //getting DB collection libros
      const res = await db.collection("libros").get()
      const arrayLibros = res.docs.map(doc => {
        return {
          //retornando un nuevo objeto con propiepades del la collecion e incorparndole el id del autor
          //...doc.data() -> obteniendo del las propiedades(autor,paginas, titulo, uid) de un autor de la collection libros
          ...doc.data(),
          id: doc.id
        }
      })
      setLibros(arrayLibros)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <LibrosContext.Provider value={{ libros, fetchLibros }}>
      {props.children}
    </LibrosContext.Provider>
  )
}

export default LibrosProvider
