import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getLorem } from "../redux/loremSlice";
import { AiFillStar } from "react-icons/ai";
import Navbar from "../Components/Navbar";

import { Link, useNavigate } from "react-router-dom";

function Home() {
  const data = useSelector((state) => state.lorem.data);
  const [products, setProducts] = useState([]);
  // const cartData = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLorem());
  }, []);

  const navigate = useNavigate();

  const handleSearch = (e) => {
    let searchQuery = e.target.value;

    console.log("Searcj", searchQuery);
    // setQuery(searchQuery);
    if (searchQuery) {
      const data1 = data.filter((iteam) =>
        iteam.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

      console.log("Data ", data1);
      setProducts(data1);
    } else {
      setProducts(data);
    }
  };

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };
  const optimizedFun = debounce(handleSearch);
  useEffect(() => {
    setProducts(data);
  }, [data]);

  useEffect(() => {
    console.log(products);
  }, [products]);

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
          onChange={optimizedFun}
          type="text"
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
        {products.map((e) => {
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
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
