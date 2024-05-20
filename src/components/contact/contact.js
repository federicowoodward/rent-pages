import Form from './form/formguests.js'
import './contact.css'
function Contact() {
    return (
        <div className="contact">
            <div className="contact-img"></div>
            <div className="background-white">
                <p>Comunicate con nosotros!</p>
                <Form showExtendedForm={false} />
            </div>
        </div>
    )
}

export default Contact
