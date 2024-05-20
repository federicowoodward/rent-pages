import React, { useState, useEffect } from 'react'
import Checkbox from '@mui/material/Checkbox'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

function TypeButton(props) {
    const [checkboxStates, setCheckboxStates] = useState({
        department: false,
        hut: false,
        house: false,
        complex: false,
        duomo: false,
        hotel: false,
        studio: false,
        duplex: false,
        hostel: false,
    })

    const handleCheckboxChange = (checkboxName) => {
        setCheckboxStates((prevStates) => {
            const updatedStates = {
                ...prevStates,
                [checkboxName]: !prevStates[checkboxName],
            }
            Object.keys(updatedStates).forEach((key) => {
                if (key !== checkboxName && updatedStates[key]) {
                    updatedStates[key] = false
                }
            })
            return updatedStates
        })
    }
    useEffect(() => {
        const selectedFilter = Object.keys(checkboxStates).find(
            (key) => checkboxStates[key]
        )

        if (selectedFilter) {
            props.filter('type', selectedFilter)
        } else {
            props.filter('type', 'reset')
        }
    }, [checkboxStates])

    let options = [
        { type: 'Casa', typeDb: 'house' },
        { type: 'Departamento', typeDb: 'department' },
        { type: 'Cabaña', typeDb: 'hut' },
        { type: 'Complejo', typeDb: 'complex' },
        { type: 'Duomo', typeDb: 'duomo' },
        { type: 'Hotel', typeDb: 'hotel' },
        { type: 'Monoambiente', typeDb: 'studio' },
        { type: 'Duplex', typeDb: 'duplex' },
        { type: 'Hostel', typeDb: 'hostel' },
    ]

    return (
        <div className="filter-options">
            <p className="title">¿Qué tipo de alejamiento necesitas?</p>
            <div className="options-overflow">
                {options.map((checkbox) => {
                    return (
                        <div className="checkbox" key={checkbox.typeDb}>
                            <Checkbox
                                {...label}
                                checked={checkboxStates[checkbox.typeDb]}
                                onChange={() =>
                                    handleCheckboxChange(checkbox.typeDb)
                                }
                            />
                            <p>{checkbox.type}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default TypeButton
