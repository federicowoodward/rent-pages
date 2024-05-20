import { useEffect, useState } from 'react'
import DateButton from './filterbuttons/datebutton'
import GuestButton from './filterbuttons/guestbutton'
import ServiceButton from './filterbuttons/servicebutton'
import TypeButton from './filterbuttons/typebutton'
import './filtercontainer.css'

function FilterContainer(props) {
    const [filtersSelected, setFiltersSelected] = useState([])

    useEffect(() => {
        if (filtersSelected && Object.keys(filtersSelected).length > 0) {
            props.sendFilters(filtersSelected)
        }
    }, [filtersSelected, props])

    function Filters(category, options) {
        let newFiltersSelected = { ...filtersSelected }
        if (category === 'type') {
            if (options !== 'reset') {
                newFiltersSelected.type = options
            } else {
                delete newFiltersSelected.type
            }
        } else if (category === 'services') {
            if (options !== 'reset') {
                newFiltersSelected.services = options
            } else {
                delete newFiltersSelected.services
            }
        } else if (category === 'guest') {
            if (options !== 'reset') {
                newFiltersSelected.guest = options
            } else {
                delete newFiltersSelected.guest
            }
        } else if (category === 'date') {
            if (options !== 'reset') {
                newFiltersSelected.date = options
            } else {
                delete newFiltersSelected.date
            }
        }
        if (options === 'reset') {
            props.sendFilters(newFiltersSelected)
        }
        setFiltersSelected(newFiltersSelected)
    }

    return (
        <form className="filter-container">
            <h4>Filtrar por</h4>
            <DateButton filter={Filters} />
            <GuestButton filter={Filters} />
            <ServiceButton filter={Filters} />
            <TypeButton filter={Filters} />
        </form>
    )
}

export default FilterContainer
