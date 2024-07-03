import { createContext, useState } from "react";

const ProductContext = createContext();

const Provider = ({ children }) => {
  const [productsData, setProductsData] = useState();
  const [Login, setLogin] = useState(false);
  const [item, setItem] = useState();
  const [buyNow, setBuyNow] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalOrder, setTotalOrder] = useState(0);
  const [userId, setUserId] = useState(0);
  const [searchItem, setSearchItem] = useState("");
  const [home, setHome] = useState(true);
  const [cart, setCart] = useState(false);
  const [loginItem, setloginItem] = useState(false);
  const [isCartEmpty, setIsCartEmpty] = useState(false);
  const [numOfCartItems, setNumOfCartItems] = useState(0);

  const data = {
    productsData,
    setProductsData,
    Login,
    setLogin,
    item,
    setItem,
    buyNow,
    setBuyNow,
    totalPrice,
    setTotalPrice,
    totalOrder,
    setTotalOrder,
    userId,
    setUserId,
    searchItem,
    setSearchItem,
    home,
    setHome,
    cart,
    setCart,
    loginItem,
    setloginItem,
    isCartEmpty,
    setIsCartEmpty,
    numOfCartItems, 
    setNumOfCartItems,
  };

  return (
    <ProductContext.Provider value={data}>{children}</ProductContext.Provider>
  );
};

export { Provider };

export default ProductContext;
