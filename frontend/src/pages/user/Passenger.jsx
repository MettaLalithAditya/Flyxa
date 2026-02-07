import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function Passenger() {
  const navigate = useNavigate();
  const { state } = useLocation();

  // coming from SelectSeat page
  const { bus, selectedSeats, date } = state || {};

  const [passenger, setPassenger] = useState({
    name: "",
    age: "",
    gender: "",
  });

  const handleChange = (e) => {
    setPassenger({
      ...passenger,
      [e.target.name]: e.target.value,
    });
  };

  const proceedToPayment = () => {
    if (!passenger.name || !passenger.age || !passenger.gender) {
      alert("Please fill all passenger details");
      return;
    }

    navigate("/payment", {
      state: {
        bus,
        selectedSeats,
        passenger,
        date,
      },
    });
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Passenger Details</h2>

      <input
        name="name"
        placeholder="Name"
        value={passenger.name}
        onChange={handleChange}
      />
      <br /><br />

      <input
        name="age"
        placeholder="Age"
        value={passenger.age}
        onChange={handleChange}
      />
      <br /><br />

      <select name="gender" onChange={handleChange}>
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      <br /><br />

      <button onClick={proceedToPayment}>
        Proceed to Payment
      </button>
    </div>
  );
}

export default Passenger;
