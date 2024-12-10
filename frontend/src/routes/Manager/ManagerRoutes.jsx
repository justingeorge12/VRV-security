import { Route, Routes } from "react-router-dom"
import ProtectedRoute from "../ProtectedRoutes/ProtectedRoute"
import ManagerHome from "../../components/Manager/Pages/ManagerHome"

function ManagerRoutes() {

    return(
        <div>
            <Routes>
                <Route path="/" element={<ProtectedRoute element={<ManagerHome />  } role={'manager'} />} />

            </Routes>
        </div>
    )
}

export default ManagerRoutes