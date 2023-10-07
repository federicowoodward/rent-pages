import CardContainer from "./card/cardcontainer.js"
import FilterContainer from "./filter/filtercontainer.js"
import "./catalogo.css"

function Catalogo() {
    return (
        <div className="catalogo-container">
            <FilterContainer/>
            <CardContainer />
        </div>
    )
}

export default Catalogo
