import { createContext, useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode";
export const  AuthContext = createContext(false)

export default function AuthContextProvider({ children }) {
const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
const [userDate, setUserDate] = useState()
useEffect(() => {
    try {
        setUserDate(jwtDecode(localStorage.getItem("token")))
        setIsUserLoggedIn(true)
    } catch (error) {
        setIsUserLoggedIn(false)
        localStorage.removeItem("token")
    }
    window.addEventListener("storage", () => {
        try {
            jwtDecode(localStorage.getItem("token"))
            setIsUserLoggedIn(true)
        } catch (error) {
            setIsUserLoggedIn(false)
            localStorage.removeItem("token")
        }
    })
}, [])
return <AuthContext.Provider value={{isUserLoggedIn,userDate, setIsUserLoggedIn}}>
{children}
</AuthContext.Provider>


}
