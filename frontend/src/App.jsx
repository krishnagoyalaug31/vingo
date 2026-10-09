import React from 'react'
import {Routes , Route, Navigate} from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import ForgetPassword from './pages/ForgetPassword.jsx'
import useGetCurrentUser from './hooks/useGetCurrentUser.jsx'
import { useDispatch, useSelector } from 'react-redux'
import HomePage from './pages/HomePage.jsx'
import useGetCity from './hooks/useGetCity.jsx'
import useGetMyShop from './hooks/useGetMyShop.jsx'
import CreateEditShop from './pages/CreateEditShop.jsx'
import AddItems from './pages/AddItems.jsx'
import EditItem from './pages/EditItem.jsx'
import useGetShopByCity from './hooks/useGetShopByCity.jsx'
import useGetItemsByCity from './hooks/useGetItemsByCity.jsx'
import CartPage from './pages/CartPage.jsx'
import CheckOut from './pages/CheckOut.jsx'
import OrderPlaced from './pages/OrderPlaced.jsx'
import MyOrders from './pages/MyOrders.jsx'
import useGetMyOrders from './hooks/useGetMyOrders.jsx'
import useUpdateLocation from './hooks/useUpadteLocation.jsx'
import TrackOrderPage from './components/TrackOrderPage.jsx'
import Shop from './pages/Shop.jsx'

import { setSocket } from './redux/userSlice.js'
import { useEffect } from 'react'
import { io } from 'socket.io-client'
export const serverUrl ='https://vingo-backend-zdbp.onrender.com'
function App() {
  const dispatch = useDispatch()
  useGetCurrentUser()
  useUpdateLocation()
  useGetCity()
  useGetMyShop()
  useGetShopByCity()
  useGetItemsByCity()
  useGetMyOrders()
  const {userData}= useSelector(state=>state.user)
  useEffect(()=>{
    const socketInstance = io(serverUrl,{WithCredentials:true})
    dispatch(setSocket(socketInstance))
    socketInstance.on('connect',( )=>{
   if(userData){
    socketInstance.emit('identity',{userId:userData._id})
   }
  })
  return ()=>{
    socketInstance.disconnect()
  }
  },[userData?._id])
  return (
    <Routes>
      <Route path="/" element={ !userData?<SignUp/>:<Navigate to={"/home"} />} />
      <Route path="/signup" element={ !userData?<SignUp/>:<Navigate to={"/home"} />} />
      <Route path="/signin" element={ !userData?<SignIn/>:<Navigate to={"/home"} />} />
      <Route path="/forget-password" element={!userData? <ForgetPassword/>:<Navigate to={"/home"} />} />
      <Route path="/home" element={ userData?<HomePage/>: <Navigate to={"/signin"}/>} />
      <Route path="/create-edit-shop" element={ userData?<CreateEditShop/>: <Navigate to={"/signin"}/>} />
      <Route path="/add-item" element={ userData?<AddItems/>: <Navigate to={"/signin"}/>} />
      <Route path="/edit-item/:itemId" element={ userData?<EditItem/>: <Navigate to={"/signin"}/>} />
      <Route path="/cart" element={ userData?<CartPage/>: <Navigate to={"/signin"}/>} />
      <Route path="/checkout" element={ userData?<CheckOut/>: <Navigate to={"/signin"}/>} />
      <Route path="/order-placed" element={ userData?<OrderPlaced/>: <Navigate to={"/signin"}/>} />
      <Route path="/my-orders" element={ userData?<MyOrders/>: <Navigate to={"/signin"}/>} />
      <Route path="/track-order/:orderId" element={ userData?<TrackOrderPage/>: <Navigate to={"/signin"}/>} />
      <Route path="/shop/:shopId" element={ userData?<Shop/>: <Navigate to={"/signin"}/>} />
    </Routes>
  )
}

export default App
