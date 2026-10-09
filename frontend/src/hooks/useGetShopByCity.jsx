import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { serverUrl } from '../App' 
import { useDispatch, useSelector } from 'react-redux'
import { setShopInMyCity } from '../redux/userSlice.js'

function useGetShopByCity() {
    const {currentCity}= useSelector(state=>state.user)
    const dispatch = useDispatch()
    useEffect(()=>{
        if (!currentCity) return
        const fetchShop = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/shop/get-by-city/${currentCity}`,{withCredentials:true})
                dispatch(setShopInMyCity(result.data))
                console.log(result.data)
            } catch (error) {
                 console.log("CURRENT USER ERROR:", error.response?.data)
            }
        }
        fetchShop()
    },[currentCity])
}

export default useGetShopByCity
