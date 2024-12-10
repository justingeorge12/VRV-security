import {Routes, Route} from 'react-router-dom'
import UserHome from '../../components/User/Pages/UserHome'
import UserLogin from '../../components/User/Auth/UserLogin'
import NotFound from '../../components/Common/NotFound'
import UserRegister from '../../components/User/Auth/UserRegister'
import ProtectedRoute from '../ProtectedRoutes/ProtectedRoute'
import AuthRouteProtection from '../ProtectedRoutes/AuthRouteProtection'
import Products from '../../components/User/Pages/Products'

function UserRoutes() {

    return(
        <div>
            <Routes>
                <Route path='/login' element={<AuthRouteProtection element={ <UserLogin />} redirectTo={'/'} /> } />
                <Route path='/register' element={<AuthRouteProtection element={<UserRegister /> } redirectTo={'/'} /> } />
                <Route path='*' element={<NotFound />} />

                <Route path="/" element={<ProtectedRoute element={ <UserHome /> } role={'user'} /> } />
                <Route path='/products' element={<ProtectedRoute element={<Products />} role={'user'} /> } />
            </Routes>
        </div>
    )
}

export default UserRoutes