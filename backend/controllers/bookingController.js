const Booking = require("../models/Booking");


// 🎟 CREATE BOOKING
exports.createBooking = async (req, res) => {
  try {
    const booking = await Booking.create({
      user: req.user,
      bus: req.body.busId,   // 🔥 important
      seats: req.body.seats,
      journeyDate: req.body.journeyDate,
      totalAmount: req.body.totalAmount,
    });

    res.status(201).json(booking);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Booking failed" });
  }
};




// 🎫 GET SINGLE TICKET
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("bus");

    if (!booking) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // only owner can view
    if (booking.user.toString() !== req.user) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.json(booking);
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: "Ticket not found" });
  }
};



// 📄 GET LOGGED USER BOOKINGS
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user })
      .populate("bus")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};



// ❌ CANCEL BOOKING
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // prevent cancelling others ticket
    if (booking.user.toString() !== req.user) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    booking.status = "CANCELLED";
    await booking.save();

    res.json({ message: "Booking cancelled" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Cancel failed" });
  }
};
