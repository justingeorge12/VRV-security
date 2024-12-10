import { useEffect, useState } from "react";
import LayoutSideBar from "../Layouts/LayoutSideBar"
import SideBar from "../Layouts/SideBar"
import AddUserModal from "./modals/AddUserModal";
import api from "../../../service/api";
import ConfirmModal from '../../Admin/Layouts/ConfirmModal'
import toast from "react-hot-toast";
import EditUserModal from "./modals/EditUserModal";

function ManageUsers() {

    const [search, setSearch] = useState("");
    const [userlist, setUserlist] = useState([]);
    const [blockModal, setBlockModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [openAddUser, setOpenAddUser] = useState(false)
    const [message, setMessage] = useState({ action: '' });
    const [openEditUser, setOpenEditUser] = useState(false)
    const [editDetail, setEditDetail] = useState(null)
    
    const fetchUsers = async () =>{

        try{
            const res = await api.get(`/users?search=${search}`)
            console.log(res)
            if (res.status === 200) {
                setUserlist(res.data)
                console.log(res.data)
            }
        }
        catch(err) {
            console.log(err)
        }
    }
    
    useEffect(() => {
        fetchUsers()
    }, [search])


    const handleBlock = async () => {
        try {
            const res = await api.patch(`blockuser/${selectedUserId}`);
            if (res.status === 200) {
                toast.success(res.data.message);
                fetchUsers();
            }
        } catch (err) {
            console.log(err);
            toast.error("There was an error occurred");
        } finally {
            setBlockModal(false);
            setSelectedUserId(null);
        }
    };

    return(
        <div>
            <LayoutSideBar>
                <div>
                    <div className="flex justify-center">
                        <h2 className="text-2xl font-bold my-4">USERS</h2>
                    </div>
                    <div className="flex justify-center mt-2">
                        <form onSubmit={(e) => e.preventDefault()}>
                            <input onChange={(e) => setSearch(e.target.value)} value={search} type="text" className="border border-zinc-600 bg-black rounded-md p-1 pl-4 focus:outline-none focus:border-blue-800" placeholder="Search users"/>
                            <button type="submit" className="ml-2 border px-2 py-1 rounded-md border-zinc-600">🔍</button>
                        </form>
                    </div>
                    <div className="absolute right-1 sm:right-2 md:right-10 border px-2 py-1 rounded-md border-x-orange-400 border-r-green-300 border-t-yellow-300 border-lime-300">
                        <button onClick={() => setOpenAddUser(!openAddUser)} className="font-semibold">Add users</button>
                    </div>

                    <div className="my-4 mt-6 border border-slate-900">
                        <div className="mx-4 sm:mx-8 lg:mx-16">
                            <div className="border border-slate-700 mt-6 rounded-lg relative overflow-x-auto custom-scrollbar">
                                <table className="w-full text-sm text-left rtl:text-right">
                                    <thead className="text-sm uppercase border-b border-slate-500">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">Id</th>
                                            <th scope="col" className="px-6 py-3">Name</th>
                                            <th scope="col" className="px-6 py-3">Email</th>
                                            <th scope="col" className="px-6 py-3">D of Join</th>
                                            <th scope="col" className="px-6 py-3">Role</th>
                                            <th scope="col" className="px-6 py-3">Coins</th>
                                            <th scope="col" className="px-6 py-3">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userlist.length > 0 ? (
                                            userlist.map((data, index) => (
                                                <tr key={index} className="border-b border-slate-700">
                                                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">{data.id}</th>
                                                    <td className="px-6 py-4">{data.first_name}</td>
                                                    <td className="px-6 py-4">{data.email}</td>
                                                    <td className="px-6 py-4">{data.date_joined.slice(0, 10)}</td>
                                                    <td className="px-6 py-4">{data.role?.[0]?.name}</td>
                                                    <td className="px-6 py-4">{data.coins}</td>

                                                    <td className="px-6 py-4 gap-2 whitespace-nowrap">
                                                        <button onClick={()=> {setEditDetail(data);setOpenEditUser(true)}} className="px-2 py-1 mr-2 border border-lime-400 rounded-sm">Edit</button>
                                                        <button onClick={() => {
                                                                setBlockModal(!blockModal);
                                                                setSelectedUserId(data.id);
                                                                setMessage({ action: data.is_active ? 'block' : 'unblock' });
                                                            }}
                                                            className="px-2 py-1 border border-red-800 rounded-sm"
                                                        >
                                                            {data.is_active ? "Block" : "Unblock"}
                                                        </button>
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
                        </div>
                    </div>
                </div>
            </LayoutSideBar>
            <div>
                {openAddUser && 
                <AddUserModal onClose={() => setOpenAddUser(false)} fetchUsers={fetchUsers}/>}
            </div>
            <div>
                {blockModal &&
                <ConfirmModal onClose={() => setBlockModal(false)} func={handleBlock} message={message.action}/>}
            </div>
            <div>
                {openEditUser &&
                <EditUserModal onClose={() => setOpenEditUser(false) } user={editDetail} fetchUsers={fetchUsers}/>}
            </div>
        </div>
    )
}

export default ManageUsers