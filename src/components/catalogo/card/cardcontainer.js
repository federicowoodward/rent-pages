import React, { useEffect, useState, useMemo } from 'react'
import './../../helpers/button.css'
import './cardContainer.css'
import CardSkeleton from './card'
import { Skeleton } from '@mui/material'
import { GetCardContainerData } from './getCardContainerData.js'

function CardContainer(props) {
    const { data: alojamientosDb, loading, error } = GetCardContainerData()
    const [alojamientos, setAlojamientos] = useState([])
    const filter = useMemo(() => props.filters || {}, [props.filters])

    useEffect(() => {
        if (Object.keys(filter).length !== 0 && alojamientosDb !== 'none') {
            let filterResult = alojamientosDb
            Object.entries(filter).forEach(([key, value]) => {
                switch (key) {
                    case 'services':
                        if (
                            value !== null &&
                            Array.isArray(value) &&
                            value.length > 0
                        ) {
                            filterResult = filterResult.filter((data) =>
                                value.every((service) =>
                                    data.servicesDb.some((item) =>
                                        item.includes(service)
                                    )
                                )
                            )
                        }
                        break
                    case 'type':
                        if (value !== null) {
                            filterResult = filterResult.filter(
                                (data) => data.typeDb === value
                            )
                        }
                        break
                    case 'guest':
                        if (value !== null) {
                            filterResult = filterResult.filter(
                                (data) => data.guests === value
                            )
                        }
                        break
                    case 'date':
                        if (value !== null) {
                            const getDateFormated = (fecha) => {
                                const dia = fecha.getDate()
                                const mes = fecha.getMonth() + 1
                                const año = fecha.getFullYear()
                                return `${dia} de ${mes} de ${año}`
                            }
                            let datesFormated = value.map((date) =>
                                getDateFormated(date)
                            )

                            filterResult = filterResult.filter(
                                (alojamiento) => {
                                    return !datesFormated.some((date) =>
                                        alojamiento.dates.includes(date)
                                    )
                                }
                            )
                        }
                        break
                    default:
                        break
                }
            })
            setAlojamientos(filterResult)
        } else {
            setAlojamientos(alojamientosDb)
        }
    }, [filter, alojamientosDb])

    if (loading) {
        return (
            <div className="card-container">
                {[1, 2, 3, 4].map((index) => (
                    <div className="card-skeleton" key={index}>
                        <Skeleton
                            variant="rectangular"
                            width={270}
                            height={150}
                        />
                        <div className="title-guest">
                            <Skeleton height={50} width="65%" />
                            <Skeleton height={50} width="17%" />
                        </div>
                        <Skeleton
                            width={100}
                            height={70}
                            sx={{ marginLeft: 1 }}
                        />
                    </div>
                ))}
            </div>
        )
    }
    if (error) {
        return (
            <div style={{ height: 330, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <p>Error al obtener los alojamientos: {error.message}</p>
            </div>
        )
    }
    if (alojamientos.length === 0) {
        return (
            <div style={{ height: 330, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <p>No hay alojamientos para mostrar.</p>
            </div>
        )
    }

    return (
        <div className="card-container">
            {alojamientos.map((casa) => (
                <CardSkeleton props={casa} key={casa.id} />
            ))}
        </div>
    )
}

export default CardContainer
