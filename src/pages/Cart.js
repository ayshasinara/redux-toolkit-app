import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Components/Navbar";
import { AiFillStar } from "react-icons/ai";
import randum_id from "random-id";
import { deleteIteamFromCart, getDataToCart } from "../redux/cartSlice";

function Cart() {
  const cartData = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(cartData);
  }, [cartData]);

  const handleDelete = (id) => {
    dispatch(deleteIteamFromCart(id))
      .then(alert("deleted one"))
      .then((res) => {
        return dispatch(getDataToCart());
      });
  };
  const getCount = () => {};
  return (
    <div>
      <Navbar />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 26%)",
          gridGap: "50px",

          paddingLeft: "7%",
        }}
      >
        {cartData.map((e) => {
          return (
            <div
              key={randum_id()}
              style={{
                padding: "5%",
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                // border: "1px solid red",
                // position: "relative ",
              }}
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
                  // margin: "auto",
                  //   paddingTop: "30px",
                  //   paddingBottom: "20px",
                  fontSize: 12,
                }}
              >
                {e?.title}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>Rs: {e?.price}</div>
                <div style={{ display: "flex" }}>
                  <AiFillStar style={{ marginTop: 2 }} />
                  <div>{e?.rating?.rate}</div>
                </div>
              </div>
              <button
                style={{
                  width: "100%",
                  backgroundColor: "red",
                  color: "white ",
                  height: "50px",
                  //   position: "absolute",
                  //   bottom: 5,
                }}
                onClick={() => handleDelete(e.id)}
              >
                Remove from cart
              </button>

              <p>{e.count}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Cart;
