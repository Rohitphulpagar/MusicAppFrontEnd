import React, { useEffect, useState } from "react";
import style from "./userFooter.module.css";
import { GrHomeRounded } from "react-icons/gr";
import { IoPersonOutline } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { MdAddShoppingCart } from "react-icons/md";
import { FaExclamation } from "react-icons/fa";
import { useHistory } from "react-router-use-history";
function UserFooter() {
  const token = localStorage.getItem("token");
  const history = useHistory();
  const [onactiveIcon, setOnactiveIcon] = useState("home");

  useEffect(() => {
    const currentPath = history.location.pathname;
    if (currentPath === "/") {
      setOnactiveIcon("home");
    } else if (currentPath === "/cart") {
      setOnactiveIcon("cart");
    }
  }, [history.location.pathname]);

  const clickOnCart = () => {
    if (token) {
      setOnactiveIcon("cart");
      history.push("/cart");
    } else {
      history.push("/login");
    }
  };

  const clickOnHome = () => {
    setOnactiveIcon("home");
    history.push("/");
  };
  const clickOnLogout = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };
  const clickOnLogin = () => {
    history.push("/login");
  };
  return (
    <div className={style.footerSec}>
      <div className={style.footer}>
        <div
          onClick={clickOnHome}
          className={`${style.homes} ${
            onactiveIcon === "home" && style.active
          }`}
        >
          <GrHomeRounded className={style.logo} />
          <p>Home</p>
        </div>
        <div onClick={clickOnCart}>
          <MdAddShoppingCart
            className={`${style.cartlogo} ${
              onactiveIcon === "cart" && style.active
            }`}
          />
          <p className={style.logCart}>Cart</p>
        </div>
        <div>
          {token ? (
            <div onClick={clickOnLogout}>
              <span>
                <IoPersonOutline className={style.manlogo} />
              </span>
              <p className={style.logout}>Logout</p>
            </div>
          ) : (
            <div onClick={clickOnLogin}>
              <span>
                <IoPersonOutline className={style.manlogos} />
                <FaExclamation className={style.excla} />
              </span>
              <p className={style.login}>Login</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserFooter;
