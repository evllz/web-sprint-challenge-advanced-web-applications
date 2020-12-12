import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import axiosWithAuth from "../axiosWithAuth";

const BubblePage = () => {
  const { push } = useHistory();
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    push("/");
  };
  const getData = () => {
    axiosWithAuth()
      .get("/colors")
      .then((res) => {
        setColorList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <button onClick={handleLogout}>Logout</button>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
