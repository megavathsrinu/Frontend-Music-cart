import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/LoginHeader/Header";
import MainHeader from "../../Components/Header/MainHeader/MainHeader";
import style from "./ViewCart.module.css";
import logo from "../../Assets/Logo/logo.png";
import cartIcon from "../../Assets/Icons/cartIcon.png";
import mycart from "../../Assets/Icons/mycart.png";
import useProductContext from "../../Hooks/useProductContext";
import { useNavigate } from "react-router-dom";
import CartItems from "./cartItems.js/CartItems";
import CartItemSm from "./cartItems.js/cartItemsSm/CartItemSm";
import { useMediaQuery } from "react-responsive";
import Footer from "../../Components/Footer/Footer";
import MainHeaderSm from "../../Components/Header/SmallScreenMainHeader/MainHeaderSm";
import SmallScreenFooter from "../../Components/Footer/SmallScreenFooter/SmallScreenFooter";
import { ClipLoader } from "react-spinners";

export default function ViewCart() {
  const isMobile = useMediaQuery({ query: "(max-width: 800px)" });
  const {
    item,
    productsData,
    setTotalPrice,
    isCartEmpty,
    setHome,
    setCart,
    setloginItem,
  } = useProductContext();

  const navigate = useNavigate();

  useEffect(() => {
    setCart(true);
    setHome(false);
    setloginItem(false);
  }, []);

  return (
    <div>
      <div>{isMobile ? <MainHeaderSm /> : <MainHeader />}</div>
      <div className={style.main}>
        {isMobile ? (
          ""
        ) : (
          <div className={style.homeContainer}>
            <div className={style.logoContainer}>
              <img
                src={logo}
                onClick={() => navigate("/")}
                alt="Logo Here"
                className={style.logo}
              ></img>
              <span onClick={() => navigate("/")} className={style.home}>
                Home /
              </span>{" "}
              <span className={style.home}>view cart</span>
            </div>
            <div className={style.viewCartContainer}>
              <button className={style.cartButton}>
                <img
                  src={cartIcon}
                  alt="cart icon here"
                  className={style.cartIcon}
                ></img>{" "}
                <span className={style.viewCart}>ViewCart</span>
              </button>
            </div>
          </div>
        )}

        {isMobile ? (
          <div
            className={style.arrow}
            onClick={() => {
              navigate(-1);
            }}
          >
            <span class="material-symbols-outlined">arrow_back</span>
          </div>
        ) : (
          <div>
            <button
              className={style.backToProducts}
              onClick={() => {
                navigate("/");
              }}
            >
              Back to products
            </button>
            <div className={style.mycartIcon}>
              <img src={mycart} />
            </div>
          </div>
        )}

        <div>
          {isCartEmpty ? (
            <div className={style.emptyCart}> Cart Is Empty! </div>
          ) : (
            <div className={style.items}>
              {isMobile ? <CartItemSm /> : <CartItems />}
            </div>
          )}
        </div>
      </div>
      <div>{isMobile ? <SmallScreenFooter /> : <Footer />}</div>
    </div>
  );
}
