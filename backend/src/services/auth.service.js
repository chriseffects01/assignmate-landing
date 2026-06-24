import logger from '#config/logger.js';
import User from '../model/user.js';
import { hashPassword } from './bcrypt.service.js';

export const createUser = async ({
  firstName,
  lastName,
  username,
  email,
  password,
}) => {
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
    });

    logger.info(`New user with ${newUser.email} created successfully`);

    return newUser;
  } catch (e) {
    logger.error(`Error creating User: ${e}`);
    throw new Error(`Error creating user: ${e}`);
  }
};
