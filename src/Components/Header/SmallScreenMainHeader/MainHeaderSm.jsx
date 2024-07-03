import React from "react";
import style from "./MainHeaderSm.module.css";
import searchIcon from "../../../Assets/Icons/searchIcon.png";
import useProductContext from "../../../Hooks/useProductContext";

export default function MainHeaderSm() {
  const { searchItem, setSearchItem } = useProductContext();

  return (
    <div className={style.mainHeader}>
      <div className={style.inputContainer}>
        <img className={style.searchIcon} src={searchIcon}></img>
        <input
          type="text"
          className={style.input}
          placeholder="Search Musicart"
          onChange={(e) => {
            setSearchItem(e.target.value);
          }}
        ></input>
      </div>
    </div>
  );
}
