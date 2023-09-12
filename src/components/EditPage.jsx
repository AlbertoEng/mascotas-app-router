import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const EditPage = () => {

    const [mascota, setMascota] = useState({});
    const params = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        const getMascotaById = async()=>{
            const response = await fetch(`https://mi-proyecto-7bd3d-default-rtdb.firebaseio.com/mascotas/${params.id}.json`);
            const data = await response.json();
            setMascota(data)
        }
        getMascotaById()
    },[params.id])

    const handleGuardar = async ( ev )=>{
        ev.preventDefault()
        const resp = await fetch(`https://mi-proyecto-7bd3d-default-rtdb.firebaseio.com/mascotas/${params.id}.json`,{
            method: 'PUT',
            body: JSON.stringify({...mascota})
        })
        await resp.json();
        navigate('/')
    }

    const handleChangeMascota = ( ev )=>{
        setMascota({...mascota, [ev.target.name]: ev.target.value });
    }

    console.log(mascota)

    return (
        <>
            {
                mascota && <div className="container">
                <form action="" className='mt-4'>
                    <div className="input-group mt-3">
                        <input type="text" name='nombre' onChange={handleChangeMascota} className="form-control" defaultValue={mascota.nombre}  aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                    <div className="input-group mt-3">
                        <input type="text" name='genero' onChange={handleChangeMascota} className="form-control"  defaultValue={mascota.genero}  aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                    <div className="input-group mt-3">
                        <input type="text" name='raza' onChange={handleChangeMascota} className="form-control" defaultValue={mascota.raza}  aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                    <div className="input-group mt-3">
                        <input type="text" name='especie' onChange={handleChangeMascota} className="form-control" defaultValue={mascota.especie}  aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                    <div className="input-group mt-3">
                        <input type="text" name='foto' onChange={handleChangeMascota} className="form-control" defaultValue={mascota.foto} aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                    <button className='btn btn-primary mt-3' onChange={handleChangeMascota} onClick={handleGuardar}>Guardar</button>
                </form>
            </div>
            }
        </>
    )
}

export default EditPage