import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import "./AddBus.css";

function AddBus() {
  const navigate = useNavigate();

  const [bus, setBus] = useState({
    busName: "",
    from: "",
    to: "",
    departureTime: "",
    arrivalTime: "",
    price: "",
    totalSeats: "",
  });

  const handleChange = (e) => {
    setBus({ ...bus, [e.target.name]: e.target.value });
  };

  const addBus = async () => {
    if (
      !bus.busName ||
      !bus.from ||
      !bus.to ||
      !bus.departureTime ||
      !bus.arrivalTime ||
      !bus.price ||
      !bus.totalSeats
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      await API.post("/admin/bus", bus);
      alert("Bus added successfully 🚍");
      navigate("/admin");
    } catch (err) {
      alert("Failed to add bus");
    }
  };

  return (
    <div className="addbus-container">
      <div className="addbus-card">
        <h2>Add New Bus</h2>

        <div className="addbus-grid">
          <input name="busName" placeholder="Bus Name" onChange={handleChange} />
          <input name="from" placeholder="From" onChange={handleChange} />
          <input name="to" placeholder="To" onChange={handleChange} />
          <input name="departureTime" placeholder="Departure Time (e.g. 22:00)" onChange={handleChange} />
          <input name="arrivalTime" placeholder="Arrival Time (e.g. 06:00)" onChange={handleChange} />
          <input name="price" type="number" placeholder="Price" onChange={handleChange} />
          <input name="totalSeats" type="number" placeholder="Total Seats" onChange={handleChange} />
        </div>

        <button onClick={addBus}>Add Bus</button>
      </div>
    </div>
  );
}

export default AddBus;
