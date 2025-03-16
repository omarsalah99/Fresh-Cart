import axios from "axios";
import { useFormik } from "formik"
import {  useState } from "react";
import {  useParams } from "react-router-dom";
import * as Yup from "yup"

export default function Address() {
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const {cartId} = useParams( )

    async function Checkout(address) {
        const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,{
        "shippingAddress":address
        },{
        params: {
            url:"http://localhost:5173"
        },
        headers:{
            token: localStorage.getItem("token")
        }
        })
        setIsLoading(false)
        open(data.session.url, '_self')
        
        
    }
    function register() {
        setIsLoading(true)
        setErrorMessage("") 
        Checkout(formik.values);
        }
    
    const validationSchema = Yup.object({
        detials: Yup.string().required("Detials is Required").min(3, "Must be 3 characters or more").max(40, "Must be 20 characters or less"),
        phone: Yup.string().required("Phone is Required").matches(/^(?:\+20|0)?1[0125]\d{8}$/,"must be a valid phone number"),
        city: Yup.string().required("City is Required")
    })


    const formik = useFormik({
    initialValues: {
        "detials": '',
        "phone": '',
        "city": '',
    },
    onSubmit: register,
    validationSchema : validationSchema
    })


    


return (
    <>  
        <div className="bg-slate-100 p-5 rounded-md">
            <form onSubmit={formik.handleSubmit}> 
                <div className="mb-6">
                    <label htmlFor="detials" className="block mb-2 text-sm font-medium text-gray-900">Detials</label>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.detials} name="detials" type="text" id="detials" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="detials"  />
                    {formik.errors.detials && formik.touched.detials && (<p className="text-red-500 p-1 my-1 text-sm rounded-md ">{formik.errors.detials}</p>)}
                </div>
                <div className="mb-6">
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Phone number</label>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} name="phone" type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="123-45-678"   />
                    {formik.errors.phone && formik.touched.phone && (<p className="text-red-500 p-1 my-1 text-sm rounded-md ">{formik.errors.phone}</p>)}
                </div>
                <div className="mb-6">
                    <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900">City</label>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.city} name="city" type="city" id="city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Cairo"  />
                    {formik.errors.city && formik.touched.city && (<p className="text-red-500 p-1 my-1 text-sm rounded-md ">{formik.errors.city}</p>)}
                </div> 
                {errorMessage && <div className="mb-4"><p className="text-red-500 p-1 my-1 text-sm rounded-md ">{errorMessage}</p></div>}
                <button disabled={isLoading} type="submit" className="text-white ms-auto block  bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    {isLoading?<i className="fa-solid fa-spinner fa-spin mx-4"></i>:<span>أدفع هنا</span>}</button>
            </form>
        </div>
    </>
)
}
