import * as React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Checkbox from '@mui/material/Checkbox'
import { useEffect } from 'react'
import { Typography } from '@mui/material'

let data = [
    {
        name: '🍷Recorridos por bodegas',
        value: 'vinos',
    },
    {
        name: '🐎Cabalgatas a orillas del lago o en la estancia equina Acuarela del Río',
        value: 'rural',
    },
    { name: '🎒Senderismo', value: 'recreativas' },
    { name: '🎣Pesca de truchas y de pejerrey', value: 'pesca' },
    { name: '🚤Paseos en lancha', value: 'lancha' },
    { name: '🏄🏻‍♂️Clases de kite surf, SUP y wake board', value: 'clases-acuatico' },
    { name: '🎢Parques recreativos y acuáticos', value: 'recreativo-acuatico' },
    { name: '🏛️Museos', value: 'museos' },
    { name: '🦅Avistaje de aves', value: 'aves' },
    { name: '🌿Avistaje de flora y fauna nativa', value: 'avistaje' },
    {
        name: '⛪Recorrido religioso de capillas y monumentos',
        value: 'religioso',
    },
]
export default function Filter(props) {
    const [checked, setChecked] = React.useState([])

    useEffect(() => {
        props.handleChecked(checked)
    }, [checked, props])

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value)
        const newChecked = [...checked]

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked)
    }
    return (
        <List
            sx={{ maxWidth: 360, bgcolor: 'background.paper' }}
            className="filter">
            <Typography variant="h4" className="title">
                Filtro:
            </Typography>
            {data.map((data) => {
                const labelId = `checkbox-list-label-${data.value}`

                return (
                    <ListItem
                        key={data.value}
                        disablePadding
                        className="item-list">
                        <ListItemButton
                            role={undefined}
                            onClick={handleToggle(data.value)}
                            dense>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={checked.indexOf(data.value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={data.name} />
                        </ListItemButton>
                    </ListItem>
                )
            })}
        </List>
    )
}
