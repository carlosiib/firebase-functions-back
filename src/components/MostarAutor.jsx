import React from 'react'
import { db } from "../firebase"
import { LibrosContext } from "../context/LibrosProvider"
import { UsuarioContext } from "../context/UsuarioProvider"

const MostarAutor = (props) => {

  const [autor, setAutor] = React.useState("")

  const { fetchLibros } = React.useContext(LibrosContext)
  const { usuario } = React.useContext(UsuarioContext)

  React.useEffect(() => {
    fetchAutor();
  }, [])

  const eliminarLibro = async () => {
    try {
      await db.collection("libros").doc(props.id).delete()
      //actualizamos libros
      fetchLibros()
    } catch (error) {
      console.log(error)
    }
  }

  const fetchAutor = async () => {
    try {
      //porque no  usar const res = await db.collection("libros").get(email), porque la prop autorRef ya es una referencia.
      const res = await props.autorRef.get()
      console.log(res.data())
      setAutor(res.data().email)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <span> - {autor}</span>
      {
        (autor === usuario.email || usuario.rol === "admin") && (
          <button
            onClick={eliminarLibro}
            className="btn btn-danger float-right">Eliminar</button>
        )
      }

    </>
  )
}

export default MostarAutor
