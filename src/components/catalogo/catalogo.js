import CardContainer from './card/cardcontainer.js'
import FilterContainer from './filter/filtercontainer.js'
import './catalogo.css'
import { useState } from 'react'
import { useEffect } from 'react'

function Catalogo(props) {
    const [filters, setFilters] = useState(null)

    function sendFilters(filter) {
        setFilters(filter)
    }

    return (
        <div className="catalogo-container">
            {!props.filterShow && <FilterContainer sendFilters={sendFilters} />}
            <CardContainer filters={filters} />
        </div>
    )
}

export default Catalogo
