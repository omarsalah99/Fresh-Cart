import axios from "axios"
import { useQuery } from "react-query"
import Loading from "../Loading/Loading";
import Products from "../Products/Products";
import { Helmet } from "react-helmet"


export default function Product() {


function grtProduct(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/products")
}
let {data,isLoading} = useQuery("product", grtProduct)
console.log(data?.data.data);


return (
<>
<Helmet>
<title>Fresh Cart - Product</title>
</Helmet>
{isLoading ? <Loading /> :
    <>
    <div className="mt-0 grid xl:grid-cols-6 md:grid-cols-4 sm:grid-cols-2">
        {data?.data.data.map((product , index) =>{
        return <Products key={index} product={product} />
        }
        )}
    </div>
    </>
}
</>
)
}
