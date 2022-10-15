import React, { useState, useEffect } from 'react' //el useEffect genera la vizualizacion del estado
import { db } from '../firebase';
import { collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot } from 'firebase/firestore';


const Formulario = () => {
    const [fruta, setFruta] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [nombreComprador, setnombreComprador] = useState('')
    const [identificacion, setidentificacion] = useState('')
    const [pais, setpais] = useState('')
    const [edad, setedad] = useState('')
    const [sexo, setsexo] = useState('')

    const [listaFrutas, setListaFrutas] = useState([])
    const [modoEdicion, setModoEdicion] = useState(false)
    const [id, setId] = useState('')
 

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                await onSnapshot(collection(db, "frutas"), (query) => {
                    setListaFrutas(query.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
                })
            } catch (error) {
                console.log(error)
            }
        }
        obtenerDatos();
    }, [])

    const eliminar = async id => {
        try {
            await deleteDoc(doc(db, 'frutas', id))
        } catch (error) {
            console.log(error)
        }
    }


    const guardarFrutas = async (e) => {
        e.preventDefault()
        try {
            const data = await addDoc(collection(db, 'frutas'), {
                nombreFruta: fruta,
                nombreDescripcion: descripcion,
                comprador:nombreComprador,
                nidentificacion:identificacion,
                npais:pais,
                nedad:edad,
                nsexo:sexo
            })
            setListaFrutas([
                ...listaFrutas,
                { nombreFruta: fruta, nombreDescripcion: descripcion, id: data.id,
                    comprador:nombreComprador,
                    nidentificacion:identificacion,
                    npais:pais,
                    nedad:edad,
                    nsexo:sexo
                }
            ])

            setFruta('')
            setDescripcion('')
            setnombreComprador('')
            setidentificacion('')
            setpais('')
            setedad('')
            setsexo('')

        } catch (error) {
            console.log(error)
        }
    }

    const editarFrutas = async (e) => {
        e.preventDefault()
        try{
            const docRef = doc(db, 'frutas', id);
            await updateDoc(docRef, {
                nombreFruta:fruta,
                nombreDescripcion:descripcion,
                comprador:nombreComprador,
                nidentificacion:identificacion,
                npais:pais,
                nedad:edad,
                nsexo:sexo
            })

            const nuevoArray = listaFrutas.map(
                item => item.id === id ? {id: id, nombreFruta:fruta, nombreDescripcion:descripcion
                    ,comprador:nombreComprador,
                    nidentificacion:identificacion,
                    npais:pais,
                    nedad:edad,
                    nsexo:sexo                
                } : item
            )
            
            setListaFrutas(nuevoArray)
            setFruta('')
            setDescripcion('')
            setId('')
            setnombreComprador('')
            setidentificacion('')
            setpais('')
            setedad('')
            setsexo('')
            setModoEdicion(false)

        }catch(error){
            console.log(error)
        }
    }



    const editar = item => {
        setFruta(item.nombreFruta)
        setDescripcion(item.nombreDescripcion)
        setnombreComprador(item.nombreComprador)
        setidentificacion(item.identificacion)
        setpais(item.pais)
        setedad(item.edad)
        setsexo(item.sexo)
        setId(item.id)
        setModoEdicion(true)
    }

    const cancelar = () => {
        setModoEdicion(false)
        setFruta('')
        setDescripcion('')
        setId('')
        setnombreComprador('')
        setidentificacion('')
        setpais('')
        setedad('')
        setsexo('')
    }

    
    const imagen = 'https://picsum.photos/300'
    const texto_alt = 'esto es una imagen de picsum'

    return (
        
        <div className='container mt-5'>
            <h1 className="text-center">CRUD BÁSCIO BUENAS PRÁCTICAS</h1>
            <hr />
            <div className='text-center'><h4>Imagenes aleatorias</h4>

            <div>
    
    <img src={imagen} alt= {texto_alt}></img>
    </div>
            
            
            </div>
            <hr/>
            < div className='row'>
                <div className='col-8'>
                    <h4 className='text-center'>Listado de frutas</h4>
                    <ul className='list-group'>
                        {
                            listaFrutas.map(item => (
                                <li className="list-group-item" key={item.id}>
                                    <span className="lead">{item.nombreFruta}-{item.nombreDescripcion}
                                    -{item.nombreComprador}-{item.identificacion}-{item.pais}
                                    -{item.edad}-{item.sexo}
                                    </span>
                                    <button className="btn btn-danger btn-sm float-end mx-2"
                                        onClick={() => eliminar(item.id)}>Eliminar</button>
                                    <button className="btn btn-warning btn-sm float-end"
                                        onClick={() => editar(item)}>Editar</button>

                                </li>
                            ))
                        }
                    </ul>
                </div>


                <div className='col-4'>
                    <h4 className='text-center'>
                        {
                            modoEdicion ? 'Editar Frutas' : 'Agregar Frutas'
                        }
                    </h4>
                    <form onSubmit={modoEdicion ? editarFrutas : guardarFrutas}>
                        <input type="text"
                            className="form-control mb-2"
                            placeholder='Ingrese Fruta'
                            value={fruta}
                            onChange={(e) => setFruta(e.target.value)} />
                        <input type="text"
                            className="form-control mb-2"
                            placeholder='Ingrese Descripción'
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)} />
                        <input type="text"
                            className="form-control mb-2"
                            placeholder='Ingrese nombre del comprador'
                            value={nombreComprador}
                            onChange={(e) => setnombreComprador(e.target.value)} />
                        <input type="number"
                            className="form-control mb-2"
                            placeholder='Ingrese identificacion'
                            value={identificacion}
                            onChange={(e) => setidentificacion(e.target.value)} />
                        <input type="text"
                            className="form-control mb-2"
                            placeholder='Ingrese pais'
                            value={pais}
                            onChange={(e) => setpais(e.target.value)} />
                        <input type="number"
                            className="form-control mb-2"
                            placeholder='Ingrese edad'
                            value={edad}
                            onChange={(e) => setedad(e.target.value)} />
                        <input type="text"
                            className="form-control mb-2"
                            placeholder='Ingrese sexo'
                            value={sexo}
                            onChange={(e) => setsexo(e.target.value)} />

                        {
                            modoEdicion ?
                                (
                                    <>
                                        <button
                                            className='btn btn-warning btn-block'
                                            on='submit'>Editar</button>
                                        <button
                                            className='btn btn-dark btn-block mx-2'
                                            onClick={() => cancelar()}>Cancelar</button>
                                    </>
                                )
                                :

                                <button
                                    type='submit'
                                    className='btn btn-primary btn-block' >
                                    agregar
                                </button>
                        }
                    </form>

                </div>
            </div>
        </div>

        


    )

                    
}
export default Formulario
