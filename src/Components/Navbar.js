import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Navbar() {
  const cartIteamCount = useSelector((state) => state.cart.cart);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        padding: 30,
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      }}
    >
      <Link to="/">Home</Link>
      <div
        style={{ display: "flex", justifyContent: "space-between", width: 300 }}
      >
        <Link to="/cart">CART</Link>
        <div>{cartIteamCount.length}</div>
      </div>
    </div>
  );
}

export default Navbar;
