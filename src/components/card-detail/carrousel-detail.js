import React, { useState, useRef, useEffect } from 'react'
import './carrousel-detail.css'
import Remove from '../utils/removeButtons.js'
import Loader from '../utils/loader.js'

function CarouselDetail(props) {
    const [indexPrincipal, setIndex] = useState(0)
    const navBarRef = useRef(null)
    const [images, setImages] = useState([])

    useEffect(() => {
        if (
            Array.isArray(props.imagesToDisplay) &&
            props.imagesToDisplay.length > 0
        ) {
            setImages(props.imagesToDisplay)
        }
    }, [props.imagesToDisplay])

    const handleButtonClick = (direction) => {
        if (navBarRef.current) {
            const currentScrollLeft = navBarRef.current.scrollLeft
            const newScrollLeft =
                direction === 'left'
                    ? currentScrollLeft - 500
                    : currentScrollLeft + 500
            navBarRef.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth',
            })
        }   
    }

    function setPrincipal(i) {
        setIndex(i)
    }

    return (
        <div>
            {images.length === 0 ? (
                <div className="carrousel-loader">
                    <Loader />
                </div>
            ) : (
                <div className="carrousel-detail">
                    <div className="principal">
                        <img src={images[indexPrincipal]} alt="" />
                        {props.deleteAvailable &&
                            Array.isArray(props.imagesToDisplay) &&
                            props.imagesToDisplay.length > 0 && (
                                <div
                                    className="remove-button-position"
                                    onClick={() =>
                                        props.handleRemove(indexPrincipal)
                                    }>
                                    <Remove />
                                </div>
                            )}
                    </div>
                    <div className="relative-arrows">
                        <div className="nav-bar-carrousel" ref={navBarRef}>
                            {images.map((image, index) => (
                                <div
                                    key={index}
                                    onClick={() => setPrincipal(index)}>
                                    <img src={image} alt="" />
                                </div>
                            ))}
                        </div>
                        <div className="arrows">
                            <button
                                onClick={() => handleButtonClick('left')}
                                className="arrow-left arrow">
                                <span className="material-symbols-outlined">
                                    chevron_right
                                </span>
                            </button>
                            <button
                                onClick={() => handleButtonClick('right')}
                                className="arrow-right arrow">
                                <span className="material-symbols-outlined">
                                    chevron_right
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CarouselDetail
