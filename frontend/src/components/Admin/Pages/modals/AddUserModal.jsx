import { useEffect, useState } from "react";
import api from "../../../../service/api";
import toast from 'react-hot-toast'

function AddUserModal({onClose, fetchUsers}) {

    const [passwordVisible, setPasswordVisible] = useState(false)
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [roles, setRoles] = useState([]);
    const [coins, setCoins] = useState(0)
    const [selectedRole, setSelectedRole] = useState('');
    const [errors, setErrors] = useState({});


    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const res = await api.get('roles');
                setRoles(res.data);
            } catch (err) {
                console.error("Failed to fetch roles", err);
            }
        };
        fetchRoles();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try{
                onClose()
                const res  = await api.post('register', {first_name:username, email, password, role:selectedRole, coins})
                console.log(res)
                if (res.status === 201) {
                    toast.success('registration successfully done')
                    fetchUsers()
                }
            }
            catch (err) {
                if (err.response && err.response.status === 400) {
                    const errorData = err.response.data;
            
                    if (errorData.email) {
                        toast.error(`Email error: ${errorData.email[0]}`);
                        onClose()
                    }
                    if (errorData.role) {
                        toast.error(`Role error: ${errorData.role[0]}`);
                        onClose()
                    }
            
                    if (!errorData.email && !errorData.role) {
                        toast.error('There is an error in the form submission.');
                        onClose()
                    }
                } else {
                    console.log(err);
                    toast.error('An unexpected error occurred.');
                    onClose()
                }
            }            

        }
    };


    const validate = () => {
        const newErrors = {};

        if (!username.trim()) {
            newErrors.username = "Username is required";
        }

        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Enter a valid email address";
        }

        if (!password.trim()) {
            newErrors.password = "Password is required";
        }

        if (!selectedRole) {
            newErrors.role = "Role must be selected";
        }
        if (coins < 0) {
            newErrors.coins = "Coin must be greater than 0"
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    


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
                            <form onSubmit={handleSubmit}>
                                
                                <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" className="bg-neutral-400 shadow-lg w-full pl- rounded-md p-2 my-4 focus:outline-none placeholder:text-neutral-600"  placeholder="username"/>
                                {errors.username && <div className="text-red-500 text-sm">{errors.username}</div>}
                                
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="bg-neutral-400 shadow-lg w-full pl- rounded-md p-2 my-4 focus:outline-none placeholder:text-neutral-600"  placeholder="email"/>
                                {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
                                
                                <div className="flex shadow-lg p-2 my-4 w-full bg-neutral-400 rounded-md">
                                    <input value={password} onChange={(e) => setPassword(e.target.value)} type={passwordVisible ? "text" : "password"} className="bg-neutral-400 w-full focus:outline-none placeholder:text-neutral-600" placeholder="password"/>
                                    <button onClick={(e) => {e.preventDefault(); setPasswordVisible(!passwordVisible)}}>{passwordVisible ? <span>👀</span> : <span className="">👁️‍🗨️</span>}</button>
                                </div>
                                {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
                                
                                <div className="flex items-center justify-between my-4">
                                    <div className="w-1/2 pr-2 items-center mt-4">
                                        <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} className="bg-neutral-400 shadow-lg w-full rounded-md p-2  focus:outline-none">
                                            <option value="" disabled>Select role</option>
                                            {roles.map((role) => (
                                                <option key={role.id} value={role.id}>
                                                    {role.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="w-1/2 pl-2 text-center mt-4">
                                        <input value={coins} onChange={(e) => setCoins(e.target.value)} type="number" className="bg-neutral-400 shadow-lg w-full rounded-md p-2 focus:outline-none placeholder:text-neutral-600"  placeholder="coins"/>
                                    </div>

                                </div>
                                <div className="flex justify-between ">
                                    {errors.role && <div className="text-red-500 text-sm">{errors.role}</div>}
                                    {errors.coins && <div className="text-red-500 text-sm">{errors.coins}</div>}
                                </div>
                                <button className="bg-gradient-to-r from-zinc-950 via-slate-800 to-stone-950 text-violet-100 text-lg font-semibold w-full pl-2 rounded-md p-2 my-4">Submit</button>
                            </form>
                        </div>
                    </div>              
                </div>
            </div>
        </div>
    )
}

export default AddUserModal