import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Helmet } from "react-helmet";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is Required").min(3, "Must be 3 characters or more").max(40, "Must be 20 characters or less"),
    email: Yup.string().required("Email is Required").matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Must be a valid email"),
    phone: Yup.string().required("Phone is Required").matches(/^(?:\+20|0)?1[0125]\d{8}$/, "must be a valid phone number"),
    password: Yup.string().required("Password is Required").min(8, "Must be 8 characters or more"),
    confirm_password: Yup.string().required("Confirm Password is Required").oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirm_password: '',
      checkBox: false,
    },
    onSubmit: register,
    validationSchema,
  });

  function register() {
    setIsLoading(true);
    setErrorMessage("");
    axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", formik.values).then(() => {
      setIsLoading(false);
      navigate("/login");
    }).catch((err) => {
      setErrorMessage(err.response.data.message);
      setIsLoading(false);
    });
  }

  return (
    <>
      <Helmet>
        <title>Fresh Cart - Register</title>
      </Helmet>
      <div className="bg-slate-100 p-5 rounded-md">
        <h1 className="text-2xl mb-7">Register Now</h1>
        <form onSubmit={formik.handleSubmit}> 
          <div className="mb-6">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} name="name" type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="John" />
            {formik.errors.name && formik.touched.name && (<p className="text-red-500 p-1 my-1 text-sm rounded-md">{formik.errors.name}</p>)}
          </div>

          <div className="mb-6">
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Phone number</label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} name="phone" type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="123-45-678" />
            {formik.errors.phone && formik.touched.phone && (<p className="text-red-500 p-1 my-1 text-sm rounded-md">{formik.errors.phone}</p>)}
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email address</label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} name="email" type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="john.doe@company.com" />
            {formik.errors.email && formik.touched.email && (<p className="text-red-500 p-1 my-1 text-sm rounded-md">{formik.errors.email}</p>)}
          </div>

          <div className="mb-6 relative">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} name="password" type={showPassword ? "text" : "password"} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="•••••••••" />
            <i onClick={() => setShowPassword(!showPassword)} className={`absolute right-3 top-11 cursor-pointer fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            {formik.errors.password && formik.touched.password && (<p className="text-red-500 p-1 my-1 text-sm rounded-md">{formik.errors.password}</p>)}
          </div>

          <div className="mb-6 relative">
            <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900">Confirm password</label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.confirm_password} name="confirm_password" type={showConfirmPassword ? "text" : "password"} id="confirm_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="•••••••••" />
            <i onClick={() => setShowConfirmPassword(!showConfirmPassword)} className={`absolute right-3 top-11 cursor-pointer fa ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            {formik.errors.confirm_password && formik.touched.confirm_password && (<p className="text-red-500 p-1 my-1 text-sm rounded-md">{formik.errors.confirm_password}</p>)}
          </div>

          <button disabled={isLoading} type="submit" className="text-white ms-auto block bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
            {isLoading ? <i className="fa-solid fa-spinner fa-spin mx-4"></i> : <span>Submit</span>}
          </button>
        </form>
      </div>
    </>
  );
}
