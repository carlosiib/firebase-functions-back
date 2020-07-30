import React from 'react'

import { LibrosContext } from "../context/LibrosProvider"

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
              <span> {libro.titulo}</span>
            </li>
          )
          )
        }
      </ul>
    </div>
  )
}

export default Libros
