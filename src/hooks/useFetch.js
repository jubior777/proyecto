import axios from 'axios';
import { useState, useEffect, useRef, useMemo } from 'react';
import { API_URL } from '../components/constants/env';

const useFetch = (endpoint, headers = {}, deps = []) => {
    const [data, setData] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);
    
  
    useEffect(() => {
        axios
            .get(`${API_URL}/${endpoint}`)
            .then((resp) => {
                setData(resp.data.data);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });

        
    }, [])

    return { data, error, loading }
}

export default useFetch
