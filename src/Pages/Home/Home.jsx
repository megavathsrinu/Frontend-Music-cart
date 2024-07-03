import React, { useEffect, useState } from "react";
import MainHeader from "../../Components/Header/MainHeader/MainHeader";
import style from "./Home.module.css";
import logo from "../../Assets/Logo/logo.png";
import cartIcon from "../../Assets/Icons/cartIcon.png";
import titleBackground from "../../Assets/images/titleBackground.png";
import titleIcon from "../../Assets/images/headphones.png";
import searchIcon from "../../Assets/Icons/searchIcon.png";
import gridIcon from "../../Assets/Icons/gridIcon.png";
import listIcon from "../../Assets/Icons/listIcon.png";
import unselectedGrid from "../../Assets/Icons/unselectedGrid.png";
import selectedList from "../../Assets/Icons/selectedList.png";
import ProductsList from "../../Components/ProductsList/GridView/ProductsList";
import MainHeaderSm from "../../Components/Header/SmallScreenMainHeader/MainHeaderSm";
import SmallScreenFooter from "../../Components/Footer/SmallScreenFooter/SmallScreenFooter";
import ListView from "../../Components/ProductsList/ListView/ListView";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useProductContext from "../../Hooks/useProductContext";
import Footer from "../../Components/Footer/Footer";
import { jwtDecode } from "jwt-decode";
import { useMediaQuery } from "react-responsive";
import { ClipLoader } from "react-spinners";

