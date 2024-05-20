import './eventosAdmin.css'
import React, { useEffect, useState } from 'react'
import {
    collection,
    getDocs,
    getFirestore,
    doc,
    updateDoc,
    deleteDoc,
    addDoc,
} from 'firebase/firestore'
import AdminEventosCard from './eventoCardAdmin.js'
import Loader from '../../utils/loader.js'
import { Button, TextField } from '@mui/material'
import { AddCircle } from '@mui/icons-material'
import useAlert from '../../utils/alerts.js'
import ButtonBack from '../buttonBack.js'

const backgroundColors = [
    'FF000080 ',
    'FFC0CB80 ',
    '80008080 ',
    '0000FF80 ',
    '00FFFF80 ',
    '90EE9080 ',
    'FFFF0080 ',
    'FFA50080 ',
]

export default function EventosAdmin() {
    const [componentKey, setComponentKey] = useState(0)
    const [eventos, setEventos] = useState([])
    const [inputValue, setInputValue] = useState('')
    const { handleAlert } = useAlert()

    let indexColor = -1

    useEffect(() => {
        const obtenerEventos = async () => {
            try {
                const db = getFirestore()
                const queryCollection = collection(db, 'eventos')
                const querySnapshot = await getDocs(queryCollection)

                if (querySnapshot.size === 0) {
                    handleAlert('warning', 'No hay eventos disponibles')
                    setEventos([''])
                } else {
                    const eventosData = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }))
                    setEventos(eventosData)
                }
            } catch (error) {
                handleAlert('error', `Error al obtener eventos: ${error}`)
                setEventos([])
            }
        }

        obtenerEventos()
    }, [componentKey])

    async function EditField(field, data, id) {
        const db = getFirestore()
        const eventoRef = doc(db, 'eventos', id)

        try {
            await updateDoc(eventoRef, {
                [field]: data,
            }).then((docRef) => {
                handleAlert(
                    'success',
                    `Evento actualizado con id: ${docRef.id}`
                )
            })
            setComponentKey((prevKey) => prevKey + 1)
        } catch (error) {
            console.log(error)
        }
    }

    async function DeleteEvent(id) {
        const db = getFirestore()
        try {
            await deleteDoc(doc(db, 'eventos', id)).then(() => {
                handleAlert('success', `Evento borrado con exito.`)
            })
            setComponentKey((prevKey) => prevKey + 1)
        } catch (error) {
            handleAlert('error', `Error: ${error.message}`)
        }
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setInputValue((prevInputValue) => ({
            ...prevInputValue,
            [name]: value,
        }))
    }

    async function handleNewEvent() {
        const db = getFirestore()
        try {
            await addDoc(collection(db, 'eventos'), {
                title: inputValue.title,
                text: inputValue.text,
                link: inputValue.link,
            }).then((docRef) => {
                handleAlert('success', `Evento añadido con id: ${docRef.id}`)
            })
            setComponentKey((prevKey) => prevKey + 1)
        } catch (error) {
            handleAlert('error', `Error al obtener eventos: ${error}`)
        }
    }

    return (
        <div className="eventos-div">
            <ButtonBack />
            <h1>Eventos para este mes en Potrero de Garay y alrededores:</h1>
            <div className="add-new-event">
                <h2>Agregar nuevo evento:</h2>
                <div className="text-field-div">
                    <TextField
                        id="outlined-basic"
                        placeholder="Ingrese titulo de la noticia"
                        label="Titulo"
                        variant="outlined"
                        className="text-field"
                        onChange={handleInputChange}
                        name="title"
                    />
                    <TextField
                        id="outlined-textarea"
                        label="Texto"
                        placeholder="Ingrese texto de la noticia"
                        multiline
                        sx={{ width: 300 }}
                        className="text-field"
                        onChange={handleInputChange}
                        name="text"
                    />
                    <TextField
                        id="outlined-basic"
                        label="Link"
                        placeholder="Ingrese link de la noticia"
                        variant="outlined"
                        className="text-field"
                        onChange={handleInputChange}
                        name="link"
                    />
                </div>
                <Button onClick={() => handleNewEvent()} variant="contained">
                    <AddCircle /> <p>Agregar nuevo evento</p>
                </Button>
            </div>
            {eventos.length === 0 ? (
                <div className="loader-div">
                    <Loader />
                </div>
            ) : eventos[0] === '' ? (
                <div>
                    <p>No hay eventos disponibles actualmente.</p>
                </div>
            ) : (
                eventos.map((evento, index) => {
                    indexColor = indexColor === 7 ? 0 : indexColor + 1
                    return (
                        <AdminEventosCard
                            key={index}
                            evento={evento}
                            backgroundColor={backgroundColors[indexColor]}
                            editField={EditField}
                            delete={DeleteEvent}
                        />
                    )
                })
            )}
        </div>
    )
}
