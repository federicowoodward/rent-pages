import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { useEffect } from 'react';

export default function CheckboxList(props) {
    const [checked, setChecked] = React.useState([]);
    const [checkedName, setCheckedName] = React.useState([]);
    const newChecked = [...checked];
    const newCheckedName = [...checkedName];

    const handleToggle = (item) => () => {
        const currentIndex = checked.indexOf(item.value);

        if (currentIndex === -1) {
            newChecked.push(item.value);
            newCheckedName.push({'serviceDb': item.serviceDb, 'service': item.service});
        } else {
            newChecked.splice(currentIndex, 1);
            newCheckedName.splice(currentIndex, 1);
        }

        setChecked(newChecked);
        setCheckedName(newCheckedName)
    }
    
    useEffect(() => {
        props.servicesChecked(newCheckedName);
    }, [checked])

    const items = [
        { service: 'Wi-Fi', value: 0 , serviceDb: 'wifi'},
        { service: 'Desayuno', value: 1 , serviceDb: 'breakfast'},
        { service: 'Gym', value: 2, serviceDb: 'gym' },
        { service: 'Estacionamiento', value: 3 , serviceDb: 'parking'},
        { service: 'Cocina con horno', value: 4, serviceDb: 'ovenKitchen' },
        { service: 'Lavarropas', value: 5, serviceDb: 'washingMachine' },
        { service: 'Microondas', value: 6, serviceDb: 'microwave' },
        { service: 'Aire acondicionado', value: 7, serviceDb: 'airConditioning' },
    ];
    

    return (
        <List
            sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper', height:'250px', overflow:'auto'}}>
            {items.map((item) => {
                const labelId = `checkbox-list-label-${item.value}`;

                return (
                    <ListItem
                        key={item.value}
                        disablePadding>
                        <ListItemButton
                            role={undefined}
                            onClick={handleToggle(item)}
                            dense>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={checked.indexOf(item.value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText
                                id={labelId}
                                primary={item.service}
                            />
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
    );
}
