import React from "react";
import style from "./header.module.css";
import { Link } from "react-router-dom";
import logo from "../../../asset/music.png";
function Header() {
  return (
    <div className={style.cartSection}>
      <div className={style.cartSection1}>
        <span className={style.titleSect}>
          <span className={style.logoSect}>
            <img src={logo} alt="logo" />
          </span>
          <span className={style.apptitle}>
            <Link className={style.links} to="/">
              Musicart
            </Link>
          </span>
        </span>
      </div>
    </div>
  );
}

export default Header;
