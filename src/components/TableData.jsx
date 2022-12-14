import React from 'react'

const TableData = (props) => {
    const { listaFrutas, eliminar, editar } = props
    return (
        <>
            {listaFrutas.length !== 0 ? (
                <div className='text-center d-flex justify-content-between'>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>NOMBRE</th>
                                <th>OCUPACION</th>
                                <th>APELLIDO</th>
                                <th>IDENTIFICACION</th>
                                <th>PAIS</th>
                                <th>EDAD</th>
                                <th>SEXO</th>
                                <th>IMAGEN</th>
                                <th>ACCCIONES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listaFrutas.map((item) => {
                                    return (<>
                                        <tr key={item.id}>
                                            <td>{item.nombreFruta}</td>
                                            <td>{item.nombreDescripcion}</td>
                                            <td>{item.comprador}</td>
                                            <td>{item.nidentificacion}</td>
                                            <td>{item.npais}</td>
                                            <td>{item.nedad}</td>
                                            <td>{item.nsexo}</td>
                                            <td><img
                                                src={item.imagen}
                                                alt="esto es una imagen de picsum"
                                                className='img-thumbnail'
                                                style={{ borderRadius: '50%' }} />
                                            </td>
                                            <td>
                                                <div className='d-flex justify-content-between'>
                                                    <button className="btn btn-danger m-1"
                                                        onClick={() => eliminar(item.id)}>Eliminar</button>
                                                    <button className="btn btn-warning m-1"
                                                        onClick={() => editar(item)}>Editar</button>
                                                </div>
                                            </td>
                                        </tr>

                                    </>

                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>) : (<p className='text-center'>No existen registros. Por favor, ingrese los datos</p>)}
        </>
    )
}

export default TableData
