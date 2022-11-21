import axios from "axios";
import React, { FormEvent, useEffect, useRef } from "react";

const Connect = () => {
  const emailElement = useRef<HTMLInputElement>(null);
  const passwordElement = useRef<HTMLInputElement>(null);

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
        .then((x) => {
          console.log(`valeur token`, x.data.token);
          const tokens = x.data.token;
          localStorage.setItem("tokens", tokens);
        })
        .catch((error) => {
          console.log("erreur dans le handleSubmitForm", error);
        });
    }

    // useEffect(() => {
    //   const tokens = localStorage.getItem("tokens");
    //   console.log("token home", tokens);
    //   axios
    //     .get(`http://localhost:8080/api/plant`, {
    //       headers: { authorization: `Bearer ${tokens}` },
    //     })
    //     .then((response) => {
    //       console.log(response);
    //     });
    // }, []);
  };
  return (
    <div>
      <div>CONNECT</div>
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
      </div>
    </div>
  );
};

export default Connect;
