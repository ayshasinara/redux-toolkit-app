import { current } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import {
  deleteIteamFromCart,
  getDataToCart,
  updateDataToCart,
} from "../redux/cartSlice";

function Product() {
  const location = useLocation();
  const data = location.state;
  const cartData = useSelector((state) => state.cart.cart);
  const [count, setCount] = useState(0);
  const [price, setPrice] = useState(data?.price);
  const [found, setFound] = useState(false);
  const dispatch = useDispatch();

  const handleAdd = (obj) => {
    const found = cartData.some((item) => item.id === obj.id);

    if (!found) {
      dispatch(
        getDataToCart({
          ...obj,
          count: obj?.count ? obj?.count + count : count > 0 ? count : 1,
        })
      );
      alert(
        `one iteam added and now you have ${cartData.length + 1} in your cart `
      );
    } else {
      let filterCartData = [];
      filterCartData = cartData.filter((iteam) => iteam.id === data.id);

      let temp = filterCartData[0];
      temp = [
        {
          ...filterCartData[0],
          count: count,
        },
      ];
      if (temp[0].count === 0) {
        dispatch(deleteIteamFromCart(temp[0].id));
      } else {
        dispatch(updateDataToCart(temp[0]));
        console.log("Current product", temp);
      }
    }
  };
  useEffect(() => {
    if (cartData.length > 0) {
      const currentObj = cartData.find((e) => e.id === data.id);
      setCount(currentObj?.count);
      console.log(currentObj?.count);
    }
  }, [cartData]);

  useEffect(() => {
    if (count > 0) {
      setPrice(data.price * count);
    }
  }, [count, setPrice]);

  useEffect(() => {
    const found = cartData.some((item) => item.id === data.id);
    console.log("Product found in cart", found);
    if (found) {
      setFound(true);
    } else {
      setCount(0);
    }
  }, []);

  //   const handleSetCurrentdata = () => {
  //     setCrrentCount(count);
  //   };

  //   const handleIncreaseCount = () => {
  //     setCount(count + 1);
  //   };
  //   const handleDecreaseCount = () => {
  //     setCount(count - 1);
  //   };

  //   useEffect(() => {
  //     if (count > 0) {
  //       handleSetCurrentdata();
  //       console.log("Calling use effect");
  //     }
  //   }, [count]);

  return (
    <div>
      <Navbar />
      <div
        style={{
          display: "flex",
          height: "500px",
          //   border: "1px solid red",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          margin: 100,
        }}
      >
        <div
          style={{
            width: 400,
            height: 400,

            boxShadow:
              "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
            margin: 10,
            flex: 1,
          }}
        >
          <img
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            src={data.image}
          />
        </div>
        <div style={{ flex: 1, margin: 50 }}>
          <h1>{data.title}</h1>
          <p>{data.description}</p>
          <h3>Rs. {price}</h3>
          <div style={{ display: "flex  " }}>
            <button
              onClick={() => {
                if (count > 0) {
                  setCount(count - 1);
                }
              }}
            >
              -
            </button>

            <div>{count}</div>
            <button
              onClick={() => {
                setCount(Number(count) + 1);
                console.log(count);
                // if (found) {
                //   handleAdd(data);
                // }
              }}
            >
              +
            </button>
          </div>
          <button
            style={{
              width: "100%",
              backgroundColor: "black",
              color: "white ",
              height: "50px",
            }}
            onClick={() => handleAdd(data)}
          >
            add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
