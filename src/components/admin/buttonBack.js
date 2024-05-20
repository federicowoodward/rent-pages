import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import { Link } from 'react-router-dom'

export default function ButtonBack() {
    return (
        <div className="div-button-back">
            <Link to={'/admin'}>
                <ArrowCircleLeftIcon  sx={{ fontSize: 50, color: 'var(--color-primary);' }} />
            </Link>
            <style>
                {`
                    .div-button-back {
                        display: flex;
                        justify-content: start;
                        width: 1440px;
                    }
                `}
            </style>
        </div>
    )
}
