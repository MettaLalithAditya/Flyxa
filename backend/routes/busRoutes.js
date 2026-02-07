const express = require("express");
const router = express.Router();

const {
  searchBuses,
  getAllBuses,   // ⭐ add this
} = require("../controllers/busController");

router.get("/search", searchBuses);
router.get("/", getAllBuses);   // ⭐ use directly

module.exports = router;
