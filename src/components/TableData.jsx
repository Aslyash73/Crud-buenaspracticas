import React from 'react'

const TableData = (props) => {
    const { listaFrutas, eliminar, editar } = props
    return (
        <>
            {listaFrutas.length !== 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                            <th>FRUTA</th>
                            <th>DESCRIPCION</th>
                            <th>NOMBRE COMPRADOR</th>
                            <th>IDENTIFICACION</th>
                            <th>PAIS</th>
                            <th>EDAD</th>
                            <th>SEXO</th>
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
                </table>) : (<p className='text-center'>No existen registros. Por favor, ingrese los datos</p>)}
        </>
    )
}

export default TableData
