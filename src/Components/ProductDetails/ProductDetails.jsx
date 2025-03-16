import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Loading from "../Loading/Loading";
import RelatedProducts from "../RelatedProducts/RelatedProducts";
import { toast } from "react-toastify";
import { CartCountContext } from "../../Context/CartCountContext";
export default function ProductDetails() {


    const [productDetails, setProductDetails] = useState([])
    const [cartOpen, setCartOpen] = useState(false);
    const [isloading, setIsLoading] = useState(true)
    const [isloadingicon, setIsLoadingIcon] = useState(false)
    const [relatedProducts,setRelatedProducts] = useState([])
    const {id,categoryId} = useParams()
    const { cartCount , setCartCount } = useContext(CartCountContext)



    async function getProductDetails(productId) {
        setIsLoading(true)
        const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/products/" + productId)
        setIsLoading(false)
        setProductDetails(data.data)
    }
    async function getProductByCategoryId(categoryId) {
        const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/products?category[in]=" + categoryId)
        setRelatedProducts(data.data);
        
    }
    async function addProductToCart() {
        setIsLoadingIcon(true)
        const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/cart",{productId: id},{
        headers:{
            token: localStorage.getItem("token")
        }
        })
        setIsLoadingIcon(false)
        if(data.numOfCartItems > cartCount){
            setCartCount(data.numOfCartItems)
        }
        toast.success(data.message, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
    }



    useEffect(()=>{
        getProductDetails(id)
    },[id])
    useEffect(()=>{
        getProductByCategoryId(categoryId)
    },[])




if(isloading){
    return <Loading/>
}
return (
<>
    <div className="bg-white h-full">
        <div className={`${cartOpen ? 'translate-x-0 ease-out' : 'translate-x-full ease-in'} fixed right-0 top-0 max-w-xs w-full h-full px-6 py-4 transition duration-300 transform overflow-y-auto bg-white border-l-2 border-gray-300`}>
            <div className="flex items-center justify-between">
                <h3 className="text-2xl font-medium text-gray-700">Shop Car</h3>
                <button onClick={() => setCartOpen(!cartOpen)} className="text-gray-600 focus:outline-none">
                </button>
            </div>
            <hr className="my-3" />
            <div className="mt-8">
                <form className="flex items-center justify-center">
                    <input className="form-input w-48" type="text" placeholder="Added Deposite" />
                    <button className="ml-3 flex items-center px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                        <span>Done</span>
                    </button>
                </form>
            </div>
        </div>
        <main className="my-8">
            <div className="container mx-auto px-6">
                <div className="md:flex md:items-center">
                    <div className="w-full h-1/2 md:w-1/2 lg:h-full">
                        <img className="h-full w-full rounded-md object-cover max-w-lg mx-auto" src={productDetails.imageCover} alt={productDetails.title} />
                    </div>
                    <div className="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
                        <p className="font-font-semibold text-2xl mb-10">{productDetails.description}</p>
                        <h3 className="text-gray-700 uppercase text-2xl mb-10">{productDetails.title}</h3>
                        <span className="text-gray-500 mt-3 tesxt-xl">{productDetails.price}$</span>
                        <hr className="my-3" />
                        <div className="flex r mt-6">
                            <button disabled={isloadingicon} onClick={addProductToCart} className="w-10/12 py-3 me-1 bg-indigo-600 text-white text-sm  font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">{isloadingicon?<><i className="fa-solid fa-spinner fa-spin"></i></>:<>Add to cart</>}</button>
                            <button disabled={isloadingicon} onClick={addProductToCart} className="w-2/12 py-3 bg-indigo-600 text-white text-sm  font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"><i className="fa-solid fa-heart"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <RelatedProducts relatedProducts={relatedProducts}/>
    </div>
</>
)
}
