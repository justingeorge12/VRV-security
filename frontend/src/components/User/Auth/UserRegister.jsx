import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../service/api";
import toast from "react-hot-toast";

function UserRegister() {

    const navigate = useNavigate()
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')



    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try{
            const res  = await api.post('userregister', {first_name:username, email, password})
            console.log(res)
            if (res.status === 201) {
                toast.success('registration successfully done')
                navigate('/login')
            }

        }
        catch(err) {
            console.log(err)
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
                        <h1 className="text-xl font-black mt-6 text-neutral-300">Register</h1>
                    </div>
                    <div className="m-2 sm:m-4 md:m-10 text-black ">
                        <form onSubmit={handleSubmit}>
                            <input value={username} onChange={(e) => setUsername(e.target.value)}  type="text" className="bg-neutral-400 shadow-lg w-full pl- rounded-md p-2 my-4 focus:outline-none placeholder:text-neutral-600"  placeholder="username"/>

                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="bg-neutral-400 shadow-lg w-full pl- rounded-md p-2 my-4 focus:outline-none placeholder:text-neutral-600"  placeholder="email"/>
                            <div className="flex shadow-lg p-2 my-4 w-full bg-neutral-400 rounded-md">
                                <input value={password} onChange={(e) => setPassword(e.target.value)} type={passwordVisible ? "text" : "password"}   className="bg-neutral-400 w-full focus:outline-none placeholder:text-neutral-600" placeholder="password"/>
                                <button onClick={(e) => {e.preventDefault(); setPasswordVisible(!passwordVisible)}}>{passwordVisible ? <span>👀</span> : <span className="">👁️‍🗨️</span>}</button>
                            </div>
                            <button className="bg-gradient-to-r from-zinc-950 via-slate-800 to-stone-950 text-violet-100 text-lg font-semibold w-full pl-2 rounded-md p-2 my-4">Register</button>
                        </form>
                        <div onClick={() => navigate('/login')} className="flex justify-center">
                            I already have account &nbsp; <span className="hover:text-red-600 font-semibold cursor-pointer">Login</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserRegister