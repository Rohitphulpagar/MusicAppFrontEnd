import React from "react";
import design from "./success.module.css";
import logo from "../../../asset/musiclogo.png";
import { Link } from "react-router-dom";
import confettl from "../../../asset/confetti.png";
function Success() {
  return (
    <div className={design.successPage}>
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
          </span>
        </div>
      </div>

      <div className={design.centerDiv}>
        <div>
          <img src={confettl} alt="img" />
          <h1>Order is placed successfully!</h1>
          <p>You will be receiving a confirmation email with order details</p>
          <Link className={design.links} to="/">
            {" "}
            <button>Go back to Home page</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Success;
