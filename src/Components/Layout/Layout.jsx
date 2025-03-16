import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto p-5 my-2 w-3/4 flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
