const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  createBooking,
  getBookingById,
  getMyBookings,   // ⭐
  cancelBooking,  // ⭐
} = require("../controllers/bookingController");

// create booking
router.post("/create", auth, createBooking);

// my bookings list
router.get("/my", auth, getMyBookings);

// single ticket
router.get("/:id", auth, getBookingById);

// cancel
router.delete("/:id", auth, cancelBooking);

module.exports = router;
