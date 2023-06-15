import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

//any time you want to protect a component, you just need to wrap it with this private route

export default function PrivateRoute({ children }) {
  const auth = useAuth();
  return auth.isLoggedIn ? children : <Navigate to="/login" />;
}