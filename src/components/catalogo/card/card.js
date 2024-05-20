import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Link } from '@mui/material'
import GroupIcon from '@mui/icons-material/Group'
import './card.css'

export default function CardSkeleton(props) {
    let casa = props.props
    console.log(casa)
    return (
        <Card sx={{ height: 300, width: 310, margin: 1 }} key={casa.id}>
            <CardMedia
                sx={{ height: 185 }}
                image={casa.imageUrl[0]}
            />
            <CardContent className="title-guest" sx={{ padding: 1.5 }}>
                <Typography gutterBottom sx={{ fontSize: 16 }}>
                    {casa.title}
                </Typography>
                <Typography
                    color="text.secondary"
                    sx={{ fontSize: 24 }}
                    className="guest-text">
                    {casa.guests}
                    <GroupIcon sx={{ fontSize: 30 }} />
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    variant="contained"
                    size="small"
                    sx={{ marginLeft: 0.1, width: 80 }}>
                    <Link
                        href={`/rent-pages/detail/${casa.id}`}
                        color="inherit"
                        underline="none"
                        target="_blank"
                        rel="noopener">
                        Ver mas
                    </Link>
                </Button>
            </CardActions>
        </Card>
    )
}
