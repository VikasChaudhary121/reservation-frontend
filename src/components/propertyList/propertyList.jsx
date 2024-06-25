import useFetch from "../../hooks/useFetch";
import "./propertyList.css";

const PropertyList = () => {
  const images = [
    "hotel.jpeg",
    "apartment.jpeg",
    "resort.jpeg",
    "villas.jpeg",
    "cabins.jpeg",
  ];

  const { data, loading, error } = useFetch(
    "https://reservation-api-hag5.onrender.com/api/hotels/countByType"
  );

  return (
    <div className="propertyList">
      {loading ? (
        "LOading Please Wait!"
      ) : (
        <>
          {images.map((image, i) => (
            <div className="propertyListItem" key={i}>
              <img src={image} alt="" className="propertyListImg" />
              <div className="propertyListTitles" key={i}>
                <h1>{data[i]?.type}</h1>
                <h2>
                  {data[i]?.count} {data[i]?.type}
                </h2>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default PropertyList;
