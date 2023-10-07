import { useState } from 'react'

function ServiceButton() {
    const [isListVisible, setListVisibility] = useState(false)

    function handleButtonClick() {
        setListVisibility(!isListVisible)
    }

    return (
        <div
            onClick={handleButtonClick}
            className={
                isListVisible ? 'filter-button' : 'filter-button-hidden'
            }>
            <button>¿Que servicios necesitas?</button>
            <div>
                <ul className="button-option">
                    <li>Servicio 1</li>
                    <li>Servicio 2</li>
                    <li>Servicio 3</li>
                    <li>Servicio 4</li>
                </ul>
            </div>
        </div>
    )
}

export default ServiceButton
