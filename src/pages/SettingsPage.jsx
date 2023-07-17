import React from "react";
import SettingCard from "../components/SettingCard";
import back from "../static/icons/back.png";
import { Link } from "react-router-dom";

const SettingsPage = () => {
  return (
    <div className="">
      <div className="flex items-center space-x-2 pt-2">
        <Link to={'/'}>
          <img src={back} alt="" />
        </Link>
        <p className="font-semibold text-lg">Submit Form</p>
      </div>
      <div>
        <SettingCard />
      </div>
    </div>
  );
};

export default SettingsPage;
