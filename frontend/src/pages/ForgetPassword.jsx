import React, { useState } from 'react'
import axios from 'axios'
import { serverUrl } from '../App';
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
function ForgetPassword() {
    const [step,setStep]=useState(1)
    const [email,setEmail] =useState("")
    const [otp, setOtp]=useState("")
    const [newPassword , setNewPassword] =useState("")
    const [confirmPassword , setConfirmPassword] =useState("")
    const [error,setError]=useState("")
    const handleSendOtp = async ()=>{
      try {
        const result = await axios.post(`${serverUrl}/api/auth/send-otp`,{email},{withCredentials:true})
        console.log(result)
        setError("")
        setStep(2)
      } catch (error) {
        setError(error?.response?.data?.message)
      }
    }
    const handleVerifyOtp = async ()=>{
      try {
        const result = await axios.post(`${serverUrl}/api/auth/verify-otp`,{email,otp},{withCredentials:true})
        console.log(result)
        setError("")
        setStep(3)
      } catch (error) {
        setError(error?.response?.data?.message)
      }
    }
    const handleResetPasswordOtp = async ()=>{
      if(newPassword != confirmPassword){
        alert("Passwords do not match")
    return
      }
      try {
        const result = await axios.post(`${serverUrl}/api/auth/reset-password`,{email,newPassword,},{withCredentials:true})
        console.log(result)
        setError("")
        navigate("/signin")
      } catch (error) {
        setError(error?.response?.data?.message)
      }
    }
    const navigate = useNavigate()
  return (
    <div className='flex w-full items-center justify-center min-h-screen p-4 bg-[#fff9f6] '>
        <div className='bg-white rounded-xl shadow-lg w-full max-w-md p-8' >
        <div className="flex items-center gap-4">
            <IoChevronBack size={30 } className='text-[#ff4d2d] cursor-pointer mb-5' onClick={()=>navigate("/signin")} />
            <h1 className='text-[#ff4d2d] flex items-center text-2xl font-bold text-centre mb-6'>
                Forget Password
            </h1>
        </div>
        {step == 1
        &&
        <div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
    
              <input
                type="email" required
                className="w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none "
                placeholder="Enter your Email"  
                onChange={(e)=> setEmail(e.target.value)} value={email} required
              />
            </div>
            <button className={`w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white 
                hover:bg-[#e64323] cursor-pointer ` } onClick={handleSendOtp}  >Send OTP !</button>
                {error && <p className="text-red-500 text-center my-10">*{error}</p>}
        </div> }
        {step == 2
        &&
        <div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-1">
                OTP
              </label>
    
              <input
                type="number" required
                className="w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none "
                placeholder="Enter OTP"  
                onChange={(e)=> setOtp(e.target.value)} value={otp} required
              />
            </div>
            <button className={`w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white 
                hover:bg-[#e64323] cursor-pointer ` } onClick={handleVerifyOtp}  >Verify OTP !</button>
                {error && <p className="text-red-500 text-center my-10">*{error}</p>}
        </div> }
        {step == 3
        &&
        <div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-1">
                New Password
              </label>
    
              <input
                type="text" required
                className="w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none "
                placeholder="Enter New Password"  
                onChange={(e)=> setNewPassword(e.target.value)} value={newPassword}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-1">
                Confirm Password
              </label>
    
              <input
                type="text" required
                className="w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none "
                placeholder="Confirm Password"  
                onChange={(e)=> setConfirmPassword(e.target.value)} value={confirmPassword} required
              />
            </div>
            <button className={`w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white 
                hover:bg-[#e64323] cursor-pointer `} onClick={handleResetPasswordOtp} >Reset Password </button>
                {error && <p className="text-red-500 text-center my-10">*{error}</p>}
        </div> }
        </div>
    </div>
  )
}

export default ForgetPassword
