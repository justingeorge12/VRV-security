import { useState } from "react";

function AddUserModal({onClose}) {

    const [passwordVisible, setPasswordVisible] = useState(false)
    const [password, setPassword] = useState('')

    return(
        <div>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="absolute bg-zinc-700 border border-slate-600 shadow-md shadow-gray-700 rounded-lg px-6 py-4">
                    <div className="justify-center flex font-bold text-lg">
                        ADD USER
                    </div>
                    <div className="absolute top-4 right-4 bg-zinc-600 rounded-md">
                        <button onClick={() => onClose()} className="px-2 font-bold hover:text-red-600">✕</button>
                    </div>
                    <div className="w-[300px] sm:w-[400px] md:w-[500px] max-h-96 overflow-x-auto custom-scrollbar ">
                        <div className="m-2 text-black">
                            <form>
                                <input type="text" className="bg-neutral-400 shadow-lg w-full pl- rounded-md p-2 my-4 focus:outline-none placeholder:text-neutral-600"  placeholder="username"/>
                                <input type="text" className="bg-neutral-400 shadow-lg w-full pl- rounded-md p-2 my-4 focus:outline-none placeholder:text-neutral-600"  placeholder="email"/>
                                <div className="flex shadow-lg p-2 my-4 w-full bg-neutral-400 rounded-md">
                                    <input type={passwordVisible ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}  className="bg-neutral-400 w-full focus:outline-none placeholder:text-neutral-600" placeholder="password"/>
                                    <button onClick={(e) => {e.preventDefault(); setPasswordVisible(!passwordVisible)}}>{passwordVisible ? <span>👀</span> : <span className="">👁️‍🗨️</span>}</button>
                                </div>
                                <div>
                                    select role
                                </div>
                                <button className="bg-gradient-to-r from-zinc-950 via-slate-800 to-stone-950 text-violet-100 text-lg font-semibold w-full pl-2 rounded-md p-2 my-4">Login</button>
                            </form>
                        </div>
                    </div>              
                </div>
            </div>
        </div>
    )
}

export default AddUserModal