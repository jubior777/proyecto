import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { API_URL } from '../components/constants/env';

const useFetch = (endpoint, headers = {}, deps = []) => {
    const [data, setData] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);
    const cancelTokenSource = useRef(null);

    useEffect(() => {
        setLoading(true);
        setError(undefined);
        cancelTokenSource.current = axios.CancelToken.source();

        axios
            .get(API_URL.replace(/\/$/, '') + '/' + endpoint.replace(/^\//, ''), {
                headers,
                cancelToken: cancelTokenSource.current.token,
            })
            .then((res) => {
                if (res.data && res.data.data) {
                    setData(res.data.data);
                } else {
                    setData(res.data);
                }
            })
            .catch((err) => {
                if (axios.isCancel(err)) {
                    // Request cancelled, do nothing
                } else {
                    setError(err);
                }
            })
            .finally(() => {
                setLoading(false);
            });

        return () => {
            if (cancelTokenSource.current) {
                cancelTokenSource.current.cancel('Request cancelled by cleanup');
            }
        };
    }, deps);

    return { data, error, loading };
};

export default useFetch;
