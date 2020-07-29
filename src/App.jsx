import React from 'react';

import Navbar from './components/Navbar';
import VistaAdmin from './components/VistaAdmin';
import AgregarLibros from './components/AgregarLibros';
import Libros from './components/Libros';

import { UsuarioContext } from "./context/UsuarioProvider"

function App() {

  const { usuario } = React.useContext(UsuarioContext)

  return (
    <div className="container">
      <Navbar />
      <div className="container">
        {
          usuario.rol === "admin" && <VistaAdmin />
        }
        {
          usuario.rol === "autor" && <AgregarLibros />
        }
        <Libros />
      </div>
    </div>
  );
}

export default App;

