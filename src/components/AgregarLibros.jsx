import React from 'react'
import { db } from "../firebase"
import { UsuarioContext } from "../context/UsuarioProvider"
import { LibrosContext } from "../context/LibrosProvider"

const AgregarLibros = () => {

  const [titulo, setTitulo] = React.useState("")
  const [paginas, setPaginas] = React.useState("")

  const { usuario } = React.useContext(UsuarioContext)
  const { fetchLibros } = React.useContext(LibrosContext)

  const agregarLibros = (e) => {
    e.preventDefault()

    //validando que los campos no esten vacios
    if (!titulo.trim() || !paginas.trim()) {
      console.log("Campos vacios")
      return
    }

    //Guardar libro
    db.collection("libros").add({
      titulo: titulo,
      paginas: paginas,
      uid: usuario.uid,
      //referencia al autor
      autor: db.collection("usuarios").doc(usuario.email)
    })
      .then(doc => {
        console.log(doc)
        fetchLibros()
      })
      .catch(error => console.log(error))

    setTitulo("")
    setPaginas("")
  }
  return (
    <div>
      <h3 className="mt-5">Agregar Libros</h3>
      <form onSubmit={agregarLibros}>
        <input
          type="text"
          placeholder="Ingresa titulo"
          className="form-control mb-2"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Ingresa paginas"
          className="form-control mb-2"
          value={paginas}
          onChange={(e) => setPaginas(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn-primary">
          Agregar
        </button>
      </form>
    </div>
  )
}

export default AgregarLibros
