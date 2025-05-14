import React, { createContext, useEffect, useState } from "react";
import { token } from "../helpers/auth";
import PropTypes from "prop-types";
import axios from "axios";
import { API_URL } from "../components/constants/env";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState();

    useEffect(() => {
    const fetchUserData = async () => {
        if (token()) {
            try {
                const response = await axios.get(`${API_URL}/private/users`, {
                    headers: { Authorization: `Bearer ${token()}` },
                });
                setUserData(response.data.data);
            } catch (error) {
                console.error("Error al obtener datos de usuario", error);
            }
        }
    };

    fetchUserData();
}, [token]);


    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserContext.Provider>
    );
};


UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { UserContext, UserProvider };

