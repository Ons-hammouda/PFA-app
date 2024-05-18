import React from 'react'
import {Navigate, useLocation} from "react-router-dom"
import { useSelector } from 'react-redux';

const ProtectedRoute = ({children}) => {
    const isAuthenticated = useSelector((state) => state.isAuthenticated);

    let location = useLocation();

    if(!isAuthenticated) {
        return <Navigate to="/Login" state={{ from: location}} replace />
    }
 return children

};

export default ProtectedRoute;