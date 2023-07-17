import React, { useEffect, useState } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "./redux/store";
import { Route, Routes } from "react-router";
import Homepage from "./pages/Homepage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import FavoriteItemsPage from "./pages/FavoriteItemsPage";
import { fetchAllProducts } from "./redux/productSlice";
import SettingsPage from "./pages/SettingsPage";
import { ToastContainer } from "react-toastify";

const App = () => {
  const [currentTab, setCurrentTab] = useState("all");
  const [sort, setSort] = useState("asc");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts({ currentTab: currentTab, sort: sort }));
  }, [currentTab, sort]);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Homepage
              setCurrentTab={setCurrentTab}
              currentTab={currentTab}
              setSort={setSort}
              sort={sort}
            />
          }
        />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/Cart" element={<CartPage />} />
        <Route path="/save" element={<FavoriteItemsPage />} />
        <Route path="/setting" element={<SettingsPage />} />
      </Routes>
      
    </div>
  );
};

export default App;
