import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'



const HomePage = () => {

    const [listaMascotas, setListaMascotas] = useState([])
    const [selector, setSelector] = useState('especie')
    const [especie, setEspecie] = useState('')
    const [raza, setRaza] = useState('')

    useEffect(() => {
        const obtenerListaMascotas = async () => {
            const response = await fetch('https://mi-proyecto-7bd3d-default-rtdb.firebaseio.com/mascotas/.json');
            let data = await response.json();
            // convertimos de objeto a array de mascotas
            data = Object.entries(data).map(([key, value]) => {
                const newItem = {
                    key,
                    ...value
                }
                return newItem;
            })
            setListaMascotas(data)
        }
        obtenerListaMascotas()
    }, [])

    const handleChangeSelector = (ev) => {
        setSelector(ev.target.value)

    }

    const handleEspecieChange = (ev) => {
        setEspecie(ev.target.value)
        setListaMascotas(listaMascotas.filter((mascota) => {
            return ev.target.value = mascota.especie
        }))
    }

    const listaNoRepetida = () => {
        const lista = listaMascotas.map((mascota) => mascota.especie)
        const nuevaList = Array.from(new Set(lista));
        return nuevaList
    }

    const handleChangeRaza = (ev) => {
        setRaza(ev.target.value)
    }

    console.log(especie)

    return (
        <>
            <div className="container">
                <h1 className='text-center mt-3 mb-3'>Catalogo de mascotas</h1>
                <div className="d-flex justify-content-center align-items-center px-3">
                    <p className='m-0 mx-3'>filtrar por: </p>
                    <label className='mx-2' htmlFor="especie">especie</label>
                    <input type="radio" onChange={handleChangeSelector} name="radioMascota" value='especie' defaultChecked id="especie" />
                    <label className='mx-2' htmlFor="raza">raza</label>
                    <input type="radio" onChange={handleChangeSelector} name="radioMascota" value='raza' id="raza" />
                </div>
                {
                    selector === 'especie' && <select className="form-select mt-3" value={especie} onChange={handleEspecieChange} aria-label="Default select example">
                        <option value={''} >Selecciona una especie</option>
                        {

                            listaNoRepetida().map((especie) => {
                                return <option key={especie} value={especie}>{especie}</option>
                            })
                        }
                    </select>
                }
                {
                    selector === 'raza' && <div className="input-group mt-3">
                        <input type="text" name='raza' value={raza} onChange={handleChangeRaza} className="form-control" placeholder="Buscar una raza" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                }
            </div>
            <div className="container p-3">
                <div className="row gap-3">
                    {
                        selector === 'especie' && listaMascotas.map((mascota) => {
                            return mascota.especie === especie ? <div key={mascota.key} className="card col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3" style={{ width: '18rem' }}>
                                <img src={mascota.foto} className="card-img-top h-50" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{mascota.nombre}</h5>
                                    <p className="card-text">{mascota.genero}</p>
                                    <p className="card-text">{mascota.raza}</p>
                                    <Link to={`/detalle/${mascota.key}`}><button className="btn btn-primary mx-2">ver detalle</button></Link>
                                    <Link to={`/editar/${mascota.key}`}><button className="btn btn-info">editar</button></Link>
                                </div>
                            </div> : null
                        })
                    }
                    {
                        (selector === 'especie' && !especie ) && listaMascotas.map((mascota) => {
                            return <div key={mascota.key} className="card col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3" style={{ width: '18rem' }}>
                                <img src={mascota.foto} className="card-img-top h-50" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{mascota.nombre}</h5>
                                    <p className="card-text">{mascota.genero}</p>
                                    <p className="card-text">{mascota.raza}</p>
                                    <Link to={`/detalle/${mascota.key}`}><button className="btn btn-primary mx-2">ver detalle</button></Link>
                                    <Link to={`/editar/${mascota.key}`}><button className="btn btn-info">editar</button></Link>
                                </div>
                            </div> 
                        })
                    }
                    {
                        (selector === 'raza' && raza === "" ) && listaMascotas.map((mascota) => {
                            return <div key={mascota.key} className="card col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3" style={{ width: '18rem' }}>
                                <img src={mascota.foto} className="card-img-top h-50" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{mascota.nombre}</h5>
                                    <p className="card-text">{mascota.genero}</p>
                                    <p className="card-text">{mascota.raza}</p>
                                    <Link to={`/detalle/${mascota.key}`}><button className="btn btn-primary mx-2">ver detalle</button></Link>
                                    <Link to={`/editar/${mascota.key}`}><button className="btn btn-info">editar</button></Link>
                                </div>
                            </div>
                        })
                    }
                    {
                        (selector === 'raza' && raza !== "" ) && listaMascotas.map((mascota) => {
                            return mascota.raza.includes( raza ) ? <div key={mascota.key} className="card col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3" style={{ width: '18rem' }}>
                                <img src={mascota.foto} className="card-img-top h-50" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{mascota.nombre}</h5>
                                    <p className="card-text">{mascota.genero}</p>
                                    <p className="card-text">{mascota.raza}</p>
                                    <Link to={`/detalle/${mascota.key}`}><button className="btn btn-primary mx-2">ver detalle</button></Link>
                                    <Link to={`/editar/${mascota.key}`}><button className="btn btn-info">editar</button></Link>
                                </div>
                            </div> : null
                        })
                    }
                </div>

            </div>
        </>
    )
}

export default HomePage