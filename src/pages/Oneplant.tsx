import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Plante } from "./Home";

const Oneplant = () => {
  const [oneplant, setOneplant] = useState<Plante>();
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
    </div>
  );
};
export default Oneplant;
