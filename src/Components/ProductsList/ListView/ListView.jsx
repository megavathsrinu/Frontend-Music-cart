import React, { useEffect, useState } from "react";
import style from "./ListView.module.css";
import image from "../../../Assets/images/dummy.jpg";
import greenCart from "../../../Assets/Icons/cartgreen.png";
import { useNavigate } from "react-router-dom";
import useProductContext from "../../../Hooks/useProductContext";
import axios from "axios";

export default function ListView() {
  const navigate = useNavigate();

  const { productsData, setItem, Login, setIsCartEmpty, userId, setUserId } = useProductContext();

  const token = localStorage.getItem("token");

  const ADD_TO_CART = "https://backend-musiccart-srinu.onrender.com/api/add-to-cart";

  const headers = {
    token: token,
  };

  useEffect(() => {
    const id = localStorage.getItem("userId");
    setUserId(id)
  })

  const addToCart = async (item) => {
    const itemWithUserId = { ...item, userId };
    axios.post(ADD_TO_CART, { item: itemWithUserId }, { headers }).then(
      (respones) => {
        if (respones?.data?.success) {
          setIsCartEmpty(false);
          alert("item added to cart");
        } else {
          alert("failed to add item to cart");
        }
      },
      (error) => {
        alert("failed to add item to cart");
      }
    );
  };

  return (
    <div>
      <div className={style.productsList}>
        {productsData?.data?.length > 0
          ? productsData?.data?.map((item, index) => (
            <div className={style.productContainer}>
              <div className={style.imageContainer}>
                <img className={style.image} src={item.images[0]}></img>
              </div>
              <button
                className={style.cartButton}
                onClick={() => {
                  if (Login) {
                    setItem(item);
                    addToCart(item);
                  } else {
                    alert("Please login to add items to cart");
                  }
                }}
              >
                <img className={style.greenCartIcon} src={greenCart}></img>
              </button>
              <div className={style.details}>
                <p className={style.name}>{item.name}</p>
                <p className={style.p}>Price - &#x20B9;{item.price}</p>
                <p className={style.p}>
                  {item.color} | {item.type} headphone
                </p>
                <p className={style.p}>{item.description}</p>
                <button
                  className={style.detailsButton}
                  onClick={() => {
                    setItem(item);
                    navigate(`/${item._id}`);
                  }}
                >
                  Details
                </button>
              </div>
            </div>
          ))
          : ""}
      </div>
    </div>
  );
}
