import { ref, uploadBytes, getDownloadURL  } from 'firebase/storage';
import {storage} from './../../../firebase/config';

export async function uploadImagesToStorage(selectedImages, folderName) {
    const urlImages = [];

    const storageRef = ref(storage, folderName);
    for (const image of selectedImages) {
        const imageName = `${Date.now()}_${image.name}`;
        const imageRef = ref(storageRef, imageName);

        try {
            console.log(imageRef, image)
            await uploadBytes(imageRef, image);

            const imageUrl = await getDownloadURL(imageRef);
            urlImages.push(imageUrl);
        } catch (error) {
            console.error('Error al subir la imagen:', error.message);
        }
    }

    return urlImages;
}
