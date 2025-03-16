import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { AuthContext } from "../../Context/AuthContext";
import { Helmet } from "react-helmet";

export default function Login() {
  const { setIsUserLoggedIn } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // للتحكم في رؤية كلمة المرور
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is Required")
      .matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Must be a valid email"
      ),
    password: Yup.string()
      .required("Password is Required")
      .min(8, "Must be 8 characters or more"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: register,
    validationSchema: validationSchema,
  });
  function register() {
    setIsLoading(true);
    setErrorMessage("");
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", formik.values)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        setIsUserLoggedIn(true);
        setIsLoading(false);
        if (location.pathname === "/login") {
          navigate("/");
        } else {
          navigate(location.pathname);
        }
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        setIsLoading(false);
      });
  }
  return (
    <>
      <Helmet>
        <title>Fresh Cart - Login</title>
      </Helmet>
      <div className="bg-slate-100 p-5 rounded-md w-full">
        <h1 className="text-2xl mb-7">Login</h1>
        <form onSubmit={formik.handleSubmit}>
          {/* Email Input */}
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email address
            </label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              name="email"
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="john.doe@company.com"
            />
            {formik.errors.email && formik.touched.email && (
              <p className="text-red-500 p-1 my-1 text-sm rounded-md ">
                {formik.errors.email}
              </p>
            )}
          </div>
          <div className="mb-6 relative">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              name="password"
              type={showPassword ? "text" : "password"}
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="•••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-11 text-gray-600"
            >
              {showPassword ? (
                <i className="fa-solid fa-eye-slash"></i>
              ) : (
                <i className="fa-solid fa-eye"></i>
              )}
            </button>
            {formik.errors.password && formik.touched.password && (
              <p className="text-red-500 p-1 my-1 text-sm rounded-md ">
                {formik.errors.password}
              </p>
            )}
          </div>
          {errorMessage && (
            <div className="mb-4">
              <p className="text-red-500 p-1 my-1 text-sm rounded-md ">
                {errorMessage}
              </p>
            </div>
          )}
          <button
            disabled={isLoading}
            type="submit"
            className="text-white ms-auto block bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {isLoading ? (
              <i className="fa-solid fa-spinner fa-spin mx-4"></i>
            ) : (
              <span>Login</span>
            )}
          </button>
        </form>
      </div>
    </>
  );
}
