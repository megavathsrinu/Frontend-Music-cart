import React, { useEffect } from 'react'
import MainHeader from '../../Components/Header/MainHeader/MainHeader'
import style from './Checkout.module.css'
import logo from '../../Assets/Logo/logo.png'
import cartIcon from '../../Assets/Icons/cartIcon.png'
import { useLocation, useNavigate } from 'react-router-dom'
import CheckoutProducts from './CheckoutProducts/CheckoutProducts'
import Footer from '../../Components/Footer/Footer'
import { useMediaQuery } from 'react-responsive'
import MainHeaderSm from '../../Components/Header/SmallScreenMainHeader/MainHeaderSm'
import SmallScreenFooter from '../../Components/Footer/SmallScreenFooter/SmallScreenFooter'
import Header from '../../Components/Header/LoginHeader/Header'
import useProductContext from '../../Hooks/useProductContext'

export default function Checkout() {
    const isMobile = useMediaQuery({ query: "(max-width: 800px)" })
    const rupeeSymbol = String.fromCharCode(8377);

    const { totalPrice, userId, setUserId } = useProductContext()
    const navigate = useNavigate()
    const displayStyle = {
        display: "inline-block"
    }

    useEffect(() => {
        const id = localStorage.getItem("userId");
        setUserId(id)
    }, [])

    return (
        <div>
            <div >
                {isMobile ? <Header /> : <MainHeader />}
                <div className={style.main}>

                    {isMobile ? "" :
                        <div className={style.homeContainer}>
                            <div className={style.logoContainer}>
                                <img src={logo} alt="Logo Here" className={style.logo}></img>
                                <span className={style.home} onClick={() => {
                                    navigate("/");
                                }} >Home /</span><span className={style.home}>checkout</span>
                            </div>
                        </div>}

                    {isMobile ? <div
                        className={style.arrow}
                        onClick={() => {
                            navigate(-1);
                        }}
                    >
                        <span class="material-symbols-outlined">arrow_back</span>
                    </div> :
                        <div>
                            <button
                                className={style.backToProducts}
                                onClick={() => {
                                    navigate("/");
                                }}
                            >
                                Back to cart
                            </button>
                        </div>}

                    <div className={style.checkout}>
                        <h2>Checkout</h2>
                    </div>

                    <div className={style.CheckoutDetails} style={isMobile ? displayStyle : {}}>
                        <div className={style.detailsContainer}>
                            <div className={style.addressContainer}>
                                <div className={style.header}>1.Delivery Address</div>
                                <div className={style.valueContainer}>
                                    <div className={style.value}>Akash Patel</div>
                                    <div className={style.value}>104</div>
                                    <div className={style.value}>kk hh nagar, lucknow</div>
                                    <div className={style.value}>Uttar Pradesh 226025</div>
                                </div>
                            </div>
                            <div className={style.paymentContainer}>
                                <div className={style.header}>2.Payment</div>
                                <div className={style.paymentType}>Pay on delivery (Cash/Card)</div>
                            </div>
                            <div className={style.itemsAndDelivery}>
                                <div className={style.header}>3.Review Items and Delivery</div>
                                <div className={style.productsContainer}>
                                    <CheckoutProducts />
                                </div>
                            </div>
                            {!isMobile && <div className={style.placeOrderContainer}>
                                <div><button onClick={() => {
                                    navigate("/order-success")
                                }}>Place Your Order</button></div>
                                <div className={style.orderDetails}>
                                    <p className={style.OrderTotal}>Order total : {totalPrice + 45}</p>
                                    <p>By placing order you agree to music cart privacy notice and conditions of use</p>
                                </div>
                            </div>}
                        </div>
                        <div className={style.orderSummary}>
                            {!isMobile && <div className={style.placeOrder}>
                                <button onClick={() => {
                                    navigate("/order-success")
                                }}>Place Order</button>
                                <p>By placing order you agree to music cart privacy notice and conditions of use</p>
                            </div>}
                            <div className={style.order}>
                                <div className={style.summary}>Order Summary</div>
                                <div>
                                    <span>Items :</span> <span className={style.price}>{rupeeSymbol}{totalPrice}</span>
                                </div>
                                <div>
                                    <span>Delivery :</span> <span className={style.delivery}>{rupeeSymbol}45</span>
                                </div>
                            </div>
                            <div className={style.total}>
                                <span>Order Total :</span> <span className={style.total_Price}> {rupeeSymbol} {totalPrice + 45}</span>
                            </div>
                            {isMobile && <div><button onClick={() => {
                                navigate("/order-success")
                            }}>Place Your Order</button></div>}
                        </div>
                    </div>
                </div>
                <div className={style.footer}>
                    {isMobile ? <SmallScreenFooter /> : <Footer />}
                </div>

            </div>
        </div >
    )
}
