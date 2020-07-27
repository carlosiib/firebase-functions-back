import React from 'react'
import { db, functions } from "../firebase"

const VistaAdmin = () => {
  const [usuarios, setUsuarios] = React.useState([])

  React.useEffect(() => {
    fetchUsuarios()
  }, [])

  const fetchUsuarios = async () => {
    try {
      const res = await db.collection("usuarios").get()
      const arrayUsuarios = res.docs.map(doc => doc.data())
      setUsuarios(arrayUsuarios)
    } catch (error) {
      console.log(error)
    }
  }

  const administrador = (email) => {
    if (!email.trim()) {
      return console.log("email vacio")
    }

    //accediendo a custom claim
    const agregarRol = functions.httpsCallable("agregarAdministrador")

    agregarRol({ email: email })
      .then(res => { console.log(res) })
  }
  return (
    <div>
      <h3>Administración de usuarios</h3>
      {usuarios.map(usuario => (
        //.uid, .email, .rol -> son propiedades que estan en la BD.
        <div key={usuario.uid}>
          {usuario.email} - rol: {usuario.rol}
          <button
            className="btn btn-danger mx-2"
            onClick={() => administrador(usuario.email)}
          >Administardor</button>
        </div>
      ))}
    </div>
  )
}

export default VistaAdmin
