import React, { useEffect, useState } from "react";
import style from "./ProductDetails.module.css";
import MainHeader from "../../Components/Header/MainHeader/MainHeader";
import Footer from "../../Components/Footer/Footer";
import logo from "../../Assets/Logo/logo.png";
import cartIcon from "../../Assets/Icons/cartIcon.png";
import staricon from "../../Assets/Icons/star.png";
import image from "../../Assets/images/dummy.jpg";
import useProductContext from "../../Hooks/useProductContext";
import { useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import MainHeaderSm from "../../Components/Header/SmallScreenMainHeader/MainHeaderSm";
import SmallScreenFooter from "../../Components/Footer/SmallScreenFooter/SmallScreenFooter";
import SimpleSlider from "./ProductsDetailsSm/SimpleSlider";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { ClipLoader } from "react-spinners";

export default function ProductDetails() {
  const {
    item,
    setItem,
    buyNow,
    userId,
    setUserId,
    setBuyNow,
    setTotalPrice,
    Login,
    setLogin,
  } = useProductContext();
  const { id } = useParams();
  const [token, setToken] = useState();
  const [loader, setLoader] = useState(true);
  const val = useMediaQuery({ query: "(max-width: 800px)" });
  const rupeeSymbol = String.fromCharCode(8377);
  const ADD_TO_CART = "https://backend-musiccart-srinu.onrender.com/api/add-to-cart";
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetails();
    const userid = localStorage.getItem("userId");
    setUserId(userid);
    const token = localStorage.getItem("token");

    if (token) {
      const user = jwtDecode(token);

      if (!user) {
        localStorage.removeItem("token");
        setLogin(false);
      } else {
        setLogin(true);
        setToken(token);
      }
    } else {
      setLogin(false);
    }
  }, []);

  const addToCart = async (item) => {
    const updatedItem = { ...item, userId: userId };
    const token = localStorage.getItem("token");

    const headers = {
      token: token,
    };

    axios
      .post(
        ADD_TO_CART,
        {
          item: updatedItem,
        },
        { headers }
      )
      .then(
        (respones) => {
          if (respones?.data?.success) {
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

  const getProductDetails = async (req, res) => {
    axios.get(`https://backend-musiccart-srinu.onrender.com/api/products` + id).then(
      (response) => {
        setLoader(false);
        if (response?.data?.success) {
          setItem(response.data.data);
        }
      },
      (error) => {
        setLoader(false);
      }
    );
  };

  return (
    <div>
      <div>
        <div>{val ? <MainHeaderSm /> : <MainHeader />}</div>

        <div className={style.main}>
          {val ? (
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
                </span>
                <span className={style.home}>{item?.name}</span>
              </div>
              <div className={style.viewCartContainer}>
                <button
                  className={style.cartButton}
                  onClick={() => {
                    if (Login) {
                      navigate(`/viewcart/${userId}`);
                    } else {
                      alert("please login to view cart items");
                    }
                  }}
                >
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

          {val ? (
            ""
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
            </div>
          )}

          {val ? (
            <div>
              <div
                className={style.arrow}
                onClick={() => {
                  navigate(-1);
                }}
              >
                <span class="material-symbols-outlined">arrow_back</span>
              </div>
            </div>
          ) : (
            <div className={style.productHeader}>
              <h3>{item?.description}</h3>
            </div>
          )}

          {loader && (
            <div className={style.loader}>
              <ClipLoader
                color={"black"}
                loading={loader}
                cssOverride={{ marginTop: "10vw" }}
              />
            </div>
          )}

          {!loader && (
            <div className={style.productDetails}>
              {val ? (
                <div>
                  {Login && (
                    <div className={style.buyNowContainer}>
                      <button
                        className={style.buyNow}
                        onClick={() => {
                          if (Login) {
                            setTotalPrice(item?.price);
                            setBuyNow(true);
                            navigate(`/checkout/${userId}`);
                          } else {
                            alert("Please Login first");
                          }
                        }}
                      >
                        {" "}
                        Buy now
                      </button>
                    </div>
                  )}
                  <SimpleSlider />
                </div>
              ) : (
                <div className={style.productImages}>
                  <div className={style.mainImage}>
                    <img src={item?.images[0]}></img>
                  </div>
                  <div className={style.otherImages}>
                    <div className={style.imageOneContainer}>
                      <img
                        src={item?.images[1]}
                        className={style.imageOne}
                      ></img>
                    </div>

                    <div className={style.imageTwoContainer}>
                      <img
                        src={item?.images[2]}
                        className={style.imageTwo}
                      ></img>
                    </div>

                    <div className={style.imageThreeContainer}>
                      <img
                        src={item?.images[3]}
                        className={style.imageThree}
                      ></img>
                    </div>
                  </div>
                </div>
              )}
              <div className={style.aboutProduct}>
                <div>
                  <h3 className={style.itemHeader}>{item?.name}</h3>
                </div>
                <div className={style.ratings}>
                  <div>
                    <img
                      alt="staricon here"
                      className={style.starIcon}
                      src={staricon}
                    />
                    <img
                      alt="staricon here"
                      className={style.starIcon}
                      src={staricon}
                    />
                    <img
                      alt="staricon here"
                      className={style.starIcon}
                      src={staricon}
                    />
                    <img
                      alt="staricon here"
                      className={style.starIcon}
                      src={staricon}
                    />
                    <img
                      alt="staricon here"
                      className={style.starIcon}
                      src={staricon}
                    />
                  </div>
                  <div>(50 customer reviews)</div>
                </div>
                {val ? (
                  <div className={style.description}>{item?.description}</div>
                ) : (
                  ""
                )}
                <div className={style.priceContainer}>
                  <span className={style.smallFont}>Price -</span>{" "}
                  <span className={style.smallFont}>
                    {rupeeSymbol} {item?.price}
                  </span>
                </div>
                <div className={style.headphoneType}>
                  <span className={style.smallFont}>
                    {item?.color} | {item?.type} headphone
                  </span>
                </div>
                <div className={style.aboutItem}>
                  About this item
                  {item?.features.map((feature, index) => (
                    <ul>
                      <li className={style.smallFont}>{feature}</li>
                    </ul>
                  ))}
                </div>
                <div>
                  <div>
                    <span style={{ fontWeight: "600" }}>Available -</span>{" "}
                    <span className={style.smallFont}>{item?.available}</span>
                  </div>
                  <div>
                    <span style={{ fontWeight: "600" }}>Brand -</span>{" "}
                    <span className={style.smallFont}>{item?.brand}</span>
                  </div>
                </div>
                {Login ? (
                  <div className={style.buttons}>
                    <div>
                      <button
                        className={style.addToCart}
                        onClick={(e) => {
                          e.preventDefault();
                          if (Login) {
                            addToCart(item);
                          } else {
                            alert("Please Login first");
                          }
                        }}
                      >
                        {" "}
                        Add to cart
                      </button>
                    </div>
                    <div>
                      <button
                        className={style.buyNow}
                        onClick={() => {
                          if (Login) {
                            setTotalPrice(item?.price);
                            setBuyNow(true);
                            navigate(`/checkout/${userId}`);
                          } else {
                            alert("Please login first");
                          }
                        }}
                      >
                        {" "}
                        Buy now
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <button
                      className={style.addToCart}
                      onClick={(e) => {
                        navigate("/login");
                      }}
                    >
                      {" "}
                      SignUp / Login
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div className={style.footer}>
          {val ? <SmallScreenFooter /> : <Footer />}
        </div>
      </div>
    </div>
  );
}
