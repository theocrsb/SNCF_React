import _ from "lodash";
import React, { useState } from "react";
import { Plante } from "../pages/Home";

interface filterSideBarProps {
  listElementPlant: Plante[];
  onChangeCategoriesCheck: { (checkCategories: string[]): void };
  onChangeMinMax: { (min: number[]): void };
}

const SideBar = ({
  listElementPlant,
  onChangeCategoriesCheck,
  onChangeMinMax,
}: filterSideBarProps) => {
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(9999);
  const categories = _.uniq(listElementPlant.map((plante) => plante.category));
  const [checkCategories, setCheckCategories] = useState<string[]>([]);
  const [minMax, setMinMax] = useState<number[]>([0, 0]);

  function handleCheck(e: React.ChangeEvent<HTMLInputElement>) {
    let tab: string[] = [];
    if (e.currentTarget.checked) {
      tab = [...checkCategories, e.currentTarget.value];
    } else {
      tab = [...checkCategories.filter((x) => x !== e.currentTarget.value)];
    }
    setCheckCategories(tab);
    onChangeCategoriesCheck(tab);
  }

  const handleChangeMin = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.valueAsNumber >= 0) {
      // minMax[Min] = e.currentTarget.valueAsNumber;
      setMin(e.currentTarget.valueAsNumber);
    } else {
      setMin(0);
    }
 
  };

  const handleChangeMax = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.valueAsNumber >= 0) {
      setMax(e.currentTarget.valueAsNumber);
    } else {
      setMax(9999);
    }

  };
  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    setMinMax([min, max]);
    onChangeMinMax([min, max]);
  };

  return (
    <div className="custom-side-bar flex-shrink-0 bg-white border-end">
      <div className="p-3 border-bottom">
        <span className="fs-5 fw-semibold">Filtres</span>
      </div>
      <ul className="list-unstyled ps-0">
        <div className="p-3">
          <p className="mb-1 fs-5 fw-semibold">Catégories</p>
          {categories.map((cat, i) => (
            <div className="form-check" key={i}>
              <input
                className="form-check-input"
                type="checkbox"
                value={cat}
                id={cat}
                onChange={handleCheck}
              />
              <label className="form-check-label" htmlFor={cat}>
                {" "}
                {cat}
              </label>
            </div>
          ))}
        </div>
      </ul>
      <ul className="list-unstyled ps-0 border-top">
        <div className="p-3 7">
          <p className="mb-1 fs-5 fw-semibold">Prix</p>
          <div className="d-flex">
            <div className="">
              <input
                style={{
                  width: 100,
                  marginRight: 25,
                }}
                type="number"
                id="min"
                onChange={handleChangeMin}
                placeholder="Min"
              />
              <label htmlFor="min"></label>
            </div>
            <div className="mr-5">
              <input
                style={{
                  width: 100,
                }}
                type="number"
                id="max"
                onChange={handleChangeMax}
                placeholder="Max"
              />
              <label htmlFor="max"></label>
            </div>
          </div>
        </div>
        <div className="text-center">
          <input
            type="button"
            id="btnminmax"
            value="valider"
            onClick={handleClick}
            className="btn btn-success text-center"
          />
          <label htmlFor="btnminmax"></label>
        </div>
      </ul>
      <div className="p-3 7 border-top">
        <p className="mb-1 fs-5 fw-semibold">Avis</p>
        <p
          style={{
            margin: 10,
          }}
        >
          ⭐⭐⭐⭐⭐
        </p>

        <input
          type="button"
          id="avis"
          value="valider"
          className="btn btn-success text-center"
        />
        <label htmlFor="avis"></label>
      </div>
    </div>
  );
};

export default SideBar;
