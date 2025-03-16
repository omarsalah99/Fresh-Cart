import { useContext } from "react"
import { AuthContext } from "../../Context/AuthContext"
import { Helmet } from "react-helmet"


export default function Orders() {
  const {userDate} = useContext(AuthContext)
  
  return (
    <>
      <Helmet>
      <title>Fresh Cart - Orders </title>
      </Helmet>
    </>
  )
}
