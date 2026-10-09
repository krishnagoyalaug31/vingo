
import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { serverUrl } from "../App";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase.js";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice.js";

function SignIn() {
   const primaryColor = "#ff4d2d";
  const borderColor = "#ddd";
  const bgColor = "#fff9f6";
  const hover="#e64323";
    const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
 
  const [email , setEmail ]=useState("")
  const [password , setPassword ]=useState("")
  const dispatch = useDispatch()
  const [error , setError]=useState("")
  const handleSignIn = async ()=>{
    try {
        const result = await axios.post(`${serverUrl}/api/auth/signin`,{
            email,password
        },{withCredentials:true})
        dispatch(setUserData(result.data))
        setError("")
    } catch (error) {
        setError(error?.response?.data?.message)
    }
  }
// hangle google authentication
  const handleGoogleAuth = async () => {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth,provider)
    try {
      const {data}= await axios.post(`${serverUrl}/api/auth/google-auth`,{
        email:result.user.email,
      },{withCredentials:true})
        dispatch(setUserData(data))
    } catch (error) {
      console.log(error)
    }
  }
    return (
        <div
          className="min-h-screen flex items-center justify-center p-4"
          style={{ backgroundColor: bgColor }}
        >
          <div
            className="bg-white rounded-xl shadow-lg w-full max-w-md p-8"
            style={{ border: `1px solid ${borderColor}` }}
          >
            <h1
              className="text-3xl text-center font-bold mb-2"
              style={{ color: primaryColor }}
            >
              Vingo
            </h1>
    
            <p className="text-gray-600 mb-8 text-center">
              Login in your account to get started with delicious food deliveries
            </p>
    
            
            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
    
              <input
                type="email" required
                className="  w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                placeholder="Enter your Email" style={{border:`1px solid ${borderColor}`} } 
                onChange={(e)=> setEmail(e.target.value)} value={email} 
              />
            </div>
    
           
            {/* Password */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Password
              </label>
    
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"} required
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                  placeholder="Enter your Password" style={{border:`1px solid ${borderColor}`} } 
                onChange={(e)=> setPassword(e.target.value)} value={password}
                />
    
                <button
                  type="button"
                  className="absolute cursor-pointer right-3 top-3 text-gray-500"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
              </div>
            </div>
            <div className=" cursor-pointer text-right mb-4 text-[#ff4d2d] font-medium " onClick={()=>{
              navigate("/forget-password")
            }} >
              Forget Password
            </div>
    
          {/* signup button */}
            <button className={`w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white 
                hover:bg-[#e64323] cursor-pointer `} onClick={handleSignIn} >signin</button>
              {error && <p className="text-red-500 text-center my-10">*{error}</p>}
            <button className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition
            duration-200 border-gray-400 hover:bg-gray-100 " onClick={handleGoogleAuth}  >
                <FcGoogle size={20} />
                <span> Sign In with Google</span>
            </button>
            <p className="text-center mt-6 " onClick={()=>navigate("/signup")} > Don't have an account ? | <span className="text-[#ff4d2d] cursor-pointer">Sign Up</span></p>
          </div>
        </div>
      );
}

export default SignIn;

