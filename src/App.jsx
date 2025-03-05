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
import Register from "./pages/Register";
import Login from "./pages/Login";
import { setUser } from "./lib/slices/userSlice";

const App = () => {
  const ProductCart = useSelector((state) => state.cart.cart);
  const Users = useSelector((state) => state.users.users);
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
      getLocalStorage("users") &&
    dispatch(setUser(getLocalStorage("users")));

    getProducts();
  }, []);
  useEffect(() => {
	setLocalStorage("products", ProductCart);
  setLocalStorage("users", Users);
  }, [ProductCart, Users]);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/filter/:q" element={<Filter />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
};

export default App;
