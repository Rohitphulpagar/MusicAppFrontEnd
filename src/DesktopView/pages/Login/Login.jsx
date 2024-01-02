import React, { useState } from "react";
import { useHistory } from "react-router-use-history";
import { login } from "../../../apis/loginApi";
import style from "./login.module.css";
import musicImg from "../../../asset/musiclogo.png";
import { Link } from "react-router-dom";
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
      <div className={style.logoTag}>
        <img src={musicImg} alt="logo" />
        <Link className={style.links} to="/">
          <h1>Musicart</h1>
        </Link>
      </div>
      <div className={style.signForm}>
        <div className={style.signForm1}>
          <form onSubmit={loginUser}>
            <h1>Sign in</h1>

            <label className={style.labels}>
              Enter your email or mobile number
            </label>
            <br />
            <input
              className=""
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
            <br />
            <label className={style.labels}>Password</label>
            <br />
            <input
              className=""
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <br />
            <button className={style.loginbtn} type="submit">
              Continue
            </button>
            <p>
              By continuing, you agree to Musicart privacy notice and conditions
              of use.
            </p>
          </form>
        </div>
      </div>
      <div className={style.bottomLine}>
        __________________________
        <span className={style.bottomSpan}>New to Musicart?</span>
        __________________________
      </div>
      <Link to="/register">
        <button className={style.bottombtn}>
          Create your Musicart account
        </button>
      </Link>
    </div>
  );
}

export default Login;
