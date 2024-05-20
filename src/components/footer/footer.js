import './footer.css'
import EmailIcon from '@mui/icons-material/Email'

export default function Footer() {
    return (
        <div className="footer-container">
            <div className="footer">
                <div className="sectionUno">
                    <div className="left">
                        <img
                            src={process.env.PUBLIC_URL + '/assets/logo.png'}
                            className="logo"
                            alt="logo de rent lago los molinos"
                        />
                    </div>
                    <div className="rigth">
                        <p>Escribinos!</p>
                        <div className='iconEmail'>
                            <EmailIcon />
                            <p>correo@gmail.com</p>
                        </div>
                        <p>Nuestras redes:</p>
                        <div className="nav-bar-social">
                            <img
                                src={
                                    process.env.PUBLIC_URL +
                                    '/assets/instagram.png'
                                }
                                className="social-logo"
                                alt="logo instagram"
                            />
                            <img
                                src={
                                    process.env.PUBLIC_URL +
                                    '/assets/facebook.png'
                                }
                                className="social-logo"
                                alt="logo facebook"
                            />
                            <img
                                src={
                                    process.env.PUBLIC_URL +
                                    '/assets/whatsapp.png'
                                }
                                className="social-logo"
                                alt="logo whatsapp"
                            />
                        </div>
                    </div>
                </div>
                <div className="sectionDos">
                    <p>Made by @fedewoodward1</p>
                </div>
            </div>
        </div>
    )
}
