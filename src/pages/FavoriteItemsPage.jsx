import React from "react";
import { useSelector } from "react-redux";
import {
  selectAllProducts,
  selectStatusAllProducts,
} from "../redux/productSlice";
import Spinner from "../global/Spinner";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import HomePageFooter from "../components/HomePageFooter";

const FavoriteItemsPage = () => {
  const Products = useSelector(selectAllProducts);
  const statusAllProducts = useSelector(selectStatusAllProducts);
  const favoritesProducts = Products.filter((item) => item.favorite);
  return (
    <div>
      <p className="text-3xl font-semibold text-center">Favorites</p>
      {(statusAllProducts === "loading" || statusAllProducts === "") && (
        <Spinner />
      )}
      {statusAllProducts === "error" && <p>OOPS Something Went Wrong</p>}
      {favoritesProducts.length === 0 && (
        <p className="text-center mt-6 font-semibold">
          There is no items in favorites
        </p>
      )}
      <div className="grid grid-cols-3 gap-4 mt-10 lg:grid-cols-2">
        {favoritesProducts.map((item) => (
          <ProductCard
            title={item.title}
            price={item.price}
            productImage={item.image}
            key={item.id}
            favorite={item.favorite}
            id={item.id}
          />
        ))}
      </div>
      <HomePageFooter />
    </div>
  );
};

export default FavoriteItemsPage;
