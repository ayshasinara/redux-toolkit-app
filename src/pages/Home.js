import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getLorem } from "../redux/loremSlice";
import { AiFillStar } from "react-icons/ai";
import Navbar from "../Components/Navbar";
import {
  getDataToCart,
  incrementCount,
  updateDataToCart,
} from "../redux/cartSlice";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const data = useSelector((state) => state.lorem.data);
  const cartData = useSelector((state) => state.cart.cart);
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLorem());
  }, []);
  const navigate = useNavigate();
  const handleAdd = (obj) => {
    const found = cartData.some((item) => item.id === obj.id);

    if (!found) {
      dispatch(
        getDataToCart({
          ...obj,
          count: obj?.count ? obj?.count + 1 : 1,
        })
      );
      alert(
        `one iteam added and now you have ${cartData.length + 1} in your cart `
      );
    } else {
      dispatch(
        updateDataToCart(
          // ...obj,
          // count: obj?.count ? obj?.count + 1 : 1,
          found
        )
      );
      alert("This product already existed in your cart ");
    }
  };
  return (
    <div>
      <Navbar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: 50,
        }}
      >
        <input
          placeholder="search..."
          onChange={(e) => setQuery(e.target.value)}
          style={{ width: "60%", height: 40, paddingLeft: 20 }}
        />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 26%)",
          gridGap: "50px",
          paddingLeft: "7%",
        }}
      >
        {data
          .filter((e) => {
            if (query === "") {
              return e;
            } else if (e.title.toLowerCase().includes(query.toLowerCase())) {
              return e;
            }
          })
          .map((e) => {
            return (
              <div
                key={e?.id}
                style={{
                  padding: "5%",
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                }}
                onClick={() => navigate(`/product/${e.id}`, { state: e })}
              >
                <div>
                  <img
                    style={{ width: 200, height: 200, objectFit: "contain" }}
                    src={e?.image}
                  />
                </div>
                <div
                  style={{
                    width: "fit-content",

                    fontSize: 12,
                  }}
                >
                  {e?.title}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "20px",
                  }}
                >
                  <div>Rs: {e?.price}</div>
                  <div style={{ display: "flex" }}>
                    <AiFillStar style={{ marginTop: 2 }} />
                    <div>{e?.rating?.rate}</div>
                  </div>
                </div>
                {/* <button
                  style={{
                    width: "100%",
                    backgroundColor: "black",
                    color: "white ",
                    height: "50px",
                    //   position: "absolute",
                    //   bottom: 5,
                    //   right: 3,
                  }}
                  onClick={() => handleAdd(e)}
                >
                  add to cart
                </button> */}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Home;
