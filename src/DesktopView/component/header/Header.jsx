import React from "react";
import { FiPhoneCall } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-use-history";
import style from "./header.module.css";
function Header() {
  const history = useHistory();
  const token = localStorage.getItem("token");
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    history.push("/login");
  };
  return (
    <div>
      {token ? (
        <div className={style.heading}>
          <p className={style.numlogo}>
            <FiPhoneCall color="white" size="14px" />
            &nbsp;9121211131313
          </p>
          <p>Get 50% off on selected items &nbsp;|&nbsp; Shop Now</p>
          <p className={style.logs} onClick={(e) => logout(e)}>
            Logout
          </p>
        </div>
      ) : (
        <div className={style.heading}>
          <p className={style.numlogo}>
            <FiPhoneCall color="white" size="14px" />
            &nbsp;&nbsp;9121211131313
          </p>
          <p>Get 50% off on selected items &nbsp;|&nbsp; Shop Now</p>
          <p className={style.logs}>
            <Link className={style.links} to="/login">
              Login
            </Link>{" "}
            &nbsp;| &nbsp;{" "}
            <Link className={style.links} to="/register">
              Signup
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}

export default Header;
