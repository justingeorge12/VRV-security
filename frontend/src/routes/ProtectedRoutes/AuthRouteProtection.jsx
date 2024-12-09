import {useSelector} from 'react-redux'
import { Navigate } from 'react-router-dom';

function AuthRouteProtection({element, redirectTo}) {

    const role = useSelector((state) => state.auth?.role);
    
    if (role) {
        return <Navigate to={redirectTo} replace />;
    }

    return element;

}

export default AuthRouteProtection