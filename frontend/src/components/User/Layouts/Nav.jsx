import { useNavigate } from "react-router-dom"
import api from "../../../service/api"
import { useDispatch } from "react-redux"
import { logout } from "../../../redux/authSlice"


function Nav() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = async () => {

        console.log('workinnlslsj alk ')
        try{
          const token = localStorage.getItem('refresh')
          console.log(token)
          const res = await api.post('logout', {token})
          localStorage.clear()
          console.log('bfrrr disptch')
          dispatch(logout())
          console.log('bfrrr header authe')
          delete api.defaults.headers.common["Authorization"];
          console.log('this is should workkkkkk up')
          navigate('/login')
          
    
        }
        catch (err) {
          console.log(err)
          localStorage.clear()
          dispatch(logout())
          delete api.defaults.headers.common["Authorization"];
          console.log('this is should workkkkkk down')
          navigate('/login')
        }
      }
    

    return(
        <div className="h-24 fixed top-0 left-0 right-0 backdrop-blur-sm">
            <div className="flex justify-center items-center h-full">
                <div className="w-full max-w-4xl mx-auto px-4 py-3 rounded-xl bg-slate-950 shadow-sm shadow-slate-600">
                    <div className="flex justify-between">
                        <div>
                            <h1 onClick={() => navigate('/')} className="bg-gradient-to-bl cursor-pointer from-transparent via-slate-900 to-transparent p-2 rounded-lg text-lg text-slate-300 font-semibold">VRV</h1>
                        </div>
                        <div>
                            <button onClick={() => navigate('/products')} className="p-2">Products »</button>
                            <button onClick={() => handleLogout()} className="p-2">Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Nav