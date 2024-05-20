import React, { useState, useEffect } from 'react'
import Checkbox from '@mui/material/Checkbox'

const label2 = { inputProps: { 'aria-label': 'Checkbox demo' } }

function ServiceButton(props) {
    const [checkboxStates2, setCheckboxStates2] = useState({
        wifi: false,
        parking: false,
        washingMachine: false,
        heating: false,
    })
    const handleCheckboxChange2 = (checkboxName) => {
        setCheckboxStates2((prevStates) => {
            const updatedStates = {
                ...prevStates,
                [checkboxName]: !prevStates[checkboxName],
            }
            return updatedStates
        })
    }

    useEffect(() => {
        const selectedFilters = Object.keys(checkboxStates2).filter(
            (key) => checkboxStates2[key]
        )

        if (selectedFilters.length > 0) {
            props.filter('services', selectedFilters)
        } else {
            props.filter('services', 'reset')
        }
    }, [checkboxStates2])

    const items = [
        { service: 'Wi-Fi', value: 0, serviceDb: 'wifi' },
        { service: 'Desayuno', value: 1, serviceDb: 'breakfast' },
        { service: 'Gym', value: 2, serviceDb: 'gym' },
        { service: 'Estacionamiento', value: 3, serviceDb: 'parking' },
        { service: 'Cocina con horno', value: 4, serviceDb: 'ovenKitchen' },
        { service: 'Lavarropas', value: 5, serviceDb: 'washingMachine' },
        { service: 'Microondas', value: 6, serviceDb: 'microwave' },
        {
            service: 'Aire acondicionado',
            value: 7,
            serviceDb: 'airConditioning',
        },
    ]

    return (
        <div className="filter-options">
            <p className="title">¿Qué tipos de servicios necesitas?</p>
            <div className="options-overflow">
                {items.map((service) => {
                    return (
                        <div className="checkbox" key={service.value}>
                            <Checkbox
                                {...label2}
                                checked={checkboxStates2[service.serviceDb]}
                                onChange={() =>
                                    handleCheckboxChange2(service.serviceDb)
                                }
                            />
                            <p>{service.service}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ServiceButton
