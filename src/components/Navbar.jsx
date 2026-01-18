import React, { useState, useEffect } from "react";
import { Menu, Avatar, Drawer } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  FundOutlined,
  MenuOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import icon from "../images/cryptocurrency.png";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const onAuthPage = location.pathname === "/auth";
  const [loggedIn, setLoggedIn] = useState(
    Boolean(localStorage.getItem("currentUser"))
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setLoggedIn(Boolean(localStorage.getItem("currentUser")));
  }, [location]);

  const handleAuthToggle = () => {
    if (loggedIn) {
      localStorage.removeItem("currentUser");
      setLoggedIn(false);
      navigate("/auth", { replace: true });
      return;
    }
    navigate("/auth");
  };

  let selectedKey = "";
  if (!onAuthPage) {
    if (location.pathname === "/") selectedKey = "home";
    else if (location.pathname.startsWith("/cryptocurrencies"))
      selectedKey = "cryptocurrencies";
    else selectedKey = "";
  }

  const items = [
    ...(!onAuthPage
      ? [
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
        ]
      : []),
    {
      key: "auth",
      icon: null,
      label: onAuthPage ? (
        <span>Welcome to Cryptoverse</span>
      ) : loggedIn ? (
        <a onClick={handleAuthToggle} style={{ cursor: "pointer" }}>
          Logout
        </a>
      ) : (
        <Link to="/auth">Welcome to Cryptoverse</Link>
      ),
    },
  ];

  return (
    <>
      <div className="nav-container">
        <Link to="/" className="logo-banner">
          <Avatar src={icon} size={52} style={{ minWidth: "52px" }} />
          <div className="logo-text-wrapper">
            <h1 className="logo-text-title">Cryptoverse</h1>
          </div>
        </Link>

        {/* Hamburger menu button (mobile only) */}
        <button
          className="hamburger-menu"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <MenuOutlined />
        </button>

        {/* Desktop menu */}
        <div className="nav-menu-desktop">
          <Menu
            theme="dark"
            mode="inline"
            items={items}
            selectedKeys={selectedKey ? [selectedKey] : []}
          />
        </div>
      </div>

      {/* Mobile drawer menu */}
      <Drawer
        title="Menu"
        placement="left"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        closeIcon={<CloseOutlined />}
        bodyStyle={{ padding: 0 }}
      >
        <Menu
          theme="light"
          mode="vertical"
          items={items}
          selectedKeys={selectedKey ? [selectedKey] : []}
          onClick={() => setMobileMenuOpen(false)}
        />
      </Drawer>
    </>
  );
};

export default Navbar;
