import React, { useEffect } from 'react'
import Style from './OrderSuccess.module.css'
import Footer from '../../Components/Footer/Footer'
import logo from '../../Assets/Logo/logo.png'
import confetti from '../../Assets/images/confetti.png'
import { useMediaQuery } from 'react-responsive'
import MainHeader from '../../Components/Header/MainHeader/MainHeader'
import Header from '../../Components/Header/LoginHeader/Header'
import SmallScreenFooter from '../../Components/Footer/SmallScreenFooter/SmallScreenFooter'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import useProductContext from '../../Hooks/useProductContext'

export default function OrderSuccess() {
    const isMobile = useMediaQuery({ query: '(max-width: 800px)' })
    const navigate = useNavigate()
    const { userId, setUserId } = useProductContext()
    const { id } = useParams()

    useEffect(() => {
        clearCartItems()
    }, [])

    const CLEAR_CART = 'https://backend-musiccart-srinu.onrender.com/api/clear-cartitems'

    function clearCartItems() {
        axios.delete(CLEAR_CART).then((response) => {

        }, (error) => {
            console.log(error)
        })
    }

    return (
        <div>
            {isMobile ? <div>
                <Header />
            </div> : <div className={Style.homeIcon} onClick={() => navigate('/')}>
                <img src={logo} />
            </div>}

            <div className={Style.successCardContainer}>
                <div className={Style.successCard}>
                    <div>
                        <div className={Style.successImage}>
                            <img src={confetti} />
                        </div>
                        <div className={Style.orderPlacedMessage}><h3>Order is placed successfully!</h3></div>
                        <div className={Style.orderPlacedMessage}><span>You will be receiving a conformation email with order details</span></div>
                        <div className={Style.orderPlacedMessage}><button onClick={() => {
                            clearCartItems()
                            navigate('/')
                        }}>Go back to Home page</button></div>
                    </div>
                </div>
            </div>
            {isMobile ?
                <div><SmallScreenFooter /> </div>
                : <div>
                    <Footer />
                </div>}

        </div>
    )
}
