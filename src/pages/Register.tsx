import axios from "axios";
import React, { FormEvent, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Register = () => {
  const emailElement = useRef<HTMLInputElement>(null);
  const passwordElement = useRef<HTMLInputElement>(null);
  const [retour, setRetour] = useState<string>("");
  let autorisation = "user";
  // navigate pour amener vers un autre lien
  const navigate = useNavigate();

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();
    console.log(emailElement.current?.value);
    console.log(passwordElement.current?.value);
    if (
      emailElement.current?.value &&
      passwordElement.current?.value &&
      autorisation
    ) {
      axios
        .post(`http://localhost:8080/api/plant/connect/register`, {
          email: emailElement.current?.value,
          hash: passwordElement.current?.value,
          autorisation: autorisation,
        })
        .then((response) => {
          console.log(`valeur response`, response);
          setRetour(response.data.message);
          // changement de page 3 sec après
          setTimeout(() => {
            console.log("Retardée de trois seconde.");
            navigate("/connect");
          }, 3000);
        })
        .catch((error) => {
          console.log("erreur dans le handleSubmitForm", error.message);
          // setRetour(error.message);
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
        <form onSubmit={handleSubmitForm}>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="emailUser"
              placeholder="name@example.com"
              ref={emailElement}
              required
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
              required
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
