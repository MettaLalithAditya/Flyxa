import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalBuses: 0,
    totalBookings: 0,
    revenue: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    API.get("/admin/analytics")
      .then(res => setStats(res.data))
      .catch(() => alert("Failed to load analytics"));
  }, []);

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>

      {/* STATS */}
      <div className="admin-stats">
        <StatCard title="Total Buses" value={stats.totalBuses} />
        <StatCard title="Total Bookings" value={stats.totalBookings} />
        <StatCard title="Revenue" value={`₹${stats.revenue}`} />
      </div>

      {/* ACTIONS */}
      <div className="admin-actions">
      <button onClick={() => navigate("/admin/add-bus")} className="admin-btn">
        ➕ Add Bus
      </button>

      <button onClick={() => navigate("/admin/buses")} className="admin-btn">
        🚌 View Buses
      </button>

      <button onClick={() => navigate("/admin/bookings")} className="admin-btn">
        📄 View Bookings
      </button>

      <button onClick={() => navigate("/admin/revenue")} className="admin-btn">
        💰 View Revenue
      </button>
    </div>

    </div>
  );
}

const StatCard = ({ title, value }) => (
  <div className="stat-card">
    <h3>{title}</h3>
    <p>{value}</p>
  </div>
);

export default AdminDashboard;
