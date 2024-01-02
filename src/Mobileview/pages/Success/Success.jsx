import React from "react";
import design from "./success.module.css";
import logo from "../../../asset/musiclogo.png";
import { Link } from "react-router-dom";
import confettl from "../../../asset/confetti.png";
import Footer from "../../../Mobileview/component/userFooter/UserFooter";
import Header from "../../../Mobileview/component/header/Header";
function Success() {
  return (
    <>
      <Header />
      <div className={design.successPage}>
        <div className={design.centerDiv}>
          <div>
            <img src={confettl} alt="img" />
            <h1>Order is placed successfully!</h1>
            <p>You will be receiving a confirmation email with order details</p>
            <Link className={design.links} to="/">
              <button>Go back to Home page</button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Success;
