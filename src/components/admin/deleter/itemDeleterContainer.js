import {
    collection,
    deleteDoc,
    getDocs,
    getFirestore,
    doc,
} from 'firebase/firestore'
import { getStorage, ref, deleteObject } from 'firebase/storage'
import { useEffect, useState, memo } from 'react'
import { useParams } from 'react-router-dom'
import ButtonBack from '../buttonBack.js'
import useAlert from '../../utils/alerts.js'
import ItemDelete from './itemDelete.js'
import Loader from '../../utils/loader.js'

function ItemDeleterContainer() {
    const [componentKey, setComponentKey] = useState(0)
    const [itemList, setItemList] = useState([])
    const [loading, setLoading] = useState(true)
    const { handleAlert } = useAlert()
    const { id } = useParams()

    useEffect(() => {
        const db = getFirestore()
        const queryCollection = collection(db, 'alojamientos')
        getDocs(queryCollection)
            .then((resp) => {
                if (resp.size === 0) {
                    handleAlert('error', 'no hay productos para mostrar')
                } else {
                    setItemList(
                        resp.docs.map((item) => ({
                            id: item.id,
                            ...item.data(),
                        }))
                    )
                }
            })
            .catch((err) => console.log(err))
            .finally(setTimeout(() => setLoading(false), 2000))
    }, [id, componentKey])

    function deleteItem(item) {
        const db = getFirestore()
        const storage = getStorage()
        deleteDoc(doc(db, 'alojamientos', `${item.id}`))
            .then(() => {
                const desertRef = ref(storage, `${item.imageUrl}`)
                deleteObject(desertRef)
            })
            .finally(() => {
                handleAlert('success', 'Producto eliminado') 
                setComponentKey((prevKey) => prevKey + 1)
            })
            .catch((err) => handleAlert('error', `${err.message}`))
    }

    return (
        <div>
            <ButtonBack />
            {loading ? (
                <div
                    style={{
                        width: '1440px',
                        display: 'flex',
                        justifyContent: 'center',
                    }}>
                    <Loader/>
                </div>
            ) : (
                <>
                    {itemList.map((item) => (
                        <ItemDelete
                            key={item.id}
                            item={item}
                            deleter={deleteItem}
                        />
                    ))}
                </>
            )}
        </div>
    )
}
export default memo(ItemDeleterContainer)
