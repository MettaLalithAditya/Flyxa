import { useEffect, useState } from "react";
import API from "../../services/api";
import "./AdminDashboard.css";

function ViewBuses() {
  const [buses, setBuses] = useState([]);

  // FETCH
  const fetchBuses = async () => {
    try {
      const res = await API.get("/buses");
      setBuses(res.data);
    } catch (err) {
      console.error("Error fetching buses:", err);
    }
  };

  useEffect(() => {
    fetchBuses();
  }, []);

  // DELETE
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this bus?"
    );
    if (!confirmDelete) return;

    try {
      await API.delete(`/buses/${id}`);
      alert("Bus deleted successfully");
      fetchBuses();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="admin-page">
      <h2 className="admin-title">All Buses</h2>

      <div className="bus-grid">
        {buses.map((bus) => (
          <div key={bus._id} className="bus-card">
            <div>
              <strong>{bus.busName}</strong>
              <p>
                {bus.from} → {bus.to}
              </p>
            </div>

            <button onClick={() => handleDelete(bus._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewBuses;
