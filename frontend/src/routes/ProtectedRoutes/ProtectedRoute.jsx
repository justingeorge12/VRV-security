import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({element, role}) {
    const currentRole = useSelector((state) => state.auth?.role);

    useEffect(() => {
        console.log("Current Role:", currentRole);
        console.log("Expected Role:", role);
    }, [currentRole, role]);

    

    console.log(currentRole, 'currrrrrrrrrrrrrrrrrrrrrnt role')
    console.log(role, 'rooooooooooooooooooooooooooooooole')

    if (!currentRole) {
        if (location.pathname.startsWith('/admin')) {
            return <Navigate to='/admin/login'  />;
        }
        else if (location.pathname.startsWith('/')) {
            return <Navigate to='/login'  />;
        } 
    }
     else if (currentRole != role) {
        return <Navigate to='/unauthorized'  />;
    }

    return element;
};



export default ProtectedRoute