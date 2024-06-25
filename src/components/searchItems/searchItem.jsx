import { Link } from "react-router-dom";
import "./searchItem.css";

const SearchItem = (item) => {
  return (
    <>
      <div className="searchItem">
        <img
          src={item.item.img ? item.item.img : "images.jpeg"}
          alt=""
          className="searchItemImg"
        />
        <div className="about">
          <h2 className="name">{item.item.Name}</h2>
          <p>{item.item.Distance} from Center</p>
          <button className="taxi">Free Airport Taxi</button>
          <h3>Studio Apartment with Air Conditioning</h3>
          <p>{item.item.Desc}</p>
          <h4 className="cancelation">Free Cancelation</h4>
          <p className="notice">
            You can cancel it later, so lock this great price today!
          </p>
        </div>
        <div className="ratingsandprice">
          {item.Rating && (
            <>
              <div className="rating">
                <span>Excellent</span>
                <button>{item.Rating}</button>
              </div>
            </>
          )}
          <div className="price">
            <h2>${item.item.CheepestPrice}</h2>
            <p>Includes Taxes and fees</p>
            <Link to={`/hotels/${item.item._id}`}>
              <button className="availability">See Availability</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchItem;
