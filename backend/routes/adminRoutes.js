const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminMiddleware");

const {
  addBus,
  getAllBuses,
  deleteBus,
  analytics,
  getAllBookings,
  getRevenue,
} = require("../controllers/adminController");

router.post("/bus", adminAuth, addBus);
router.get("/buses", adminAuth, getAllBuses);
router.delete("/bus/:id", adminAuth, deleteBus);
router.get("/analytics", adminAuth, analytics);

// ⭐ NEW
router.get("/bookings", adminAuth, getAllBookings);
router.get("/revenue", adminAuth, getRevenue);

module.exports = router;
