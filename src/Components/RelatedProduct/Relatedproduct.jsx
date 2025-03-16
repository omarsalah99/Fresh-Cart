import { Link } from "react-router-dom";

export default function Relatedproduct({product}) {
return (
    <>
            <div className="px-4">
                <div className="relative">
                    <div className="relative h-72 w-full overflow-hidden rounded-lg">
                        <img
                        src={product.imageCover}
                        alt={product.title}
                        className="h-full w-full object-cover object-center max-w-lg mx-auto"
                        />
                    </div>
                    <Link to={"/productDetails/"+product._id+"/"+product.category._id}>
                        <div className="relative mt-4">
                            <h3 className="text-sm font-medium text-gray-900">{product.title}</h3>
                        </div>
                    </Link>
                    <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-1g p-4">
                        <div
                            aria-hidden="true"
                            className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                        />
                        <p className="relative text-lg font-semibold text-white">{product.price}</p>
                    </div>
                </div>
                <div className="mt-6 ">
                    <span
                        className="relative flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-2 text-sm text-white"
                    >
                        Add to bag <span className="sr-only">, {product.name}</span>
                    </span>
                </div>
            </div>
    </>
)
}
