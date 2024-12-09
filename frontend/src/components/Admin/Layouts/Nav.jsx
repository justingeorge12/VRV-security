import { useNavigate } from "react-router-dom"

function Nav() {

    const navigate = useNavigate()

    return(
        <div className="h-24 fixed top-0 left-0 right-0 backdrop-blur-sm">
            <div className="flex justify-center items-center h-full">
                <div className="w-full max-w-4xl mx-auto px-4 py-3 rounded-xl bg-slate-950 shadow-sm shadow-slate-600">
                    <div className="flex justify-between">
                        <div>
                            <h1 className="bg-gradient-to-bl from-transparent via-slate-900 to-transparent p-2 rounded-lg text-lg text-slate-300 font-semibold">VRV</h1>
                        </div>
                        <div>
                            <button onClick={() => navigate('/admin/users')} className="p-2">Activities »</button>
                            <button className="p-2">Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Nav