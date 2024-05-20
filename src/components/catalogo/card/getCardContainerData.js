import { useEffect, useState } from 'react';
import { collection, getDocs, getFirestore, query } from 'firebase/firestore';

export function GetCardContainerData() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const obtenerAlojamientos = async () => {
            const db = getFirestore();
            const queryCollection = collection(db, 'alojamientos');
            const queryRef = query(queryCollection);
            try {
                const querySnapshot = await getDocs(queryRef);
                if (querySnapshot.size === 0) {
                    setData('none');
                } else {
                    const data = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setData(data);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener alojamientos:', error);
                setError(error);
                setLoading(false);
            }
        };
        obtenerAlojamientos();
    }, []);

    return { data, loading, error };
}

