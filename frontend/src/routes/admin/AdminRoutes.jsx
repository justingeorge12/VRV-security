import { Route, Routes } from "react-router-dom"
import AdminDashbord from "../../components/Admin/Pages/AdminDashbord"
import AdminLogin from "../../components/Admin/Auth/AdminLogin"
import NotFound from "../../components/Common/NotFound"
import ManageUsers from "../../components/Admin/Pages/ManageUsers"
import ManageRole from "../../components/Admin/Pages/ManageRole"
import ManageProducts from "../../components/Admin/Pages/ManageProducts"
import AuthRouteProtection from "../ProtectedRoutes/AuthRouteProtection"
import ProtectedRoute from "../ProtectedRoutes/ProtectedRoute"

function AdminRoutes() {

    return(
        <div>
            <Routes>
                <Route path="/login" element={<AuthRouteProtection element={<AdminLogin /> } redirectTo={'/'} />} />
                <Route path='*' element={<NotFound />} />

                <Route path="/" element={<ProtectedRoute element={ <AdminDashbord />} role={'admin'} />} />
                <Route path="/users" element={<ProtectedRoute element={ <ManageUsers />} role={'admin'} />} />
                <Route path="/roles" element={<ProtectedRoute element={ <ManageRole />} role={'admin'} />} />
                <Route path="/products" element={<ProtectedRoute element={ <ManageProducts />} role={'admin'} />} />
            </Routes>
        </div>
    )
}

export default AdminRoutes