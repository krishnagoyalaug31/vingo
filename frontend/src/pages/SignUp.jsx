
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
function SignUp() {
  const primaryColor = "#ff4d2d";
  const borderColor = "#ddd";
  const bgColor = "#fff9f6";
  const hover="#e64323";
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");
  const [fullName , setFullName ]=useState("")
  const [email , setEmail ]=useState("")
  const [password , setPassword ]=useState("")
  const [mobile , setMobile ]=useState("")
  const [error , setError]=useState("")
  const dispatch =useDispatch()
  //handleSignup 
  const handleSignUp = async ()=>{
    try {
        const result = await axios.post(`${serverUrl}/api/auth/signup`,{
            fullName , email,password,mobile,role
        },{withCredentials:true})
          dispatch(setUserData(result.data))
        setError("")
    } catch (error) {
        setError(error?.response?.data?.message)
    }
  }
// handle google authentication 
  const handleGoogleAuth = async () => {
    if(!mobile){
      return setError("Mobile No. required")
    }
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth,provider)
    try {
      const {data}= await axios.post(`${serverUrl}/api/auth/google-auth`,{
        fullName:result.user.displayName,
        email:result.user.email,
        mobile,role},{withCredentials:true})
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
              Create your account to get started with delicious food deliveries
            </p>
    
            {/* Full Name */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Full Name
              </label>
    
              <input
                type="text" 
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                placeholder="Enter your Full Name" style={{border:`1px solid ${borderColor}`} } 
                onChange={(e)=> setFullName(e.target.value)} value={fullName} required
              />
            </div>
    
            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
    
              <input
                type="email" required
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                placeholder="Enter your Email" style={{border:`1px solid ${borderColor}`} } 
                onChange={(e)=> setEmail(e.target.value)} value={email} required
              />
            </div>
    
            {/* Mobile */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Mobile No.
              </label>
    
              <input
                type="tel" required
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                placeholder="Enter your Mobile Number" style={{border:`1px solid ${borderColor}`} } 
                onChange={(e)=> setMobile(e.target.value)} value={mobile} required
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
                onChange={(e)=> setPassword(e.target.value)} value={password} required
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
    
            {/* Role */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Role
              </label>
    
              <div className="flex gap-2">
                {["user", "owner", "deliveryBoy"].map((r) => (
                  <button
                    key={r}
                    type="button"
                    className="flex-1 border rounded-lg px-3 py-2 text-center font-medium transition-colors cursor-pointer"
                    onClick={() => setRole(r)}
                    style={
                      role === r
                        ? {
                            backgroundColor: primaryColor,
                            color: "white",
                          }
                        : {
                            border: `1px solid ${primaryColor}`,
                            color: primaryColor,
                          }
                    }
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
            {/* signup button */}
            <button className={`w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white 
                hover:bg-[#e64323] cursor-pointer `} onClick={handleSignUp} >signup</button>
              {error && <p className="text-red-500 text-center my-10">*{error}</p>}
            <button className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition
            duration-200 border-gray-400 hover:bg-gray-100 " onClick={handleGoogleAuth}  >
                <FcGoogle size={20} />
                <span> Sign up with Google</span>
            </button>
            <p className="text-center mt-6 " onClick={()=>navigate("/signin")} > Already have an account ? | <span className="text-[#ff4d2d] cursor-pointer">Sign In</span></p>
          </div>
        </div>
      );
}

export default SignUp;

