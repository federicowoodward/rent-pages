import './eventos.css'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import EventosCard from './evento-card'

const backgroundColors = ['FF000080 ', 'FFC0CB80 ', '80008080 ', '0000FF80 ', '00FFFF80 ', '90EE9080 ', 'FFFF0080 ', 'FFA50080 ']

export default function Eventos() {
    const [eventos, setEventos] = useState([])
    let indexColor = -1
    useEffect(() => {
        const obtenerEventos = async () => {
            const db = getFirestore()
            const queryCollection = collection(db, 'eventos')

            try {
                const querySnapshot = await getDocs(queryCollection)

                if (querySnapshot.size === 0) {
                    console.log('No hay resultados.')
                } else {
                    const eventosData = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }))
                    setEventos(eventosData)
                }
            } catch (error) {
                console.error('Error al obtener eventos:', error)
            }
        }

        obtenerEventos()
    }, [])

    return (
        <div className="eventos-div">
            <h1>Eventos para este mes en Potrero de Garay y alrededores:</h1>
            {eventos.map((evento, index) => {
                indexColor = indexColor === 7 ? 0 : indexColor + 1
                
                return (
                    <div>
                        <EventosCard
                            key={index}
                            evento={evento}
                            backgroundColor={backgroundColors[indexColor]}
                        />
                    </div>
                )
            })}
        </div>
    )
}
