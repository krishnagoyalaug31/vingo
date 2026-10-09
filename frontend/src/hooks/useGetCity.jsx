import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { serverUrl } from '../App' 
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentAddress, setCurrentCity, setCurrentState, setUserData } from '../redux/userSlice.js'
import { setAddress, setLocation } from '../redux/mapSlice.js'

function useGetCity() {
    const dispatch = useDispatch()
    const {userData}= useSelector(state=>state.user)
    const apiKey = import.meta.env.VITE_GEOAPIFY_APIKEY
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(async (position) => {
            const latitude =position.coords.latitude;
            const longitude = position.coords.longitude
            dispatch(setLocation({lat:latitude,lon:longitude}))
            const result = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${apiKey}`)
            console.log("City:", result.data.features[0].properties.city);
            dispatch(setCurrentCity(result?.data.features[0].properties.city))
            dispatch(setCurrentState(result?.data.features[0].properties.state))
            dispatch(setCurrentAddress(result?.data.features[0].properties.address_line2))
            console.log(result.data.features[0])
            dispatch(setAddress(result?.data.features[0].properties.address_line2))
        })
    },[userData])
}

export default useGetCity
