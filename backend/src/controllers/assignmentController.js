import Assignment from '../model/Assignment.js';
import logger from '#config/logger.js';
//Create
export const createAssignment = async (req, res) => {
  try {
    const data = req.body;
    const userId = req.user?.id || req.user?._id;
    if (!userId) {
      logger.error('One idiot dey try CreateAssignments');
      return res.status(401).json({
        message: 'Unauthorised: No user found on request',
      });
    }
    if (data._id) delete data._id;
    const assignment = await Assignment.create({
      ...data,
      user: userId,
    });
    logger.info(
      `[Conroller]: Assignment created successfully - ${assignment.title}`
    );
    res.status(201).json(assignment);
  } catch (err) {
    res.status(500).json({ error: err.message });
    logger.error('Creation Error:', err);
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
      logger.error('One idiot dey try getAssignments');
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

    logger.info('[Contoller]: Assignments fetched successfully');

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
    const userId = req.user?.id || req.user?._id;

    if (!userId) {
      logger.error('One idiot dey try getAssignments');
      return res.status(402).json({
        message: 'Unauthorised access: thief ole',
      });
    }

    const data = Array.isArray(req.body) ? req.body[0] : req.body;

    logger.info('Data received and ready for update');

    if (data._id) delete data._id;

    const assignment = await Assignment.findById(req.params.id);
    logger.info('[Update]: Data prepping for update', data);
    if (!assignment) {
      return res.status(404).json({
        message: 'No assignment found with that id',
      });
    }

    Object.keys(data).forEach(key => {
      assignment[key] = data[key];
    });

    const updated = await assignment.save();

    logger.info('[Updated]: Data updated successfully', updated);

    if (!updated) {
      return res.status(404).json({
        message: 'No assignment found with that ID',
      });
    }

    logger.info('Update complete');

    return res.status(200).json(updated);
  } catch (err) {
    logger.error('My Detailed Error:', err);
    res.status(500).json({ error: err });
  }
};

// Update Assignment Status
export const updateAssigmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user?.id || req.user?._id;

    if (!['draft', 'completed'].includes(status)) {
      logger.error(
        '[statusUpdate]: Please only send either completed or draft'
      );
      return res
        .status(400)
        .json({ success: false, message: 'Invalid assignment status value' });
    }

    const updated = await Assignment.findOneAndUpdate(
      { _id: id, user: userId },
      { $set: { status } },
      { new: true }
    );

    if (!updated) {
      logger.error('[StatusUpdate]: No assignment found to update status');
      return res.status(404).json({
        success: false,
        message: 'Assignment not found',
      });
    }

    return res.status(200).json(updated);
  } catch (err) {
    logger.error('Status update error: ', err);
    return res.status(500).json({ error: err });
  }
};

//Delete Assignment

export const deleteAssignment = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const { id } = req.params;

    logger.info(`[controller]: Deleting assignment ID: ${id}`);

    if (!userId) {
      logger.error('Unauthorized acess');
      return res.status(404).json({
        success: false,
        message: 'This guy why you dey try thief?',
      });
    }

    const assignment = await Assignment.findOneAndDelete({
      _id: id,
      user: userId,
    });

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: 'Assignment not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Assignment deleted successfully',
    });
  } catch (e) {
    logger.error('Backend error from delete assignment:', e);

    return res.status(500).json({
      success: false,
      error: e.message,
      message: 'Failed to delete assignment',
    });
  }
};
