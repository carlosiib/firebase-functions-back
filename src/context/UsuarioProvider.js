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

  //Detectar usuario
  React.useEffect(() => {
    detectarUsuario()
  }, [])

  const detectarUsuario = () => {
    auth.onAuthStateChanged(user => {
      if (user) {
        console.log(user)
        //accediento al token del usuario
        user.getIdTokenResult()
          .then(idTokenResult => {
            console.log(idTokenResult)
            //Si el usuario loggeado es admin, se modificara su rol a admin, mediante la propiedad rol
            if (!!idTokenResult.claims.admin) {
              console.log("es admin")
              setUsuario({
                email: user.email,
                uid: user.uid,
                activo: true,
                rol: "admin"
              })
            } else if (!!idTokenResult.claims.autor) {
              console.log("es autor")
              setUsuario({
                email: user.email,
                uid: user.uid,
                activo: true,
                rol: "autor"
              })
            } else {
              console.log("es invitado")
              setUsuario({
                email: user.email,
                uid: user.uid,
                activo: true,
                rol: "invitado"
              })
            }
          })
      } else {
        //cerrando sesion y reiniciando el state
        setUsuario({
          email: null,
          uid: null,
          activo: false,
          rol: null
        })
      }
    })
  }

  const iniciarSesion = async () => {
    try {
      //preguntando por un proveedor
      const provider = new firebase.auth.GoogleAuthProvider()
      const res = await auth.signInWithPopup(provider)

      //En caso que el usario se logge, pero no este registrado en una collecion. ¿Existe coleccion de usuarios con el documento en especifico(res.user.email) del usuario que esta accediendo a la app?

      const existe = await db.collection("usuarios").doc(res.user.email).get()

      if (!existe.exists) {
        //creamos la coleccion en caso de no existir
        await db.collection("usuarios").doc(res.user.email).set({
          uid: res.user.uid,
          email: res.user.email,
          rol: "invitado"
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const cerrarSesion = () => {
    auth.signOut()
  }

  return (
    <UsuarioContext.Provider value={{ usuario, iniciarSesion, cerrarSesion }}>
      {props.children}
    </UsuarioContext.Provider>
  )
}

export default UsuarioProvider