export default function Home() {
  const isMobile = useMediaQuery({ query: "(max-width: 800px)" });

  let GET_PRODUCTS = "https://backend-musiccart-srinu.onrender.com/api/products";

  const [company, setCompany] = useState("company");
  const [type, setType] = useState("headphone");
  const [color, setColor] = useState("color");
  const [price, setPrice] = useState("price");
  const [sortBy, setSortBy] = useState("sortBy");
  const [dataFound, setDataFound] = useState();
  const [loader, setLoader] = useState(true);

  const [sortby, setSortBySm] = useState("sortby");

  const {
    productsData,
    setProductsData,
    setBuyNow,
    searchItem,
    setSearchItem,
    Login,
    setLogin,
    setHome,
    setCart,
    setloginItem,
    setUserId,
    userId
  } = useProductContext();

  useEffect(() => {
    const id = localStorage.getItem("userId");
    setUserId(id)
    fetchData();
    setHome(true);
    setCart(false);
    setloginItem(false);
  }, [type, company, color, price, sortBy, searchItem, sortby]);

  const queryParams = new URLSearchParams();
  const headphoneType = "type";

  const companyParam = "brand";

  const colorParam = "color";

  const priceParam = "price";

  const minPriceParam = "minPrice";

  const maxPriceParam = "maxPrice";

  const sortByParam = "sort";

  const featuredParam = "featured";

  const [gridView, setGridView] = useState(true);

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const user = jwtDecode(token);

      if (!user) {
        localStorage.removeItem("token");
        setLogin(false);
      } else {
        setLogin(true);
      }
    } else {
      setLogin(false);
    }
  }, []);

  function getUrl() {

    if (searchItem.length > 0) {
      queryParams.append("searchItem", searchItem);
    }

    if (type !== "headphone") {
      if (type === "featured") {
        queryParams.append(featuredParam, true);
      } else {
        queryParams.append(headphoneType, type);
      }
    }

    if (company !== "company") {
      if (company === "featured") {
        queryParams.append(featuredParam, true);
      } else {
        queryParams.append(companyParam, company);
      }
    }

    if (color !== "color") {
      if (color === "featured") {
        queryParams.append(featuredParam, true);
      } else {
        queryParams.append(colorParam, color);
      }
    }

    if (price === "1000") {
      queryParams.append(minPriceParam, 0);
      queryParams.append(maxPriceParam, 1000);
    } else if (price === "10000") {
      queryParams.append(minPriceParam, 1000);
      queryParams.append(maxPriceParam, 10000);
    } else if (price === "20000") {
      queryParams.append(minPriceParam, 10000);
      queryParams.append(maxPriceParam, 20000);
    } else {
    }

    if (sortBy === "lowest") {
      queryParams.append(sortByParam, "price");
    } else if (sortBy === "highest") {
      queryParams.append(sortByParam, "-price");
    } else if (sortBy === "A-Z") {
      queryParams.append(sortByParam, "name_asc");
    } else if (sortBy === "Z-A") {
      queryParams.append(sortByParam, "name_des");
    } else if (sortBy === "featured") {
      queryParams.append(sortByParam, "featured");
    } else {
    }

    if (sortby === "lowest") {
      queryParams.append(sortByParam, "price");
    } else if (sortby === "highest") {
      queryParams.append(sortByParam, "-price");
    } else if (sortby === "A-Z") {
      queryParams.append(sortByParam, "name_asc");
    } else if (sortby === "Z-A") {
      queryParams.append(sortByParam, "name_des");
    } else if (sortby === "featured") {
      queryParams.append(sortByParam, "featured");
    } else {
    }

    const url = `${GET_PRODUCTS}?${queryParams.toString()}`;

    return url;
  }

  const fetchData = async () => {
    const queryUrl = getUrl();

    axios.get(queryUrl).then(
      (response) => {
        setLoader(false);
        if (response?.data?.success) {
          const data = response?.data;
          if (data?.data?.length === 0) {
            setDataFound(false);
          } else {
            setDataFound(true);
          }
          setProductsData(data);
        }
      },
      (error) => {
        setError(error);
        setLoader(false);
      }
    );
  };

  return (
    <div className={style.outer}>
      <div>
        {isMobile ? <MainHeaderSm /> : <MainHeader />}
        <div className={style.main}>
          {/* Home and add to cart container */}
          {isMobile ? (
            ""
          ) : (
            <div className={style.homeContainer}>
              <div className={style.logoContainer}>
                <img src={logo} alt="Logo Here" className={style.logo}></img>
                <span className={style.home}>Home</span>
              </div>
              <div className={style.viewCartContainer}>
                <button
                  className={style.cartButton}
                  onClick={() => {
                    if (Login) {
                      setBuyNow(false);
                      navigate(`/viewcart/${userId}`);
                    } else {
                      alert("please login to view cartitems");
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

          {/* Code for title container  */}
          <div
            className={style.titleContainer}
            style={{ backgroundImage: `url(${titleBackground})` }}
          >
            <div className={style.title}>
              <div>
                <div className={style.titleText}>
                  Grab upto 50% off on <br></br> Selected headphones
                </div>
                <button className={style.buyNow}>Buy Now</button>
              </div>
            </div>

            <img className={style.icon} src={titleIcon} alt="icon here"></img>
          </div>

          {/* Search Bar */}
          {isMobile ? (
            ""
          ) : (
            <div className={style.inputContainer}>
              <img className={style.searchIcon} src={searchIcon}></img>
              <input
                type="text"
                className={style.input}
                placeholder="Search Product"
                onChange={(e) => {
                  setSearchItem(e.target.value);
                }}
              ></input>
            </div>
          )}

          {/* Listview Gridview filters header */}
          <div className={style.filtersContainer}>
            {isMobile ? (
              <div>
                <div className={style.smfiltersContainer}>
                  <div>
                    <label>
                      <select
                        name="sort by"
                        id="sort by"
                        className={style.selectSortBy}
                        value={sortby}
                        onChange={(e) => setSortBySm(e.target.value)}
                      >
                        <option hidden value={"sortby"}>
                          Sort by
                        </option>
                        <option value={"featured"}>Featured</option>
                        <option value={"lowest"}>Price:Lowest</option>
                        <option value={"highest"}>Price:Highest</option>
                        <option value={"A-Z"}>Name:(A-Z)</option>
                        <option value={"Z-A"}>Name:(Z-A)</option>
                      </select>
                    </label>
                  </div>

                  <div>
                    <select
                      name="headphone-type"
                      id="headphoneType"
                      className={style.select}
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option value={"headphone"} disabled hidden>
                        Headphone type
                      </option>
                      <option value={"featured"}>Featured</option>
                      <option value={"In ear"}>In-ear headphone</option>
                      <option value={"on ear"}>On-ear headphone</option>
                      <option value={"over ear"}>Over-ear headphone</option>
                    </select>
                  </div>

                  <div>
                    <select
                      name="company"
                      id="company"
                      className={style.select}
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    >
                      <option value={"company"} disabled hidden>
                        Company
                      </option>
                      <option value={"featured"}>Featured</option>
                      <option value={"JBL"}>JBL</option>
                      <option value={"Sony"}>Sony</option>
                      <option value={"Boat"}>Boat</option>
                      <option value={"Zebronics"}>Zebronics</option>
                      <option value={"Marshall"}>Marshall</option>
                      <option value={"Ptron"}>Ptron</option>
                    </select>
                  </div>

                  <div>
                    <select
                      name="color"
                      id="color"
                      className={style.select}
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                    >
                      <option value={"color"} disabled hidden>
                        Colour
                      </option>
                      <option value={"Featured"}>Featured</option>
                      <option value={"Blue"}>Blue</option>
                      <option value={"Black"}>Black</option>
                      <option value={"white"}>White</option>
                      <option value={"brown"}>Brown</option>
                    </select>
                  </div>

                  <div>
                    <select
                      name="price"
                      id="price"
                      className={style.select}
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    >
                      <option value={"price"} disabled hidden>
                        Price
                      </option>
                      <option value={"featured"}>Featured</option>
                      <option value={"1000"}>0-1000</option>
                      <option value={"10000"}>1000-10,000</option>
                      <option value={"20000"}>10,1000-20,000</option>
                    </select>{" "}
                  </div>
                </div>
              </div>
            ) : (
              <div className={style.viewsContainer}>
                <img
                  className={style.gridIcon}
                  src={gridView ? gridIcon : unselectedGrid}
                  alt="grid icon here"
                  onClick={(e) => {
                    setGridView(true);
                  }}
                ></img>
                <img
                  className={style.listIcon}
                  src={gridView ? listIcon : selectedList}
                  alt="list icon here"
                  onClick={(e) => {
                    setGridView(false);
                  }}
                ></img>
              </div>
            )}

            {isMobile ? (
              ""
            ) : (
              <div>
                <select
                  name="headphone-type"
                  id="headphoneType"
                  className={style.select}
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value={"headphone"} disabled hidden>
                    Headphone type
                  </option>
                  <option value={"featured"}>Featured</option>
                  <option value={"In ear"}>In-ear headphone</option>
                  <option value={"on ear"}>On-ear headphone</option>
                  <option value={"over ear"}>Over-ear headphone</option>
                </select>

                <select
                  name="company"
                  id="company"
                  className={style.select}
                  value={company}
                  onChange={(e) => {
                    setCompany(e.target.value);
                  }}
                >
                  <option value={"company"} disabled hidden>
                    Company
                  </option>
                  <option value={"featured"}>Featured</option>
                  <option value={"JBL"}>JBL</option>
                  <option value={"Sony"}>Sony</option>
                  <option value={"Boat"}>Boat</option>
                  <option value={"Zebronics"}>Zebronics</option>
                  <option value={"Marshall"}>Marshall</option>
                  <option value={"Ptron"}>Ptron</option>
                </select>

                <select
                  name="color"
                  id="color"
                  className={style.select}
                  value={color}
                  onChange={(e) => {
                    setColor(e.target.value);
                  }}
                >
                  <option value={"color"} disabled hidden>
                    Colour
                  </option>
                  <option value={"featured"}>Featured</option>
                  <option value={"Blue"}>Blue</option>
                  <option value={"Black"}>Black</option>
                  <option value={"white"}>White</option>
                  <option value={"brown"}>Brown</option>
                </select>

                <select
                  name="price"
                  id="price"
                  className={style.select}
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                >
                  <option value={"price"} disabled selected hidden>
                    Price
                  </option>
                  <option value={"featured"}>Featured</option>
                  <option value={"1000"}>0-1000</option>
                  <option value={"10000"}>1000-10,000</option>
                  <option value={"20000"}>10,1000-20,000</option>
                </select>
              </div>
            )}
            {/* sort by */}

            {isMobile ? (
              " "
            ) : (
              <div className={style.sortby}>
                <label>
                  Sort by:
                  <select
                    name="headphone-type"
                    id="headphoneType"
                    className={style.selectSortBy}
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value);
                    }}
                  >
                    <option disabled hidden value={"sortBy"}></option>
                    <option value={"featured"}>Featured</option>
                    <option value={"lowest"}>Price:Lowest</option>
                    <option value={"highest"}>Price:Highest</option>
                    <option value={"A-Z"}>Name:(A-Z)</option>
                    <option value={"Z-A"}>Name:(Z-A)</option>
                  </select>
                </label>
              </div>
            )}
          </div>

          <div className={style.productsContainer}>
            {loader && (
              <div className={style.loader}>
                <ClipLoader
                  color={"black"}
                  loading={loader}
                  cssOverride={{ marginTop: "7vw" }}
                />
              </div>
            )}
            {dataFound ? (
              <div className={style.productsList}>
                {gridView ? (
                  <ProductsList data={productsData} />
                ) : (
                  <ListView data={productsData} />
                )}
              </div>
            ) : (
              !loader && (
                <div className={style.no_results}>
                  <p>No such results found!</p>
                </div>
              )
            )}
          </div>
        </div>
        <div className={style.footer}>
          {isMobile ? <SmallScreenFooter /> : <Footer />}
        </div>
      </div>
    </div>
  );
}
