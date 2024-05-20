import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import getFirestoreApp from './firebase/config.js'
import { SnackbarProvider } from "notistack";

getFirestoreApp()

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
            <App />
        </SnackbarProvider>
    </React.StrictMode>
)

