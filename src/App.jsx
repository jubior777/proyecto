import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { API_URL } from '../env'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1>Hello World Day{API_URL}</h1>
        <p>Este es el sitio en desarrollo</p>
      </div>
      
    </>
  )
}

export default App
