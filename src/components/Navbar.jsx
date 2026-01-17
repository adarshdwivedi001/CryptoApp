import React from "react";
import { Menu, Avatar } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
} from "@ant-design/icons";
import icon from "../images/cryptocurrency.png";

const items = [
  {
    key: "home",
    icon: <HomeOutlined />,
    label: <Link to="/">Home</Link>,
  },
  {
    key: "cryptocurrencies",
    icon: <FundOutlined />,
    label: <Link to="/cryptocurrencies">Cryptocurrencies</Link>,
  },
];

const Navbar = () => {
  return (
    <div className="nav-container">
      <Link to="/" className="logo-banner">
        <Avatar src={icon} size={52} style={{ minWidth: "52px" }} />
        <div className="logo-text-wrapper">
          <h1 className="logo-text-title">Cryptoverse</h1>
        </div>
      </Link>

      <Menu theme="dark" mode="inline" items={items} />
    </div>
  );
};

export default Navbar;
