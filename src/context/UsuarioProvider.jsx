import React, { useState, createContext } from 'react'
import { auth, db, firebase } from "../firebase"

export const UsuarioContext = createContext()

const UsuarioProvider = (props) => {

  const dataInicialUsuario = {
    uid: null,
    email: null,
    activo: null
  }

  const [usuario, setUsuario] = useState(dataInicialUsuario)

  const iniciarSesion = async () => {
    try {
      //preguntando por un proveedor
      const provider = new firebase.auth.GoogleAuthProvider()
      const res = auth.signInWithPopup(provider)

      //En caso que el usario se logge, pero no este registrado en una collecion. ¿Existe coleccion de usuarios con el documento en especifico(res.user.email) del usuario que esta accediendo a la app?

      const existe = await db.collection("usuarios").doc(res.user.email).get()

      if (!existe.exist) {
        //creamos la coleccion en caso de no existir
        await db.collection("usuarios").doc((await res).user.email).set({
          uid: res.user.uid,
          email: res.user.email,
          rol: "invitado"
        })
      }

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <UsuarioContext.Provider value={{ usuario, iniciarSesion }}>
      {props.children}
    </UsuarioContext.Provider>
  )
}

export default UsuarioProvider
