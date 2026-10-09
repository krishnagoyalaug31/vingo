import axios from 'axios'
import { useEffect } from 'react'
import { serverUrl } from '../App'
import { useSelector } from 'react-redux'

function useUpdateLocation() {
    const { userData } = useSelector(state => state.user)

    useEffect(() => {
        if (!userData) return

        const updateLocation = async (lat, lon) => {
            try {
                const result = await axios.post(
                    `${serverUrl}/api/user/update-location`,
                    { lat, lon },
                    { withCredentials: true }
                )

                console.log("LOCATION UPDATED:", result.data)
            } catch (error) {
                console.log(
                    "LOCATION ERROR:",
                    error.response?.data || error.message
                )
            }
        }

        const watchId = navigator.geolocation.watchPosition(
            (pos) => {
                console.log(
                    "GPS:",
                    pos.coords.latitude,
                    pos.coords.longitude
                )

                updateLocation(
                    pos.coords.latitude,
                    pos.coords.longitude
                )
            },
            (error) => {
                console.log("GEOLOCATION ERROR:", error.message)
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        )

        return () => {
            navigator.geolocation.clearWatch(watchId)
        }
    }, [userData])

    return null
}

export default useUpdateLocation