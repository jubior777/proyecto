import { createBrowserRouter } from 'react-router-dom'
import Home from '../components/pages/Home'
import Error404 from '../components/pages/Error404'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        errorElement: <Error404/>,

    }
])

export default router