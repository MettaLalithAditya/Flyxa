import { useEffect, useState } from "react";
import API from "../../services/api";
import "./AdminDashboard.css"; // make sure this is imported

function ViewBuses() {
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    API.get("/admin/buses").then((res) => setBuses(res.data));
  }, []);

  return (
    <div className="admin-page">
      <h2 className="admin-title">All Buses</h2>

      <div className="bus-grid">
        {buses.map((bus) => (
          <div key={bus._id} className="bus-card">
            <div className="bus-name">{bus.busName}</div>
            <div className="bus-route">
              {bus.from} → {bus.to}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewBuses;
