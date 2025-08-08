import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const App_Layout = () => {
  return (
    <section className=" min-h-[100vh] flex flex-col justify-between">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </section>
  );
};

export default App_Layout;
