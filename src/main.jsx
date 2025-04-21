import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/app.jsx'
import { RouterProvider } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
 <RouterProvider router={router}/>
)
