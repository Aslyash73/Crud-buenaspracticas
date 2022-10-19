import React, { useState, useEffect } from 'react' //el useEffect genera la vizualizacion del estado
import TableData from './TableData';
import { db } from '../firebase';
import { collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot } from 'firebase/firestore';


const Formulario = () => {
    const [nombre, setNombre] = useState('')
    const [errors, setErrors] = useState({})
    const [descripcion, setDescripcion] = useState('')
    const [apellido, setApellido] = useState('')
    const [identificacion, setidentificacion] = useState('')
    const [pais, setpais] = useState('')
    const [edad, setedad] = useState('')
    const [sexo, setsexo] = useState('')
    const [imagen, setImagen] = useState('')
    const [loader, setLoader] = useState(false)

    const [listaFrutas, setListaFrutas] = useState([])
    const [modoEdicion, setModoEdicion] = useState(false)
    const [id, setId] = useState('')



    const texto_alt = 'esto es una imagen de picsum'

    useEffect(() => {
        setLoader(true)
        const obtenerDatos = async () => {
            try {
                await onSnapshot(collection(db, "frutas"), (query) => {
                    setListaFrutas(query.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
                })
            } catch (error) {
                console.log(error)
            }
        }
        obtenerImagen();
        obtenerDatos();
    }, [])

    const obtenerImagen = async () => {
        try {
            const res = await fetch('https://picsum.photos/300');
            const data = res.url;
            setLoader(false)
            setImagen(data);
        } catch (error) {
            console.log(error)
        }
    }

    const eliminar = async id => {
        try {
            await deleteDoc(doc(db, 'frutas', id))
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nombre.trim()) {
            setErrors({ fruta: "El Nombre es requerido" });
            return;
        }

        if (!apellido.trim()) {
            setErrors({ nombreComprador: "El Apellido  es requerido" });
            return;
        }

        if (!descripcion.trim()) {
            setErrors({ descripcion: "La ocupacion es requerida" });
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
            setErrors({ sexo: "el genero es requerido" });
            return;
        }


        setNombre('')
        setDescripcion('')
        setApellido('')
        setidentificacion('')
        setpais('')
        setedad('')
        setsexo('')
        setLoader(true)


        console.log("Registrado");
        guardarFrutas();
    };


    const guardarFrutas = async (e) => {
        try {
            const data = await addDoc(collection(db, 'frutas'), {
                nombreFruta: nombre,
                nombreDescripcion: descripcion,
                comprador: apellido,
                nidentificacion: identificacion,
                npais: pais,
                nedad: edad,
                nsexo: sexo,
                imagen
            })
            setListaFrutas([
                ...listaFrutas,
                {
                    nombreFruta: nombre, nombreDescripcion: descripcion, id: data.id,
                    comprador: apellido,
                    nidentificacion: identificacion,
                    npais: pais,
                    nedad: edad,
                    nsexo: sexo,
                    imagen
                }
            ])

            setNombre('')
            setDescripcion('')
            setApellido('')
            setidentificacion('')
            setpais('')
            setedad('')
            setsexo('')
            setErrors('')
            obtenerImagen();

        } catch (error) {
            console.log(error)
        }
    }

    const editarFrutas = async (e) => {
        try {
            const docRef = doc(db, 'frutas', id);
            await updateDoc(docRef, {
                nombreFruta: nombre,
                nombreDescripcion: descripcion,
                comprador: apellido,
                nidentificacion: identificacion,
                npais: pais,
                nedad: edad,
                nsexo: sexo,
                imagen
            })

            const nuevoArray = listaFrutas.map(
                item => item.id === id ? {
                    id: id, nombreFruta: nombre,
                    nombreDescripcion: descripcion,
                    comprador: apellido,
                    nidentificacion: identificacion,
                    npais: pais,
                    nedad: edad,
                    nsexo: sexo,
                    imagen
                } : item
            )

            setListaFrutas(nuevoArray)
            setNombre('')
            setDescripcion('')
            setId('')
            setApellido('')
            setidentificacion('')
            setpais('')
            setedad('')
            setsexo('')
            setModoEdicion(false)
            setErrors('')
            obtenerImagen();
            setLoader(true)

        } catch (error) {
            console.log(error)
        }
    }

    const handleEditar = async (e) => {
        e.preventDefault();

        if (!nombre.trim()) {
            setErrors({ fruta: "El Nombre es requerido" });
            return;
        }

        if (!apellido.trim()) {
            setErrors({ nombreComprador: "El Apellido  es requerido" });
            return;
        }

        if (!descripcion.trim()) {
            setErrors({ descripcion: "La ocupacion es requerida" });
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
            setErrors({ sexo: "el genero es requerido" });
            return;
        }


        setNombre('')
        setDescripcion('')
        setApellido('')
        setidentificacion('')
        setpais('')
        setedad('')
        setsexo('')


        console.log("Registrado");
        editarFrutas();
    };



    const editar = item => {
        setNombre(item.nombreFruta)
        setDescripcion(item.nombreDescripcion)
        setApellido(item.comprador)
        setidentificacion(item.nidentificacion)
        setpais(item.npais)
        setedad(item.nedad)
        setsexo(item.nsexo)
        setId(item.id)
        setImagen(item.imagen)
        setModoEdicion(true)
        setErrors('')
    }

    const cancelar = () => {
        setModoEdicion(false)
        setNombre('')
        setDescripcion('')
        setId('')
        setApellido('')
        setidentificacion('')
        setpais('')
        setedad('')
        setsexo('')
        obtenerImagen()
        setLoader(true)
    }


    return (

        <div className='container mt-5'>
            <h1 className="text-center">CRUD FORMULARIO BASICO</h1>
            <hr />
            <div className='text-center d-flex justify-content-between'>

                <div>
                    <h4>Imagenes aleatorias</h4>
                    {!loader ? (<img src={imagen} alt={texto_alt} style={{ width: '18rem', cursor: 'pointer' }}
                        onClick={() => { setLoader(true); obtenerImagen(); }}></img>) :
                        (<div class="spinner-border text-info" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>)}
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
                            modoEdicion ? 'Editar Datos' : 'Datos Personales'
                        }
                    </h4>
                    <form onSubmit={modoEdicion ? handleEditar : handleSubmit}>
                        <input type="text"
                            className="form-control mb-2"
                            placeholder='Ingrese su Nombre'
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)} />
                        <input type="text"
                            className="form-control mb-2"
                            placeholder='Ingrese su Apellido'
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)} />
                        <input type="text"
                            className="form-control mb-2"
                            placeholder='Ingrese su Ocupacion'
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)} />
                        <input type="number"
                            className="form-control mb-2"
                            placeholder='Ingrese su identificacion'
                            value={identificacion}
                            onKeyDown={e => ['e', 'E', '-', '+', ',', '.'].includes(e.key) && e.preventDefault()}
                            onChange={(e) => setidentificacion(e.target.value)} />
                        <input type="text"
                            className="form-control mb-2"
                            placeholder='Ingrese el pais'
                            value={pais}
                            onChange={(e) => setpais(e.target.value)} />
                        <input type="number"
                            className="form-control mb-2"
                            placeholder='Ingrese su edad'
                            value={edad}
                            onKeyDown={e => ['e', 'E', '-', '+', ',', '.'].includes(e.key) && e.preventDefault()}
                            onChange={(e) => setedad(e.target.value)} />
                        <select className='form-select' value={sexo} onChange={(e) => setsexo(e.target.value)}>
                            <option target hidden>Seleccione su genero...</option>
                            <option value='Masculino'>Masculino</option>
                            <option value='Femenino'>Femenino</option>
                            <option value='Basado'>Basado</option>
                        </select>

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
                    <h4 className='text-center'>Tabla de Datos</h4>
                    <TableData listaFrutas={listaFrutas} eliminar={eliminar} editar={editar} />
                </div>
            </div>
        </div>




    )


}
export default Formulario
