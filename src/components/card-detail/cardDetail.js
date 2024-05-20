import { doc, getDoc, getFirestore } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './cardDetail.css'
import CarouselDetail from './carrousel-detail.js'
import Form from '../contact/form/formguests.js'
import DatePicker from 'react-datepicker'

function CardDetail() {
    const { id } = useParams()
    const [alojamiento, setAlojamiento] = useState([])

    useEffect(() => {
        const obtenerAlojamientos = async () => {
            const db = getFirestore()
            const alojamientosRef = doc(db, 'alojamientos', `${id}`)

            try {
                const querySnapshot = await getDoc(alojamientosRef)

                if (querySnapshot.size === 0) {
                    console.log('No hay resultados.')
                } else {
                    setAlojamiento(querySnapshot.data())
                }
            } catch (error) {
                console.error('Error al obtener alojamientos:', error)
            }
        }

        obtenerAlojamientos()
    }, [id])
    console.log(alojamiento)
    return (
        <div className="card-detail-div">
            <h1>{alojamiento.title}</h1>
            <div className="card-detail">
                <CarouselDetail
                    imagesToDisplay={alojamiento.imageUrl}
                    deleteAvailable={false}
                />
                <div className="detail-info">
                    {/* <h1>{alojamiento.tipo}</h1> */}
                    <div className="detail-div">
                        <div className="detail">
                            <span className="material-symbols-outlined">
                                bathtub
                            </span>
                            <div className="text">
                                <p className="gray">BAÑOS</p>
                                <p>{alojamiento.bathtub}</p>
                            </div>
                        </div>
                        <div className="detail">
                            <span className="material-symbols-outlined">
                                bed
                            </span>
                            <div className="text">
                                <p className="gray">HABITACIONES</p>
                                <p>{alojamiento.rooms}</p>
                            </div>
                        </div>
                        <div className="detail">
                            <span className="material-symbols-outlined">
                                group
                            </span>
                            <div className="text">
                                <p className="gray">LUGAR PARA</p>
                                <p>
                                    {alojamiento.guests}{' '}
                                    {alojamiento.guests === 1
                                        ? 'Huésped'
                                        : 'Huéspedes'}
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* <div className="separador"></div> */}
                    {/* <div className="description">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation deserunt mollit anim id est
                            laborum.{' '}
                        </p>
                    </div> */}
                    <div className="separador"></div>
                    <div className="servicios-div">
                        <h2>Servicios</h2>
                        <div className="servicios">
                            {alojamiento.services?.map((service, index) => {
                                return (
                                    <div className="servicio" key={index}>
                                        <span className="material-symbols-outlined">
                                            done
                                        </span>
                                        <p>{service}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="separador"></div>
                    <div className="second-detail-div">
                        <h2>Detalle</h2>
                        <div className="second-detail">
                            <p>Baños: {alojamiento?.detail?.bathtub}</p>
                            <p>
                                Habitaciones:{' '}
                                {alojamiento?.detail?.habitaciones}
                            </p>
                            <p>Huespedes: {alojamiento?.detail?.huespedes}</p>
                            <p>Camas: {alojamiento?.detail?.beds}</p>
                            <p>Check in: {alojamiento?.detail?.checkin}</p>
                            <p>Check out: {alojamiento?.detail?.checkout}</p>
                            <p>Tipo alojamiento: {alojamiento?.detail?.type}</p>
                        </div>
                    </div>
                    <div className="separador"></div>
                    <div>
                        <DatePicker
                            dateFormat="dd/MM/yyyy"
                            highlightDates={alojamiento.dates?.map(
                                (fechaStr) => {
                                    const [dia, mes, año] =
                                        fechaStr.split(' de ')
                                    return new Date(`${mes} ${dia}, ${año}`)
                                }
                            )}
                            inline
                            disabled
                        />
                    </div>
                </div>
            </div>
            <Form showExtendedForm={true} />
        </div>
    )
}

export default CardDetail
