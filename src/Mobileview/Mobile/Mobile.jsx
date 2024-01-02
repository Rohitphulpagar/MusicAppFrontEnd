import React from "react";
import Login from "../pages/Login/Login";
import ProductList from "../pages/productlist/ProductList";
import { Route, Routes } from "react-router-dom";
import Register from "../pages/Register/Register";
import Description from "../pages/productDescription/Description";
import Footer from "../component/Footer/Footer";
import Cart from "../pages/Cart/Cart";
import Checkout from "../pages/Checkout/Checkout";
import Success from "../pages/Success/Success";
import style from "./mobile.module.css";
function Mobile() {
  return (
    <div className={style.mobileApps}>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products/:productId" element={<Description />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </div>
  );
}

export default Mobile;
