import Layout from "../Layouts/LayoutNavBar"
import Nav from "../Layouts/Nav"
import lockimage from '../../../assets/images/lock-hand.png'
import LayoutNavBar from "../Layouts/LayoutNavBar"
import { useNavigate } from "react-router-dom"

function AdminDashbord() {

    const navigate = useNavigate()

    return(
        <div>
            <LayoutNavBar>
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-">
                        <div className="text-6xl flex items-center font-semibold text-slate-400">
                        <p className="text-center">
                            Powering our Growth with Unbreakable <span className="sm:text-7xl font-bold text-transparent bg-gradient-to-br from-slate-300  via-blue-800  to-slate-500  bg-clip-text ">Security</span>
                        </p>
                            
                        </div>
                        <div className="flex justify-center items-center mt-10">
                            <img src={lockimage} alt="lockimage" className="h-96" />
                        </div>
                    </div>

                    <div className="border-y border-slate-700 p-10 my-10">
                        <div className="flex overflow-hidden space-x-16 group">

                            <div className="flex space-x-16 animate-loop-scroll group-hover:paused cursor-pointer">

                                <div onClick={() => navigate('/admin/users')} className="w-60 p-2 border border-slate-700 rounded-md ">
                                    <h2 className="text-lg flex justify-center font-bold">Users</h2>
                                    <div >
                                        <h1 className="text-center font-mono text-cyan-600">Users, the heart of every interaction </h1>
                                        <p className="text-center font-mono text-fuchsia-950"> Manage wisely, connect meaningfully, and build a thriving platform</p>
                                    </div>
                                </div>

                                <div onClick={() => navigate('/admin/roles')} className="w-60 p-2 border border-slate-700 rounded-md">
                                    <h2 className="text-lg flex justify-center font-bold">Role</h2>
                                    <div >
                                        <h1 className="text-center font-mono text-cyan-600">Defining roles, shaping responsibilities, and maintaining balance</h1>
                                        <p className="text-center font-mono text-fuchsia-950"> user roles are the foundation of a secure and organized community</p>
                                    </div>
                                </div>
                                
                                <div onClick={() => navigate('/admin/products')} className="w-60 p-2 border border-slate-700 rounded-md ">
                                    <h2 className="text-lg flex justify-center font-bold">Products</h2>
                                    <div >
                                        <h1 className="text-center font-mono text-cyan-600">Managing products, ensuring quality, and driving growth</h1>
                                        <p className="text-center font-mono text-fuchsia-950">  products are the cornerstone of a seamless user experience.</p>
                                    </div>
                                </div>
                            </div>


                            <div className="flex space-x-16 animate-loop-scroll group-hover:paused cursor-pointer" aria-hidden='true'>

                            <div onClick={() => navigate('/admin/users')} className="w-60 p-2 border border-slate-700 rounded-md ">
                                    <h2 className="text-lg flex justify-center font-bold">Users</h2>
                                    <div >
                                        <h1 className="text-center font-mono text-cyan-600">Users, the heart of every interaction </h1>
                                        <p className="text-center font-mono text-fuchsia-950"> Manage wisely, connect meaningfully, and build a thriving platform</p>
                                    </div>
                                </div>

                                <div onClick={() => navigate('/admin/roles')} className="w-60 p-2 border border-slate-700 rounded-md">
                                    <h2 className="text-lg flex justify-center font-bold">Role</h2>
                                    <div >
                                        <h1 className="text-center font-mono text-cyan-600">Defining roles, shaping responsibilities, and maintaining balance</h1>
                                        <p className="text-center font-mono text-fuchsia-950"> user roles are the foundation of a secure and organized community</p>
                                    </div>
                                </div>
                                
                                <div onClick={() => navigate('/admin/products')} className="w-60 p-2 border border-slate-700 rounded-md ">
                                    <h2 className="text-lg flex justify-center font-bold">Products</h2>
                                    <div >
                                        <h1 className="text-center font-mono text-cyan-600">Managing products, ensuring quality, and driving growth</h1>
                                        <p className="text-center font-mono text-fuchsia-950">  products are the cornerstone of a seamless user experience.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </LayoutNavBar>
        </div>
    )
}

export default AdminDashbord