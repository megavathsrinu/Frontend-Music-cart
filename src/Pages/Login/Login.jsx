import React, { useState } from "react";
import styles from "./Login.module.css";
import logo from "../../Assets/Logo/logo.png";
import Footer from "../../Components/Footer/Footer";
import { useMediaQuery } from "react-responsive";
import Header from "../../Components/Header/LoginHeader/Header";
import { useNavigate } from "react-router-dom";
import useProductContext from "../../Hooks/useProductContext";
import axios from "axios";

export default function Login() {
  const isMobile = useMediaQuery({ query: "(max-width: 800px)" });

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userId, setUserId, setLogin, login } = useProductContext();

  const LOGIN = "https://backend-musiccart-srinu.onrender.com/api/login";

  function loginUser() {
    axios.post(LOGIN, { email, password }).then(
      (response) => {
        if (response.data.success) {
          const data = response.data;
          alert("login success");
          localStorage.setItem("token", data.token);
          localStorage.setItem("userId", data.userid);
          setUserId(data.userid);
          setLogin(true);
          navigate("/");
        } else {
          alert("Invalid credentials! login failed");
        }
      },
      (error) => {
        alert("something went wrong");
      }
    );
  }

  function submitDetails(e) {
    e.preventDefault();
    if (!email || !password) {
      alert("please enter email and password!");
    } else {
      loginUser();
    }
  }

  return (
    <div className={styles.main}>
      {isMobile ? <Header /> : ""}
      <div className={styles.outerBox}>
        {isMobile ? (
          <h1 className={styles.welcome}>Welcome</h1>
        ) : (
          <div className={styles.logoContainer}>
            <img className={styles.logo} src={logo} alt="Logo Here"></img>
          </div>
        )}
        <div className={styles.login}>
          <div className={styles.innerdiv}>
            {isMobile ? (
              <div className={styles.miniHeader}>
                <span className={styles.signIn}>Sign in.</span>
                <span className={styles.alreadyCustomer}>
                  Already a customer?
                </span>
              </div>
            ) : (
              <h1 className={styles.header}>Sign in</h1>
            )}
            <form onSubmit={submitDetails}>
              <div className={styles.email}>
                <label className={styles.label}>
                  Enter your email or mobile number
                </label>
                <br></br>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                  type="text"
                ></input>
              </div>
              <div className={styles.password}>
                <label className={styles.label}>Password</label>
                <br></br>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.input}
                  type="password"
                ></input>
                <br></br>
              </div>
              <div>
                <button className={styles.continue}>Continue</button>
              </div>
              <p className={styles.privacyNotice}>
                By continuing, you agree to Musicart privacy notice and
                conditions of use.
              </p>
            </form>
          </div>
        </div>
        <div className={styles.newToMusicartConatiner}>
          <div className={styles.hr}>
            <hr></hr>
          </div>
          <div className={styles.newToMusicCart}>New to Musicart?</div>
          <div className={styles.hr}>
            <hr></hr>
          </div>
        </div>

        <div>
          <button
            onClick={() => {
              navigate("/signup");
            }}
            className={styles.createAccount}
          >
            {" "}
            Create Your Musicart account
          </button>
        </div>
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
}
        
