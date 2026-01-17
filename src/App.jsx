// App.jsx
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Layout, Space, Typography } from "antd";

import Navbar from "./components/Navbar";
import Cryptocurrencies from "./components/Cryptocurrencies";
import CryptoDetails from "./components/CryptoDetails";
import HomePage from "./components/HomePage";
import Auth from "./auth/Auth";
import ProtectedRoute from "./auth/ProtectedRoute"

import "./app.css";

function App() {
  return (
    <div className="app">
      {/* Navbar */}
      <div className="navbar">
        <Navbar />
      </div>

      {/* Main content */}
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              {/* Public route */}
              <Route path="/auth" element={<Auth />} />

              {/* Protected routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cryptocurrencies"
                element={
                  <ProtectedRoute>
                    <Cryptocurrencies />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/crypto/:coinId"
                element={
                  <ProtectedRoute>
                    <CryptoDetails />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </Layout>

        {/* Footer */}
        <div className="footer">
          <Typography.Title
            level={5}
            style={{ color: "white", textAlign: "center" }}
          >
            Cryptoverse <br />
            All rights reserved
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/cryptocurrencies">Cryptocurrencies</Link>
            <Link to="/auth">Login/Signup</Link>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default App;
