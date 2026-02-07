import { useEffect, useState } from "react";
import API from "../../services/api";
import "./AdminDashboard.css";

function ViewBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    API.get("/admin/bookings").then((res) => setBookings(res.data));
  }, []);

  return (
    <div className="admin-page">
      <h2 className="admin-title">All Bookings</h2>

      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              {/* ✅ NEW COLUMN */}
              <th>User</th>

              <th>Bus</th>
              <th>Route</th>
              <th>Seats</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Booked On</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>
                {/* ✅ SHOW USER */}
                <td>{b.user?.name || "N/A"}</td>

                <td>{b.bus?.busName}</td>

                <td>
                  {b.bus?.from} → {b.bus?.to}
                </td>

                <td>{b.seats.join(", ")}</td>

                <td>{b.journeyDate}</td>

                <td>₹{b.totalAmount}</td>

                <td>{new Date(b.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewBookings;
