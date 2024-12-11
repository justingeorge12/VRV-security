import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logout } from "../../../redux/authSlice"
import api from "../../../service/api"

function ManagerHome() {

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
        <div>
            <button onClick={handleLogout}>logout</button>
            <div>

            Maaaaaaaaaaaaaanaaaager Hooooooooooomeeee1dsffffffffffffffff
            </div>
        </div>
    )
}

export default ManagerHome