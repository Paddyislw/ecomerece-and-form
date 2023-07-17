import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectCartItems } from "../redux/productSlice";
import CartCard from "../components/CartCard";
import back from "../static/icons/back.png";
import bell from "../static/icons/bell.png";
import { useNavigate } from "react-router";
import right from "../static/icons/right.png";

const CartPage = () => {
  const cart = useSelector(selectCartItems);
  const navigate = useNavigate();
  const calculateTotal = () => {
    if (cart.length === 0) {
      return 0;
    } else {
      let total = 0;
      cart.forEach((item) => (total = total + item.price * item.count));
      return total;
    }
  };
  return (
    <div className="">
      <div className="flex justify-between mb-6">
        <img
          src={back}
          alt=""
          className="object-contain cursor-pointer"
          onClick={() => navigate("/")}
        />
        <p className="text-3xl font-semibold">My Cart</p>
        <img src={bell} alt="" className="object-contain cursor-pointer" />
      </div>
      <div className="space-y-2 flex flex-col items-center">
        {cart.length !== 0 &&
          cart.map((item) => (
            <CartCard
              image={item.image}
              title={item.title}
              size={item.size}
              count={item.count}
              price={item.price}
              item={item}
            />
          ))}
        {cart.length === 0 && <p>No Items In Cart</p>}
      </div>
      <div className="w-full fixed bottom-0 flex flex-col item-end">
        <div className="flex justify-between  sm:w-full px-2 py-2 w-[500px] mx-auto">
          <p>Total</p>
          <p>INR:{calculateTotal()}</p>
        </div>
        <div className="py-4 border-t border-gray-600">
          <div className="bg-black text-white flex space-x-2 w-[400px] sm:w-[80%] justify-center py-3 items-center mx-auto rounded-lg">
            <button>Checkout</button>
            <img src={right} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
