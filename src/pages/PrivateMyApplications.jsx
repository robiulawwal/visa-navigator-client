import React, { useContext } from 'react';
import { AuthContext } from '../contextData/AuthProvider';
import { Navigate, useLocation, } from 'react-router-dom';

const PrivateMyApplications = ({children}) => {
    const {user,loader} =useContext(AuthContext)
    
    const location = useLocation()
    if (loader) {
        return <div className="flex items-center"> <span className="loading loading-spinner w-23 mx-auto text-accent"></span>
        </div>
    }
    if (!user) {
        return <Navigate state={{ from: location }} to='/login'></Navigate>
    }
    return (
        <div>
            {
                children
            }
        </div>
    );
};

export default PrivateMyApplications;