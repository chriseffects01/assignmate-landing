import Assignment from '../model/Assignment.js';
import logger from '#config/logger.js';
//Create
export const createAssignment = async (req, res) => {
  try {
    const data = req.body;
    const userId = req.user?.id || req.user?._id;
    logger.info(userId);
    if (!userId) {
      return res.status(401).json({
        message: 'Unauthorised: No user found on request',
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
    logger.error('Creation Error:', err.message);
  }
};

//Get all
export const getAssignments = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const mongoQuery = {};
    const {
      search = '',
      page = 1,
      limit = 6,
      status = 'all',
      fetchAll = 'false',
    } = req.query;

    if (search) {
      mongoQuery.$or = [
        { title: { $regex: search, $options: 'i' } },
        { courseCode: { $regex: search, $options: 'i' } },
        { course: { $regex: search, $options: 'i' } },
      ];
    }

    if (status !== 'all') {
      mongoQuery.status = status;
    }
    mongoQuery.user = userId;

    if (!userId) {
      return res.status(402).json({
        message: 'Unauthorised access: thief ole',
      });
      // logger.info(userId);
    }

    if (fetchAll === 'true') {
      const data = await Assignment.find(mongoQuery).sort({ updatedAt: -1 });
      return res.status(200).json({
        success: true,
        assignments: data,
        pagination: {
          totalItems: data.length,
          totalPages: 1,
          currentPage: 1,
          itemsPerPage: data.length,
        },
      });
    }

    // === Otherwise === //
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    const assignments = await Assignment.find(mongoQuery)
      .sort({ updatedAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);

    const totalAssignments = await Assignment.countDocuments(mongoQuery);
    const totalPages = Math.ceil(totalAssignments / limitNum);

    return res.status(200).json({
      success: true,
      assignments,
      pagination: {
        totalItems: totalAssignments,
        totalPages,
        currentPage: pageNum,
        itemsPerPage: limitNum,
      },
    });
  } catch (err) {
    logger.error('Backend error from get assignments:', err);
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
    logger.info('Backend fetching ID:', req.params.id);
    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not fouund' });
    }

    res.json(assignment);
  } catch (error) {
    logger.error('Unable to get assignment by id', error);
    return res.status(500).json({ error: error.message });
  }
};

export const updateAssignment = async (req, res) => {
  try {
    //if frontend sent an array
    const data = Array.isArray(req.body) ? req.body[0] : req.body;

    if (data._id) delete data._id;

    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({
        message: 'No assignment found with that id',
      });
    }

    Object.keys(data).forEach(key => {
      assignment[key] = data[key];
    });

    const updated = await assignment.save();

    if (!updated) {
      return res.status(404).json({
        message: 'No assignment found with that ID',
      });
    }

    return res.json(updated);
  } catch (err) {
    logger.error('My Detailed Error:', err.message);
    res.status(500).json({ error: err.message });
  }
};
