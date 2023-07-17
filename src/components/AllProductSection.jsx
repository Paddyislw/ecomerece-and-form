import React from "react";
import { useSelector } from "react-redux";
import {
  selectAllProducts,
  selectStatusAllProducts,
} from "../redux/productSlice";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import Spinner from "../global/Spinner";

const AllProductSection = ({ search }) => {
  const Products = useSelector(selectAllProducts);
  const statusAllProducts = useSelector(selectStatusAllProducts);
  return (
    <div>
      {(statusAllProducts === "loading" || statusAllProducts === "") && (
        <Spinner />
      )}
      {statusAllProducts === "error" && <p>OOPS Something Went Wrong</p>}
      {statusAllProducts === "success" && (
        <div className="grid grid-cols-3 gap-4 mt-10 lg:grid-cols-2">
          {Products.map(
            (item, index) =>
              item.title.toLowerCase().includes(search.toLowerCase()) && (
                <ProductCard
                  title={item.title}
                  price={item.price}
                  productImage={item.image}
                  key={item.id}
                  favorite={item.favorite}
                  id={item.id}
                />
              )
          )}
        </div>
      )}
    </div>
  );
};

export default AllProductSection;
