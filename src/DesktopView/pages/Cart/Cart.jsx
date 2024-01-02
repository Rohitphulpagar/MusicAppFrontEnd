import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-use-history";
import { cartDetails } from "../../../apis/cartDetailsApi";
import design from "./cart.module.css";
import logo from "../../../asset/musiclogo.png";
import Header from "../../component/header/Header";
import { PiBagLight } from "react-icons/pi";
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
  const QuantitySelect = (index, quantity) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity = quantity;
    setCartItems(updatedCartItems);
  };
  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.quantity * item.productPrice,
      0
    );
  };
  const totalPrice = calculateTotalPrice() + 45;
  const handlePrice = () => {
    history.push("/checkout", { price: calculateTotalPrice() });
  };
  return (
    <div className={design.cartPage}>
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
              </Link>{" "}
              / View Cart
            </span>
          </span>
        </div>
      </div>
      <Link className={design.link} to="/">
        <div className={design.homebtn}>Back to products</div>
      </Link>
      <div className={design.cartbag}>
        <div>
          <span className={design.logos}>
            <PiBagLight className={design.logos} />
          </span>
          &nbsp;My Cart
        </div>
      </div>
      {cartItems.length === 0 ? (
        <h1 className={design.empty}>Your cart is empty.</h1>
      ) : (
        <div className={design.item}>
          <div className={design.items}>
            {cartItems.map((item, index) => (
              <div>
                <div key={index} className={design.cartSec}>
                  <div className={design.itemShow}>
                    <div className={design.itemImg}>
                      <img src={item.productImage} alt="img" />
                    </div>
                    <div className={design.itemStock}>
                      <h2>{item.productName}</h2>
                      <p>Colour : {item.productColor}</p>
                      <p>
                        {item.isAvailable ? (
                          <p>In Stock</p>
                        ) : (
                          <p>Out of Stock</p>
                        )}
                      </p>
                    </div>
                    <div className={design.itemPrice}>
                      <p className={design.prices}>Price </p>
                      <p className={design.price}>
                        &#8377; {item.productPrice}
                      </p>
                    </div>
                    <div className={design.itemQuant}>
                      <p>Quantity</p>
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          QuantitySelect(index, parseInt(e.target.value, 10))
                        }
                      >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                      </select>
                    </div>
                    <div className={design.total}>
                      <p className={design.pdTotal}>Total</p>
                      <p className={design.totals}>
                        {item.quantity * item.productPrice}
                      </p>
                    </div>
                  </div>
                </div>
                <div className={design.showItem}>
                  <div className={design.showItem1}>{item.quantity} Item</div>
                  <div className={design.showItem2}>
                    {" "}
                    {item.quantity * item.productPrice}
                  </div>
                </div>
                <br />
              </div>
            ))}
          </div>
          <div className={design.discount}>
            <h3>PRICE DETAILS</h3>
            <div className={design.amountSec}>
              <span className={design.amount}>Total MRP</span>
              <span className={design.calculate}>
                &#8377;{calculateTotalPrice()}
              </span>
            </div>

            <div className={design.amountSec}>
              <span>Discount on MRP</span>
              <span className={design.calculates}>&#8377;0</span>
            </div>
            <div className={design.amountSec}>
              <span>Convenience fee </span>
              <span className={design.calculates}>&#8377;45</span>
            </div>
            <div className={design.amountSect}>
              <span>Total Amount </span>
              <span className={design.calculatess}>&#8377;{totalPrice}</span>
            </div>
            <div className={design.order}>
              <button onClick={handlePrice}>PLACE ORDER</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Cart;
