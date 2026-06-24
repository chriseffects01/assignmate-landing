import User from '../model/user.js';
import { registerUpSchema } from '#validations/auth.validators.js';
import { formatValidation } from '#utils/format.js';
import { loginSchema } from '#validations/auth.validators.js';
import logger from '#config/logger.js';
import { createUser } from '#services/auth.service.js';
import { jwttoken } from '#utils/jwt.js';
import { cookies } from '#utils/cookies.js';
import { compareHashedPassword } from '#services/bcrypt.service.js';

export async function registerUser(req, res, next) {
  try {
    const validationResult = registerUpSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: formatValidation(validationResult.error),
      });
    }
    const { firstName, lastName, username, email, password } =
      validationResult.data;

    const user = await createUser({
      firstName,
      lastName,
      username,
      email,
      password,
    });

    // Create token
    const token = jwttoken.sign({ _id: user._id, email: user.email });

    logger.info(`User registered successfully: ${email}`);

    cookies.set(res, 'token', token);

    //return response
    return res.status(201).json({
      // token,
      message: 'User created successfully',

      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
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

export async function loginUser(req, res) {
  logger.info('[controller] loginUSer invoked with body :', req.body);

  try {
    const validationResult = loginSchema.safeParse(req.body);

    if (!validationResult.success) {
      logger.error('Error in login');
      return res.status(400).json({
        error: 'Validation failed',
        details: formatValidation(validationResult.error),
      });
    }

    const { email, username, password } = validationResult.data;

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

    logger.info(
      '[Controller] jwt Token created successfully. Preview: ',
      token.substring(0, 20) + '...'
    );

    //send response
    logger.info('[Controller] attempting to set cookie');

    const cookieStringCheck = `token=${token}; Path=/; HttpOnly `;
    logger.info(
      '[contoller] variable cookie check prior to  header injection:',
      cookieStringCheck
    );

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

// export function logoutUser(req, res) {
//   res.clearCookie("token", {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "lax",
//   });
//   return res.status(200).json({
//     message: "User logged out successfullt",
//   });
// }
