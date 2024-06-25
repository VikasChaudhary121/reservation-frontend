import useFetch from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "https://reservation-api-hag5.onrender.com/api/hotels/countByCity?cities=Agra,lucknow,GorakhPur,delhi"
  );

  return (
    <div className="featured">
      {loading ? (
        "Loading Please Wait"
      ) : (
        <>
          <div className="featuredItem">
            <img src="/agra.jpeg" alt="imgage" className="featuredImg" />
            <div className="featuredTitles">
              <h1>Agra</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img src="/lucknow.jpeg" alt="image" className="featuredImg" />
            <div className="featuredTitles">
              <h1>Lucknow</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img src="/gorakhpur.jpeg" alt="" className="featuredImg" />
            <div className="featuredTitles">
              <h1>Gorakhpur</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
          ,
          <div className="featuredItem">
            <img src="/delhi.jpeg" alt="" className="featuredImg" />
            <div className="featuredTitles">
              <h1>Delhi</h1>
              <h2>{data[3]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
