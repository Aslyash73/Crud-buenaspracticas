import React, { useState, useEffect } from 'react' //el useEffect genera la vizualizacion del estado
import TableData from './TableData';
import { db } from '../firebase';
import { collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot } from 'firebase/firestore';


const Formulario = () => {
    const [fruta, setFruta] = useState('')
    const [errors, setErrors] = useState({})
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!fruta.trim()) {
            setErrors({ fruta: "la fruta es requerida" });
            return;
        }

        if (!descripcion.trim()) {
            setErrors({ descripcion: "La descripcion es requerida" });
            return;
        }

        if (!nombreComprador.trim()) {
            setErrors({ nombreComprador: "El nombre del comprador  es requerido" });
            return;
        }
        if (!identificacion.trim()) {
            setErrors({ identificacion: "La identificacion es requerida" });
            return;
        }
        if (!pais.trim()) {
            setErrors({ pais: "El pais es requerido" });
            return;
        }
        if (!edad.trim()) {
            setErrors({ edad: "La edad es requerida" });
            return;
        }
        if (!sexo.trim()) {
            setErrors({ sexo: "el sexo es requerido" });
            return;
        }


        setFruta('')
        setDescripcion('')
        setnombreComprador('')
        setidentificacion('')
        setpais('')
        setedad('')
        setsexo('')


        console.log("Registrado");
        guardarFrutas();
    };


    const guardarFrutas = async (e) => {
        try {
            const data = await addDoc(collection(db, 'frutas'), {
                nombreFruta: fruta,
                nombreDescripcion: descripcion,
                comprador: nombreComprador,
                nidentificacion: identificacion,
                npais: pais,
                nedad: edad,
                nsexo: sexo
            })
            setListaFrutas([
                ...listaFrutas,
                {
                    nombreFruta: fruta, nombreDescripcion: descripcion, id: data.id,
                    comprador: nombreComprador,
                    nidentificacion: identificacion,
                    npais: pais,
                    nedad: edad,
                    nsexo: sexo
                }
            ])

            setFruta('')
            setDescripcion('')
            setnombreComprador('')
            setidentificacion('')
            setpais('')
            setedad('')
            setsexo('')
            setErrors('')

        } catch (error) {
            console.log(error)
        }
    }

    const editarFrutas = async (e) => {
        try {
            const docRef = doc(db, 'frutas', id);
            await updateDoc(docRef, {
                nombreFruta: fruta,
                nombreDescripcion: descripcion,
                comprador: nombreComprador,
                nidentificacion: identificacion,
                npais: pais,
                nedad: edad,
                nsexo: sexo
            })

            const nuevoArray = listaFrutas.map(
                item => item.id === id ? {
                    id: id, nombreFruta: fruta,
                    nombreDescripcion: descripcion,
                    comprador: nombreComprador,
                    nidentificacion: identificacion,
                    npais: pais,
                    nedad: edad,
                    nsexo: sexo
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
            setErrors('')

        } catch (error) {
            console.log(error)
        }
    }

    const handleEditar = async (e) => {
        e.preventDefault();

        if (!fruta.trim()) {
            setErrors({ fruta: "la fruta es requerida" });
            return;
        }

        if (!descripcion.trim()) {
            setErrors({ descripcion: "La descripcion es requerida" });
            return;
        }

        if (!nombreComprador.trim()) {
            setErrors({ nombreComprador: "El nombre del comprador  es requerido" });
            return;
        }
        if (!identificacion.trim()) {
            setErrors({ identificacion: "La identificacion es requerida" });
            return;
        }
        if (!pais.trim()) {
            setErrors({ pais: "El pais es requerido" });
            return;
        }
        if (!edad.trim()) {
            setErrors({ edad: "La edad es requerida" });
            return;
        }
        if (!sexo.trim()) {
            setErrors({ sexo: "el sexo es requerido" });
            return;
        }


        setFruta('')
        setDescripcion('')
        setnombreComprador('')
        setidentificacion('')
        setpais('')
        setedad('')
        setsexo('')


        console.log("Registrado");
        editarFrutas();
    };



    const editar = item => {
        setFruta(item.nombreFruta)
        setDescripcion(item.nombreDescripcion)
        setnombreComprador(item.comprador)
        setidentificacion(item.nidentificacion)
        setpais(item.npais)
        setedad(item.nedad)
        setsexo(item.nsexo)
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
            <div className='text-center d-flex justify-content-between'>

                <div>
                    <h4>Imagenes aleatorias</h4>
                    <img src={imagen} alt={texto_alt} style={{ width: '100%' }}></img>
                    {(
                        errors.fruta ||
                        errors.descripcion ||
                        errors.nombreComprador ||
                        errors.identificacion ||
                        errors.pais ||
                        errors.edad ||
                        errors.sexo
                    ) ? (
                        <div className="alert alert-danger mt-4">
                            <p>{
                                errors.fruta ||
                                errors.descripcion ||
                                errors.nombreComprador ||
                                errors.identificacion ||
                                errors.pais ||
                                errors.edad ||
                                errors.sexo}</p>
                        </div>
                    ) : <>
                    </>}
                </div>

                <div className='col-4'>
                    <h4 className='text-center'>
                        {
                            modoEdicion ? 'Editar Frutas' : 'Agregar Frutas'
                        }
                    </h4>
                    <form onSubmit={modoEdicion ? handleEditar : handleSubmit}>
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
                            onKeyDown={e => ['e', 'E', '-', '+', ',', '.'].includes(e.key) && e.preventDefault()}
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
                            onKeyDown={e => ['e', 'E', '-', '+', ',', '.'].includes(e.key) && e.preventDefault()}
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
            <hr />
            < div className='row d-flex justify-content-center'>
                <div className='col-8'>
                    <h4 className='text-center'>Listado de frutas</h4>
                    <TableData listaFrutas={listaFrutas} eliminar={eliminar} editar={editar} />
                </div>
            </div>
        </div>




    )


}
export default Formulario
