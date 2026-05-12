const Assignment = require("../model/Assignment");

//Create
exports.createAssignment = async (req, res) => {
  try {
    const data = req.body;
    if (data._id) delete data._id;
    const assignment = await Assignment.create(data);

    res.status(201).json(assignment);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.error("Creation Error:", err.message);
  }
};

//Get all
exports.getAssignments = async (req, res) => {
  const data = await Assignment.find().sort({ createdAt: -1 });
  res.json(data);
};

//Get one assignment

exports.getAssignment = async (req, res) => {
  const item = await Assignment.findById(req.params.id);
  res.json(item);
};

exports.updateAssignment = async (req, res) => {
  try {
    console.log("ID received", req.params.id);

    console.log("Body received:", req.body);

    //if frontend sent an array
    const data = Array.isArray(req.body) ? req.body[0] : req.body;

    if (data._id) delete data._id;
    console.log("Final data being sent to database:", data);

    const updated = await Assignment.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true, // Bad
    });
    console.log("updated logging", updated);

    if (!updated) {
      return res.status(404).json({
        message: "No assignment found with that ID",
      });
    }
    res.json(updated);
  } catch (err) {
    console.error("My Detailed Error:", err.message);
    res.status(500).json({ error: err.message });
  }

  // const updated = await Assignment.findByIdAndUpdate(req.params.id, req.body, {
  //   new: true,
  // });
  // res.json(updated);
};
