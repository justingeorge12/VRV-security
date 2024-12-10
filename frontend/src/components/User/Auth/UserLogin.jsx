import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import api from "../../../service/api"
import { useDispatch } from "react-redux"
import { loginSuccess } from "../../../redux/authSlice"

function UserLogin() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [roles, setRoles] = useState([])
    const [email, setEmail] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [password, setPassword] = useState('')
    const [selectedRole, setSelectedRole] = useState('')

    const fetchRoles = async () => {
        try{
            const res = await api.get('userroles')
            if (res.status === 200) {
                setRoles(res.data)
            } 
            console.log(res)
        }
        catch (err){
            console.log(err)
        }
    }
    
    useEffect(() => {
        fetchRoles()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            toast.error("Email is required.");
            return;
        }
    
        if (!/\S+@\S+\.\S+/.test(email)) {
            toast.error("Please enter a valid email address.");
            return;
        }
    
        if (!password) {
            toast.error("Password is required.");
            return;
        }

        if (!selectedRole) {
            toast.error('Please select a role')
            return
        }
    

        try {
            console.log(selectedRole)
            const res = await api.post('/token', {email, password, role:selectedRole})
            const { access, refresh, role, user_id } = res.data;
            dispatch(loginSuccess({ access_token: access, refresh_token: refresh, user_id, role }));
            if (role === 'user') {
                navigate('/')
            }
            else if (role === 'manager'){
                console.log('navigate to manaGer')
                navigate('/manager')
            }

        } catch (error) {
            console.log(error)
            if(error?.message === "Network Error"){
                toast.error("Network Error")
            }
            else if (error.response) {
                const { status, data } = error.response;
        
                if (status === 401) {
                    toast.error("Unauthorized: Please check your credentials.");
                } else if (status === 500) {
                    toast.error("Server Error: Please try again later.");
                } else {
                    toast.error(data?.message || "An unexpected error occurred.");
                }
            } 
            else{
                toast.error("An error occurred while logging in.");
            }
        }
    };

    return(
        <div className="w-full flex justify-center flex-col items-center h-screen body bg-gradient-to-bl !from-zinc-950 !via-slate-800 !to-stone-950 ">
            <div className="mb-8 flex justify-center text-2xl font-bold text-white">
                VRV Security
            </div>
            <div className="border border-neutral-700  sm:w-[400px] md:w-[500px] bg-zinc-700 rounded-md">
                <div className="">
                    <div className="flex justify-center">
                        <h1 className="text-xl font-black mt-6 text-neutral-300">LOGIN</h1>
                    </div>
                    <div className="m-2 sm:m-4 md:m-10 text-black ">
                        <form onSubmit={handleSubmit}>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="bg-neutral-400 shadow-lg w-full pl- rounded-md p-2 my-4 focus:outline-none placeholder:text-neutral-600"  placeholder="email"/>
                            
                            <div className="flex shadow-lg p-2 my-4 w-full bg-neutral-400 rounded-md">
                                <input value={password} onChange={(e) => setPassword(e.target.value)} type={passwordVisible ? "text" : "password"}   className="bg-neutral-400 w-full focus:outline-none placeholder:text-neutral-600" placeholder="password"/>
                                <button onClick={(e) => {e.preventDefault(); setPasswordVisible(!passwordVisible)}}>{passwordVisible ? <span>👀</span> : <span className="">👁️‍🗨️</span>}</button>
                            </div>

                            <div className="my-4">
                                <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} className="bg-neutral-400 shadow-lg w-full rounded-md p-2 mt-4 focus:outline-none">
                                    <option value="" disabled>Select role</option>
                                    {roles.map((role) => (
                                        <option key={role.name} value={role.name}>
                                            {role.name}
                                        </option>
                                    ))}
                                </select>
                            </div>


                            <button className="bg-gradient-to-r from-zinc-950 via-slate-800 to-stone-950 text-violet-100 text-lg font-semibold w-full pl-2 rounded-md p-2 my-4">Login</button>
                        </form>
                        <div onClick={() => navigate('/register')} className="flex justify-center">
                            I don't have account &nbsp; <span className="hover:text-red-600 font-semibold cursor-pointer">Register</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserLogin
