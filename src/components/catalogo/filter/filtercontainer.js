import DateButton from "./filterbuttons/datebutton"
import GuestButton from "./filterbuttons/guestbutton"
import ServiceButton from "./filterbuttons/servicebutton"
import TypeButton from "./filterbuttons/typebutton"
import "./filtercontainer.css"
import "./filterbutton.css"

function FilterContainer() {
    return (
        <div className="filter-container">
            <h2>Filtrar por</h2>
            <DateButton />
            <GuestButton />
            <ServiceButton />
            <TypeButton />
        </div>
    )
}

export default FilterContainer
