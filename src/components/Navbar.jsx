import React, { useState, useEffect } from "react";
import { Menu, Avatar } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HomeOutlined, FundOutlined } from "@ant-design/icons";
import icon from "../images/cryptocurrency.png";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const onAuthPage = location.pathname === "/auth";

  // track login state
  const [loggedIn, setLoggedIn] = useState(
    Boolean(localStorage.getItem("currentUser"))
  );

  // refresh loggedIn whenever route changes (e.g. after signup/login)
  useEffect(() => {
    setLoggedIn(Boolean(localStorage.getItem("currentUser")));
  }, [location]);

  const handleAuthToggle = () => {
    if (loggedIn) {
      // logout
      localStorage.removeItem("currentUser");
      setLoggedIn(false);
      navigate("/auth", { replace: true });
      return;
    }
    // go to signup/auth page
    navigate("/auth");
  };

  // compute selected key but exclude 'auth' so the auth/logout item never appears selected
  let selectedKey = "";
  if (!onAuthPage) {
    if (location.pathname === "/") selectedKey = "home";
    else if (location.pathname.startsWith("/cryptocurrencies"))
      selectedKey = "cryptocurrencies";
    else selectedKey = ""; // no selection for other routes (like /crypto/:id)
  }

  const items = [
    // show main links only when NOT on the signup page
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
        // on auth page always show welcome text
        <span>Welcome to Cryptoverse</span>
      ) : loggedIn ? (
        // when logged in show Logout (clickable)
        <a onClick={handleAuthToggle} style={{ cursor: "pointer" }}>
          Logout
        </a>
      ) : (
        // when not logged in show link to auth
        <Link to="/auth">Welcome to Cryptoverse</Link>
      ),
    },
  ];

  return (
    <div className="nav-container">
      <Link to="/" className="logo-banner">
        <Avatar src={icon} size={52} style={{ minWidth: "52px" }} />
        <div className="logo-text-wrapper">
          <h1 className="logo-text-title">Cryptoverse</h1>
        </div>
      </Link>

      <Menu
        theme="dark"
        mode="inline"
        items={items}
        selectedKeys={selectedKey ? [selectedKey] : []}
      />
    </div>
  );
};

export default Navbar;
