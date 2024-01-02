import React, { useState } from "react";
import { useHistory } from "react-router-use-history";
import { login } from "../../../apis/loginApi";
import style from "./login.module.css";
import musicImg from "../../../asset/musiclogo.png";
import { Link } from "react-router-dom";
import Header from "../../component/header/Header";
import Footer from "../../component/Footer/Footer";
function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const loginUser = async (event) => {
    event.preventDefault();
    try {
      const response = await login(userName, password);
      console.log("Login successfully. Response: ", response);
      history.push("/");
    } catch (error) {
      console.log("Error during login: ", error);
    }
  };
  return (
    <div className={style.loginPage}>
      <Header />
      <div className={style.signForm}>
        <h1>Welcome</h1>
        <div className={style.signPage}>
          <div className={style.signForm1}>
            <form onSubmit={loginUser}>
              <div className={style.sign}>
                <span>Sign in. </span>Already a customer?
              </div>
              <label className={style.labels}>
                Enter your email or mobile number
              </label>
              <br />
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
              <br />
              <div className={style.lab}>
                <label className={style.labels}>Password</label>
                <br />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button className={style.loginbtn} type="submit">
                Continue
              </button>
              <p>
                By continuing, you agree to Musicart privacy notice and
                conditions of use.
              </p>
            </form>
          </div>
        </div>
      </div>
      <div className={style.btm}>
        <div className={style.bottomLine}>
          ____________&nbsp;&nbsp;
          <span className={style.bottomSpan}>New to Musicart?</span>
          &nbsp;&nbsp;___________
        </div>
        <Link to="/register">
          <button className={style.bottombtn}>
            Create your Musicart account
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
