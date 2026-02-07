import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./SelectSeat.css";

function SelectSeat() {
  const location = useLocation();
  const navigate = useNavigate();

  // 🔐 SAFE ACCESS (prevents crash on refresh)
  const state = location.state;

  useEffect(() => {
    if (!state) {
      navigate("/dashboard");
    }
  }, [state, navigate]);

  if (!state) return null;

  const { bus, date } = state;

  const [selectedSeats, setSelectedSeats] = useState([]);

  // ✅ LOWER + UPPER DECK SEATS
  const lowerSeats = Array.from(
    { length: bus.lowerDeckSeats || 10 },
    (_, i) => `L${i + 1}`
  );

  const upperSeats = Array.from(
    { length: bus.upperDeckSeats || 10 },
    (_, i) => `U${i + 1}`
  );

  const toggleSeat = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat)
        ? prev.filter((s) => s !== seat)
        : [...prev, seat]
    );
  };

  const proceed = () => {
    navigate("/payment", {
      state: {
        bus,
        date,
        seats: selectedSeats,
        totalAmount: selectedSeats.length * bus.price,
      },
    });
  };

  return (
    <div className="seat-page">
      {/* LEFT – SEAT LAYOUT */}
      <div className="seat-layout">
        <h3>Select Seats</h3>

        {/* LOWER DECK */}
        <div className="deck">
          <h4>Lower Deck</h4>
          <div className="seats">
            {lowerSeats.map((seat) => (
              <div
                key={seat}
                className={`seat ${
                  selectedSeats.includes(seat) ? "selected" : ""
                }`}
                onClick={() => toggleSeat(seat)}
              >
                {seat}
              </div>
            ))}
          </div>
        </div>

        {/* UPPER DECK */}
        <div className="deck">
          <h4>Upper Deck</h4>
          <div className="seats">
            {upperSeats.map((seat) => (
              <div
                key={seat}
                className={`seat ${
                  selectedSeats.includes(seat) ? "selected" : ""
                }`}
                onClick={() => toggleSeat(seat)}
              >
                {seat}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT – BUS INFO */}
      <div className="seat-info">
        {/* ✅ CORRECT BUS NAME */}
        <h3>{bus.busName}</h3>

        <p>
          {bus.from} → {bus.to}
        </p>
        <p>
          {bus.departureTime} → {bus.arrivalTime}
        </p>

        <hr />

        <p><strong>Date:</strong> {date}</p>

        <p>
          <strong>Selected Seats:</strong>{" "}
          {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}
        </p>

        <p>
          <strong>Total:</strong> ₹{selectedSeats.length * bus.price}
        </p>

        <button
          disabled={selectedSeats.length === 0}
          onClick={proceed}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}

export default SelectSeat;
