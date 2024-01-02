import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-use-history";
import { cartDetails } from "../../../apis/cartDetailsApi";
import style from "./cart.module.css";
import logo from "../../../asset/musiclogo.png";
import Header from "../../../Mobileview/component/header/Header";
import { FaArrowLeft } from "react-icons/fa";
import Footer from "../../../Mobileview/component/userFooter/UserFooter";

function Cart() {
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

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.quantity * item.productPrice,
      0
    );
  };
  const totalPrice = calculateTotalPrice() + 45;

  const handlePrice = () => {
    history.push("/checkout");
  };

  return (
    <>
      <Header />

      <div className={style.cartPage}>
        <div className={style.cartSection}>
          <Link className={style.links} to="/">
            <div className={style.images}>
              <FaArrowLeft className={style.arrowlogo} />
            </div>
          </Link>

          {cartItems.length === 0 ? (
            <h1 className={style.empty}>Your cart is empty.</h1>
          ) : (
            <div className={style.cartItems}>
              <div className={style.cartview}>
                {cartItems.map((item, index) => (
                  <div className={style.cartItem} key={index}>
                    <div className={style.cartImg}>
                      <img src={item.productImage} alt="img" />
                    </div>
                    <div className={style.prductDesc}>
                      <p className={style.name}>{item.productName}</p>
                      <h2> &#8377;{item.productPrice}</h2>
                      <p className={style.color}>
                        Colour : {item.productColor}
                      </p>
                      <>
                        {item.isAvailable ? (
                          <p className={style.stock}>In Stock</p>
                        ) : (
                          <p className={style.stock}>Out of Stock</p>
                        )}
                      </>
                    </div>
                  </div>
                ))}
                <div className={style.amountSec}>
                  <span className={style.calculate}>Convenience fee </span>
                  <span className={style.calculates}>&#8377;45</span>
                </div>
                <div className={style.amountSect}>
                  <span className={style.total}>Total :</span>
                  <span className={style.totals}>&#8377;{totalPrice}</span>
                </div>
              </div>
              <div className={style.amountSects}>
                <span>Total Amount&nbsp; </span>
                <span className={style.calculatess}> &#8377;{totalPrice}</span>
              </div>
              <div className={style.order}>
                <button onClick={handlePrice}>PLACE ORDER</button>
              </div>
            </div>
          )}
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
      <Footer />
    </>
  );
}

export default Cart;
