import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './navbar.css';

export default function NavBar() {
    const [color, setColor] = useState('trasparent')
    const location = useLocation();

    useEffect(() => {
        let route = location.pathname
        if (route !== '/') {
            setColor('black ')
        } else {
            setColor()
        }
    }, [location.pathname]);

    // function showMenu(){
    //     document.querySelector(".navBarUl").classList.toggle("navBarUl_visibility");
    // }
    return (
        <div className="nav-bar">
            <div className="background" style={{backgroundColor: color}}></div>
            <div className="background-social"></div>
            <div className="nav-bar-social">
                <img
                    src={process.env.PUBLIC_URL + '/assets/instagram.png'}
                    className="social-logo"
                    alt="logo instagram"
                />
                <img
                    src={process.env.PUBLIC_URL + '/assets/facebook.png'}
                    className="social-logo"
                    alt="logo facebook"
                />
                <img
                    src={process.env.PUBLIC_URL + '/assets/whatsapp.png'}
                    className="social-logo"
                    alt="logo whatsapp"
                />
            </div>
            <div className="nav-bar">
                <div className="nav-bar-ul">
                    <div className="logo">
                        <img
                            src={process.env.PUBLIC_URL +"/assets/logo.png"}
                            className="logo"
                            alt="logo de rent lago los molinos"
                        />
                    </div>
                    <ul className="ul">
                        <li>
                            <p>
                                <Link to="/">INICIO</Link>
                            </p>
                        </li>
                        <li>
                            <p>
                                <Link to="/catalogo">CATALOGO</Link>
                            </p>
                        </li>
                        <li>
                            <p>
                                <Link to="/servicios">SERVICIOS</Link>
                            </p>
                        </li>
                        <li>
                            <p>
                                <Link to="/local">ACTIVIDADES LOCALES</Link>
                            </p>
                        </li>
                        <li>
                            <p>
                                <Link to="/contacto">CONTACTO</Link>
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
