import React, { useState } from "react";
import "./List.css";
import Navbar from "../../components/navbar/Nav";
import Header from "../../components/header/header";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItems/searchItem";
import useFetch from "../../hooks/useFetch";

const List = () => {
  const location = useLocation();
  const [destination, setDetination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [room, setRoom] = useState(location.state.options.room);
  const [children, setChildren] = useState(location.state.options.children);
  const [adult, setAdult] = useState(location.state.options.adult);

  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const [openDate, setOpenDate] = useState(false);
  const handleOpenDate = () => {
    setOpenDate(!openDate);
  };

  const { data, loading, error, reFetchData } = useFetch(
    `https://reservation-api.onrender.com/api/hotels?City=${destination}&min=${
      min || 0
    }&max=${max || 1000}`
  );
  const handleClick = () => {
    reFetchData();
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="search">Search</h1>
            <div className="textandbox">
              <h4>Destination</h4>
              <input
                type="text"
                className="inputbox"
                defaultValue={`${destination}`}
              />
            </div>
            <div className="textandbox">
              <h4>Check-in Date</h4>
              <input
                type="text"
                className="inputbox"
                onClick={handleOpenDate}
                defaultValue={`${format(
                  dates[0].startDate,
                  "dd/MM/yyyy"
                )} to ${format(dates[0].endDate, "dd/MM/yyyy")}`}
              />
            </div>
            {openDate && (
              <DateRange
                className="date"
                editableDateInputs={true}
                onChange={(item) => setDates([item.selection])}
                moveRangeOnFirstSelection={false}
                minDate={new Date()}
                ranges={dates}
              />
            )}
            <div className="searchOptions">
              <h3>Options</h3>
              <div className="allOptions">
                <div className="item">
                  <span className="paramenter">Min Price (Per Night) $</span>
                  <input
                    type="number"
                    className="parameterBox"
                    onChange={(e) => setMin(e.target.value)}
                  />
                </div>
                <div className="item">
                  <span className="paramenter">Max Price (Per Night)$</span>
                  <input
                    type="number"
                    className="parameterBox"
                    onChange={(e) => setMax(e.target.value)}
                  />
                </div>
                <div className="item">
                  <span className="paramenter">Adult</span>
                  <input
                    type="number"
                    className="parameterBox"
                    defaultValue={`${adult}`}
                    min={1}
                  />
                </div>
                <div className="item">
                  <span className="paramenter">Children</span>
                  <input
                    type="number"
                    className="parameterBox"
                    defaultValue={children}
                    min={0}
                  />
                </div>
                <div className="item">
                  <span className="paramenter">Room</span>
                  <input
                    type="number"
                    className="parameterBox"
                    defaultValue={room}
                    min={1}
                  />
                </div>
              </div>
            </div>
            <button className="searchBtn" onClick={handleClick}>
              Search
            </button>
          </div>
          <div className="listResult">
            {loading ? (
              "loading , Please Wait"
            ) : (
              <>
                {data.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
