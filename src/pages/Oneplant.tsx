import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, NavLink, useNavigate, useParams } from "react-router-dom";

import { Plante } from "./Home";

const Oneplant = () => {
  const [oneplant, setOneplant] = useState<Plante>();
  const [retour, setRetour] = useState<string>();
  const params = useParams();
  // console.log(params.id);
  const navigate = useNavigate();

  let tokens = localStorage.getItem("tokens");
  useEffect(() => {
    const tokens = localStorage.getItem("tokens");
    axios
      .get(`http://localhost:8080/api/plant/${params.id}`, {
        headers: { authorization: `Bearer ${tokens}` },
      })
      .then((x) => {
        if (x.data.message.toString() === "not verify") {
          localStorage.removeItem("tokens");
        }
        setOneplant(x.data.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(oneplant?.name);
  const handleclickD = () => {
    axios
      .delete(`http://localhost:8080/api/plant/${params.id}`, {
        headers: { authorization: `Bearer ${tokens}` },
      })
      .then((x) => {
        if (x.data.message.toString() === "not verify") {
          localStorage.removeItem("tokens");
        }
        console.log(x.data);
        setRetour(x.data.message);
        setTimeout(() => {
          console.log("Retardée 2 sec.");
          navigate("/home");
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        setRetour(error);
      });
  };

  if (!tokens) {
    console.log("pas de token");
    return <Navigate to="/connect" />;
  }
  return (
    <div>
      <div className="d-flex mt-5 justifycenter">
        <div
          className="card text-center"
          style={{
            width: 210,
            marginRight: 0,
            marginBottom: 0,
            marginTop: 50,
          }}
        >
          <img
            className="card-img-top"
            src={`http://localhost:8080/assets/${oneplant?.url_picture}`}
            alt="plantes"
            width="180px"
            max-height="200"
          />
          <div className="card-body">
            <div className="card-title">{oneplant?.name}</div>
            <div className="">{oneplant?.category}</div>
            <div className="">⭐{oneplant?.rating}</div>

            <div className="d-flex">
              <div
                style={{
                  width: 200,
                  height: 20,
                }}
              >
                💵 {oneplant?.unitprice_ati}€
              </div>
              <input
                type="button"
                id="forMe"
                value="Pour moi !"
                className="btn btn-success text-center"
              />
              <label htmlFor="forMe"></label>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-around">
        <NavLink to={`/update/${oneplant?.id}`}>
          <button type="button" className="btn btn-outline-secondary m-3">
            Update
          </button>
        </NavLink>
        <button
          type="button"
          className="btn btn-outline-secondary m-3"
          onClick={handleclickD}
        >
          Delete
        </button>
      </div>
      <div
        className="textcenter"
        style={{
          fontWeight: "bold",
          margin: 30,
          fontSize: 30,
        }}
      >
        <p>{retour}</p>
      </div>
    </div>
  );
};
export default Oneplant;
