import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AccordionActions from '@mui/material/AccordionActions'
import Button from '@mui/material/Button'
export default function EventosCard(props) {
    return (
        <div className="eventos-div">
            <Accordion
                style={{
                    backgroundColor: `#${props.backgroundColor}`,
                    transparent: 0,
                }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header">
                    <h2> {props.evento.title}</h2>
                </AccordionSummary>
                <AccordionDetails>
                    <p>{props.evento.text}</p>
                </AccordionDetails>
                <AccordionActions>
                    <Button variant="contained" size="large">
                        <a
                            href={props.evento.linkv}
                            target="_BLANK"
                            rel="noreferrer">
                            Ver mas!
                        </a>
                    </Button>
                </AccordionActions>
            </Accordion>
        </div>
    )
}
