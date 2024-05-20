import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import NavBar from './components/navbar/navbar.js'
import Contact from './components/contact/contact.js'
import Eventos from './components/eventos/eventos.js'
import Catalogo from './components/catalogo/catalogo.js'
import Local from './components/local/local.js'
import CardDetail from './components/card-detail/cardDetail.js'
import Admin from './components/admin/admin.js'
import ItemDeleterContainer from './components/admin/deleter/itemDeleterContainer.js'
import Upload from './components/admin/upload/upload.js'
import EventosAdmin from './components/admin/eventos/eventosAdmin.js'
import DateManager from './components/admin/dateManager/datePicker.js'
import DateManagerContainer from './components/admin/dateManager/dateManager.js'
import Home from './components/home/home.js'
import Footer from './components/footer/footer.js'

function App() {
    return (
        <BrowserRouter basename="/rent-pages">
            <div className="body">
                <div className="app">
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/catalogo/" element={<Catalogo />} />
                        <Route path="/local/" element={<Local />} />
                        <Route path="/eventos" element={<Eventos />} />
                        <Route
                            path="/eventos-admin"
                            element={<EventosAdmin />}
                        />
                        <Route
                            path="/date-manager"
                            element={<DateManagerContainer />}
                        />
                        <Route path="/contacto" element={<Contact />} />
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/dates/:id" element={<DateManager />} />
                        <Route
                            path="/deleter"
                            element={<ItemDeleterContainer />}
                        />
                        <Route path="/upload" element={<Upload />} />
                        <Route path="/detail/:id" element={<CardDetail />} />
                        <Route
                            path="/*"
                            element={<Navigate to="/" replace />}
                        />
                    </Routes>
                    <Footer/>
                </div>
            </div>
        </BrowserRouter>
    )
}

export default App
