import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProducts,
  fetchSingleProduct,
  selectCurrentProduct,
  selectStatusCurrentProduct,
} from "../redux/productSlice";
import { useLocation, useNavigate } from "react-router";
import clsx from "clsx";
import star from "../static/icons/star.png";
import bag from "../static/icons/bag.png";
import heart from "../static/icons/heart.png";
import back from "../static/icons/back.png";
import bell from "../static/icons/bell.png";
import Spinner from "../global/Spinner";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const productId = pathname.split("/")[2];
  const product = useSelector(selectCurrentProduct);
  const status = useSelector(selectStatusCurrentProduct);
  const [size, setSize] = useState("");

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
  }, []);

  const handleAddToCard = () => {
    if (size === "") {
      toast.error("Select Size To Add Item");
    } else {
      dispatch(addProducts({ ...product, size: size }));
      toast.success("Product added to cart");
    }
  };
  return (
    <div className="px-8 py-4 sm:px-2 h-[100vh] flex flex-col">
      <div className="flex justify-between mb-6 items-center">
        <img
          src={back}
          alt=""
          className="object-contain cursor-pointer"
          onClick={() => navigate("/")}
        />
        <p className="text-3xl font-semibold">Detail</p>
        <img src={bell} alt="" className="object-contain cursor-pointer" />
      </div>
      {(status === "loading" || status === "") && <Spinner />}
      {status === "error" && <p>OOPS Something Went Wrong</p>}
      {status === "success" && (
        <div className="flex lg:items-center sm:flex-col sm:items-start sm:space-y-2 grow">
          <div className="w-[70%] sm:w-full">
            <div className="">
              <img
                src={product.image}
                alt=""
                className="w-[400px] h-[500px] sm:w-[350px] sm:h-[300px] object-contain sm:mx-auto rounded-xl"
              />
            </div>
            <p className="font-semibold text-lg mt-2">{product.title}</p>
            <div className="mb-2 flex items-center space-x-1">
              <img src={star} alt="" />
              <p>
                <span className="font-semibold">{product?.rating?.rate}/5</span>{" "}
                ({product?.rating?.count} reviews)
              </p>
            </div>
            <p className="sm:text-sm text-gray-500">{product.description}</p>
          </div>
          <div className="grow flex flex-col">
            <p className="text-xl font-semibold mb-2">Choose size</p>
            <div className="space-x-2">
              {sizes.map((item) => (
                <button
                  key={item}
                  className={clsx(
                    "py-2 px-4 rounded-lg border font-semibold text-lg",
                    item === size && "bg-black text-white"
                  )}
                  onClick={() => setSize(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="sm:hidden">
              <div>
                <p className="text-gray-500">Price</p>
                <p className="text-3xl font-semibold">INR {product.price}</p>
              </div>
              <Link to={size!=='' && '/Cart'}>
                <div
                  className="bg-black rounded-lg px-6 text-white text-sm py-3 mt-3 flex items-center space-x-2 cursor-pointer w-[200px]"
                  onClick={handleAddToCard}
                >
                  <img src={bag} alt="" />
                  <p>Add to Cart</p>
                </div>
              </Link>
            </div>
          </div>
          <div className="hidden sm:flex justify-between w-full border-t p-2 items-end">
            <div>
              <p className="text-gray-500" style={{ lineHeight: "6px" }}>
                Price
              </p>
              <p className="text-3xl ">INR {product.price}</p>
            </div>
            <Link to={size!=='' && '/Cart'}>
              <div
                className="bg-black rounded-lg px-6 text-white text-sm py-3 mt-3 flex items-center space-x-4 cursor-pointer"
                onClick={handleAddToCard}
              >
                <img src={bag} alt="" />
                <p>Add to Cart</p>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

const sizes = ["S", "M", "L"];

export default ProductPage;
