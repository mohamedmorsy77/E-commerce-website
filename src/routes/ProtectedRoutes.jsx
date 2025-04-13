import React from "react";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
function ProtectedRoutes({ children }) {
  const { token } = useSelector((state) => state.auth);
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  try {
    const decodeToken = jwtDecode(token);
    const isExpired = decodeToken.exp * 1000 < Date.now();
   
    if (isExpired || decodeToken.role !== "user") {
      return <Navigate to="/login" replace />;
    }
  } catch (error) {
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }
  // if (token) {
  //   return children;
  // }
  return children;
}

export default ProtectedRoutes;
