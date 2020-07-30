import React from 'react'

import { LibrosContext } from "../context/LibrosProvider"
import MostrarAutor from "./MostarAutor"

const Libros = () => {
  const { libros } = React.useContext(LibrosContext)
  return (
    <div className="mt-5">
      <h3>Lista de libros</h3>
      <ul className="list-group">
        {/* .id, .titulo, son propiedades que vienen de la collecion */}
        {
          libros.map(libro => (
            <li
              key={libro.id}
              className="list-group-item">
              <span className="font-weight-bold text-uppercase"> {libro.titulo}</span>
              <span className="font-italic">
                <MostrarAutor
                  autorRef={libro.autor}
                  id={libro.id} />
              </span>
            </li>
          )
          )
        }
      </ul>
    </div>
  )
}

export default Libros
