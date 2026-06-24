import logger from '#config/logger.js';
import bcrypt from 'bcryptjs';

export const hashPassword = async password => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (e) {
    logger.error(`Error hashing password: ${e}`);
    throw new Error(`Error hashing password: ${e}`);
  }
};

export const compareHashedPassword = async (password, user) => {
  try {
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      logger.info(
        '[Controller] Login failed: Password mismatch for user:',
        user.username
      );
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    return isMatch;
  } catch (e) {
    logger.error(`Error comparing password : ${e}`);
    throw new Error(`Error comparing password : ${e}`);
  }
};
