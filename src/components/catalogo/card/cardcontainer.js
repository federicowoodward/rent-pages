import './card.css'

let casas = [
    {
        name: 'casa1',
        id: 1,
        descr: 'casa 1 description',
        capacity: 2,
        service: ['servicio 1', 'servicio 2', 'servicio 3', 'servicio 4'],
    },
    {
        name: 'casa2',
        id: 2,
        descr: 'casa 2 description',
        capacity: 4,
        service: ['servicio 1', 'servicio 2', 'servicio 3', 'servicio 4'],
    },
    {
        name: 'casa 3',
        id: 3,
        descr: 'casa 3 description',
        capacity: 2,
        service: ['servicio 1', 'test', 'servicio 3', 'servicio 4'],
    },
    {
        name: 'casa 4',
        id: 4,
        descr: 'casa 4 description',
        capacity: 5,
        service: ['servicio 1', 'servicio 2', 'servicio 3', 'servicio 4'],
    },
    {
        name: 'casa 5',
        id: 5,
        descr: 'casa 5 description',
        capacity: 1,
        service: ['servicio 1', 'servicio 2', 'servicio 3', 'servicio 4'],
    },
    {
        name: 'casa 6',
        id: 6,
        descr: 'casa 6 description',
        capacity: 10,
        service: ['servicio 1', 'servicio 2', 'servicio 3', 'servicio 4'],
    },
    {
        name: 'casa 7',
        id: 7,
        descr: 'casa 7 description',
        capacity: 2,
        service: ['servicio 1', 'servicio 2', 'servicio 3', 'servicio 4'],
    },
    {
        name: 'casa 8',
        id: 8,
        descr: 'casa 8 description',
        capacity: 2,
        service: ['servicio 1', 'servicio 2', 'servicio 3', 'servicio 4'],
    },
    {
        name: 'casa 9',
        id: 9,
        descr: 'casa 9 description',
        capacity: 2,
        service: ['servicio 1', 'servicio 2', 'servicio 3', 'servicio 4'],
    },
]
// {
//     name: 'casa1',
//     id: 1,
//     descr: 'casa 1 description'
// },

function CardContainer() {
    return (
        <div className="card-container">
            {casas.map((casa) => {
                return (
                    <div className="card" key={casa.id}>
                        <img src={process.env.PUBLIC_URL +"/assets/casa.png"} alt="" />
                        <div className="card-info">
                            <div className="capacity">
                                <p>Capacidad para:</p>
                                <div className="capacity-number">
                                    <img src={process.env.PUBLIC_URL +"/assets/huespedes.png"} alt="" />
                                    <p>{casa.capacity} huespedes</p>
                                </div>
                            </div>
                            <ul className="service">
                                <li>
                                    <span className="material-symbols-outlined">
                                        done
                                    </span>
                                    <p>{casa.service[0]}</p>
                                </li>
                                <li>
                                    <span className="material-symbols-outlined">
                                        done
                                    </span>
                                    <p>{casa.service[1]}</p>
                                </li>
                                <li>
                                    <span className="material-symbols-outlined">
                                        done
                                    </span>
                                    <p>{casa.service[2]}</p>
                                </li>
                                <li>
                                    <span className="material-symbols-outlined">
                                        done
                                    </span>
                                    <p>{casa.service[3]}</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default CardContainer
