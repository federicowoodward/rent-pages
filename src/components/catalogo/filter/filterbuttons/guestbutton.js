import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { useState } from 'react'

function GuestButton(props) {
    const [guest, setGuest] = useState(null)
    
    const handleGuestChange = (event, newValue) => {
        setGuest(newValue);
        if (newValue !== null) {
            props.filter('guest', newValue.label); 
        } else {
            props.filter('guest', 'reset'); 
        }
    };

    return (
        <div className="filter-options">
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={guestsList}
                sx={{ width: 220 }}
                value={guest}
                onChange={handleGuestChange}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="¿Cuantos huespedes son?"
                        className="text-field"
                    />
                )}
            />
        </div>
    )
}

export default GuestButton;

const guestsList = [
    { label: '1' },
    { label: '2' },
    { label: '3' },
    { label: '4' },
    { label: '5' },
    { label: '6' },
    { label: '7' },
    { label: '8' },
];
