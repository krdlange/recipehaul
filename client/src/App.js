import "./App.css";
import React, { useState} from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Register from "./components/Register";
import LoginA from "./components/LoginA";
import PaymentA from "./components/PaymentA";
import RecipesA from "./components/RecipesA";
import ShoppingCart from "./components/ShoppingCart";
import Recipeinfo from "./components/Recipeinfo";
import Admin from "./components/Admin";
import AuthProvider from "./components/AuthProvider";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./components/Profile";
import OrdersDashA from "./components/OrdersDashA";
import SavedRecipes from "./components/SavedRecipes";
import OrderHistory from "./components/OrderHistory";
import PaymentSuccess from "./components/PaymentSuccess";
import 'react-toastify/dist/ReactToastify.css';
import Container from 'react-bootstrap/Container';
import NavBar from "./components/Navbar";



function App() {

  return (
    <AuthProvider>
      <div>
        <NavBar />



      <Routes>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<LoginA />} />
        <Route path="ordersdash" element={
          <PrivateRoute>
            <OrdersDashA/>
          </PrivateRoute>
        }
        />
        <Route path="payment" element={<PaymentA />} />
        <Route path="recipes" element={<RecipesA />} />
        <Route path="saved_recipes" element={<SavedRecipes />} />
        <Route path="shopping" element={<ShoppingCart />} />
        <Route path="recipeinfo/:id" element={<Recipeinfo />} />
        <Route path="profile" element={<Profile />} />
        <Route path="order_history" element={<OrderHistory />} />
{/*         <Route path="ordersdash" element={<OrdersDashA />} /> */}
        <Route path="payment-successful" element={<PaymentSuccess />} />
      </Routes>
    </div>
    </AuthProvider>
  );
}

export default App;
