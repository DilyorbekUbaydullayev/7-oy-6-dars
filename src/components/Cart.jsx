import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, setToCart } from "../lib/slices/cartSlice";
import {setLocalStorage } from "../lib/ls";

function Cart() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.cart);
  if (!products.length)
    return (
      <h1 className="text-xl text-center my-5 text-primary">Cart is empty</h1>
    );
  const handleDelete = (id) => {
    dispatch(removeFromCart(id));
    setLocalStorage("products", products);
  };
  return (
    <div>
      <div className="container mx-auto">
        <div className="flex justify-between items-center mt-10">
        <h1 className="text-4xl font-bold ">Cart</h1>
        <button
          onClick={() => dispatch(setToCart([]))}
          className="bg-red-700 text-white px-5 py-2 rounded-full cursor-pointer"
        >Remove all</button>
        </div>
        <div className="flex flex-col gap-5 my-10">
          {products.map((product) => (
            <div
              key={product.id}
              className="  flex justify-between items-center gap-6 border-2 border-gray-200 p-5 rounded-4xl"
            >
              <div className="w-[20%] aspect-square border-2 border-primary overflow-hidden rounded-2xl p-2">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-full "
                />
              </div>
              <div className="w-[80%]">
                <h2 className="text-xl font-bold mt-5 ">{product.title}</h2>
                <p className="text-gray-500 mt-2 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center mt-5">
                  <p className="text-primary  h-full ">{product.price} $</p>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-700 text-white px-5 py-2 rounded-full cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Cart;
