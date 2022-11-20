import axios from "axios";
import React from "react";

const Test = () => {
  axios.get("/http://localhost:8080/api/plant/connect").then((response) => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${response.data.token}`;
  });
  return <div>acces token</div>;
};

export default Test;
