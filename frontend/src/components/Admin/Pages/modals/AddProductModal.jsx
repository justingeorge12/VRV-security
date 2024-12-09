import { useState } from "react";
import api from "../../../../service/api";

function AddProductModal({onClose}) {

    const [name, setName] = useState("");
    const [coins, setCoins] = useState("");
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({});

    const handleFileChange = (e) => {
        setImage(e.target.files[0]); 
      };

    const validateForm = () => {
        const newErrors = {};
    
        if (!name.trim()) {
            newErrors.name = "Product name is required.";
        }
        if (!coins) {
            newErrors.coins = "Coins are required.";
        } else if (coins <= 0) {
            newErrors.coins = "Coins must be greater than zero.";
        }
        if (!image) {
            newErrors.image = "Product image is required.";
        }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!validateForm()) {
          return; 
        }
    
        const formData = new FormData();
        formData.append("name", name);
        formData.append("coins", coins);
        formData.append("image", image);
    
        try {
          const res = await api.post("product/", formData);
    
            setName("");
            setCoins("");
            setImage(null);
            setErrors({});
            setSuccessMessage("Product added successfully!");
            console.log("API response:", res.data);
        } 
        catch (err) {
            console.error("API error:", err);
            setErrors({ api: "An error occurred while saving the product." });
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
                                    {errors.name && <p className="text-red-500 text-sm ">{errors.name}</p>}
                                    <label className="block text-sm font-medium text-gray-900">Product Name</label>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={`bg-neutral-400 shadow-lg w-full rounded-md p-2 my-4 mt-0 focus:outline-none placeholder:text-neutral-600 ${errors.name ? "border-red-500 border-2" : ""}`} />
                                </div>
                                
                                <div>
                                    {errors.coins && <p className="text-red-500 text-sm">{errors.coins}</p>}
                                    <label className="block text-sm font-medium text-gray-900">Coins</label>
                                    <input type="number" value={coins} onChange={(e) => setCoins(e.target.value)} className={`bg-neutral-400 shadow-lg w-full rounded-md p-2 my-4 mt-0 focus:outline-none placeholder:text-neutral-600 ${errors.coins ? "border-red-500 border-2" : "" }`}/>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-900">Image</label>
                                    <div className="mt-1 flex">
                                        <label htmlFor="fileUpload" className={`block px-4 py-2 border rounded-md cursor-pointer ${errors.image ? "border-red-500 border-2 text-red-500" : "text-slate-400"}`}>
                                            Upload Image
                                        </label>
                                        <input type="file" id="fileUpload" onChange={handleFileChange} className="hidden" />
                                    </div>
                                </div>
                                <button className="bg-gradient-to-r from-zinc-950 via-slate-800 to-stone-950 text-violet-100 text-lg font-semibold w-full pl-2 rounded-md p-2 my-4">Add Product</button>
                            </form>
                        </div>
                    </div>              
                </div>
            </div>
        </div>
    )
}

export default AddProductModal