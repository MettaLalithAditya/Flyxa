const express = require("express");
const router = express.Router();
const { searchBuses } = require("../controllers/busController");

router.get("/search", searchBuses);
router.get("/", busController.getAllBuses);


module.exports = router;
