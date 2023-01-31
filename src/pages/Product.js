import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { getDataToCart, updateDataToCart } from "../redux/cartSlice";

function Product() {
  const location = useLocation();
  const cartData = useSelector((state) => state.cart.cart);
  const [currentCount, setCrrentCount] = useState();
  const [count, setCount] = useState(0);
  const data = location.state;

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
      dispatch(updateDataToCart(obj));
      //   alert("This product already existed in your cart ");
    }
  };
  useEffect(() => {
    if (cartData.length > 0) {
      const currentObj = cartData.find((e) => e.id === data.id);
      setCrrentCount(currentObj?.count);
      console.log(currentObj);
    }
  }, [cartData]);

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
          <div style={{ display: "flex  " }}>
            <button
              onClick={() => {
                if (count > 0) {
                  return setCount(Number(count - 1));
                }
              }}
            >
              -
            </button>

            <div> {currentCount > 0 ? currentCount : count}</div>
            <button onClick={() => setCount(Number(count) + 1)}>+</button>
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
