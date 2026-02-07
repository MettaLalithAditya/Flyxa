import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import "./MyBookings.css";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data } = await API.get("/bookings/my");
      setBookings(data);
    } catch (err) {
      console.error(err);
    }
  };

  const cancelBooking = async (id) => {
    try {
      await API.put(`/bookings/cancel/${id}`);
      alert("Booking cancelled");
      fetchBookings();
    } catch (err) {
      alert("Cancel failed");
    }
  };

  return (
    <div className="my-bookings">
      <h2>🎟 My Bookings</h2>

      {bookings.length === 0 ? (
        <p className="empty">No bookings yet</p>
      ) : (
        <div className="booking-list">
          {bookings.map((b) => (
            <div key={b._id} className="booking-card">
              <div>
                <h3>{b.bus?.busName}</h3>
                <p>
                  {b.bus?.from} → {b.bus?.to}
                </p>
                <p>Date: {b.journeyDate}</p>
                <p>Seats: {b.seats.join(", ")}</p>
                <p>Amount: ₹{b.totalAmount}</p>
                <p className={`status ${b.status?.toLowerCase()}`}>
                  {b.status}
                </p>
              </div>

              <div className="actions">
                {b.status !== "CANCELLED" && (
                  <>
                    <button
                      onClick={() => navigate(`/ticket/${b._id}`)}
                      className="view"
                    >
                      View Ticket
                    </button>

                    <button
                      onClick={() => cancelBooking(b._id)}
                      className="cancel"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;
