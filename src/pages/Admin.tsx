import { tab } from "@testing-library/user-event/dist/tab";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export interface User {
  email: string;
  hash: string;
}

const Admin = () => {
  const [tab, setTab] = useState<User[]>([]);
  let navigate = useNavigate();
  let tokens = localStorage.getItem("tokens");
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/plant/connect/all`, {
        headers: { authorization: `Bearer ${tokens}` },
      })
      .then((response) => {
        console.log(response.data.data);
        setTab(response.data.data);
      });
  }, []);
  console.log(tab);

  if (!tokens) {
    console.log("pas de token");
    navigate("/connect");
  }
  return (
    <div>
      <ul className="stylenone list-group">
        {tab.map((x) => (
          <li className="list-group-item">{x.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
