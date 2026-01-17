import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};

export default ProtectedRoute;
