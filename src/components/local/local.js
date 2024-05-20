import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import { ImageList, Link } from '@mui/material'
import Filter from './filter'
import './local.css'
import Loader from '../utils/loader'

let dataLocal = [
    {
        title: 'JG Wake School',
        text: 'Clases de wakeboard y paseos en lancha. Paseos para hasta 7 personas, clases para hasta 3 personas.',
        contact: 'Instructor: Jeremías Gentili +54 9 3513170587',
        category: 'recreativas',
    },
    {
        title: 'Complejo “El Lito”',
        text: 'Alquiler de botes a motor, a remo, kayaks y tablas SUP.',
        list: [
            'Bote a motor (para pesca 6:30h a 19h) ',
            'Bote a motor (para paseo 1,5h de duración) ',
            'Bote a remo (para pesca o paseo)',
            'Kayak simple y doble',
            'Tabla SUP',
        ],
        contact: 'Instructor: Jeremías Gentili +54 9 3513170587',
        category: 'recreativas',
    },
    {
        title: 'KiteCo',
        text: 'Clases de kitesurf en el Lago Los Molinos. Desde los 9/10 años. No se necesita conocimientos previos.',
        contact: 'Instructor: José Sanchez +54 9 3517692000',
        web: 'www.kiteco.com.ar',
        archive: 'https://bit.ly/infokiteco',
    },
    {
        title: 'Slingshot',
        text: 'Escuela de Kitesurf',
        contact: 'Contacto: +54 9 3515515233',
        category: 'recreativas',
    },
    {
        title: 'Club Náutico Potrero de Garay',
        text: 'Acceso a las instalaciones (piscinas, baños, deck con sombra, mesas, sillas, juegos de living, asadores, cancha de voley, futbol y zona de estar con hamacas y camastros).',
        list: [
            'Paseo en lancha',
            'Paseó en gomón',
            'Clase de wakeboard/esquí',
            'Curso de kitesurf. Clases personalizadas con seguimiento de embarcación y asistencia.',
            'Kayak simple, alquiler 1h',
            'Kayak doble, alquiler 1h',
            'Stand-up-paddle, alquiler 1h',
        ],
        contact:
            'Para cualquiera de las actividades se deberá realizar previa reserva WhatsApp ☎️ 3513605467 - 3517030244. ',
        extra: 'Botado de embarcaciones hasta Las 18:00 hs.',
        category: 'recreativas',
    },
    {
        title: 'Estancia Equina Acuarela del Río ',
        text: 'Días de campo, tardes de campo y noches campestres. Una combinación única de gastronomía y cabalgatas para toda la familia por las sierras de Paravachasca.',
        contact: 'Reservas: +54 9 3515 31-2040',
        extra: 'Prestadores habilitados por la provincia.',
        category: 'rural',
    },
    {
        title: 'Estancia La Ernestina',
        text: 'Un paraíso serrano.',
        contact: 'Reserva tu experiencia al +54 9 3547 59-9457',
        category: 'rural',
    },
    {
        title: 'Cerrito de la Cruz',
        text: 'Ascenso a un pequeño cerro en Villas Ciudad de América, con vistas panorámicas de las localidades vecinas y el Lago Los Molinos.',
        contact: 'Reserva tu experiencia al +54 9 3547 59-9457',
        extra: 'Apto para toda la familia. Entrada libre. ',
        category: 'rural',
        web: 'https://bit.ly/cerritodelacruz',
    },
    {
        title: 'El Zoilo',
        text: 'Paseos y Cabalgatas Paseos a caballo por la costa del Lago Los Molinos.',
        contact: 'Contacto: +54 9 351 247-1945',
        category: 'rural',
        web: 'https://www.facebook.com/caballoselzoilo',
    },
]

function Local() {
    const [filteredData, setFilteredData] = useState(dataLocal)
    const [checked, setChecked] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (checked.length !== 0) {
            const filtered = dataLocal.filter((item) =>
                checked.includes(item.category)
            )
            setFilteredData(filtered)
        } else {
            setFilteredData(dataLocal)
        }
        setLoading(false)
    }, [checked])

    function handleChecked(newChecked) {
        setChecked(newChecked)
    }

    return (
        <div className="local-container-div">
            <Typography variant="h4" gutterBottom className='title'>
                Actividades locales en Potrero de Garay
            </Typography>
            <div className="local-container">
                <Filter handleChecked={handleChecked} />
                {loading ? (
                    <Loader />
                ) : (
                    <ImageList
                        variant="masonry"
                        cols={3}
                        gap={18}
                        sx={{ marginTop: 6 }}>
                        {filteredData.map((data, index) => (
                            <Card
                                key={index}
                                className="local-card"
                                id={index === 0 ? 'first' : ''}>
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div">
                                        {data.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.primary">
                                        {data.text}
                                    </Typography>
                                    {data.list && data.list.length !== 0 && (
                                        <List sx={{ padding: 0 }}>
                                            {data.list.map((text, index) => (
                                                <ListItem
                                                    key={index}
                                                    disablePadding>
                                                    <ListItemButton
                                                        sx={{ padding: 0 }}>
                                                        <ListItemIcon>
                                                            <ArrowRightIcon />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary={text}
                                                        />
                                                    </ListItemButton>
                                                </ListItem>
                                            ))}
                                        </List>
                                    )}
                                    <Typography
                                        color="text.secondary"
                                        sx={{ fontSize: 16 }}>
                                        {data.contact}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.primary">
                                        {data.extra}
                                    </Typography>
                                    <CardActions>
                                        {data.web && (
                                            <Button variant="contained">
                                                <Link
                                                    href={data.web}
                                                    color="inherit"
                                                    underline="none"
                                                    target="_blank"
                                                    rel="noopener">
                                                    Ver web
                                                </Link>
                                            </Button>
                                        )}
                                    </CardActions>
                                </CardContent>
                            </Card>
                        ))}
                    </ImageList>
                )}
            </div>
        </div>
    )
}

export default Local
