const Bus = require("../models/Bus");

// SEARCH BUSES
exports.searchBuses = async (req, res) => {
  try {
    const { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({ message: "From and To are required" });
    }

    const buses = await Bus.find({
      from: { $regex: from, $options: "i" },
      to: { $regex: to, $options: "i" },
    });

    res.json(buses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
