import React, { useEffect, useState } from 'react'
import { auth, provider } from '../../firebase/config.js'
import { signInWithPopup } from 'firebase/auth'
import { Link } from 'react-router-dom'
import {
    collection,
    getDocs,
    getFirestore,
    query,
    where,
} from 'firebase/firestore'
import { Button } from '@mui/material'
import './admin.css'

function Admin() {
    const [value, setValue] = useState('')

    const authUser = async (email) => {
        const db = getFirestore()
        const usersRef = collection(db, 'users')
        const queryDoc = query(usersRef, where('correo', '==', `${email}`))
        const querySnapshot = await getDocs(queryDoc)
        const user = querySnapshot.docs[0].data()
        return user
    }

    const handleClick = () => {
        signInWithPopup(auth, provider).then((data) => {
            const auth = authUser(data.user.email)
            if (auth !== undefined) {
                setValue(data.user.email)
                localStorage.setItem('email', data.user.email)
            }
        })
    }

    useEffect(() => {
        setValue(localStorage.getItem('email'))
    }, [])

    const loginOut = () => {
        localStorage.removeItem('email')
        setValue('')
    }

    return (
        <div>
            {value ? (
                <div className="admin">
                    <div>
                        <p>
                            Bienvenido <strong>{value}</strong>
                        </p>
                    </div>
                    <Button variant="outlined" style={{width:250}}>
                        <Link to={'/upload'}>Subir item</Link>
                    </Button>
                    <Button variant="outlined" style={{width:250}}>
                        {' '}
                        <Link to={'/deleter'}>Borrar item</Link>
                    </Button>
                    <Button variant="outlined" style={{width:250}}>
                        <Link to={'/eventos-admin'}>Administrar eventos</Link>
                    </Button>
                    <Button variant="outlined" style={{width:250}}>
                        <Link to={'/date-manager'}>
                            Administrar disponibilidad
                        </Link>
                    </Button>
                    <Button variant="outlined" onClick={loginOut} style={{width:250}}>
                        Cerrar sesion
                    </Button>
                </div>
            ) : (
                <div>
                    <button onClick={handleClick}>
                        Iniciar sesion
                        <img
                            src={`${process.env.PUBLIC_URL}/assets/googleLogo.jpg`}
                            alt=""
                        />
                    </button>
                </div>
            )}
        </div>
    )
}
export default Admin
