import { useEffect } from 'react'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function DateButton(props) {
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(null)

    useEffect(() => {
        if (endDate !== null) {
            const datesInRange = getDatesInRange(startDate, endDate);
            props.filter('date', datesInRange);
        }
    }, [startDate, endDate]);

    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    // Función para obtener todas las fechas dentro del rango
    const getDatesInRange = (start, end) => {
        const dates = [];
        let currentDate = new Date(start);

        while (currentDate <= end) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return dates;
    };

    return (
        <div className="filter-options">
            <p className="title">¿Cuánto dura tu viaje?</p>
            <section className="date-picker">
                <DatePicker
                    selected={startDate}
                    onChange={onChange}
                    minDate={new Date()}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    inline
                    showDisabledMonthNavigation
                />
            </section>
        </div>
    );
}

export default DateButton;
