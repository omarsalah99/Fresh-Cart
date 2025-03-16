import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { QueryClient, QueryClientProvider } from 'react-query'
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import Layout from './Components/Layout/Layout'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import Home from './Components/Home/Home'
import Brands from './Components/Brands/Brands'
import Cart from './Components/Cart/Cart'
import Orders from './Components/Orders/Orders'
import NotFound from './Components/NotFound/NotFound'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import ProtectedLog from './Components/ProtectedRoute/ProtectedLog'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import Address from './Components/Adress/Adress'
import Product from './Components/Product/Product'
import CounterContextProvider from './Context/CounterContext'
import AuthContextProvider from './Context/AuthContext'
import CartCountContextProvider from './Context/CartCountContext'
import { Provider } from 'react-redux'
import { store } from './Redux/Store'

function App() {
const router =createBrowserRouter([
  {path:'/',element:<Layout />,children:[
    {index:true,element:<ProtectedRoute><Home /></ProtectedRoute>},
    {path:'product',element:<ProtectedRoute><Product /></ProtectedRoute>},
    {path:'brands',element:<ProtectedRoute><Brands /></ProtectedRoute>},
    {path:'carts',element:<ProtectedRoute><Cart /></ProtectedRoute>},
    {path:'allorders',element:<ProtectedRoute><Orders /></ProtectedRoute>},
    {path:'address/:cartId',element:<ProtectedRoute><Address /></ProtectedRoute>},
    {path:'productDetails/:id/:categoryId',element:<ProtectedRoute><ProductDetails /></ProtectedRoute>},
    {path:'login',element:<ProtectedLog><Login /></ProtectedLog>},
    {path:'register',element:<ProtectedLog><Register /></ProtectedLog>},
    {path:'*',element:<NotFound />}
  ]},
])



let queryClient = new QueryClient()
return (
  <>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <CounterContextProvider>
            <CartCountContextProvider>
              <RouterProvider router={router}></RouterProvider>
              <ToastContainer />
            </CartCountContextProvider>
          </CounterContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </Provider>
  </>
)
}

export default App
