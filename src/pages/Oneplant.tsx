import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import StarRating from "../components/StarRating";
import { Plante } from "./Home";

const Oneplant = () => {
  const [oneplant, setOneplant] = useState<Plante>();
  const [retour, setRetour] = useState<string>();
  const params = useParams();
  // console.log(params.id);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/plant/${params.id}`)
      .then((x) => {
        setOneplant(x.data.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(oneplant?.name);
  const handleclickD = () => {
    axios
      .delete<Plante>(`http://localhost:8080/api/plant/${params.id}`)
      .then((x) => {
        console.log(x.statusText);
        setRetour(
          x.statusText + ` : Plant with id : ${params.id} was delete !`
        );
      })
      .catch((error) => {
        console.log(error);
        setRetour(error);
      });
  };
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
        className="text-center"
        style={{
          fontWeight: "bolder",
          fontSize: 40,
          color: "black",
        }}
      >
        {retour}
      </div>
    </div>
  );
};
export default Oneplant;
