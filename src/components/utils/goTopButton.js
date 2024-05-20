import './goTopButton.css'
import React, { useState, useEffect, useRef } from 'react'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import Zoom from '@mui/material/Zoom'

export default function GoTopButton() {
    const [isVisible, setIsVisible] = useState(false)
    const divRef = useRef(null)

    useEffect(() => {
        function handleScroll() {
            const currentScrollY = window.scrollY

            if (currentScrollY > 100) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }
    const scrollToBottom = () => {
        window.scrollTo({
            top: 900,
            behavior: 'smooth',
        })
    }

    return (
        <div
            className="GoTopButton"
            ref={divRef}
            onClick={isVisible ? scrollToTop : scrollToBottom}
            style={{
                transform: isVisible
                    ? 'scale(2.3) rotate(90deg)'
                    : 'scale(2.3) rotate(270deg)',
                right: isVisible ? '79px' : '70px',
                zIndex: 1000,
            }}>
            <Zoom in={true} style={{ transitionDelay: '500ms', transitionDuration: '400ms' }}>
                <ArrowCircleLeftIcon />
            </Zoom>
        </div>
    )
}
