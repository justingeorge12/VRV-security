import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { handleLogout } from "../Auth/handleLogout"

function SideBar() {

    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const [logoutModal, setLogoutModal] = useState(false)
    

    return(
        <div>
            <button onClick={() => setIsOpen(!isOpen)} aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"> <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" >
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>
            <aside id="default-sidebar" className={`fixed top-0 left-0 z-40 w-[200px]  h-screen transition-transform ${ isOpen ? "translate-x-0" : "-translate-x-full" } sm:translate-x-0 bg-zinc-900 border-r border-lime-400`} aria-label="Sidebar" >
                <div className="h-full px-3 py-4 overflow-y-auto relative">
                    <button onClick={() => setIsOpen(false)} className="absolute px-2 bg-zinc-800 top-3 right-3 rounded-md sm:hidden text-gray-600 hover:text-red-600  dark:text-gray-400 dark:hover:text-white font-bold"> ✕ </button>
                    <div className="">
                        <button onClick={() => navigate('/admin')} className="text-2xl my-4 font-bold text-lime-100">VRV</button>
                    </div>
                    <div>
                        <ul className="space-y-2 font-medium">
                            <li onClick={() => { navigate('/admin/users') }} className="flex items-center p-2 text-gray-400 rounded-lg hover:bg-zinc-800 hover:border hover:border-zinc-700 cursor-pointer"> 👥 <span className="ms-2">Users</span> </li>
                            <li onClick={() => { navigate('/admin/roles') }} className="flex items-center p-2 text-gray-400 rounded-lg hover:bg-zinc-800 hover:border hover:border-zinc-700 cursor-pointer "> 🔖 <span className="ms-2">Roles</span></li>
                            <li onClick={() => {navigate('/admin/products')}} className="flex items-center p-2 text-gray-400 rounded-lg hover:bg-zinc-800 hover:border hover:border-zinc-700 cursor-pointer "> 🛍️ <span className="ms-2">Products</span></li>
                            <li onClick={() => handleLogout(navigate)} className="flex items-center p-2 text-gray-400 rounded-lg hover:bg-zinc-800 hover:border hover:border-zinc-700 cursor-pointer"> 🔒<span className="ms-2">Logout</span></li>
                        </ul>
                    </div>
                </div>
            </aside>
        </div>
    )
}

export default SideBar