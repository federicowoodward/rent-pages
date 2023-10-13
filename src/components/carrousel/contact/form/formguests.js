import './formguest.css'
function Form() {
    return (
        <div class="card">
            <form class="form">
                <div class="group">
                    <input placeholder="" type="text" required="" />
                    <label for="name">Nombre y apellido</label>
                </div>
                <div class="group">
                    <input
                        placeholder=""
                        type="email"
                        id="email"
                        name="email"
                        required=""
                    />
                    <label for="email">Direccion de correo</label>
                </div>
                <div class="group">
                    <textarea
                        placeholder=""
                        id="comment"
                        name="comment"
                        rows="5"
                        required=""></textarea>
                    <label for="comment">Tu mensaje</label>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Form
