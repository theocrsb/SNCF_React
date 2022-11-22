import React, { useRef, useState } from "react";
import { Navigate, NavLink } from "react-router-dom";

const Selectid = () => {
  const [idplant, setIdplant] = useState<number>();

  let tokens = localStorage.getItem("tokens");
  const handleclick = (e: any) => {
    setIdplant(e.currentTarget.value);
  };

  if (!tokens) {
    console.log("pas de token");
    return <Navigate to="/connect" />;
  }
  return (
    <div>
      <form>
        <div className="textcenter">
          <div className="input-group p-5">
            <div className="input-group-prepend">
              <span className="input-group-text" id="">
                Plant by id
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              id="plantnumber"
              onChange={handleclick}
            />
          </div>
          <button className="btn btn-secondary btn-lg" id="plantnumber">
            <NavLink to={`/home/${idplant}`}>Recherche ta plante !</NavLink>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Selectid;
