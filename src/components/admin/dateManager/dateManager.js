import React, { useEffect, useState } from 'react'
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import Loader from '../../utils/loader'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea, CardActions } from '@mui/material'
import { Link } from 'react-router-dom'
import ButtonBack from '../buttonBack.js'
import './dateManager.css'

export default function DateManagerContainer() {
    const [alojamientos, setAlojamientos] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const obtenerEventos = async () => {
            const db = getFirestore()
            let queryCollection = collection(db, 'alojamientos')

            try {
                setLoading(true)
                const querySnapshot = await getDocs(queryCollection)
                if (querySnapshot.size === 0) {
                    setAlojamientos('none')
                } else {
                    const alojamientosData = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }))
                    setAlojamientos(alojamientosData)
                }
                setLoading(false)
            } catch (error) {
                console.error('Error al obtener alojamientos:', error)
            }
        }

        obtenerEventos()
    }, [])

    return (
        <div className='date-container'>
            <ButtonBack />
            {loading ? (
                <Loader />
            ) : (
                <div className="cards-container">
                    {alojamientos.map((alojamiento, index) => (
                        <Card sx={{ width: 345 }} key={index} className='card'>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={alojamiento.imageUrl[0]}
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div">
                                        {alojamiento.title}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Link to={`/dates/${alojamiento.id}`}>
                                    Ver fechas 
                                </Link>
                            </CardActions>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
