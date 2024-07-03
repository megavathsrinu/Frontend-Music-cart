import React, { useEffect } from 'react'
import useProductContext from '../../../Hooks/useProductContext'
import style from './CheckoutProducts.module.css'
import axios from 'axios'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

export default function CheckoutProducts() {
    const { item, buyNow, totalPrice, setTotalPrice, setTotalOrder } = useProductContext()
    console.log("buy now is", buyNow)
    const [cartItems, setCartItems] = useState([]);
    const { id } = useParams()
    useEffect(() => {
        if (!buyNow) {
            getCartItems();
        }
    }, [])

    const GET_CART_ITEMS = "https://backend-musiccart-srinu.onrender.com/api/get-cartitems/";


    const getCartItems = async () => {
        axios.get(GET_CART_ITEMS + id).then(
            (respones) => {
                if (respones?.data?.success) {
                    setCartItems(respones.data.data);
                }
            },
            (error) => {
                alert("failed to get cart items");
            }
        );
    };

    return (
        <div>
            {buyNow ? <div className={style.productDetails}>
                <div className={style.imageContainer}>
                    <img src={item?.images[0]} />
                </div>
                <div className={style.orderDetails}>
                    <div className={style.itemNameInfo}>
                        <div className={style.header}>{item?.name}</div>
                        <div className={style.value}>color : {item?.color}</div>
                        <div className={style.value}>{item?.available}</div>
                        <div className={style.header}>Price : {item?.price}</div>
                    </div>
                </div>
            </div> : cartItems.map((item, index) => (<div className={style.productDetails}>
                <div className={style.imageContainer}>
                    <img src={item?.images[0]} />
                </div>

                <div className={style.orderDetails}>
                    <div className={style.itemNameInfo}>
                        <div className={style.header}>{item?.name}</div>
                        <div className={style.value}>color : {item?.color}</div>
                        <div className={style.value}>{item?.available}</div>
                        <div className={style.deliveryDate}>Estimated delivery:</div>
                        <div className={style.deliveryDate}>Monday - Free standard delivery</div>
                    </div>
                </div>
            </div>))}

        </div>
    )
}
