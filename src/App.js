import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import NavBar from './components/navbar/navbar.js'
import Carousel from './components/carrousel/carrousel.js'
import Contact from './components/contact/contact.js'
import Servicios from './components/servicios/servicios.js'
import Catalogo from './components/catalogo/catalogo.js'
import Local from './components/local/local.js'

function App() {
    const images = [
        process.env.PUBLIC_URL + '/assets/carrousel1.jpg',
        process.env.PUBLIC_URL + '/assets/carrousel2.jpg',
        process.env.PUBLIC_URL + '/assets/carrousel3.jpg',
        process.env.PUBLIC_URL + '/assets/carrousel4.jpg',
        process.env.PUBLIC_URL + '/assets/carrousel5.jpg',
        process.env.PUBLIC_URL + '/assets/carrousel6.jpg',
    ]

    return (
        <BrowserRouter>
            <div className="body">
                <div className="app">
                    <NavBar />
                    <Routes>
                        <Route
                            path="/"
                            element={<Carousel images={images} />}
                        />
                        <Route path="/catalogo/" element={<Catalogo />} />
                        <Route path="/local/" element={<Local />} />
                        <Route path="/servicios" element={<Servicios />} />
                        <Route path="/contacto" element={<Contact />} />
                        <Route
                            path="/*"
                            element={<Navigate to="/" replace />}
                        />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    )
}

export default App
