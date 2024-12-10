import { useNavigate } from 'react-router-dom'
import api from '../../../service/api'


export const handleLogout = async (navigate) =>{

    try{
        const refresh = localStorage.getItem('refresh')

        const res = await api.post('logout', {token:refresh})
        localStorage.clear();
        delete api.defaults.headers.common["Authorization"];
        navigate('/admin/login')
        
    }
    catch (err) {
        console.log(err)
        localStorage.clear()
        delete api.defaults.headers.common["Authorization"];
        navigate('/admin/login')
    }
    
}
