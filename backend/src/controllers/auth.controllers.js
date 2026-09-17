import User from '../model/user.js';
import { registerUpSchema } from '#validations/auth.validators.js';
import { formatValidation } from '#utils/format.js';
import { loginSchema } from '#validations/auth.validators.js';
import logger from '#config/logger.js';
import { createUser } from '#services/auth.service.js';
import { jwttoken } from '#utils/jwt.js';
import { cookies } from '#utils/cookies.js';
import { compareHashedPassword } from '#services/bcrypt.service.js';
import Assignment from '#model/Assignment.js';

export async function registerUser(req, res, next) {
  try {
    const validationResult = registerUpSchema.safeParse(req.body);

    if (!validationResult.success) {
      logger.error('Error formatting with zod');
      return res.status(400).json({
        error: 'Validation failed',
        details: formatValidation(validationResult.error),
      });
    }
    const { username, email, password } = validationResult.data;

    const user = await createUser({
      username,
      email,
      password,
    });

    // Create token
    const token = jwttoken.sign({ _id: user._id, email: user.email });

    cookies.set(res, 'token', token);

    //return response
    return res.status(201).json({
      // token,
      message: 'User created successfully',

      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    logger.error('Register error', err);

    if (err.message === 'User already exists')
      return res.status(409).json({
        error: 'Email already exists',
      });

    next(err);
  }
}

export async function getCurrentUser(req, res) {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    return res.status(200).json({
      user,
    });
  } catch (e) {
    logger.error('[AuthContoller/ME] Error getting /me');
    return res.status(500).json({
      message: 'Internal server error',
      error: e.message,
    });
  }
}

export async function updateProfile(req, res) {
  try {
    const user = await User.findById(req.user._id).select('-password');

    if (!user) {
      logger.error('No user found for that updateProfile stuff');
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const {
      firstName,
      lastName,
      middleName,
      level,
      department,
      faculty,
      registrationNumber,
      accountType,
      businessName,
      businessPhone,
    } = req.body;

    if (!user.accountType) {
      if (!['business', 'student'].includes(accountType)) {
        return res.status(400).json({
          message: 'Please select account Type',
        });
      }
      user.accountType = accountType;
    }

    // Update basic information
    user.firstName = firstName ?? user.firstName;
    user.middleName = middleName ?? user.middleName;
    user.lastName = lastName ?? user.lastName;

    //Student specific information
    if (user.accountType === 'student') {
      user.level = level ?? user.level;
      user.faculty = faculty ?? user.faculty;
      user.registrationNumber = registrationNumber ?? user.registrationNumber;
      user.department = department ?? user.department;
    } else if (user.accountType === 'business') {
      user.businessName = businessName ?? user.businessName;
      user.businessPhone = businessPhone ?? user.businessPhone;
    }

    //Profile check complete

    const basicProfileComplete =
      Boolean(user.firstName?.trim()) && Boolean(user.lastName?.trim());

    let profileComplete = basicProfileComplete;

    if (user.accountType === 'student') {
      profileComplete =
        basicProfileComplete &&
        Boolean(user.level) &&
        Boolean(user.department?.trim()) &&
        Boolean(user.faculty?.trim()) &&
        Boolean(user.registrationNumber?.trim()) &&
        Boolean(user.middleName?.trim());
    } else if (user.accountType === 'business') {
      profileComplete =
        basicProfileComplete &&
        Boolean(user.businessName?.trim()) &&
        Boolean(user.businessPhone?.trim());
    }

    user.profileCompleted = profileComplete;

    await user.save();
    logger.info(`Profile updated for ${user.username}`);

    return res.status(200).json({
      message: profileComplete
        ? 'Profile completed successfully'
        : 'Profile updated but still incomplete!',

      profileCompleted: user.profileCompleted,
      user,
    });
  } catch (e) {
    logger.error(e);
    logger.error(e.message);
    return res.status(500).json({
      message: 'Internal server error',
      error: e.message,
    });
  }
}

export async function loginUser(req, res) {
  try {
    const validationResult = loginSchema.safeParse(req.body);

    if (!validationResult.success) {
      logger.error('Error formatting with zod');
      return res.status(400).json({
        error: 'Validation failed',
        details: formatValidation(validationResult.error),
      });
    }

    const { email, password } = validationResult.data;

    // find user
    const user = await User.findOne({
      email,
    });

    if (!user) {
      logger.error('[contoller]: Login failed user not found:', email);
      return res.status(400).json({
        message: 'Invalid credentials',
      });
    }

    //compare passwords
    await compareHashedPassword(password, user);
    // Create token

    const token = jwttoken.sign({ _id: user._id, email: user.email });

    //send response
    logger.info('[Controller] attempting to set cookie');

    cookies.set(res, 'token', token);

    return res.status(200).json({
      user: {
        _id: user._id || user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    logger.info(err.message);
    logger.error('[controller] Login critical error:', err);

    return res.status(500).json({
      message: 'Server error and moreee',
    });
  }
}

export function logoutUser(req, res, next) {
  try {
    cookies.clear(res, 'token');

    return res.status(200).json({
      message: 'Logged out successfully',
    });
  } catch (err) {
    logger.error('Error logging out');
    next(err);
  }
}

export async function deleteAccount(req, res, next) {
  try {
    const userId = req.user._id;

    await User.findByIdAndDelete(userId);

    await Assignment.deleteMany({ owner: userId });

    cookies.clear(res, 'token');

    return res.status(200).json({
      message: 'Account and associated data deleted successfully',
    });
  } catch (err) {
    logger.error('[Controller]: Failed to delete account', err);

    next(err);
  }
}
