import axios from "axios";
import React, {
  LegacyRef,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { Navigate, redirect } from "react-router-dom";
import { Plante } from "./Home";

// Reste à ajouter fonctionnalité pour proposer des IMG de plantes !

const Create = () => {
  const [retour, setRetour] = useState("");
  const plantName = useRef<HTMLInputElement>(null);
  const plantPrice = useRef<HTMLInputElement>(null);
  const plantQuantity = useRef<HTMLInputElement>(null);
  const plantCategory = useRef<HTMLInputElement>(null);
  const plantPicture = useRef<HTMLSelectElement>(null);
  const plantRating = useRef<HTMLSelectElement>(null);
  const [listplant, setListplant] = useState<Plante[]>([]);

  let tokens = localStorage.getItem("tokens");
  console.log("token create", tokens);

  const handleSubmit = () => {
    axios
      .post(
        `http://localhost:8080/api/plant`,
        {
          name: plantName.current?.value,
          unitprice_ati: Number(plantPrice.current?.value),
          quantity: Number(plantQuantity.current?.value),
          category: plantCategory.current?.value,
          rating: Number(plantRating.current?.value),
          url_picture: plantPicture.current?.value,
        },
        {
          headers: { authorization: `Bearer ${tokens}` },
        }
      )
      .then(function (response) {
        console.log("reponse de la creation de plante", response.data.message);
        setRetour(response.data.message);
      })
      .catch(function (error) {
        console.log("error" + error);
        setRetour(error.code + " : Please complete all input.");
      });
  };
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/plant`)
      .then(function (response) {
        setListplant(response.data.data);
      })
      .catch(function (error) {
        console.log("error" + error);
      });
  }, []);

  if (!tokens) {
    console.log("pas de token");
    return <Navigate to="/connect" />;
  }
  return (
    <div className="d-flex justifycenter">
      <div className="w-50 m-3">
        {/* input choix name */}
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
          >
            {listplant.map((x, i) => (
              <option key={i} value={x.url_picture}>
                {x.url_picture}
              </option>
            ))}
          </select>
        </div>

        {/* btn Submit */}
        <div className="d-flex justifycenter mb-3">
          <button
            onClick={handleSubmit}
            type="button"
            className="btn btn-secondary btn-lg btn-block"
            value=" Create New Plant"
          >
            Create New Plant
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
    </div>
  );
};

export default Create;
