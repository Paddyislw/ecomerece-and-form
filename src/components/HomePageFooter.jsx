import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as Home } from "../static/svg/Home.svg";
import { ReactComponent as Save } from "../static/svg/HeartBordered.svg";
import { ReactComponent as Cart } from "../static/svg/bag.svg";
import { ReactComponent as Setting } from "../static/svg/setting.svg";
import clsx from "clsx";

const HomePageFooter = () => {
  const {pathname} = useLocation()
  return (
    <div className="flex justify-between fixed bottom-0 bg-gray-50 border-t w-full px-4 py-2 shadow-lg items-center">
      {footerItems.map((item) => (
        <Link to={item.link} key={item.link}>
          <div className={clsx(pathname===item.link?'text-black':'text-gray-400')}>
            {item.icon}
            <p className="font-semibold">{item.title}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

const footerItems = [
  {
    title: "Home",
    link: "/",
    icon: <Home className="w-6 mx-auto" />,
  },
  {
    title: "Save",
    link: "/save",
    icon: <Save className="w-6 mx-auto" />,
  },
  {
    title: "Cart",
    link: "/Cart",
    icon: <Cart className="w-6 mx-auto" />,
  },
  {
    title: "Setting",
    link: "/setting",
    icon: <Setting className="w-6 mx-auto" />,
  },
];

export default HomePageFooter;
