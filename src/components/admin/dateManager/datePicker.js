import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { subDays } from 'date-fns'
import './datePicker.css'
import Button from '@mui/material/Button'
import { getDoc, getFirestore, doc, updateDoc } from 'firebase/firestore'
import Loader from '../../utils/loader'
import { useParams } from 'react-router-dom'
import ButtonBack from '../buttonBack.js'

export default function DateManager() {
    const [selectedDate, setSelectedDate] = useState(null)
    const [selectedDates, setSelectedDates] = useState([])
    const [dataBaseDates, setDataBaseDates] = useState([])
    const [docData, setDoc] = useState([])
    const [loading, setLoading] = useState(true)
    const [componentKey, setComponentKey] = useState(0)
    const [edit, setEdit] = useState(false)
    const { id } = useParams()
    useEffect(() => {
        const getDates = async () => {
            const db = getFirestore()
            let docRef = doc(db, 'alojamientos', id)
            try {
                const docSnap = await getDoc(docRef)
                setDoc(docSnap.data())
                let strDates = docSnap.data().dates.map((date) => {
                    return date
                })
                let dateObjects = strDates.map((cadenaFecha) => {
                    const [diaStr, mesStr, anioStr] = cadenaFecha.split(' de ')
                    return new Date(Number(anioStr), mesStr, Number(diaStr))
                })
                setDataBaseDates(dateObjects)
                setLoading(false)
            } catch (error) {
                console.error('Error al obtener alojamientos:', error)
            }
        }

        getDates()
    }, [componentKey])

    function handleNewDate(date) {
        const isDateSelected = selectedDates.some((selected) => {
            return (
                selected.getDate() === date.getDate() &&
                selected.getMonth() === date.getMonth() &&
                selected.getFullYear() === date.getFullYear()
            )
        })

        if (isDateSelected) {
            const updatedDates = selectedDates.filter((selected) => {
                return (
                    selected.getDate() !== date.getDate() ||
                    selected.getMonth() !== date.getMonth() ||
                    selected.getFullYear() !== date.getFullYear()
                )
            })
            setSelectedDates(updatedDates)
        } else {
            setSelectedDates([...selectedDates, date])
        }

        setSelectedDate(date)
        setTimeout(() => {
            setSelectedDate(null)
        }, 1500)
    }
    async function updateDates(dates, id, type) {
        let datesToUpload = []
        dates.map((date) => {
            const dia = date.getDate()
            const mes = date.getMonth()
            const anio = date.getFullYear()
            const formatedDate = `${dia} de ${mes} de ${anio}`
            datesToUpload.push(formatedDate)
        })

        const db = getFirestore()
        const documentRef = doc(db, 'alojamientos', id)
        await updateDoc(documentRef, {
            dates: type ? datesToUpload : [],
        })
        setSelectedDates([])
        setSelectedDate(null)

        if (type) {
            setDataBaseDates(
                dates.filter((date) => !isDateSelectedForUpload(date))
            )
        }

        setComponentKey((prevKey) => prevKey + 1)
    }
    function handleUpdate() {
        updateDates([...dataBaseDates, ...selectedDates], id, true)
    }
    function handleDeleteDates() {
        updateDates(selectedDates, id, false)
    }
    async function handleDeleteSelected() {
        const remainingDates = dataBaseDates.filter(date => !isDateSelectedForUpload(date));
    
        const db = getFirestore();
        const documentRef = doc(db, 'alojamientos', id);
        await updateDoc(documentRef, {
            dates: remainingDates.map(date => {
                const dia = date.getDate();
                const mes = date.getMonth();
                const anio = date.getFullYear();
                return `${dia} de ${mes} de ${anio}`;
            })
        });
    
        setSelectedDates([]);
        setComponentKey((prevKey) => prevKey + 1)
    }
    
    function handleEdit() {
        setEdit(!edit)
    }
    function isDateSelectedForUpload(date) {
        return selectedDates.some(
            (selected) =>
                selected.getDate() === date.getDate() &&
                selected.getMonth() === date.getMonth() &&
                selected.getFullYear() === date.getFullYear()
        )
    }
    function isDateInDatabase(date) {
        return dataBaseDates.some(
            (databaseDate) =>
                databaseDate.getDate() === date.getDate() &&
                databaseDate.getMonth() === date.getMonth() &&
                databaseDate.getFullYear() === date.getFullYear()
        )
    }

    return (
        <div className="date-picker-container">
            <ButtonBack />
            <h2>Fechas disponibles</h2>
            <h2>{docData.title}</h2>
            <p>{docData.tipo}</p>
            {loading ? (
                <div className="loader-div">
                    <Loader />
                </div>
            ) : (
                <div className="date-picker">
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => handleNewDate(date)}
                        dateFormat="dd/MM/yyyy"
                        highlightDates={[...dataBaseDates, ...selectedDates]}
                        inline
                        minDate={subDays(new Date(), 5)}
                        disabled
                        monthsShown={2}
                        dayClassName={(date) =>
                            isDateSelectedForUpload(date)
                                ? 'selected-date'
                                : isDateInDatabase(date)
                                ? 'database-date'
                                : ''
                        }
                    />
                    <div
                        className="cover"
                        style={{
                            zIndex: edit ? '-1' : '1',
                        }}></div>
                </div>
            )}
            <div
                className="buttons-edit"
                style={{
                    opacity: edit ? 100 : 0,
                }}>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={handleUpdate}>
                    Actualizar
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={handleDeleteDates}>
                    Borrar fechas
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={handleDeleteSelected}>
                    Borrar seleccionadas
                </Button>
            </div>
            <Button
                variant="contained"
                size="large"
                color={edit ? 'primary' : 'secondary'}
                onClick={handleEdit}>
                Editar
            </Button>
        </div>
    )
}
