import React from 'react'
import useProductContext from '../../../../Hooks/useProductContext'
import style from './CartItemSm.module.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function CartItemSm() {
    const { item, totalPrice, setTotalPrice, setIsCartEmpty, isCartEmpty, setUserId, userId, numOfCartItems, } = useProductContext()
    const [cartItems, setCartItems] = useState([]);
    const rupeeSymbol = String.fromCharCode(8377);
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {

        setUserId(id)
        getCartItems();
    }, [isCartEmpty]);

    const calculateTotal = (items) => {
        let sum = 0;
        for (const cartItem of items) {
            sum = sum + cartItem?.price
        }
        setTotalPrice(sum);
    };

    const GET_CART_ITEMS = "https://backend-musiccart-srinu.onrender.com/api/get-cartitems";

    const getCartItems = async () => {
        axios.get(GET_CART_ITEMS + id).then(
            (respones) => {
                if (respones?.data?.success) {
                    const cartItems = respones.data.data;
                    if (cartItems.length == 0) {
                        setIsCartEmpty(true);
                    } else {
                        setIsCartEmpty(false);
                        calculateTotal(cartItems)
                    }
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
            <div>
                <div className={style.allCartItems}>
                    {cartItems?.map((item, index) => (
                        <div className={style.productDetails}>
                            <div className={style.imageContainer}>
                                <img src={item?.images[0]} />
                            </div>
                            <div className={style.orderDetails}>
                                <div className={style.itemNameInfo}>
                                    <div className={style.header}>{item?.name}</div>
                                    <div className={style.header}>{rupeeSymbol} {item?.price}</div>
                                    <div>color : {item?.color}</div>
                                    <div>{item?.available}</div>
                                    {index == cartItems.length - 1 ? <div>
                                        <div>convenience fee : {rupeeSymbol}{45}</div>
                                        <div className={style.totalAmount}>Total :{rupeeSymbol} {totalPrice + 45} </div>
                                    </div> : ""}
                                </div>
                            </div>
                        </div>))}
                </div>

                <div className={style.priceDetails}>
                    <div className={style.container}>
                        <span className={style.label}>Total Amount</span>
                        <span className={style.amountValue}>{rupeeSymbol}{totalPrice + 45}</span>
                    </div>
                    <div>
                        <button onClick={() => navigate(`/checkout/${userId}`)} className={style.placeOrder}>PLACE ORDER</button>
                    </div>
                </div>

            </div>
        </div>
    )
}
