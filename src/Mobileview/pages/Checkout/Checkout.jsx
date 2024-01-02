import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cartDelete } from "../../../apis/deleteCartApi";
import { cartDetails } from "../../../apis/cartDetailsApi";
import { useHistory } from "react-router-use-history";
import style from "./checkout.module.css";
import { FaArrowLeft } from "react-icons/fa";
import Footer from "../../../Mobileview/component/userFooter/UserFooter";
import Header from "../../../Mobileview/component/header/Header";
function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const retrieveData = async () => {
      try {
        const response = await cartDetails();
        setCartItems(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    retrieveData();
  }, []);

  const removeAllCart = async () => {
    try {
      await cartDelete();
      history.push("/success");
    } catch (error) {
      console.log(error);
    }
  };
  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.quantity * item.productPrice,
      0
    );
  };
  const totalPrice = calculateTotalPrice() + 45;
  return (
    <>
      <Header />

      <div className={style.checkPage}>
        <div className={style.checkSection}>
          <Link className={style.links} to="/">
            <div className={style.images}>
              <FaArrowLeft className={style.arrowlogo} />
            </div>
          </Link>
        </div>
        <div>
          <h1 className={style.name}>Checkout</h1>
        </div>
        <div className={style.addSec}>
          <div>
            <h3 className={style.addTitle}>1. Delivery address</h3>
          </div>
          <div className={style.addSec2}>
            <p>Rohit Phulpagar</p>
            <p>104</p>
            <p>kalyan Nagar,Parbhani</p>
            <p>Maharashtra 431705</p>
          </div>
        </div>
        <div className={style.addPay}>
          <h3 className={style.addTitle}>2. Payment method</h3>

          <div className={style.addPay2}>
            <p>Pay on delivery (Cash/Card)</p>
          </div>
        </div>
        <div className={style.reviews1}>
          <h3 className={style.addTitle}>3. Review items and delivery</h3>
          {cartItems.map((item, index) => (
            <div className={style.addProduct} key={index}>
              <div className={style.pdImg}>
                <img src={item.productImage} alt="img" />
              </div>
              <div className={style.pdName}>{item.productName}</div>

              <p className={style.pdFeatures}>Colour : {item.productColor} </p>
              <div className={style.pdFeatur}>
                {item.isAvailable ? (
                  <p className={style.stock}>In Stock</p>
                ) : (
                  <p className={style.stock}>Out of Stock</p>
                )}
              </div>
            </div>
          ))}

          <div className={style.dates}>
            <p>Estimated deliver:</p>
            <p>Monday - FREE Standard Delivery</p>
          </div>
          <div className={style.borders}>
            <div className={style.summary}>
              <h3>Order Summary</h3>
              <div className={style.summaryItem1}>
                <span className={style.sp}>Items :</span>
                <span className={style.sp1}>
                  &#8377;{calculateTotalPrice()}.00
                </span>
              </div>
              <div className={style.summaryItem1}>
                <span className={style.sp}>Delivery :</span>
                <span className={style.sp2}>&#8377;45.00</span>
              </div>
            </div>
          </div>
          <div className={style.summaryItem2}>
            <span>Order Total : </span>
            <span>&#8377;{totalPrice}.00</span>
          </div>
          <div className={style.order}>
            <button onClick={removeAllCart}>Place your order</button>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
}

export default Checkout;
