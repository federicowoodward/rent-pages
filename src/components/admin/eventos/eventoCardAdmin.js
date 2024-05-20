import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AccordionActions from '@mui/material/AccordionActions'
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'
import { useState } from 'react'
import { Grow, TextField } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export default function AdminEventosCard(props) {
    const [show, setShow] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [field, setField] = useState({ field: '', fieldUser: '' })
    const [inputValue, setInputValue] = useState('')

    function EditField(field) {
        setField(field)
        setIsDialogOpen(true)
        console.log('a')
    }

    const handleCloseDialog = () => {
        setIsDialogOpen(false)
        setField({ field: '', fieldUser: '' })
        setInputValue('')
    }

    const handleConfirmEdit = () => {
        props.editField(field.field, inputValue, props.evento.id)
        setField({ field: '', fieldUser: '' })
        setInputValue('')
        setIsDialogOpen(false)
    }

    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    const handleDeleteEvent = (e) => {
        props.delete(props.evento.id)
    }


    return (
        <div className="eventos-div">
            <Accordion
                style={{
                    backgroundColor: `#${props.backgroundColor}`,
                    width: '100%',
                }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    onClick={() => setShow(!show)}
                    id="panel1-header">
                    <h2> {props.evento.title}</h2>
                </AccordionSummary>
                <AccordionDetails>
                    <p>{props.evento.text}</p>
                </AccordionDetails>
                <AccordionActions>
                    <Button variant="contained" size="large" className='vermas-button'>
                        <a
                            href={props.evento.link}
                            target="_BLANK"
                            rel="noreferrer">
                            Ver mas!
                        </a>
                    </Button>
                </AccordionActions>
            </Accordion>
            {show && (
                <Grow in={show}>
                    <ButtonGroup
                        variant="contained"
                        aria-label="outlined primary button group"
                        size="large"
                        className="edit-buttons">
                        <Button
                            onClick={() =>
                                EditField({
                                    field: 'title',
                                    fieldUser: 'Titulo',
                                })
                            }>
                            <EditIcon /> <p>Editar titulo</p>
                        </Button>
                        <Button
                            onClick={() =>
                                EditField({ field: 'text', fieldUser: 'Texto' })
                            }>
                            <EditIcon /> <p>Editar texto</p>
                        </Button>
                        <Button
                            onClick={() =>
                                EditField({
                                    field: 'link',
                                    fieldUser: 'Pagina de la noticia',
                                })
                            }>
                            <EditIcon /> <p>Editar link</p>
                        </Button>
                        <Button
                            color="error"
                            onClick={() => handleDeleteEvent()}>
                            <DeleteForeverIcon /> <p>Borrar Noticia</p>
                        </Button>
                    </ButtonGroup>
                </Grow>
            )}
            <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>Editar campo</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Cambiar {field.fieldUser}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        name={field.field}
                        label="Ingrese texto"
                        type={field.field}
                        fullWidth
                        variant="standard"
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleConfirmEdit} color="primary">
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
