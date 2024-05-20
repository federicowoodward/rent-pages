import { initializeApp } from 'firebase/app'
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
const firebaseConfig = {
    apiKey: 'AIzaSyBj-M-i7_D4AYKtYR3llaM1I9nyR8wuDbg',
    authDomain: 'rent-cfa40.firebaseapp.com',
    projectId: 'rent-cfa40',
    storageBucket: 'rent-cfa40.appspot.com',
    messagingSenderId: '888833730880',
    appId: '1:888833730880:web:befcab546fe72e668132a5',
    measurementId: 'G-798ESMMLTE',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const storage = getStorage(app)
const provider = new GoogleAuthProvider()
// const analytics = getAnalytics(app);

export default function getFirestoreApp() {
    return app
}
export { auth, provider, storage }
