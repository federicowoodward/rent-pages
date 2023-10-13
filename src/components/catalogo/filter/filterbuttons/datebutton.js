import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
function DateButton() {
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())

    function setStartDateF(date) {
        setStartDate(date)
    }

    function setEndDateF(date) {
        setEndDate(date)
    }

    return (
        <div className="datepicker-button">
            <div className="start-date-button">
                <div className="date-button">
                    <button>¿Cuando comienza tu viaje?</button>
                </div>
                <DatePicker
                    selected={startDate}
                    onChange={(startDate) => setStartDateF(startDate)}
                    closeOnScroll={true}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                />
            </div>
            <div className="end-date-button">
                <div className="date-button">
                    <button>¿Cuando finaliza tu viaje?</button>
                </div>
                <DatePicker
                    selected={endDate}
                    onChange={(endDate) => setEndDateF(endDate)}
                    closeOnScroll={true}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                />
            </div>
        </div>
    )
}

export default DateButton
