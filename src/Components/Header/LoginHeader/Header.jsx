import React from "react";
import style from "./Header.module.css";
import logo from "../../../Assets/Logo/icon.png";
export default function Header() {
  return (
    <div className={style.header}>
      <div className={style.logoContainer}>
        <img className={style.logo} src={logo} alt="Logo Here"></img>
        <div className={style.musiCart}>Musicart</div>
      </div>
    </div>
  );
}
