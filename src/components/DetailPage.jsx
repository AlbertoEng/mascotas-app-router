import { useEffect, useState } from 'react'
import { useParams, Link} from 'react-router-dom'

const DetailPage = () => {

    const [mascota, setMascota] = useState({})

    const params = useParams();
    // params.id = id
    
    useEffect(()=>{
        const getMascotaById = async()=>{
            const response = await fetch(`https://mi-proyecto-7bd3d-default-rtdb.firebaseio.com/mascotas/${params.id}.json`);
            const data = await response.json();
            console.log(data)
            setMascota(data)
        }
        getMascotaById()
    },[params.id])

    return (
        <>
            <div className="container p-3">
                <img src={mascota.foto} alt="" className='rounded shadow' style={{ width: '500px'}} />
                <h2 className='mt-5'>{mascota.nombre?.toUpperCase()}</h2>
                <h3 className='mt-4'>genero: {mascota.genero}</h3>
                <h3>raza: {mascota.raza}</h3>
                <h3>especie: {mascota.especie}</h3>
                <Link to='/'><button className='btn btn-primary mt-3'>Ir al catalogo</button></Link>
            </div>

        </>
    )
}

export default DetailPage