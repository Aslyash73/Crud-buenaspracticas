import React from 'react'

export const Variables = () => {
 const mensaje = "hola soy una imagen";
 const imagen = 'https://picsum.photos/300'
 const texto_alt = 'esto es una imagen de picsum'


  return (
    <div>
    <h1>{mensaje}</h1>
    <img src={imagen} alt= {texto_alt}></img>
    </div>
  )
}
