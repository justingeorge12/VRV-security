import { useEffect, useState } from "react";
import LayoutSideBar from "../Layouts/LayoutSideBar"
import AddProductModal from "./modals/AddProductModal";
import api from "../../../service/api";

function ManageProducts() {
    
    const [previous, setPrevious] = useState(null);
    const [next, setNext] = useState(null);
    const [products, setProducts] = useState([])
    const [openAddProduct, setOpenAddProduct] = useState(false)

    const fetchProducts = async () => {

        try{
            const res = await api.get('product')
            if (res.status === 200) {
                setProducts(res.data.results)
            }
            console.log(res)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return(
        <div>
            <LayoutSideBar>
                <div>
                <div className="mt-4 justify-center flex">
                    <h1 className="font-bold text-xl md:text-2xl font-mono text-rose-200">PRODUCTS</h1>        
                </div> 
                <div className="justify-end flex">
                    <div className="absolute mr-4 sm:mr-8 md:mr-8 lg:mr-16">
                        <button onClick={() =>  setOpenAddProduct(true)} className=" rounded-md p-2 border border-x-orange-400 border-r-green-300 border-t-yellow-300 border-lime-300">Add Product</button>
                    </div>
                </div>


                <div className='my-4 mt-6 border border-slate-900'>
                    <div className='mx-4 sm:mx-8 lg:mx-16'>
                        {/* pagination  */}
                        <div className="gap-4 flex  ">
                            <div>
                                {previous && 
                                    <button onClick={() => fetchProducts(previous)} className="text-3xl">«</button>}
                            </div>
                            <div>
                                {next && 
                                    <button onClick={() => fetchProducts(next)} className="text-3xl">»</button>}
                            </div>
                        </div>
                        <div className='border border-slate-700 mt-6 rounded-lg relative overflow-x-auto custom-scrollbar'>
                            <table className="w-full text-sm text-left rtl:text-right">
                                <thead className="text-sm uppercase border-b border-slate-500">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Product ID</th>
                                        <th scope="col" className="px-6 py-3">Product Name</th>
                                        <th scope="col" className="px-6 py-3">Coins</th>
                                        <th scope="col" className="px-6 py-3">Image</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.length > 0 ? (
                                        products.map((data, index) => (
                                            <tr key={index} className="border-b border-slate-700">
                                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap" >{data.id}</th>
                                                <td className="px-6 py-4">{data.name}</td>
                                                <td className="px-6 py-4">{data.coins}</td>
                                                <td> <img src={data.image} alt="" className="h-20 px-6 py-4" /> </td>

                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="text-center py-4">
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
            {openAddProduct &&
                <AddProductModal onClose={() => setOpenAddProduct(false)} fetchProducts={fetchProducts} />}
        </div>
    )
}

export default ManageProducts