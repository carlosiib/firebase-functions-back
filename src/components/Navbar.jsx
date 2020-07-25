import React from 'react'

import { UsuarioContext } from "../context/UsuarioProvider"


const Navbar = () => {
  const { usuario, iniciarSesion, cerrarSesion } = React.useContext(UsuarioContext)

  return (
    <div className="navbar navbar-dark bg-dark">
      <div className="container">
        <div>
          <button
            className="btn btn-dark"
            onClick={iniciarSesion}>
            Login
              </button>
          <button className="btn btn-dark"
            onClick={cerrarSesion}>
            Cerrar Sesión</button>
        </div>
        <div>
          <span className="text-light">Invitado</span>
        </div>
      </div>
    </div>
  )
}

export default Navbar
