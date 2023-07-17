import React from "react";
import { useDispatch } from "react-redux";
import {
  addProducts,
  deleteProducts,
  removeProducts,
} from "../redux/productSlice";
import trash from "../static/icons/trash.png";
import { toast } from "react-toastify";

const CartCard = ({ image, title, size, count, price, item }) => {
  const dispatch = useDispatch();
  const removeProductHandler = () => {
    dispatch(removeProducts(item));
  };
  const addProductHandler = () => {
    dispatch(addProducts(item));
  };
  return (
    <div className="bg-gray-100 rounded-lg flex w-[500px] px-2 py-2 space-x-2 sm:w-full">
      <img
        src={image}
        alt=""
        className="w-[80px] h-[80px] object-contain mix-blend-darken border p-2 rounded"
      />
      <div className="flex justify-between grow">
        <div className="flex flex-col">
          <div className="grow">
            <p className="font-semibold">{title}</p>
            <p className="text-gray-500 text-sm">Size:{size}</p>
          </div>
          <p>INR:{price}</p>
        </div>
        <div className="flex flex-col ">
          <p className="text-right grow">
            <img
              src={trash}
              alt=""
              className="ml-auto"
              onClick={() => {
                dispatch(deleteProducts(item.id));
                toast.success("Product Deleted");
              }}
            />
          </p>
          <div className="flex items-center space-x-2">
            <button
              className="border rounded border-gray-600 px-1 text-sm"
              onClick={removeProductHandler}
            >
              -
            </button>
            <p>{count}</p>
            <button
              className="border rounded border-gray-600 px-1 text-sm"
              onClick={addProductHandler}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
