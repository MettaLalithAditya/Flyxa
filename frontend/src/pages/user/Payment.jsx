import { useLocation, useNavigate } from "react-router-dom";
import API from "../../services/api";
import "./Payment.css";

function Payment() {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) return null;

  const { bus, seats, date } = state;
  const totalAmount = seats.length * bus.price;

  // ✅ FAKE PAYMENT
  const loadRazorpay = async () => {
    try {
      const res = await API.post("/bookings/create", {
        busId: bus._id,
        seats,
        journeyDate: date,
        totalAmount,
        paymentId: "FAKE_PAYMENT_" + Date.now(), // mock id
      });

      const bookingId = res.data._id;

      alert("Payment Successful 🎉");
      navigate(`/ticket/${bookingId}`);   // go to ticket page
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };

  return (
    <div className="payment-page">
      <div className="payment-card">
        <h2>Payment</h2>

        <div className="payment-row">
          <span>Bus</span>
          <strong>{bus.busName}</strong>
        </div>

        <div className="payment-row">
          <span>Route</span>
          <strong>
            {bus.from} → {bus.to}
          </strong>
        </div>

        <div className="payment-row">
          <span>Date</span>
          <strong>{date}</strong>
        </div>

        <div className="payment-row">
          <span>Seats</span>
          <strong>{seats.join(", ")}</strong>
        </div>

        <hr />

        <div className="payment-total">
          <span>Total Amount</span>
          <strong>₹{totalAmount}</strong>
        </div>

        <button className="pay-btn" onClick={loadRazorpay}>
          Pay & Confirm
        </button>
      </div>
    </div>
  );
}

export default Payment;
