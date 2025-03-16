import axios from "axios";
import { useEffect, useState } from "react";
export function useFetch(){
    const [data, setData] = useState();
    useEffect(()=>{
        (async function () {
            const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
            setData(data.data);            
        })();
    },[])
    return data;
}