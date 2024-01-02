import { Route, Routes } from "react-router-dom";
import Footer from "../DesktopView/component/Footer/Footer";
import Login from "../DesktopView/pages/Login/Login";
import Register from "../DesktopView/pages/Register/Register";
import style from "./desktop.module.css";
import ProductList from "../DesktopView/pages/ProductList/ProductList";
import Cart from "../DesktopView/pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import Description from "./pages/ProductDescription/Description";
import Success from "./pages/Success/Success";
import SingleCheckout from "./pages/Checkout/SingleCheckout";
function Desktop() {
  return (
    <div className={style.desktopApp}>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products/:productId" element={<Description />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
        <Route path="/buyCheckout" element={<SingleCheckout />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default Desktop;
