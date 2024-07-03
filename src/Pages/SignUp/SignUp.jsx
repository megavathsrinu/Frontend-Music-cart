import React, { useState } from "react";
import styles from "./SignUp.module.css";
import logo from "../../Assets/Logo/logo.png";
import Footer from "../../Components/Footer/Footer";
import { useMediaQuery } from "react-responsive";
import Header from "../../Components/Header/LoginHeader/Header";
import axios from "axios";
import useProductContext from "../../Hooks/useProductContext";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const isMobile = useMediaQuery({ query: "(max-width: 800px)" });
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [mobile, setMobile] = useState();
  const [password, setPassword] = useState();
  const { setUserId, setLogin } = useProductContext();

  const navigate = useNavigate();

  const REGISTER = "https://backend-musiccart-srinu.onrender.com/api/register";

  const registerUser = () => {
    axios.post(REGISTER, { name, email, mobile, password }).then(
      (response) => {
        if (response?.data?.success) {
          if (response?.data?.emailExists) {
            alert("email already exists, please login!");
            return;
          }
          const USERID = response?.data?.userid;
          setUserId(USERID);
          localStorage.setItem("token", response?.data?.token);
          localStorage.setItem("userId", response?.data?.userId);
          setLogin(true);
          navigate("/");
        }
      },
      (error) => {

      }
    );
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateEmail = (email) => {
    return emailRegex.test(email);
  };

  const mobileRegex = /^[0-9]{10}$/;

  const validateMobileNumber = (number) => {
    return mobileRegex.test(number);
  };

  const register = (e) => {
    e.preventDefault();

    console.log(name, email, mobile, password);
    if (!name || !email || !mobile || !password) {
      alert("all fields are required!");
    } else if (!validateEmail(email)) {
      alert("Please enter valid email!");
    } else if (!validateMobileNumber(mobile)) {
      alert("Please enter 10 digit mobile number!");
    } else if (name.length < 4 || password.length < 4) {
      alert("name and password length must be atleast 4!");
    } else {
      registerUser();
    }
  };

  return (
    <div className={styles.main}>
      {isMobile ? <Header /> : ""}
      <div className={styles.outerBox}>
        {isMobile ? (
          <h3 className={styles.welcome}>Welcome</h3>
        ) : (
          <div className={styles.logoContainer}>
            <img className={styles.logo} src={logo} alt="Logo Here"></img>
          </div>
        )}
        <div className={styles.login}>
          <div className={styles.innerdiv}>
            <div className={styles.headerMain}>
              <h2 className={styles.header}>Create Account</h2>
            </div>
            <div className={styles.headerSmall}>
              <span className={styles.createAccount}>Create account.</span>{" "}
              <span className={styles.dontHaveAcc}>Dont have an account?</span>
            </div>
            <form>
              <div className={styles.name}>
                <label className={styles.label}>Your Name</label>
                <br></br>
                <input
                  className={styles.input}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  type="text"
                ></input>
              </div>
              <div className={styles.mobile}>
                <label className={styles.label}>Mobile Number</label>
                <br></br>
                <input
                  className={styles.input}
                  onChange={(e) => {
                    setMobile(e.target.value);
                  }}
                  type="Number"
                ></input>
              </div>
              <div className={styles.email}>
                <label className={styles.label}>Your Email</label>
                <br></br>
                <input
                  className={styles.input}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="email"
                ></input>
              </div>
              <div className={styles.password}>
                <label className={styles.label}>Password</label>
                <br></br>
                <input
                  className={styles.input}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type="password"
                ></input>
                <br></br>
              </div>
              <p className={styles.privacyNotice}>
                By enrolling your mobile phone number, you consent to receive
                automated security notifications via text message from Musicart.
                Message and data rates may apply.
              </p>
              <div>
                <button className={styles.continue} onClick={register}>
                  Continue
                </button>
              </div>
              <p className={styles.privacyNotice}>
                By continuing, you agree to Musicart privacy notice and
                conditions of use.
              </p>
            </form>
          </div>
        </div>
        <div className={styles.signIn}>
          <div>
            <span style={{ fontWeight: "500" }}>Already have an account? </span>
            <a href="/login" style={{ color: "gray" }}>
              Sign in
            </a>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
}
