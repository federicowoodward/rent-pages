import { React, useState } from 'react'
import './itemDelete.css'

export default function Item({ item, deleter }) {
    const [buttonStatus, setStatus] = useState(true)

    function deleteItem() {
        deleter(item)
        setStatus(false)
    }
    console.log(item)
    return (
        <div className="itemDelete">
            <img src={item?.imageUrl[0]} alt={item.client} />
            <div>
                <strong>Nombre:</strong>
                <p>{item?.title}</p>
            </div>
            <div>
                <strong>Descripcion:</strong>
                <p>{item.guests}</p>
            </div>
            <div>
                <strong>Nombre:</strong>
                <p>{item?.tipo}</p>
            </div>
            {buttonStatus ? (
                <button onClick={deleteItem}>Borrar</button>
            ) : (
                <button className="deleted">borrada</button>
            )}
        </div>
    )
}
