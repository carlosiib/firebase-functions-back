import React from 'react'
import { db } from "../firebase"

const MostarAutor = (props) => {

  const [autor, setAutor] = React.useState("")

  React.useEffect(() => {
    fetchAutor();
  }, [])

  const fetchAutor = async () => {
    try {
      //porque no  usar const res = await db.collection("libros").get(email), porque la prop autorRef ya es una referencia.
      const res = await props.autorRef.get()
      console.log(res.data())
      setAutor(res.data().email)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <span> {autor}</span>
    </>
  )
}

export default MostarAutor
