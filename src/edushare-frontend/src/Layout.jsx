import { Outlet } from "react-router-dom";
import Header from "./components/1-header/Header";
import Footer from "./components/5-footer/Footer";
import { FaArrowUp } from "react-icons/fa";

const Layout = () => {
  return (
    <div className="container">
      <Header />
      <div className="divider" />
      <Outlet />
      <div className="divider" />
      <Footer />
    </div>
  );
};

export default Layout;
