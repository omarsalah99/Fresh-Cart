/* eslint-disable react/prop-types */
import { useState } from "react";

export default function CartProduct({
  product,
  updateProductCount,
  removeCartItem,
}) {
  const [count, setCount] = useState(product.count);
  return (
    <div className="flex  p-5 shadow justify-between">
      <div className="flex items-center">
        <img src={product.product.imageCover} className="w-32" alt="" />
        <div className="">
          <div className="font-semibold">{product.product.title}</div>
          <div className="text-cyan-800 text-xl">
            {product.product.category.name}
          </div>
          <div className="text-cyan-800 text-xl">{product.price}EGP</div>
          <div className="text-cyan-800">
            {product.product.ratingsAverage}{" "}
            <i className="fa-solid fa-star text-yellow-500"></i>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <button
          onClick={() => removeCartItem(product.product._id)}
          className="text-red-600 p-2 border rounded hover:bg-red-600 hover:text-white"
        >
          Remove <i className="fa-solid fa-trash "></i>
        </button>
        <div className="">
          <button
            onClick={() => {
              updateProductCount(product.product._id, product.count - 1);
              setCount(product.count - 1);
            }}
            className="p-2 mx-2 border rounded-lg hover:bg-red-600 hover:text-white"
          >
            -
          </button>
          <button>{count}</button>
          <button
            onClick={() => {
              updateProductCount(product.product._id, product.count + 1);
              setCount(product.count + 1);
            }}
            className="p-2 mx-2 border rounded-lg hover:bg-green-600 hover:text-white"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
