import { Helmet } from "react-helmet"
import Loading from "../Loading/Loading"
import Products from "../Products/Products"
import { useFetch } from "../../Hooks/UesFetch"
export default function Brands() {
const products = useFetch("https://ecommerce.routemisr.com/api/v1/brands")
return (
  <>
    <Helmet>
    <title>Fresh Cart - Home</title>
    </Helmet>
    {products?.length == 0 ? <Loading /> :
      <>
      <div className="mt-0 grid xl:grid-cols-6 md:grid-cols-4 sm:grid-cols-2">
        {products?.map((product , index) =>{return <Products key={index} product={product} />})}
      </div>
      </>
    }
  </>
)}
