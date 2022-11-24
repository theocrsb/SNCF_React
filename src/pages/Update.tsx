import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Plante } from "./Home";

// Reste à ajouter fonctionnalité pour proposer des IMG de plantes !

const Update = () => {
  const [retour, setRetour] = useState("");
  const plantName = useRef<HTMLInputElement>(null);
  const plantPrice = useRef<HTMLInputElement>(null);
  const plantQuantity = useRef<HTMLInputElement>(null);
  const plantCategory = useRef<HTMLInputElement>(null);
  const plantPicture = useRef<HTMLSelectElement>(null);
  const plantRating = useRef<HTMLSelectElement>(null);
  const params = useParams();
  const [listplant, setListplant] = useState<Plante[]>([]);

  let tokens = localStorage.getItem("tokens");
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:8080/api/plant/${params.id}`,
        {
          name: plantName.current?.value,
          unitprice_ati: plantPrice.current?.value,
          quantity: plantQuantity.current?.value,
          category: plantCategory.current?.value,
          rating: plantRating.current?.value,
          url_picture: plantPicture.current?.value,
        },
        {
          headers: { authorization: `Bearer ${tokens}` },
        }
      )
      .then(function (response) {
        if (response.data.message.toString() === "not verify") {
          localStorage.removeItem("tokens");
        }
        console.log("reponse", response.statusText);
        setRetour(response.data.message);
        setTimeout(() => {
          console.log("Retardée de 2 seconde.");
          navigate("/home");
        }, 2000);
      })
      .catch(function (error) {
        console.log("error", error.response.data.message);
        setRetour(error.response.data.message);
        // localStorage.removeItem("tokens");
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/plant`, {
        headers: { authorization: `Bearer ${tokens}` },
      })
      .then(function (response) {
        if (response.data.message.toString() === "not verify") {
          localStorage.removeItem("tokens");
        }
        setListplant(response.data.data);
      })
      .catch(function (error) {
        console.log("error", error);
        setRetour(error);
      });
  }, []);
  // console.log(listplant);

  if (!tokens) {
    console.log("pas de token");
    return <Navigate to="/connect" />;
  }
  return (
    <div className="d-flex justifycenter">
      <div className="w-50 m-3">
        {/* input choix name */}
        <form className="row g-3 needs-validation" onSubmit={handleSubmit}>
          <div className="input-group m-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Name</span>
            </div>
            <input
              type="text"
              className="form-control "
              ref={plantName}
              placeholder="exemple : Monstera Deliciosa"
              required
            />
          </div>

          {/* input choix prix unité */}
          <div className="input-group m-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Unite Price</span>
            </div>
            <input
              type="number"
              className="form-control"
              ref={plantPrice}
              placeholder="50"
              required
            />
          </div>

          {/* input choix quantité */}
          <div className="input-group m-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Quantity</span>
            </div>
            <input
              type="number"
              className="form-control"
              ref={plantQuantity}
              placeholder="1"
              required
            />
          </div>

          {/* input choix categorie */}
          <div className="input-group m-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Category</span>
            </div>
            <input
              type="text"
              className="form-control"
              ref={plantCategory}
              placeholder="araceae"
              required
            />
          </div>

          {/* input choix rating */}
          <div className="input-group m-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Rating</span>
            </div>

            <select
              name="img"
              id="img"
              ref={plantRating}
              className="form-control"
              required
            >
              <option value="1">1/5</option>
              <option value="2">2/5</option>
              <option value="3">3/5</option>
              <option value="4">4/5</option>
              <option value="5">5/5</option>
            </select>
          </div>

          {/* input choix image */}
          <div className="input-group m-3 w-100">
            <div className="input-group-prepend">
              <span className="input-group-text">URL Picture</span>
            </div>

            <select
              name="img"
              id="img"
              ref={plantPicture}
              className="form-control"
              required
            >
              {listplant.map((x, i) => (
                <option key={i} value={x.url_picture}>
                  {x.url_picture}
                </option>
              ))}
            </select>
          </div>

          <div className="d-flex justifycenter mb-3">
            <button
              // onClick={handleSubmit}
              type="submit"
              className="btn btn-secondary btn-lg btn-block"
              value="Update This Plant"
            >
              Update This Plant
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
        </form>
      </div>
    </div>
  );
};

export default Update;
