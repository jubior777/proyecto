import axios from 'axios';
import { useState, useEffect } from 'react';
import { API_URL } from '../components/constants/env';



const useFetch = (endpoint, headers ={}) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        axios
            .get(`${API_URL}${endpoint}`)
            .then((res) => {
                setData(res.data.data)
            })
            .catch((err) => {
                console.error("Error en la API:", err);
                setError(err);
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])
    
    return {data, error, loading}

}

export default useFetch;