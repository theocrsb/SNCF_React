import axios from "axios";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

interface connectProps {
  setRetourRole: React.Dispatch<React.SetStateAction<boolean>>;
  setConnect: React.Dispatch<React.SetStateAction<boolean>>;
}

const Connect = (props: connectProps) => {
  const emailElement = useRef<HTMLInputElement>(null);
  const passwordElement = useRef<HTMLInputElement>(null);
  const [retour, setRetour] = useState<string>("");
  let tokenDecoded;

  const navigate = useNavigate();
  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();
    console.log(emailElement.current?.value);
    console.log(passwordElement.current?.value);
    if (emailElement.current?.value && passwordElement.current?.value) {
      axios
        .post(`http://localhost:8080/api/plant/connect/login`, {
          email: emailElement.current?.value,
          hash: passwordElement.current?.value,
        })
        .then((response) => {
          tokenDecoded = response.data.decoded;
          //console.log("tokenDecoded", JSON.stringify(tokenDecoded.role));
          const tokens = response.data.token;
          localStorage.setItem("tokens", tokens);
          props.setConnect(tokens);
          //on stock le role
          localStorage.setItem("role", JSON.stringify(tokenDecoded.role));

          //console.log(`valeur token connexion`, tokens);
          let exp = response.data.decoded.exp;
          console.log(exp);
          let date = new Date(exp * 1000);
          let heure = date.getHours();
          let minutes = date.getMinutes();

          let heureFin = `${heure}h${minutes} ! `;
          //console.log(heure);
          setRetour(
            ` ${response.data.message}
          jusqu'a ${heureFin}`
          );

          if (JSON.stringify(tokenDecoded.role) === '"admin"') {
            props.setRetourRole(true);
          } else {
            props.setRetourRole(false);
          }

          setTimeout(() => {
            console.log("Retardée de trois seconde.");
            navigate("/home");
          }, 3000);
        })
        .catch((error) => {
          console.log("erreur dans le handleSubmitForm", error);
          setRetour(error.response.data.message);
        });
    }
  };
  return (
    <div>
      <div
        className="textcenter"
        style={{
          fontWeight: "bold",
          margin: 30,
          fontSize: 30,
        }}
      >
        <span>Connexion </span>
      </div>
      <div>
        <form onClick={handleSubmitForm}>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="emailUser"
              placeholder="name@example.com"
              ref={emailElement}
            />
            <label htmlFor="emailUser">Email</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="passwordUser"
              placeholder="Password"
              ref={passwordElement}
            />
            <label htmlFor="passwordUser">Mot de passe</label>
          </div>
          <button className="mt-3 btn btn-primary" type="submit">
            Se connecter
          </button>
        </form>
        <br />
        <div className="textcenter">
          <p>Pas de compte ? </p>
          <NavLink to="/register">
            <button className="mt-3 btn btn-success" type="submit">
              S'inscrire
            </button>
          </NavLink>
        </div>
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

export default Connect;
