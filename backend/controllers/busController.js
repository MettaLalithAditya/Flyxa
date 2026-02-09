const Bus = require("../models/Bus");


// =============================
// SEARCH BUSES
// =============================
exports.searchBuses = async (req, res) => {
  try {
    let { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({ message: "From and To are required" });
    }

    // remove extra spaces
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



// =============================
// GET ALL BUSES (ADMIN)
// =============================
exports.getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find().sort({ createdAt: -1 });
    res.status(200).json(buses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// =============================
// DELETE BUS (ADMIN)
// =============================
exports.deleteBus = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);

    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    await bus.deleteOne();

    res.status(200).json({ message: "Bus deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
