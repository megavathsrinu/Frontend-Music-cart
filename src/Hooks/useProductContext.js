import { useContext } from "react";
import ProductContext from "../Context/useContext";

const useProductContext = () => {
  return useContext(ProductContext);
};

export default useProductContext;
