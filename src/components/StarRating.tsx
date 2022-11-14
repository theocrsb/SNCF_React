import { useState } from "react";
import { Plante } from "../pages/Home";

interface Listtplantsprops {
  listplantprops: number;
}

const StarRating = (props: Listtplantsprops) => {
  console.log(props.listplantprops);
  const [rating, setRating] = useState(props.listplantprops);
  const [hover, setHover] = useState(0);

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) ? "on" : "off"}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
