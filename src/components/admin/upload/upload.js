import { getFirestore, collection, addDoc } from 'firebase/firestore'
import CarouselDetail from './../../card-detail/carrousel-detail.js'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import {
    Autocomplete,
    Dialog,
    DialogActions,
    DialogTitle,
    TextField,
} from '@mui/material'
import { storage } from './../../../firebase/config'
import SendIcon from '@mui/icons-material/Send'
import { styled } from '@mui/material/styles'
import CheckboxList from './servicesList'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import './itemUpload.css'
import ButtonBack from '../buttonBack.js'
import useAlert from '../../utils/alerts.js'
import Loader from '../../utils/loader.js'
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported'

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
})

const Upload = () => {
    const [uploadState, setUploadState] = useState('noupload')
    const [selectedImages, setSelectedImages] = useState([])
    const [selectedImagesRender, setSelectedImagesRender] = useState([])
    const [houseInfo, setHouseInfo] = useState({
        tipo: '',
        title: '',
        bathtub: '',
        rooms: '',
        guests: 0,
        services: [],
        imageUrl: '',
        dates: [],
    })
    const [loader, setLoader] = useState(false)
    const { handleAlert } = useAlert()

    useEffect(() => {}, [uploadState])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setHouseInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }))
    }

    const handleServices = (servicesChecked) => {
        setHouseInfo((prevInfo) => ({
            ...prevInfo,
            services: [...servicesChecked],
        }))
    }

    const handleFileChange = (e) => {
        const files = e.target.files
        const newImages = [...selectedImages]

        for (let i = 0; i < files.length; i++) {
            const file = files[i]
            const reader = new FileReader()

            reader.onload = (event) => {
                const tempImage = {
                    file,
                    previewURL: event.target.result,
                }

                newImages.push(tempImage)
                setSelectedImages(newImages)
                setSelectedImagesRender((selectedImagesRender) => [
                    ...selectedImagesRender,
                    ...newImages.map((img) => img.previewURL),
                ])
            }

            reader.readAsDataURL(file)
        }
    }

    const handleRemoveImage = (index) => {
        const newSelectedImages = [...selectedImages]
        newSelectedImages.splice(index, 1)
        setSelectedImages(newSelectedImages)
        const newImagesRender = [...selectedImagesRender]
        newImagesRender.splice(index, 1)
        setSelectedImagesRender(newImagesRender)
    }

    const handleAddHouse = async () => {
        const urlImages = []
        const db = getFirestore()
        const auth = getAuth()
        const user = auth.currentUser
        const storageRef = ref(storage, `${houseInfo.title}`)
        for (const image of selectedImages) {
            const imageName = `${Date.now()}_${image.name}`
            const imageRef = ref(storageRef, imageName)
            try {
                await uploadBytes(imageRef, image.file)
                const imageUrl = await getDownloadURL(imageRef)
                urlImages.push(imageUrl)
            } catch (error) {
                handleAlert(
                    'error',
                    `Error al subir la imagen: ${error.message}`
                )
            }
        }

        if (!user) {
            handleAlert('error', `Usuario: ${user} no autenticado`)
        }
        setLoader(true)
        addDoc(collection(db, 'alojamientos'), {
            type: houseInfo.type,
            typeDb: houseInfo.typeDb,
            title: houseInfo.title,
            bathtub: houseInfo.bathtub,
            rooms: houseInfo.rooms,
            guests: houseInfo.guests,
            services: houseInfo.services.map((item) => item.service),
            servicesDb: houseInfo.services.map((item) => item.serviceDb),
            imageUrl: urlImages,
            dates: houseInfo.dates,
            createdBy: user.uid,
        }).finally(() => {
            setUploadState('success')
            setLoader(false)
        })
    }

    const handleReset = () => {
        setHouseInfo({
            tipo: '',
            title: '',
            bathtub: '',
            rooms: '',
            guests: 0,
            services: [],
            imageUrl: '',
            type: '',
            typeDb: '',
            title: '',
            bathtub: '',
            rooms: '',
            guests: '',
            services: [],
            servicesDb: [],
            imageUrl: '',
            dates: '',
        })
        setUploadState('noupload')
        setSelectedImagesRender([])
        setSelectedImages([])
    }

    let options = [
        { type: 'Casa', typeDb: 'house' },
        { type: 'Departamento', typeDb: 'department' },
        { type: 'Cabaña', typeDb: 'hut' },
        { type: 'Complejo', typeDb: 'complex' },
        { type: 'Duomo', typeDb: 'duomo' },
        { type: 'Hotel', typeDb: 'hotel' },
        { type: 'Monoambiente', typeDb: 'studio' },
        { type: 'Duplex', typeDb: 'duplex' },
        { type: 'Hostel', typeDb: 'hostel' },
    ]

    return (
        <div>
            <Dialog open={loader}>
                <Loader />
            </Dialog>
            <ButtonBack />
            {uploadState === 'noupload' && (
                <div className="item-upload">
                    <form>
                        <h2>Agregar Nueva Casa</h2>
                        <TextField
                            id="outlined-basic"
                            label="Nombre de la casa"
                            variant="outlined"
                            onChange={handleInputChange}
                            name="title"
                            value={houseInfo.title}
                            className="input"
                        />
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={options}
                            getOptionLabel={(options) => options.type}
                            isOptionEqualToValue={(options, value) =>
                                options.type === value.type
                            }
                            sx={{ width: 300 }}
                            onChange={(e, value) => {
                                if (value) {
                                    setHouseInfo((prevInfo) => ({
                                        ...prevInfo,
                                        type: value.type,
                                        typeDb: value.typeDb,
                                    }))
                                }
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Tipo de casa"
                                    variant="outlined"
                                />
                            )}
                        />

                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={['1', '2', '3', '4', '5']}
                            sx={{ width: 300 }}
                            onChange={(e, value) =>
                                handleInputChange({
                                    target: { name: 'bathtub', value },
                                })
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Baños"
                                    onChange={handleInputChange}
                                    name="bathtub"
                                />
                            )}
                        />
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={['1', '2', '3', '4', '5']}
                            sx={{ width: 300 }}
                            onChange={(e, value) =>
                                handleInputChange({
                                    target: { name: 'rooms', value },
                                })
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Habitaciones"
                                    onChange={handleInputChange}
                                    name="rooms"
                                />
                            )}
                        />
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={['1', '2', '3', '4', '5']}
                            sx={{ width: 300 }}
                            onChange={(e, value) =>
                                handleInputChange({
                                    target: { name: 'guests', value },
                                })
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Huéspedes"
                                    onChange={handleInputChange}
                                    name="guests"
                                />
                            )}
                        />
                        <Button
                            component="label"
                            variant="contained"
                            sx={{ width: 200 }}
                            startIcon={<CloudUploadIcon />}>
                            Subir imagenes
                            <VisuallyHiddenInput
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                multiple
                            />
                        </Button>
                        <CheckboxList servicesChecked={handleServices} />
                        <Button
                            variant="contained"
                            onClick={handleAddHouse}
                            sx={{ width: 200 }}
                            endIcon={<SendIcon />}>
                            Subir
                        </Button>
                    </form>
                    <div className="preview">
                        <div>
                            <h2>Preview</h2>
                            <p>Nombre: {houseInfo.title}</p>
                            <p>Tipo: {houseInfo.tipo}</p>
                            <p>Tipo en inglés: {houseInfo.typeDb}</p>
                            <p>Baños: {houseInfo.bathtub}</p>
                            <p>Habitaciones: {houseInfo.rooms}</p>
                            <p>Huespedes: {houseInfo.guests}</p>
                            {Object.entries(houseInfo.services).map(
                                ([key, value]) => (
                                    <p key={key}>{value.service}</p>
                                )
                            )}
                        </div>
                        {selectedImages.length === 0 ? (
                            <div className="not-supported-icon">
                                <ImageNotSupportedIcon />
                            </div>
                        ) : (
                            <CarouselDetail
                                imagesToDisplay={selectedImagesRender}
                                deleteAvailable={true}
                                handleRemove={handleRemoveImage}
                            />
                        )}
                    </div>
                </div>
            )}
            {uploadState === 'success' && (
                <Dialog open={true} aria-labelledby="alert-dialog-title">
                    <DialogTitle id="alert-dialog-title">
                        {'Archivo subido con exito.'}
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={handleReset}>Subir otra casa</Button>
                        <Link to="/admin">
                            <Button>Volver al inicio</Button>
                        </Link>
                    </DialogActions>
                </Dialog>
            )}
            {uploadState === 'error' && (
                <Dialog open={true} aria-labelledby="alert-dialog-title">
                    <DialogTitle id="alert-dialog-title">
                        {'Error en la subida del archivo.'}
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={handleReset}>Volver a intentar</Button>
                        <Link to="/admin">
                            <Button>Volver al inicio</Button>
                        </Link>
                    </DialogActions>
                </Dialog>
            )}
        </div>
    )
}

export default Upload
