import clsx from "clsx";
import filterLines from "../static/icons/filterLines.png";
import React, { useState } from "react";
import { ReactComponent as Search } from "../static/svg/Search.svg";

const HomepageHeader = ({
  currentTab,
  setCurrentTab,
  setSort,
  setSearch,
  search,
}) => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <div className="space-y-3 mt-2">
      <div>
        <p className="text-center text-3xl font-semibold">Discover</p>
      </div>
      <div className="flex items-center justify-center space-x-4 ">
        <div className="bg-gray-100 border flex p-2 space-x-2 rounded-lg">
          <Search className="w-6" />
          <input
            className="w-[300px] text-gray-600 rounded-lg bg-gray-100 focus:outline-none sm:w-[220px]"
            placeholder="Search anything"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="group relative cursor-pointer">
          <div className="bg-black p-2 rounded-lg">
            <img src={filterLines} alt="" />
          </div>
          <div className="group-hover:block hidden absolute w-[200px] right-0 bg-white shadow-xl border rounded  space-y-2 py-2">
            <p
              className="hover:bg-gray-200 p-1 px-2"
              onClick={() => setSort("asc")}
            >
              Sort By Ascending
            </p>
            <p
              className="hover:bg-gray-200 p-1 px-2"
              onClick={() => setSort("desc")}
            >
              Sort By Descending
            </p>
          </div>
        </div>
      </div>
      <div className="flex space-x-4 mt-4 justify-center">
        {tabData.map((item) => (
          <button
            key={item.value}
            onClick={() => setCurrentTab(item.value)}
            className={clsx(
              "rounded-lg font-semibold px-5 py-2",
              currentTab === item.value
                ? "text-white bg-black"
                : "bg-gray-100 text-black"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

const tabData = [
  { label: "All", value: "all" },
  { label: "Men", value: "men" },
  { label: "Women", value: "women" },
];

export default HomepageHeader;
