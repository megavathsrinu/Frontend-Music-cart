import React, { useEffect } from "react";
import style from "./ProductsList.module.css";
import greenCart from "../../../Assets/Icons/cartgreen.png";
import useProductContext from "../../../Hooks/useProductContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProductsList(props) {
  const {
    productsData,
    setItem,
    Login,
    numOfCartItems,
    setNumOfCartItems,
    setIsCartEmpty,
    userId, setUserId
  } = useProductContext();

  useEffect(() => {
    const id = localStorage.getItem("userId");
    setUserId(id)
  })

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const headers = {
    token: token,
  };

  const ADD_TO_CART = "https://backend-musiccart-srinu.onrender.com/api/add-to-cart";

  const addToCart = async (item) => {
    const itemWithUserId = { ...item, userId };
    axios.post(ADD_TO_CART, { item: itemWithUserId }, { headers }).then(
      (respones) => {
        if (respones?.data?.success) {
          alert("item added to cart");
          setIsCartEmpty(false);
        } else {
          if (respones?.data?.exists) {
            alert("item already present in cart");
          } else {
            alert("failed to add item to cart");
          }
        }
      },
      (error) => {
        alert("failed to add item to cart");
      }
    );
  };

  return (
    <div className={style.productsList}>
      {productsData?.data !== undefined
        ? productsData?.data.map((item, index) => (
          <div
            className={style.productContainer}
            onClick={() => {
              setItem(item);
              navigate(`/${item._id}`);
            }}
          >
            <div className={style.imageContainer}>
              <img className={style.image} src={item.images[0]}></img>
            </div>
            <button
              className={style.cartButton}
              onClick={(e) => {
                e.stopPropagation();
                if (Login) {
                  addToCart(item);
                  setNumOfCartItems((prev) => prev + 1);
                } else {
                  alert("Please login to add items to cart");
                }
              }}
            >
              <img className={style.greenCartIcon} src={greenCart}></img>
            </button>
            <div className={style.details}>
              <p className={style.p}>{item.name}</p>
              <p className={style.p}>Price - &#x20B9;{item.price}</p>
              <p className={style.p}>
                {item.color} | {item.type} headphone
              </p>
            </div>
          </div>
        ))
        : ""}
    </div>
  );
}
