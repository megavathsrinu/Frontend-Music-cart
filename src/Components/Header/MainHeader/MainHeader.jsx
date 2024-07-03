import React, { useContext, useEffect } from "react";
import phoneIcon from "../../../Assets/Icons/phone.png";
import style from "./MainHeader.module.css";
import useProductContext from "../../../Hooks/useProductContext";
import { jwtDecode } from "jwt-decode";

export default function () {
  const { Login, setLogin, setUserId } = useProductContext();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwtDecode(token);
      if (user) {
        setLogin(true);
      } else {
        setLogin(false);
        setUserId(0);
        localStorage.removeItem("token");
      }
    } else {
      setLogin(false);
      setUserId(0);
      localStorage.removeItem("token");
    }
  }, [Login]);

  function Logout() {
    setLogin(false);
    setUserId(0);
    localStorage.removeItem("token");
  }

  return (
    <div className={style.header}>
      <div className={style.leftBlock}>
        <img src={phoneIcon} className={style.phoneIcon} alt="icon here"></img>
        <span className={style.mobileNumber}>+9121212121313</span>
      </div>
      <div className={style.middleBlock}>
        <span className={style.offer}>
          Get 50% off on selected items || Shop Now
        </span>
      </div>
      {Login ? (
        <div className={style.logout} onClick={Logout}>
          Logout
        </div>
      ) : (
        <div className={style.login_signup}>
          <a href="/login" className={style.login}>
            Login |
          </a>{" "}
          <a href="/signup" className={style.signup}>
            Signup
          </a>
        </div>
      )}
    </div>
  );
}
