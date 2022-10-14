import React, { useState } from 'react'

const Formulario = () => {
    const [fruta, setFruta] = useState('')
    const [descripción, setDescripcion] = useState('')
    const [listaFrutas, setlistaFrutas]=useState([])
    
    return (
        
        

        <div className='container mt-5'>
            <h1 className="text-center">CRUD BÁSCIO BUENAS PRÁCTICAS</h1>
            <hr />
            <div className='row'>
                <div className='col-8'>
                    <h4 className='text-center'>Listado de frutas</h4>
                    <ul className='list-group'>
                        {
                            //listar las personas
                        }
                    </ul>
                </div>

                <div className='col-4'>
                    <h4 className='text-center'>
                        Agregar Frutas
                    </h4>
                    <form>
                        <input type="text"
                            className='form-control mb-2'
                            placeholder='Ingrese Fruta'
                            
                        />
                        <input type="text"
                            className='form-control mb-2'
                            placeholder='Ingrese Descripción'
                        />
                    
                        <input type="text"
                            className='form-control mb-2'
                            placeholder='Ingrese su Nombre'
                        />
                        <input type="text"
                            className='form-control mb-2'
                            placeholder='Ingrese su identificacion'
                        />
                        <input type="text"
                            className='form-control mb-2'
                            placeholder='Ingrese cuantas quiere comprar'
                        />
                        <input type="text"
                            className='form-control mb-2'
                            placeholder='Ingrese su tienda'
                        />
                        <input type="text"
                            className='form-control mb-2'
                            placeholder='ingrese año de nacimiento'
                        />
                        <button className='btn btn-primary btn-block' type='submit'>
                            Agregar
                        </button>

                     


                    </form>
                   
                </div>

               
            </div>
        </div>
    )
}

export default Formulario
