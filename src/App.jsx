import React, { useEffect } from "react";
import { Filter, Home, Navbar } from "./components";
import { Route, Routes } from "react-router-dom";
import {
  setError,
  setIsLoading,
  setProducts,
} from "./lib/slices/productsSlice";
import productsService from "./service/products";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart";
import { getLocalStorage, setLocalStorage } from "./lib/ls";
import { setToCart } from "./lib/slices/cartSlice";


const App = () => {
  const ProductCart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    const getProducts = async () => {
      dispatch(setIsLoading(true));
      try {
        const { data } = await productsService.getAll();
        console.log(data);
        
        dispatch(setProducts(data.products));
        dispatch(setError(null));
      } catch (error) {
        dispatch(setError(error));
      } finally {
        dispatch(setIsLoading(false));
      }
    };
	getLocalStorage("products") &&
	  dispatch(setToCart(getLocalStorage("products")));
    getProducts();
  }, []);
  useEffect(() => {
	setLocalStorage("products", ProductCart);
  }, [ProductCart]);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/filter/:q" element={<Filter />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
};

export default App;
