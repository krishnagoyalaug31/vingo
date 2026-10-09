import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { serverUrl } from '../App.jsx' 
import { useDispatch, useSelector } from 'react-redux'
import { setItemsInMyCity, setShopInMyCity } from '../redux/userSlice.js'

function useGetItemsByCity() {
    const {currentCity}= useSelector(state=>state.user)
    const dispatch = useDispatch()
    useEffect(()=>{
        const fetchItems = async () => {
            
            try {
                if (!currentCity) return
                const result = await axios.get(`${serverUrl}/api/item/get-by-city/${currentCity}`,{withCredentials:true})
                dispatch(setItemsInMyCity(result.data))
                console.log(result.data)
            } catch (error) {
                 console.log("CURRENT USER ERROR:", error.response?.data)
            }
        }
        fetchItems()
    },[currentCity])
}

export default useGetItemsByCity
