// import { list_products } from "../data";
import SideBar from "../components/SideBar";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
// import { min } from "lodash";
import axios from "axios";
import { NavLink } from "react-router-dom";

export interface Plante {
  id: string;
  name: string;
  unitprice_ati: number;
  quantity: number;
  category: string;
  rating: number;
  url_picture: string;
}

/**
 * Ici les constantes ou variables dont la modification de valeur ne provoquera pas directement de re-render
 */

// const listePlantes: Plante[] = list_products;
let listePlantes: Plante[] = [];

let checkedCateg: string[] = [];
let retourSearchBar: string = "";
let retourMinMax: number[];
let clickPrice = 0;
const Home = () => {
  const [listPlantDisplayed, setListPlantDisplayed] = useState<Plante[]>([
    ...listePlantes,
  ]);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3004/plants")

  //     .then((x) => {

  //       listePlantes = x.data;
  //       setListPlantDisplayed(x.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });

  // }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/plant")

      .then((x) => {
        // console.log(x.data.data);
        listePlantes = x.data.data;
        setListPlantDisplayed(listePlantes);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // console.log("mon tableau de plantes trié : " + listPlantDisplayed);

  //filtre checkbox
  const handleCheckCategories = (mesCategoriesChecked: string[]) => {
    //console.log("categories checked", mesCategoriesChecked);
    /**
     * Filtrer nos données ici
     */

    checkedCateg = [...mesCategoriesChecked];

    masterFunction();
    // setListPlantDisplayed(xultFilteredPlants); // mettre à jour l'affichage de notre composant en fonction de la valeur de xult
  };

  //filtre SearchBar

  const handleSearchBar = (monRetourSearchBar: string) => {
    //console.log("retour SearchBar", monRetourSearchBar);
    retourSearchBar = monRetourSearchBar;
    masterFunction();
  };

  const handleMinMax = (valueMinMax: number[]) => {
    retourMinMax = valueMinMax;
    masterFunction();
  };

  // Filtre Total (Master function)

  const masterFunction = () => {
    let xultFilteredPlants = [...listePlantes];

    if (checkedCateg.length > 0) {
      xultFilteredPlants = xultFilteredPlants.filter((x) =>
        checkedCateg.includes(x.category)
      );
    }

    if (retourSearchBar) {
      xultFilteredPlants = xultFilteredPlants.filter((x) =>
        x.name.toLocaleLowerCase().includes(retourSearchBar.toLocaleLowerCase())
      );
    }

    if (retourMinMax) {
      xultFilteredPlants = xultFilteredPlants.filter(
        (x) =>
          x.unitprice_ati >= retourMinMax[0] &&
          x.unitprice_ati <= retourMinMax[1]
      );
    }

    setListPlantDisplayed(xultFilteredPlants);
  };

  // Trier par :

  const handleClickPrice = () => {
    let xultFilteredPlants = [...listPlantDisplayed];
    clickPrice = clickPrice + 1;
    console.log(clickPrice);
    if (clickPrice % 2) {
      xultFilteredPlants.sort((a, b) =>
        a.unitprice_ati > b.unitprice_ati ? 1 : -1
      );
      setListPlantDisplayed(xultFilteredPlants);
    } else {
      xultFilteredPlants.sort((a, b) =>
        a.unitprice_ati < b.unitprice_ati ? 1 : -1
      );
      setListPlantDisplayed(xultFilteredPlants);
    }

    console.log(xultFilteredPlants);
  };

  const handleClickAlpha = () => {
    let xultFilteredPlants = [...listPlantDisplayed];
    clickPrice = clickPrice + 1;
    console.log(clickPrice);
    if (clickPrice % 2) {
      xultFilteredPlants.sort((a, b) => (a.name > b.name ? 1 : -1));
      setListPlantDisplayed(xultFilteredPlants);
    } else {
      xultFilteredPlants.sort((a, b) => (a.name < b.name ? 1 : -1));
      setListPlantDisplayed(xultFilteredPlants);
    }
  };

  const handleClickAvis = () => {
    let xultFilteredPlants = [...listPlantDisplayed];
    clickPrice = clickPrice + 1;
    console.log(clickPrice);
    if (clickPrice % 2) {
      xultFilteredPlants.sort((a, b) => (a.rating > b.rating ? 1 : -1));
      setListPlantDisplayed(xultFilteredPlants);
    } else {
      xultFilteredPlants.sort((a, b) => (a.rating < b.rating ? 1 : -1));
      setListPlantDisplayed(xultFilteredPlants);
    }
  };

  return (
    <div className="d-flex align-items-stretch">
      <SideBar
        listElementPlant={listePlantes}
        onChangeCategoriesCheck={handleCheckCategories}
        onChangeMinMax={handleMinMax}
      />

      <div className="">
        <div className="p-3">
          <SearchBar onChangeSearchBar={handleSearchBar} />
        </div>
        <div className="p-3">
          <div>
            Trier par :{"  "}
            <button
              type="button"
              className="btn btn-outline-success"
              onClick={handleClickPrice}
            >
              Prix
            </button>
            <button
              type="button"
              className="btn btn-outline-success"
              onClick={handleClickAlpha}
            >
              Ordre Alpha
            </button>
            <button
              type="button"
              className="btn btn-outline-success"
              onClick={handleClickAvis}
            >
              Avis
            </button>
          </div>
        </div>

        <ul className="d-flex justify-content-between flex-wrap ">
          {listPlantDisplayed.map((plante, i) => (
            <NavLink to={`/home/${plante.id} `} >
              <li
                key={plante.id}
                className="card "
                style={{
                  width: 210,
                  marginRight: 200,
                  marginBottom: 40,
                }}
              >
                <img
                  className="card-img-top"
                  src={`http://localhost:8080/assets/${plante.url_picture}`}
                  alt="plantes"
                  width="180px"
                  max-height="200"
                />
                <div className="card-body">
                  <div className="card-title">{plante.name}</div>
                  <div className="">{plante.category}</div>
                  <div className="">⭐{plante.rating}</div>
                  <div className="d-flex">
                    <div
                      style={{
                        width: 200,
                        height: 20,
                      }}
                    >
                      💵 {plante.unitprice_ati}€
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
              </li>
            </NavLink>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Home;
