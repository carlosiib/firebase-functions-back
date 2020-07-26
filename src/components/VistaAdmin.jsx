import React from 'react'
import { db, functions } from "../firebase"
const VistaAdmin = () => {
  const [usuarios, setUsuarios] = React.useState([])

  React.useEffect(() => {
    fetchUsuarios()
  })

  const fetchUsuarios = async () => {
    try {
      const res = await db.collection("usuarios").get()
      const arrayUsuarios = res.docs.map((doc) => {
        doc.data()
      })
      setUsuarios(arrayUsuarios)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <h3>Administracion de usuarios</h3>
      {usuarios.map(usuario => (
        <div key={usuario.uid}>
          {usuario.email}- rol: {usuario.rol}
        </div>
      ))}
    </div>
  )
}

export default VistaAdmin
