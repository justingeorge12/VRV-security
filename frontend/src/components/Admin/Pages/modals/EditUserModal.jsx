import { useEffect, useState } from "react";
import api from "../../../../service/api";
import toast from "react-hot-toast";


function EditUserModal({onClose, user, fetchUsers}){

    const [username, setUsername] = useState(user?.first_name || '')
    const [coins, setCoins] = useState(user?.coins || 0)
    const [selectedRole, setSelectedRole] = useState(user?.role[0]?.id || '')
    const [errors, setErrors] = useState({});
    const [roles, setRoles] = useState([])
    
    const fetchRoles = async () => {
        try {
          const res = await api.get("/roles"); 
          if (res.status === 200) {
            setRoles(res.data);
          }
        } catch (error) {
          console.log("Failed to fetch roles", error);
        }
      }

      useEffect(() => {
        fetchRoles()
      }, [])


      const validateFields = () => {
        const validationErrors = {};
        if (!username.trim()) {
          validationErrors.username = "Username cannot be empty.";
        }
    
        if (!selectedRole) {
          validationErrors.role = "Please select a role.";
        }
    
        setErrors(validationErrors);
    
        return Object.keys(validationErrors).length === 0; 
      };


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateFields()) {
          return; 
        }
    
        try {
            console.log(selectedRole)
            const res = await api.patch(`register/${user.id}`, {first_name: username, role: selectedRole, coins});
    
            if (res.status === 200) {
                toast.success("User updated successfully");
                onClose();
                fetchUsers()
            } 
            else {
                toast.error("Failed to update user");
            }
        } 
        catch (error) {
            console.error("Error updating user", error);
            toast.error("An error occurred while trying to update the user.");
        }
    };

    return(
        <div>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="absolute bg-zinc-700 border border-slate-600 shadow-md shadow-gray-700 rounded-lg px-6 py-4">
                    <div className="justify-center flex font-bold text-lg">
                        EDIT USER
                    </div>
                    <div className="absolute top-4 right-4 bg-zinc-600 rounded-md">
                        <button onClick={() => onClose()} className="px-2 font-bold hover:text-red-600">✕</button>
                    </div>
                    <div className="w-[300px] sm:w-[400px] md:w-[500px] max-h-96 overflow-x-auto custom-scrollbar ">
                        <div className="m-2 text-black">
                            <form onSubmit={handleSubmit}>
                                <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" className="bg-neutral-400 shadow-lg w-full pl- rounded-md p-2 my-4 focus:outline-none placeholder:text-neutral-600"  placeholder="username"/>
                                {errors.username && <div className="text-red-500 text-sm">{errors.username}</div>}
                                
                                <input value={coins} onChange={(e) => setCoins(e.target.value)} type="number" className="bg-neutral-400 shadow-lg w-full pl- rounded-md p-2 my-4 focus:outline-none placeholder:text-neutral-600"  placeholder="coins"/>
                                {errors.coins && <div className="text-red-500 text-sm">{errors.coins}</div>}
                                
                                <div className="my-4">
                                    <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} className="bg-neutral-400 shadow-lg w-full rounded-md p-2  focus:outline-none">
                                        <option value="" disabled>Select role</option>
                                        {roles.map((role) => (
                                            <option key={role.id} value={role.id}>
                                                {role.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {errors.role && <div className="text-red-500 text-sm">{errors.role}</div>}
                                <button className="bg-gradient-to-r from-zinc-950 via-slate-800 to-stone-950 text-violet-100 text-lg font-semibold w-full pl-2 rounded-md p-2 my-4">Submit</button>
                            </form>
                        </div>
                    </div>              
                </div>
            </div>
        </div>
    )
}

export default EditUserModal