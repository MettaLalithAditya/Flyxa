const Bus = require("../models/Bus");

// SEARCH BUSES
exports.searchBuses = async (req, res) => {
  try {
    let { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({ message: "From and To are required" });
    }

    // trim spaces
    from = from.trim();
    to = to.trim();

    const buses = await Bus.find({
      from: { $regex: `^${from}$`, $options: "i" },
      to: { $regex: `^${to}$`, $options: "i" },
    });

    res.status(200).json(buses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
