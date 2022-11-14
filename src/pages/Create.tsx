import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Plante } from "./Home";

// Reste à ajouter fonctionnalité pour proposer des IMG de plantes !

const Create = () => {
  const [retour, setRetour] = useState("");
  const plantName = useRef<HTMLInputElement>(null);
  const plantPrice = useRef<HTMLInputElement>(null);
  const plantQuantity = useRef<HTMLInputElement>(null);
  const plantCategory = useRef<HTMLInputElement>(null);
  const plantPicture = useRef<HTMLInputElement>(null);
  const plantRating = useRef<HTMLInputElement>(null);
  const [listplant, setListplant] = useState<Plante[]>([]);
  const handleSubmit = () => {
    axios
      .post(`http://localhost:8080/api/plant`, {
        name: plantName.current?.value,
        unitprice_ati: plantPrice.current?.value,
        quantity: plantQuantity.current?.value,
        category: plantCategory.current?.value,
        rating: plantRating.current?.value,
        url_picture: plantPicture.current?.value,
      })
      .then(function (response) {
        // console.log("reponse" + response);
        setRetour(response.statusText + ` : Plant Create !`);
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
  console.log(listplant);

  return (
    <div className="d-flex justifycenter">
      <div className="w-50 m-3">
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
        <div className="input-group m-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Rating</span>
          </div>
          <input
            type="number"
            min={1}
            max={5}
            className="form-control"
            ref={plantRating}
            placeholder="5"
            required
          />
        </div>
        <div className="input-group m-3">
          <div className="input-group-prepend">
            <span className="input-group-text">URL Picture</span>
          </div>
          <label htmlFor="img">
            Choose an image :{" "}
            <select name="img" id="img">
              <option value="">--Please choose an image--</option>
              {listplant.map((x) => (
                <option
                  style={{
                    backgroundImage: `http://localhost:8080/assets/${x.url_picture}`,
                    width: 50,
                    height: 50,
                  }}
                  value={x.url_picture}
                >
                  {x.url_picture}
                </option>
              ))}
            </select>
          </label>
        </div>
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
        n
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
