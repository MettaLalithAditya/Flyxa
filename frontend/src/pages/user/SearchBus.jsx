import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SearchBus.css";

function SearchBus() {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const from = params.get("from");
  const to = params.get("to");
  const date = params.get("date");

  const [buses, setBuses] = useState([]);

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const res = await fetch(
          `https://flyxa.onrender.com/api/buses/search?from=${from}&to=${to}`
        );

        const data = await res.json();
        setBuses(data);
      } catch (err) {
        console.error("Error fetching buses:", err);
      }
    };

    if (from && to) fetchBuses();
  }, [from, to]);

  return (
    <div className="search-container">
      {/* LEFT FILTERS */}
      <div className="filters">
        <h3>Filter buses</h3>
        <label><input type="checkbox" /> AC</label>
        <label><input type="checkbox" /> Sleeper</label>
        <label><input type="checkbox" /> Seater</label>
        <label><input type="checkbox" /> Non-AC</label>
      </div>

      {/* BUS LIST */}
      <div className="bus-list">
        <h2>Available Buses</h2>

        {buses.length === 0 && (
          <p>No buses found for this route</p>
        )}

        {buses.map((bus) => (
          <div key={bus._id} className="bus-card">
            {/* LEFT */}
            <div className="bus-left">
              <h3 className="bus-name">{bus.busName}</h3>
              <p className="bus-type">A/C Sleeper (2+1)</p>
              <span className="rating">⭐ 4.5</span>
            </div>

            {/* MIDDLE */}
            <div className="bus-middle">
              <h3>{bus.departureTime} → {bus.arrivalTime}</h3>
              <p>{bus.from} → {bus.to}</p>
              <p>{bus.totalSeats} Seats Available</p>
            </div>

            {/* RIGHT */}
            <div className="bus-right">
              <h3>₹{bus.price}</h3>
              <button
                onClick={() =>
                  navigate("/select-seat", {
                    state: { bus, date },
                  })
                }
              >
                View Seats
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchBus;
