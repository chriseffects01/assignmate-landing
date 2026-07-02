import logger from '#config/logger.js';
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;

const JWT_EXPIRES_IN = '7d';

export const jwttoken = {
  sign: payload => {
    try {
      return jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
      });
    } catch (err) {
      logger.error('Failed to authenticate token', err);
      throw new Error('Failed to authenticate token');
    }
  },

  verify: token => {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (e) {
      logger.error('Failed to authenticate token', e);
      throw new Error('Failed to authenticate token');
    }
  },
};
