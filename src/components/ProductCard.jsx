import React from "react";
import heart from "../static/icons/heart.png";
import { useDispatch } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../redux/productSlice";
import { Link } from "react-router-dom";
import { ReactComponent as BorderHeart } from "../static/svg/HeartBordered.svg";
import { ReactComponent as RedHeart } from "../static/svg/HeartRed.svg";
import { toast } from "react-toastify";

const ProductCard = ({ productImage, title, price, favorite, id }) => {
  const dispatch = useDispatch();
  const favoriteHandler = () => {
    if (favorite) {
      dispatch(removeFromFavorites(id));
      toast.success("Product Removed From Favorites");
    } else {
      dispatch(addToFavorites(id));
      toast.success("Product Add From Favorites");
    }
  };
  return (
    <div className="w-[320px] rounded-xl space-y-2 relative  cursor-pointer sm:w-[160px] justify-self-center">
      <div className="bg-gray-100 rounded-xl">
        <Link to={`/products/${id}`} className="justify-self-center">
          <img
            src={productImage}
            alt=""
            className="w-[320px] h-[300px] object-contain  mix-blend-darken sm:w-[160px] sm:h-[170px] mx-auto"
          />
        </Link>
      </div>
      <Link to={`/products/${id}`} className="justify-self-center">
        <p className="font-semibold px-2">{title}</p>
      </Link>
      <p className="text-gray-500 px-2">INR {price}</p>
      <div
        onClick={favoriteHandler}
        className="absolute top-0 right-0 w-[40px] h-[40px] border shadow-xl rounded-lg m-2 p-1 bg-white"
      >
        {favorite ? <RedHeart /> : <BorderHeart />}
      </div>
      {/* <img
        src={heart}
        alt=""
        className="absolute top-0 right-0"
        onClick={favoriteHandler}
      /> */}
    </div>
  );
};

export default ProductCard;
