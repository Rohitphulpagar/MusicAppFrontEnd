import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cartDelete } from "../../../apis/deleteCartApi";
import Header from "../../component/header/Header";
import design from "./checkout.module.css";
import logo from "../../../asset/musiclogo.png";
import { cartDetails } from "../../../apis/cartDetailsApi";
import { useHistory } from "react-router-use-history";
function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const history = useHistory();
  const location = useLocation();

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

  const { price } = location.state;

  return (
    <div>
      <Header />
      <div className={design.cartSection}>
        <div className={design.cartSection1}>
          <span className={design.titleSect}>
            <span className={design.logoSect}>
              <img src={logo} alt="logo" />
            </span>
            <span className={design.apptitle}>
              <Link className={design.links} to="/">
                Musicart
              </Link>
            </span>
            <span className={design.homeLink}>
              <Link className={design.links1} to="/">
                Home
              </Link>
              &nbsp;/ checkout
            </span>
          </span>
        </div>
      </div>
      <Link className={design.link} to="/">
        <div className={design.homebtn}>Back to products</div>
      </Link>
      <div className={design.Checkout}>
        <div>
          <h1>Checkout</h1>
        </div>
      </div>
      <div className={design.Sections}>
        <div className={design.firstSec}>
          <div className={design.addSec}>
            <div>
              <h1 className={design.addTitle}>1. Delivery address</h1>
            </div>
            <div className={design.addSec2}>
              <p>Rohit Phulpagar</p>
              <p>104</p>
              <p>kalyan Nagar,Parbhani</p>
              <p>Maharashtra 431705</p>
            </div>
          </div>
          <div className={design.addPay}>
            <div>
              <h1 className={design.addTitle}>2. Payment method</h1>
            </div>
            <div className={design.addPay2}>
              <p>Pay on delivery (Cash/Card)</p>
            </div>
          </div>
          <div className={design.reviews}>
            <div>
              <h1 className={design.addTitle}>3. Review items and delivery</h1>
            </div>
            <div className={design.reviews1}>
              {cartItems.map((item, index) => (
                <div key={index}>
                  <div className={design.pdImg}>
                    <img src={item.productImage} alt="img" />
                  </div>
                  <div className={design.pdName}>{item.productName}</div>

                  <p className={design.pdFeature}>{item.productColor} </p>
                  {item.isAvailable ? (
                    <p className={design.pdFeature}>In Stock</p>
                  ) : (
                    <p className={design.pdFeature}>Out of Stock</p>
                  )}
                </div>
              ))}

              <div className={design.dates}>
                <p>Estimated deliver:</p>
                <p>Monday - FREE Standard Delivery</p>
              </div>
            </div>
          </div>
          <div className={design.orders}>
            <div className={design.orderbtn}>
              <button onClick={removeAllCart}>Place your order</button>
            </div>
            <div className={design.ordertotal}>
              <h3>Order Total : &#8377;{price + 45}.00</h3>
              <p>
                By placing your order, you agree to Musicart privacy notice and
                conditions of use.
              </p>
            </div>
          </div>
        </div>
        <div className={design.secondSec}>
          <div className={design.secondSec1}>
            <div className={design.orderPlace}>
              <button onClick={removeAllCart}>Place your order</button>
              <p>
                By placing your order, you agree to Musicart privacy notice and
                conditions of use.
              </p>
            </div>
            <div className={design.summary}>
              <h3>Order Summary</h3>
              <div className={design.summaryItem}>
                <span>Items :</span>
                <span>&#8377;{price}.00</span>
              </div>
              <div className={design.summaryItem1}>
                <span>Delivery :</span>
                <span>&#8377;45.00</span>
              </div>
            </div>
            <div className={design.summaryTotal}>
              <span>Order Total :</span>
              <span>&#8377;{price + 45}.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
