import React, { useState } from "react";
import { registers } from "../../../apis/registerApi";
import { useHistory } from "react-router-use-history";
import regDesign from "./register.module.css";
import logo from "../../../asset/musiclogo.png";
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
    <div className={regDesign.registerPage}>
      <div className={regDesign.appName}>
        <img src={logo} alt="logo" />
        <Link className={regDesign.links} to="/">
          <h1>Musicart</h1>
        </Link>
      </div>
      <div className={regDesign.regForm}>
        <form onSubmit={createUser}>
          <h1>Create Account</h1>
          <div className={regDesign.inField}>
            <label>Your name</label>
            <br />
            <input
              type="text"
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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className={regDesign.privacy}>
              <p>
                By enrolling your mobile phone number, you consent to receive
                automated security notifications via text message from Musicart.
                Message and data rates may apply.
              </p>
            </div>
            <button type="submit" className={regDesign.registerBtn}>
              Continue
            </button>
            <p className={regDesign.notes}>
              By continuing, you agree to Musicart privacy notice and conditions
              of use.
            </p>
          </div>
        </form>
      </div>
      <p className={regDesign.lastline}>
        Already have an account?
        <Link to="/login" className={regDesign.linkSign}>
          {" "}
          Sign in
        </Link>
      </p>
    </div>
  );
}

export default Register;
