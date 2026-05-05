const Assignment = require("../model/Assignment");

//Create
exports.createAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.create(req.body);
    res.json(assignment);
  } catch (err) {
    res.status(500).json({ error: err.message });
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
  const updated = await Assignment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
};
