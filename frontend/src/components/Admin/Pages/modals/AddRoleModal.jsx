import { useEffect, useState } from "react";
import api from '../../../../service/api'
import toast from 'react-hot-toast'

function AddRoleModal({onClose, fetchRoles, roles}) {

    const [name, setName] = useState('')
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState({});
    const [submitLoading, setSubmitLoading] = useState(false)

    console.log(roles)

    useEffect(() => {
        if(roles) {
            setName(roles.name)
            setDescription(roles.description)
        }
    }, [roles])

    const validateForm = () => {
        const newErrors = {};
    
        if (!name.trim()) {
          newErrors.name = "Role name is required.";
        }
        if (!description.trim()) {
          newErrors.description = "Description is required.";
        }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; 
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!validateForm()) {
            return; 
        }
        setSubmitLoading(true)

        try {
            let res
            if(roles) {
                res = await api.put(`roles/${roles.id}/`, {name, description})
            }
            else {
                res = await api.post('roles/', {name, description}) 
            }

            // const res = await api.post("roles/", {name, description, });
            setName("");
            setDescription("");
            setErrors({});
            toast.success('role added successfully')
            console.log("API response:", res.data);
            fetchRoles()
            onClose()
        } 
        catch (err) {
            console.error("API error:", err);
            toast.error('there is a error while saving')
        }
        finally{
            setSubmitLoading(false)
        }
      };

    return(
        <div>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="absolute bg-zinc-700 border border-slate-600 shadow-md shadow-gray-700 rounded-lg px-6 py-4">
                    <div className="justify-center flex font-bold text-lg">
                        ADD ROLE
                    </div>
                    <div className="absolute top-4 right-4 bg-zinc-600 rounded-md">
                        <button onClick={() => onClose()} className="px-2 font-bold hover:text-red-600">✕</button>
                    </div>
                    <div className="w-[300px] sm:w-[400px] md:w-[500px] max-h-96 overflow-x-auto custom-scrollbar ">
                        <div className="m-2 text-black">
                            <form onSubmit={handleSubmit}>
                                <div>
                                    {errors.name && (<p className="text-red-500 text-sm">{errors.name}</p>)}
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={`bg-neutral-400 shadow-lg w-full rounded-md p-2 my-4 focus:outline-none placeholder:text-neutral-600 ${errors.name ? "border-red-500 border-2" : "" }`}  placeholder="role name"/>
                                </div>
                                
                                <div>
                                    {errors.description && (<p className="text-red-500 text-sm">{errors.description}</p>)}
                                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className={`bg-neutral-400 shadow-lg w-full rounded-md p-2 my-4 focus:outline-none placeholder:text-neutral-600 ${errors.description ? "border-red-500 border-2" : ""}`}  placeholder="description"/>
                                </div>
                                <button className="bg-gradient-to-r from-zinc-950 via-slate-800 to-stone-950 text-violet-100 text-lg font-semibold w-full pl-2 rounded-md p-2 my-4">Add Role</button>
                            </form>
                        </div>
                    </div>              
                </div>
            </div>
        </div>
    )
}

export default AddRoleModal