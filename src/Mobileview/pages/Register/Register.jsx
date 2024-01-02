import React, { useState } from "react";
import { registers } from "../../../apis/registerApi";
import { useHistory } from "react-router-use-history";
import style from "./register.module.css";
import Header from "../../component/header/Header";
import Footer from "../../component/Footer/Footer";
import { Link } from "react-router-dom";
function Register() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const createUser = async (e) => {
    e.preventDefault();
    try {
      const response = await registers(name, mobile, email, password);
      console.log("register successfully: ", response);
      history.push("/");
    } catch (err) {
      console.log("Register error: ", err);
    }
  };
  return (
    <div className={style.registerPage}>
      <Header />
      <div className={style.appName}>
        <h1>Welcome</h1>
      </div>
      <div className={style.regForms}>
        <div className={style.regForm}>
          <form onSubmit={createUser}>
            <p className={style.create}>
              <span className={style.create1}>Create account. </span>
              <span>Don't have an account?</span>
            </p>
            <div className={style.inField}>
              <label>Your name</label>
              <br />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <br />
              <label>Mobile number</label>
              <br />
              <input
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
              <br />
              <label>Email id</label>
              <br />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <br />
              <label>Password</label>
              <br />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className={style.privacy}>
                <p>
                  By enrolling your mobile phone number, you consent to receive
                  automated security notifications via text message from
                  Musicart. Message and data rates may apply.
                </p>
              </div>
              <button type="submit" className={style.registerBtn}>
                Continue
              </button>
              <div>
                <p className={style.notes}>
                  By continuing, you agree to Musicart privacy notice and
                  conditions of use.
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
      <p className={style.signLink}>
        Already have an account?{" "}
        <Link className={style.signLinks} to="/login">
          {" "}
          Sign in
        </Link>
      </p>
      <Footer />
    </div>
  );
}

export default Register;
