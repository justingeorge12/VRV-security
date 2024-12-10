import {BrowserRouter, Route, Routes} from 'react-router-dom'
import UserRoutes from './routes/user/UserRoutes'
import AdminRoutes from './routes/admin/AdminRoutes'
import { Toaster } from 'react-hot-toast'
import ManagerRoutes from './routes/Manager/ManagerRoutes'
import NotAuthorized from './components/Common/NotAuthorized'

function App() {

  return (
    <>
      <BrowserRouter>
      

        <Routes>
          <Route path='/*' element={<UserRoutes />} />
          <Route path='/admin/*' element={<AdminRoutes />} />
          <Route path='/manager/*' element={<ManagerRoutes /> } />
          <Route path='/unauthorized' element={<NotAuthorized />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
      
    </>
  )
}

export default App
