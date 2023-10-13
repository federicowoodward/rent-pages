import { useState } from 'react'

function GuestButton() {
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
            <button className='relative'>¿Cuantos huespedes son?
                <ul className="button-option">
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                    <li>6</li>
                    <li>7</li>
                </ul>
            </button>
        </div>
    )
}

export default GuestButton
