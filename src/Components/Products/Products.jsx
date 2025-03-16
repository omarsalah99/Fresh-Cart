import axios from "axios";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { CartCountContext } from "../../Context/CartCountContext";

export default function Products({ product }) {
  const [isloading, setIsLoading] = useState(false);
  const { cartCount, setCartCount } = useContext(CartCountContext);

  async function addProductToCart() {
    setIsLoading(true);
    const { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      { productId: product._id },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    setIsLoading(false);
    if (data.numOfCartItems > cartCount) {
      setCartCount(data.numOfCartItems);
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

  return (
    <>
      <div className="m-3">
        <div className="p-3 group relative bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:rotate-2 hover:-translate-y-2">
          <Link to={`/productDetails/${product._id}/${product.category._id}`}>
            <img
              src={product.imageCover}
              alt=""
              className="w-full transition-all duration-500 group-hover:opacity-80"
            />
            <h5 className="font-light text-gray-500">{product.category.name}</h5>
            <h4 className="font-bold">
              {product.title.split(" ").splice(0, 2).join(" ")}
            </h4>
            <div className="flex justify-between">
              <h6 className="">{product.price}$</h6>
              <h6>
                <i className="fas fa-star text-yellow-400"></i>
                {product.ratingsAverage}
              </h6>
            </div>
          </Link>
          <button
            disabled={isloading}
            onClick={addProductToCart}
            className="mt-3 w-full text-center bg-cyan-500 rounded text-white p-2 transition-all duration-300 hover:bg-cyan-700 hover:scale-110 hover:-rotate-2"
          >
            {isloading ? (
              <i className="fa-solid fa-spinner fa-spin"></i>
            ) : (
              "Add to cart"
            )}
          </button>
        </div>
      </div>
    </>
  );
}
