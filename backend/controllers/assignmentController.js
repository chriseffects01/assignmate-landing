import Assignment from "../model/Assignment.js";

//Create
export const createAssignment = async (req, res) => {
  try {
    const data = req.body;
    const userId = req.user?.id || req.user?._id;
    console.log(userId);
    if (!userId) {
      return res.status(401).json({
        message: "Unauthorised: No user found on request",
      });
    }
    if (data._id) delete data._id;
    const assignment = await Assignment.create({
      ...data,
      user: userId,
    });

    res.status(201).json(assignment);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.error("Creation Error:", err.message);
  }
};

//Get all
export const getAssignments = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;

    if (!userId) {
      return res.status(402).json({
        message: "Unauthorised access: thief ole",
      });
      // console.log(userId);
    }
    const data = await Assignment.find({
      user: userId,
    }).sort({ createdAt: -1 });
    return res.json(data).status(200);
  } catch (err) {
    console.error("Backend error from get assignments:", err);
    return res
      .json({
        error: err.message,
      })
      .status(500);
  }
};

//Get one assignment

export const getAssignmentById = async (req, res) => {
  try {
    console.log("Backend fetching ID:", req.params.id);
    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not fouund" });
    }

    res.json(assignment);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateAssignment = async (req, res) => {
  try {
    console.log("ID received", req.params.id);

    console.log("Body received:", req.body);

    //if frontend sent an array
    const data = Array.isArray(req.body) ? req.body[0] : req.body;

    if (data._id) delete data._id;
    console.log("Final data being sent to database:", data);

    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({
        message: "No assignment found with that id",
      });
    }

    Object.keys(data).forEach((key) => {
      assignment[key] = data[key];
    });

    // const updated = await Assignment.findByIdAndUpdate(req.params.id, data, {
    //   returnDocument: "after",
    //   runValidators: true, // Bad
    // });

    const updated = await assignment.save();
    console.log("updated logging", updated);

    if (!updated) {
      return res.status(404).json({
        message: "No assignment found with that ID",
      });
    }

    return res.json(updated);
  } catch (err) {
    console.error("My Detailed Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};
