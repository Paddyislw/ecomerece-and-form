import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../redux/productSlice";
import HomepageHeader from "../components/HomepageHeader";
import HomePageFooter from "../components/HomePageFooter";
import AllProductSection from "../components/AllProductSection";

const Homepage = ({setCurrentTab,currentTab,setSort,sort}) => {
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col h-[100vh]">
      <HomepageHeader
        setCurrentTab={setCurrentTab}
        currentTab={currentTab}
        setSort={setSort}
        sort={sort}
        search={search}
        setSearch={setSearch}
      />
      <div className="grow pb-32">
        <AllProductSection search={search}/>
      </div>
      <HomePageFooter />
    </div>
  );
};

export default Homepage;
