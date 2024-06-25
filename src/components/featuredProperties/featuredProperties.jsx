import { StrictMode } from "react";
import "./featuredProperties.css";
import useFetch from "../../hooks/useFetch";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch(
    "https://reservation-api.onrender.com/api/hotels?Featured=false"
  );
  return (
    <div className="featuredProperties">
      {loading ? (
        "Loading, Please Wait"
      ) : (
        <>
          {data.map((item) => (
            <div className="featuredPropertiesItem" key={item._id}>
              <img
                src={item.Photos[0] ? item.Photos[0] : "bangalore.jpeg"}
                alt=""
                className="featuredPropertiesImg"
              />
              <span className="featuredPropertyName">{item.Name}</span>
              <span className="featuredPropertyCity">{item.City}</span>
              <span className="featuredPropertyPrice">
                Starting From {item.CheepestPrice}
              </span>
              {item.Rating && (
                <div className="featuredPropertyRating">
                  <button>{item.Rating}</button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
