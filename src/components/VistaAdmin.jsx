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
      .then(res => {
        console.log(res)
        if (res.data.error) {
          console.log("No tienes permisos")
          return
        }
        //modificando el rol de invitado a admin
        db.collection("usuarios").doc(email).update({ rol: "admin" })
          .then(user => {
            console.log("usuario modificado rol administrador")
            //leyendo otra vez la BD, para que se haga el cambio de rol
            fetchUsuarios()
          })
      })
  }

  return (
    <div>
      <h3>Administración de usuarios</h3>
      {usuarios.map(usuario => (
        //.uid, .email, .rol -> son propiedades que estan en la BD.
        <div key={usuario.uid} className="mb-2">
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
