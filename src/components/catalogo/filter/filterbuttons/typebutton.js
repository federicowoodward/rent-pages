import { useState } from 'react'

function TypeButton() {
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
            <button>¿Que tipo de alejamiento necesitas?</button>
            <div>
                <ul className="button-option">
                    <li>Casa</li>
                    <li>Hotel</li>
                    <li>Departamento</li>
                    <li>Complejo</li>
                </ul>
            </div>
        </div>
    )
}

export default TypeButton
