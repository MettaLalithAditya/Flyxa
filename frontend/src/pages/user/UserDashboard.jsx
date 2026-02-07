import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { popularCities } from "../../data/cities";
import "./UserDashboard.css";

function UserDashboard() {
  const navigate = useNavigate();

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);

  const userName = localStorage.getItem("userName");

  const searchBuses = () => {
    if (!from || !to || !date) {
      alert("Please fill all fields");
      return;
    }
    navigate(`/search?from=${from}&to=${to}&date=${date}`);
  };

  const handlePopularRoute = (fromCity, toCity) => {
    const today = new Date().toISOString().split("T")[0];
    navigate(`/search?from=${fromCity}&to=${toCity}&date=${today}`);
  };

  return (
    <div className="dashboard">
      {/* HERO SECTION */}
      <div className="hero">
        <div className="hero-content">

          {userName && (
            <p className="welcome-text">
              Welcome, <strong>{userName}</strong> 👋
            </p>
          )}

          <h1>India's No. 1 Online Bus Ticket Booking</h1>

          {/* SEARCH BAR */}
          <div className="search-bar">

            {/* FROM */}
            <div className="input-group">
             <input
              type="text"
              placeholder="From"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              onFocus={() => setShowFromDropdown(true)}
              onBlur={() => setTimeout(() => setShowFromDropdown(false), 200)}
            />


              {showFromDropdown && (
                <div className="dropdown">
                  <p className="dropdown-title">Popular Cities</p>

                  {popularCities.map((city, index) => (
                    <div
                      key={index}
                      className="dropdown-item"
                      onClick={() => {
                        setFrom(city);
                        setShowFromDropdown(false);
                      }}
                    >
                      {city}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* TO */}
            <div className="input-group">
              <input
                type="text"
                placeholder="To"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                onFocus={() => setShowToDropdown(true)}
                onBlur={() => setTimeout(() => setShowToDropdown(false), 200)}
              />


              {showToDropdown && (
                <div className="dropdown">
                  <p className="dropdown-title">Popular Cities</p>

                  {popularCities.map((city, index) => (
                    <div
                      key={index}
                      className="dropdown-item"
                      onClick={() => {
                        setTo(city);
                        setShowToDropdown(false);
                      }}
                    >
                      {city}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* DATE */}
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            {/* BUTTON */}
            <button onClick={searchBuses}>
              Search Buses
            </button>
          </div>
        </div>
      </div>

      {/* POPULAR ROUTES */}
      <div className="popular">
        <h2>Popular Routes</h2>
        <div className="routes">
          <div onClick={() => handlePopularRoute("Chennai", "Bangalore")}>
            Chennai → Bangalore
          </div>
          <div onClick={() => handlePopularRoute("Hyderabad", "Bangalore")}>
            Hyderabad → Bangalore
          </div>
          <div onClick={() => handlePopularRoute("Mumbai", "Pune")}>
            Mumbai → Pune
          </div>
          <div onClick={() => handlePopularRoute("Delhi", "Jaipur")}>
            Delhi → Jaipur
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
