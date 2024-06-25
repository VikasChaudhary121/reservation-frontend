import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./reserve.css";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/searchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({ setOpen, hotelid }) => {
  const [selectedRoom, setSelectedRoom] = useState([]);
  const { data, loading, error } = useFetch(
    `http://localhost:8000/api/hotels/rooms/${hotelid}`
  );
  const { dates } = useContext(SearchContext);
  const navigate = useNavigate();

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    let list = [];
    while (date <= end) {
      list.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return list;
  };
  const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate).map(
    (date) => date.getTime()
  );

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      allDates.includes(new Date(date).getTime())
    );
    return !isFound;
  };

  const handleSelect = (event) => {
    const checked = event.target.checked;
    const value = event.target.value;
    setSelectedRoom(
      checked
        ? [...selectedRoom, value]
        : selectedRoom.filter((item) => item !== value)
    );
  };

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRoom.map((roomId) => {
          return axios.put(
            `https://reservation-api-hag5.onrender.com/api/rooms/availability/${roomId}`,
            { dates: allDates }
          );
        })
      );
      setOpen(false); // Close the modal after successful reservation
      alert("Reservation successful!");
      navigate("/");
    } catch (err) {
      alert("Reservation failed!");
    }
  };

  return (
    <div className="reserve">
      <FontAwesomeIcon
        icon={faCircleXmark}
        className="rClose"
        onClick={() => setOpen(false)}
      />
      <div className="rContainer">
        <span>Select your room</span>
        {data &&
          data.map((item) => (
            <div className="rItem" key={item._id}>
              <div className="rItemInfo">
                <div className="rTitle">{item.title}</div>
                <div className="rDesc">{item.Desc}</div>
                <div className="rMax">
                  Max People: <b>{item.maxPeople}</b>
                </div>
                <div className="rPrice">${item.Price}</div>
              </div>
              {item.roomNumbers.map((roomNumber) => (
                <div className="room" key={roomNumber._id}>
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          ))}
        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
