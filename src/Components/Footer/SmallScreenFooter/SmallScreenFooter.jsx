import React, { useEffect, useState } from "react";
import homeIcon from "../../../Assets/Icons/home.png";
import cartIcon from "../../../Assets/Icons/cartsm.png";
import loginIcon from "../../../Assets/Icons/login.png";
import logout from "../../../Assets/Icons/logout.png";
import Style from "./SmallScreenFooter.module.css";
import { useNavigate } from "react-router-dom";
import useProductContext from "../../../Hooks/useProductContext";

export default function SmallScreenFooter() {
  const {
    home,
    setHome,
    cart,
    setCart,
    loginItem,
    setloginItem,
    userId,
    setUserId,
    Login,
    setLogin,
  } = useProductContext();
  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem("userId");
    setUserId(id)
  }, [])

  const selectedItem = {
    borderTop: "3px solid #2E0052",
  };
  return (
    <div className={Style.footer}>
      <div
        onClick={() => {
          navigate("/");
          setHome(true);
          setCart(false);
          setloginItem(false);
        }}
        style={home ? selectedItem : {}}
        className={Style.container}
      >
        <img className={Style.iconHome} src={homeIcon}></img>
        <p>Home</p>
      </div>
      <div
        onClick={() => {
          if (Login) {
            navigate(`/viewcart/${userId}`);
            setHome(false);
            setCart(true);
            setloginItem(false);
          } else {
            alert("Please Login to viewcart");
          }
        }}
        style={cart ? selectedItem : {}}
        className={Style.container}
      >
        <img className={Style.iconCart} src={cartIcon}></img>
        <p className={Style.cartText}>Cart</p>
      </div>
      {!Login ? (
        <div
          onClick={() => {
            setHome(false);
            setCart(false);
            setloginItem(true);
            navigate("/login");
          }}
          style={loginItem ? selectedItem : {}}
          className={Style.container}
        >
          <img className={Style.iconLogin} src={loginIcon}></img>
          <p>Login</p>
        </div>
      ) : (
        <div
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("userId")
            setLogin(false);
            setHome(false);
            setCart(false);
            setloginItem(true);
          }}
          style={loginItem ? selectedItem : {}}
          className={Style.container}
        >
          <img className={Style.iconLogout} src={logout}></img>
          <p>Logout</p>
        </div>
      )}
    </div>
  );
}
