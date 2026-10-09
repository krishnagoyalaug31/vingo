import React, { useState } from 'react'
import { IoMdArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoIosRestaurant } from "react-icons/io";
import axios from 'axios';
import { serverUrl } from '../App';
import { setmyShopData } from '../redux/ownerSlice.js';

function AddItem() {
    const navigate = useNavigate()
    const {myShopData}= useSelector(state=>state.owner)
    const {currentCity,currentState , currentAddress }= useSelector(state=>state.user)
    const [name,setName]=useState("")
    const [price,setPrice] = useState(0)
    const [frontendImage, setFrontendImage] = useState(null)
    const [backendImage, setBackendImage] = useState( null)
    const dispatch =useDispatch()
    const [category,setCategory]= useState("")
    const [foodType,setFoodType]=useState("")
    const categories=["Snacks","Main Course","Desserts","Pizza","Burgers","Sandwiches","South Indian","North Indian","Chineese","Fast Food","Others"]
    const handleImage =(e)=>{
        const file = e.target.files[0]
        setBackendImage(file)
        setFrontendImage(URL.createObjectURL(file))
    }
    const handleSubmit=async (e)=>{
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append("name",name)
            formData.append("price",price)
            formData.append("category",category)
            formData.append("foodType",foodType)
           
            if(backendImage){
                formData.append("image",backendImage)
            }
            const result=await axios.post(`${serverUrl}/api/item/add-item`,formData,{withCredentials:true})
            dispatch(setmyShopData(result.data))
            navigate("/")
            console.log(result)

        } catch (error) {
               console.log("🔥 ADD ITEM ERROR:", error);
        }
    }
  return (

    <div className="flex justify-center flex-col items-center p-6 bg-gradient-to-br from-orange-50 to-white min-h-screen ">
        <div className="absolute top-[20px] left-[20px] z-[10px] mb-[10px] " onClick={()=>navigate("/")} >
            <IoMdArrowBack size={26} className='text-[#ff4d2d] w-10 h-16 ' />
        </div>
        <div className="max-w-lg w-full bg-white shadow-xl rounded-2xl p-8 border border-orange-100 ">
            <div className="flex flex-col items-center mb-6  ">
                <div className="bg-orange-100 p-4 rounded-full mb-4 ">
                    <IoIosRestaurant className='text-[#ff4d2d] w-16 h-16 ' />
                </div>
                <div className="text-3xl font-extrabold text-gray-900">
                    Add Food
                </div>
            </div>
            <form  className="" onSubmit={handleSubmit}>
                <div className=" py-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1 ">Food Name</label>
                    <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder='Enter food Name' className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400/20 " />
                </div>
                <div className="py-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Food Image</label>
                    <input onChange={handleImage} type="file" accept='image/*' className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400/20 " />
                    {frontendImage && <div className="mt-4">
                        <img src={frontendImage} alt="" className="w-full h-48 object-cover rounded-lg border " />
                    </div> }
                </div>
                <div className=" py-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1 ">Price</label>
                    <input onChange={(e)=>setPrice(e.target.value)} value={price} type="number" placeholder='0' className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400/20 " />
                </div>
                
                <div className=" py-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1 ">Select Category</label>
                    <select onChange={(e)=>setCategory(e.target.value)}  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400/20 " value={category}>
                        <option value="" > Select Category</option>
                        {categories.map((cate,index)=>(
                            <option value={cate} key={index} >{cate}</option>
                        ))}
                    </select>
                </div>
                <div className=" py-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1 ">Select Food Type</label>
                    <select onChange={(e)=>setFoodType(e.target.value)}  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400/20 " value={foodType}>
                        <option value="Select FoodType" > Select FoodType </option>
                        <option value="veg" > Veg</option>
                        <option value="non-veg" > Non-Veg</option>
                        
                    </select>
                </div>
                <div className="py-1">
                    <button onClick={()=>navigate("/home")} className="w-full  bg-[#ff4d2d] text-white px-6 py-3 rounded-lg font-semibold shodow-md hover:bg-orange-500 hover-shadow-lg transition-all duration-200 cursor-pointer ">Save</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default AddItem
