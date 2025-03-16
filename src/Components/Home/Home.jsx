import Products from "../Products/Products";
import Loading from "../Loading/Loading";
import CategorySlider from "../CategorySlider/CategorySlider";
import { Helmet } from "react-helmet"
import { useFetch } from "../../Hooks/UesFetch";
export default function Home() {
const products = useFetch("https://ecommerce.routemisr.com/api/v1/products")
return (
  <>
    <Helmet>
    <title>Fresh Cart - Home</title>
    </Helmet>
    {products?.length == 0 ? <Loading /> :
      <>
        <CategorySlider  />
        <div className="mt-0 grid xl:grid-cols-6 md:grid-cols-4 sm:grid-cols-2">
          {products?.map((product , index) =>{return <Products key={index} product={product} />})}
        </div>
      </>
    }
  </>
)}
