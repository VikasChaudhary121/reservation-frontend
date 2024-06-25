import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import MailList from "../../components/mailList/mailList";
import Navbar from "../../components/navbar/Nav";
import "./hotel.css";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/searchContext";
import { AuthContext } from "../../context/authContext";
import Reserve from "../../components/reserve/reserve";

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  console.log(id);

  const [sliderNumber, setSliderNumber] = useState(0);

  const [openSlider, setOpenSlider] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { dates, options } = useContext(SearchContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const dayDiff = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return dayDiff;
  }
  const numDays = dayDifference(dates[0].endDate, dates[0].startDate);

  const { data, loading, error } = useFetch(
    `https://reservation-api-hag5.onrender.com/api/hotels/find/${id}`
  );

  const handleOpen = (i) => {
    setSliderNumber(i);
    setOpenSlider(!openSlider);
  };

  const handleMove = (param) => {
    let newSlideNumber;

    if (param === "l") {
      newSlideNumber = sliderNumber === 0 ? 5 : sliderNumber - 1;
    } else {
      newSlideNumber = sliderNumber === 5 ? 0 : sliderNumber + 1;
    }
    setSliderNumber(newSlideNumber);
  };

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };
  const Photos = [
    "/agra.jpeg",
    "/gorakhpur.jpeg",
    "/hotel.jpeg",
    "/hydrabad.jpeg",
    "/villas.jpeg",
    "/images.jpeg",
  ];
  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "Loading, Please Wait"
      ) : (
        <div className="hotelContainer">
          {openSlider && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpenSlider(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img src={Photos[sliderNumber]} alt="" className="sliderImg" />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="hotelWrapper">
            <button onClick={handleClick} className="book">
              Reserve or Book Now
            </button>
            <h1 className="hotelTitle">{data.Name}</h1>
            <div className="hotelAdress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.Address}</span>
            </div>
            <span className="hotelDistance">
              Excellent Location - {data.Distance} from center.
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over ${data.CheepestPrice} at this property and get a
              free airport taxi.
            </span>

            <div className="hotelImages">
              {Photos.map((photo, i) => (
                <div className="hotelImgWrapper">
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt="Hotel room"
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsText">
                <h1 className="hotelTitle">Stay In Heart of {data.City}</h1>
                <p className="hotelDesc">{data.Desc}</p>
              </div>
              <div className="hotelDetailsPrice">
                <h2 className="headLine">Perfect For {numDays}-night stay!</h2>
                <p className="about">
                  Located in the real Heart of KraKow, this property has an
                  excellent location score of 9.8!
                </p>
                <h2 className="deatilPrice">
                  <strong>
                    ${numDays * data.CheepestPrice * options.room}
                  </strong>{" "}
                  ({numDays} nights)
                </h2>
                <button onClick={handleClick} className="bookBtn">
                  Reserve or Book Now
                </button>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hotelid={id} />}
    </div>
  );
};

export default Hotel;
