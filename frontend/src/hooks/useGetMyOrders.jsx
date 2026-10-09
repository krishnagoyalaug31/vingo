import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { serverUrl } from '../App' 
import { useDispatch, useSelector } from 'react-redux'
import { setMyOrders } from '../redux/userSlice.js'

function useGetMyOrders() {
    const dispatch = useDispatch()
    const {userData}=useSelector(state=>state.user)
    useEffect(()=>{
        const fetchOrders = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/order/my-orders`,{withCredentials:true})
                dispatch(setMyOrders(result.data))
                console.log(result.data)
            } catch (error) {
                 console.log("CURRENT USER ERROR:", error.response?.data)
            }
        }
        fetchOrders()
    },[userData?._id, dispatch])
}

export default useGetMyOrders
