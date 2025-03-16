import axios from "axios"
import { useContext, useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import CartProduct from "../CartProduct/CartProduct";
import { CartCountContext } from "../../Context/CartCountContext";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet"

export default function Cart() {
const [cartData, setCartData] = useState(undefined)
const [isloading, setIsLoading] = useState(true)
const { setCartCount } = useContext(CartCountContext)

  async function getLoggedUserCart() {
    setIsLoading(true)
    try {
      const {data} =await axios.get("https://ecommerce.routemisr.com/api/v1/cart",{
        headers:{
          token: localStorage.getItem("token")
        }
      }) 
      setCartData(data)
      setCartCount(data.numOfCartItems)
     } catch (error) {
      setCartCount(0)
    }
    setIsLoading(false)
  }
  async function removeCartItem(productId) {
    let cartDataCopy = JSON.parse(JSON.stringify(cartData))
    let newProducts =cartDataCopy.data.products.filter((product)=>{
      return product.product._id != productId
    }) ;
    cartDataCopy.data.products = newProducts;
    setCartCount(cartDataCopy.data.products.length)
    setCartData(cartDataCopy);
    const {data} = await axios.delete(" /" + productId ,{
      headers:{
        token: localStorage.getItem("token")
      }
    }) ;
    setCartData(data); 
  }
  async function clearCart() {
    setCartCount(0)
    setIsLoading(true)
    const {data} = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart" ,{
      headers:{
        token: localStorage.getItem("token")
      }
    }) 
    setCartData(undefined)
    setIsLoading(false)
  }
  async function updateProductCount(productId , productCount) {
    if(productCount == 0){
      removeCartItem(productId)
    }else{
      const {data} = await axios.put("https://ecommerce.routemisr.com/api/v1/cart/" + productId ,{count:productCount},{
        headers:{
          token: localStorage.getItem("token")
        }
      })
      setCartData(data)
    }
  }
  useEffect(()=>{
    getLoggedUserCart()
  },[])
return (
  <>
<Helmet>
<title>Fresh Cart - Cart</title>
</Helmet>

    <div className="">
      {cartData?.data.products.length > 0 && <button onClick={clearCart} className="ms-auto block mb-8 py-1 px-3 text-red-600 border-red-600  hover:bg-red-600 hover:text-white border rounded">Clear All</button>}
      {isloading && <Loading />}
      {!isloading && <>
      {cartData?.data.products.map((product,index)=>{return  <CartProduct key={index} product={product} updateProductCount={updateProductCount} removeCartItem={removeCartItem} />})}
      {cartData?.data.products.length > 0 &&
        <div className="flex justify-between items-center mt-5">
        <Link to={'/address/'+cartData?.data._id} className="bg-green-500 text-white py-3 px-6 mt-2 hover:bg-green-700 rounded">Check Out</Link>
        <h2>Your Total price is:{cartData?.data.totalCartPrice}EGP</h2>
        </div>}
      </>}
    </div>
    {!isloading && (cartData == undefined || cartData.data.products.length == 0) && <><h1 className="font-semibold text-center my-20">Yor Cart Is Empty </h1></>}
  </>
)
}