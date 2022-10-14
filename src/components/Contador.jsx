import React, { useState } from 'react'

export const Contador = () => {
   const [contador, setContador] = useState (0)
   
const aumentar = () => setContador (contador + 1)
const Decrementar = () => setContador (contador - 1)
const resetear = () => setContador (0)

  return (
    <div>

       <hr/>
       <h1>Contador</h1>
       <h1>El valor de la variable es: {contador} </h1>
       <h1>
        {
            contador < 0 ? 'contador es negativo' : 'contador es positivo'
        }
       </h1>
       <button onClick={aumentar}>Aumentar</button>
       <button onClick={Decrementar}>Decrementar</button>
       <button onClick={resetear}>Resetear</button>
       



    </div>
  )
}
