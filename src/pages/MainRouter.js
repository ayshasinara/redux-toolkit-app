import React from "react";
import { Routes, Route } from "react-router-dom";
import Cart from "./Cart";
import Home from "./Home";
import Product from "./Product";
function MainRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/product/:id" element={<Product />} />
    </Routes>
  );
}

export default MainRouter;
