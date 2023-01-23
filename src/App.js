import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getLorem } from "./redux/loremSlice";

function App() {
  const { data } = useSelector((state) => state.lorem);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLorem());
  }, []);
  useEffect(() => {
    console.log(data);
  }, []);
  return (
    <div>
      {data.map((e) => {
        return (
          <div key={e?.id}>
            <div style={{ width: "fit-content", margin: "auto" }}>
              {" "}
              {e.title}
            </div>

            <br />
          </div>
        );
      })}
    </div>
  );
}

export default App;
