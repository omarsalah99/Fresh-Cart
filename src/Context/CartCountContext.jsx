import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let  CartCountContext = createContext(0);

export default function CartCountContextProvider({ children }) {
    const [cartCount, setCartCount] = useState(0)


    async function getLoggedUserCart() {
        try {
        const {data} =await axios.get("https://ecommerce.routemisr.com/api/v1/cart",{
            headers:{
            token: localStorage.getItem("token")
            }
        })
        setCartCount(data.numOfCartItems);
        } catch (error) {
        console.log(error);
        }
        
    }


    useEffect(()=>{
        getLoggedUserCart()
    },[])



return <CartCountContext.Provider value={{cartCount ,setCartCount}}>
        {children}
    </CartCountContext.Provider>
}