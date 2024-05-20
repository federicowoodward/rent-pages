import './formguest.css'
import './../../helpers/button.css'
function Form(showExtendedForm) {
    return (
        <div className="form-container-contact">
            <form className="form">
                <div className="group">
                    <input placeholder="" type="text" required="" />
                    <label htmlFor="name">Nombre y apellido</label>
                </div>
                <div className="group">
                    <input
                        placeholder=""
                        type="email"
                        id="email"
                        name="email"
                        required=""
                    />
                    <label htmlFor="email">Direccion de correo</label>
                </div>
                {showExtendedForm.showExtendedForm && (
                    <>
                        <div className="flex">
                            <div className="group check">
                                <input
                                    placeholder=""
                                    type="checkin"
                                    id="checkin"
                                    name="checkin"
                                    required=""
                                />
                                <label htmlFor="checkin">Fecha de ingreso</label>
                            </div>
                            <div className="group check">
                                <input
                                    placeholder=""
                                    type="checkout"
                                    id="checkout"
                                    name="checkout"
                                    required=""
                                />
                                <label htmlFor="checkout">Fecha de egreso</label>
                            </div>
                        </div>
                        <div className="group">
                            <input
                                placeholder=""
                                type="huespedes"
                                id="huespedes"
                                name="huespedes"
                                required=""
                            />
                            <label htmlFor="huespedes">Cantidad de huespedes</label>
                        </div>
                    </>
                )}
                <div className="group">
                    <textarea
                        placeholder=""
                        id="comment"
                        name="comment"
                        rows="5"
                        required=""></textarea>
                    <label htmlFor="comment">Tu mensaje</label>
                </div>

                <button className="button-primary" type="submit">
                    <span className="circle1"></span>
                    <span className="circle2"></span>
                    <span className="circle3"></span>
                    <span className="circle4"></span>
                    <span className="circle5"></span>
                    <span className="text">Enviar</span>
                </button>
            </form>
        </div>
    )
}

export default Form
