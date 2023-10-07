import React, { useState, useEffect } from 'react'
import './carrousel.css'

const Carousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
        }, 4500)

        return () => clearInterval(interval)
    }, [currentIndex, images.length])

    return (
        <div className='carrousel-nav-div'>
            <div className='title'>
                <h1>"Hay lugares donde uno se queda, <br/> y lugares que se quedan en uno"</h1>
            </div>
            <div className='cover'></div>
            <div className="carrousel">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`carousel-${index}`}
                        style={{
                            opacity: index === currentIndex ? 1 : 0,
                            transition: 'opacity 1500ms ease-out',
                        }}
                    />
                ))}
            </div>
            <div className="nav-carrousel">
            {images.map((image, index) => (
                    <div
                        key={index}
                        style={{
                            backgroundColor: index === currentIndex ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.85)',
                        }}
                        className='span'
                    ></div>
                ))}
            </div>
        </div>
    )
}

export default Carousel
