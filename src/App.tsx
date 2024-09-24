import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./HomePage";
import ProductListPage from "./ProductListPage";
import ProductDetailsPage from "./ProductDetailsPage";
import CartPage from "./cartPage";
import LoginPage from "./LoginPage";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// This is the main component of our application. It sets up the routing
// configuration using React Router.

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="home" element={<HomePage />} />
      <Route element={<Layout />}>
        <Route index element={<ProductListPage />} />
        <Route path="product/:productId" element={<ProductDetailsPage />} />
        <Route path="cart" element={<CartPage />} />
      </Route>
    </Routes>
  </Router>
);

export default App;
