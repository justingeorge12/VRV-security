import { useEffect, useState } from "react";
import LayoutSideBar from "../Layouts/LayoutSideBar";
import AddRoleModal from "./modals/AddRoleModal";
import api from "../../../service/api";
import toast from "react-hot-toast";

function ManageRole() {

    const [list, setList] = useState([]);
    const [expandDesc, setExpandDesc] = useState(null);
    const [openAddRole, setOpenAddRole] = useState(false)
    
    const fetchRoles = async () => {
        try{

            const res = await api.get('roles')
        }
        catch(err) {
            console.log(err)
            toast.error('error while fetch the data')
        }
    }

    useEffect(() => {
        fetchRoles()
    }, [])

    return(
        <div>
            <LayoutSideBar>
                <div className="px-4 md:px-8 lg:px-16 py-4">
                    <div className="justify-center flex">
                        <h1 className="font-bold sm:text-xl md:text-2xl font-mono text-rose-200">ROLE'S</h1>
                    </div>

                    <div className="flex justify-end ">
                        <button onClick={() => setOpenAddRole(!openAddRole)} className="mr-1 mb-2 px-4 md:px-4 md:py-2 py-1 rounded-md shadow-2xl font-mono text-sm md:text-base sm:ml-0 border border-x-orange-400 border-r-green-300 border-t-yellow-300 border-lime-300">
                            ADD ROLE
                        </button>
                    </div>

                    <table className="w-full bg-zinc-900  border border-slate-600 text-sm text-left rtl:text-right">
                        <thead className="text-sm uppercase border-b border-slate-700">
                            <tr>
                                <th scope="col" className="px-6 py-3">Id</th>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3">Description</th>
                                <th scope="col" className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list && list.length > 0 ? (
                                list.map((tag) => (
                                    <tr key={tag.id} className="border-b border-slate-700">
                                        <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">{tag.id}</th>
                                        <td className="px-6 py-4">{tag.name}</td>
                                        <td onClick={() => handleExpand(tag.id)} className="px-6 py-4">
                                            {
                                                expandDesc === tag.id? tag.description 
                                            : 
                                                tag.description.length > 30
                                                    ?
                                                        `${tag.description.slice(0, 30)}...`
                                                    : 
                                                        tag.description}
                                        </td>
                                        <td className="px-6 py-4 gap-2 whitespace-nowrap">
                                            <button onClick={() => handleEditClick(tag)} className="px-2 py-1 mr-2 border border-lime-600 text-lime-300 rounded-md" >Edit</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-4">
                                        <div className="flex flex-col justify-center items-center">
                                            <p className="text-5xl mb-2 opacity-50">📭</p>
                                            <p className="text-xl font-mono">No Data</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </LayoutSideBar>
            <div>
                {openAddRole && 
                    <AddRoleModal onClose={() => setOpenAddRole(false)} fetchRoles={fetchRoles}/>
                }
            </div>
        </div>
    )
}

export default ManageRole