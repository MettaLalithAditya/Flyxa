import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import API from "../../services/api";
import "./Ticket.css";

function Ticket() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const printRef = useRef();

  useEffect(() => {
    API.get(`/bookings/${id}`).then((res) => setTicket(res.data));
  }, [id]);

  const handlePrint = () => {
    const content = printRef.current.innerHTML;
    const win = window.open("", "", "width=900,height=700");
    win.document.write(content);
    win.document.close();
    win.print();
  };

  const cancelBooking = async () => {
    try {
      await API.delete(`/bookings/${id}`);
      alert("Booking Cancelled");
      navigate("/my-bookings");
    } catch (err) {
      alert("Cancel failed");
    }
  };

  if (!ticket) return <div className="ticket-page">Loading...</div>;

  return (
    <div className="ticket-page">
      {/* SUCCESS */}
      <div className="success">
        <div className="checkmark">✔</div>
        <p>Payment Successful</p>
      </div>

      {/* BOARDING PASS */}
      <div className="boarding-pass" ref={printRef}>
        <div className="bp-header">
          🚌 Flyxa Boarding Pass
        </div>

        <div className="bp-body">
          <div>
            <span>Bus</span>
            <strong>{ticket.bus.busName}</strong>
          </div>

          <div>
            <span>From</span>
            <strong>{ticket.bus.from}</strong>
          </div>

          <div>
            <span>To</span>
            <strong>{ticket.bus.to}</strong>
          </div>

          <div>
            <span>Date</span>
            <strong>{ticket.journeyDate}</strong>
          </div>

          <div>
            <span>Seats</span>
            <strong>{ticket.seats.join(", ")}</strong>
          </div>

          <div>
            <span>Amount</span>
            <strong>₹{ticket.totalAmount}</strong>
          </div>
        </div>

        {/* QR */}
        <div className="bp-qr">
          <QRCodeCanvas value={`ticket:${ticket._id}`} size={110} />
          <p>Scan at boarding</p>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="ticket-actions">
        <button onClick={handlePrint}>🖨 Print</button>

        {/* NEW BUTTON */}
        <button
          className="dashboard-btn"
          onClick={() => navigate("/dashboard")}
        >
          🏠 Home
        </button>

        <button className="cancel" onClick={cancelBooking}>
          ❌ Cancel
        </button>
      </div>
    </div>
  );
}

export default Ticket;
