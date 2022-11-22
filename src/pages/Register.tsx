import axios from "axios";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

const Register = () => {
  const emailElement = useRef<HTMLInputElement>(null);
  const passwordElement = useRef<HTMLInputElement>(null);
  const [retour, setRetour] = useState<string>("");

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();
    console.log(emailElement.current?.value);
    console.log(passwordElement.current?.value);
    if (emailElement.current?.value && passwordElement.current?.value) {
      axios
        .post(`http://localhost:8080/api/plant/connect/register`, {
          email: emailElement.current?.value,
          hash: passwordElement.current?.value,
        })
        .then((response) => {
          console.log(`valeur response`, response);
          setRetour(response.data.message);
        })
        .catch((error) => {
          console.log("erreur dans le handleSubmitForm", error);
          setRetour(error.data.message);
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
        <span>Inscription </span>
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
            S'inscrire
          </button>
        </form>
        <div className="textcenter">
          <NavLink to="/connect">
            <button className="mt-3 btn btn-success" type="submit">
              Sign in
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

export default Register;
