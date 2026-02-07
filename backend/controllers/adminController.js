const Bus = require("../models/Bus");
const Booking = require("../models/Booking");


// ➕ ADD BUS
exports.addBus = async (req, res) => {
  try {
    const bus = await Bus.create(req.body);
    res.status(201).json(bus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding bus" });
  }
};


// 📄 GET ALL BUSES
exports.getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find().sort({ createdAt: -1 });
    res.json(buses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching buses" });
  }
};


// ❌ DELETE BUS
exports.deleteBus = async (req, res) => {
  try {
    await Bus.findByIdAndDelete(req.params.id);
    res.json({ message: "Bus deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting bus" });
  }
};


///////////////////////////////////////////////////////////
//////////////////// ADMIN ANALYTICS /////////////////////
///////////////////////////////////////////////////////////

// 📊 Dashboard numbers
exports.analytics = async (req, res) => {
  try {
    const totalBuses = await Bus.countDocuments();
    const totalBookings = await Booking.countDocuments();

    const revenueResult = await Booking.aggregate([
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    // 💰 Revenue per bus
    const revenueByBus = await Booking.aggregate([
      {
        $lookup: {
          from: "buses",
          localField: "bus",
          foreignField: "_id",
          as: "bus",
        },
      },
      { $unwind: "$bus" },
      {
        $group: {
          _id: "$bus.busName",
          total: { $sum: "$totalAmount" },
          bookings: { $sum: 1 },
        },
      },
      { $sort: { total: -1 } },
    ]);

    res.json({
      totalBuses,
      totalBookings,
      revenue: revenueResult[0]?.total || 0,
      revenueByBus,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching analytics" });
  }
};


///////////////////////////////////////////////////////////
//////////////////// BOOKINGS /////////////////////////////
///////////////////////////////////////////////////////////

// 📄 GET ALL BOOKINGS
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("bus")
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching bookings" });
  }
};


///////////////////////////////////////////////////////////
//////////////////// REVENUE //////////////////////////////
///////////////////////////////////////////////////////////

// 💰 TOTAL REVENUE
exports.getRevenue = async (req, res) => {
  try {
    const result = await Booking.aggregate([
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    res.json({ total: result[0]?.total || 0 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error calculating revenue" });
  }
};


// 📅 Revenue by date
exports.getRevenueByDate = async (req, res) => {
  try {
    const revenue = await Booking.aggregate([
      {
        $group: {
          _id: "$journeyDate",
          total: { $sum: "$totalAmount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json(revenue);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching date revenue" });
  }
};
