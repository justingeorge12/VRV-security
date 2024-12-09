import {BrowserRouter, Route, Routes} from 'react-router-dom'
import UserRoutes from './routes/user/UserRoutes'
import AdminRoutes from './routes/admin/AdminRoutes'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <>
      <BrowserRouter>
      

        <Routes>
          <Route path='/*' element={<UserRoutes />} />
          <Route path='/admin/*' element={<AdminRoutes />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
      
    </>
  )
}

export default App
