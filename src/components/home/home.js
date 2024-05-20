import { Button } from '@mui/material'
import Carousel from '../carrousel/carrousel'
import CardContainer from '../catalogo/card/cardcontainer'
import './home.css'
import Contact from '../contact/contact'
import GoTopButton from '../utils/goTopButton.js'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const images = [
    process.env.PUBLIC_URL + '/assets/carrousel1.jpg',
    process.env.PUBLIC_URL + '/assets/carrousel2.jpg',
    process.env.PUBLIC_URL + '/assets/carrousel3.jpg',
    process.env.PUBLIC_URL + '/assets/carrousel4.jpg',
    process.env.PUBLIC_URL + '/assets/carrousel5.jpg',
    process.env.PUBLIC_URL + '/assets/carrousel6.jpg',
]
export default function Home() {
    return (
        <div>
            <GoTopButton />
            <div className="carousel-div">
                <Carousel images={images} />
            </div>
            <div className="catalogo-home" style={{ margin: 20 }}>
                <div>
                    <h2>Alojamientos para este finde!:</h2>
                    <CardContainer
                        filters={{
                            guest: '1',
                        }}
                    />
                </div>
                <div>
                    <h2>Alojamientos para dos personas:</h2>
                    <CardContainer
                        filters={{
                            guest: '2',
                        }}
                    />
                </div>
                <div>
                    <h2>Alojamientos para mas de 4 personas:</h2>
                    <CardContainer
                        filters={{
                            guest: '4',
                        }}
                    />
                </div>
            </div>
            <div className="button-div">
                <Link to={'/catalogo'}>
                    <Button
                        variant="contained"
                        size="large"
                        style={{ fontSize: 20 }}>
                        Ver mas opciones
                    </Button>
                </Link>
            </div>
            <Contact />
        </div>
    )
}
