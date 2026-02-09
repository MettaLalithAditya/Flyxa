const express = require("express");
const router = express.Router();

const {
  searchBuses,
  getAllBuses,
  deleteBus,
} = require("../controllers/busController");

// SEARCH
router.get("/search", searchBuses);

// GET ALL
router.get("/", getAllBuses);

// DELETE
router.delete("/buses/:id", deleteBus);

module.exports = router;
