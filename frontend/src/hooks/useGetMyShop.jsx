import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { serverUrl } from '../App' 
import { useDispatch, useSelector } from 'react-redux'
import { setmyShopData } from '../redux/ownerSlice.js'

function useGetMyShop() {
    const dispatch = useDispatch()
    const {userData}=useSelector(state=>state.user)
    useEffect(()=>{
        const fetchShop = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/shop/get-my`,{withCredentials:true})
               console.log("MY SHOP:", result.data)
                dispatch(setmyShopData(result.data))
            } catch (error) {
                 console.log("CURRENT USER ERROR:", error.response?.data)
            }
        }
        if(userData){
            fetchShop()
        }
    },[userData])
}

export default useGetMyShop
