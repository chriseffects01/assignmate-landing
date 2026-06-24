import logger from '#config/logger.js';
import { jwttoken } from '#utils/jwt.js';

export const authMiddleware = async (req, res, next) => {
  logger.info(
    '[MiddleWare]  verifying request for  protected route access ...'
  );
  logger.info(
    '[middleware] Step 1 - Checking cookie payload object:',
    req.cookies
  );
  try {
    const token = req.cookies?.token;
    logger.info(token);

    if (!token) {
      logger.error('[middleware] Rejection: No Token provided on request');
      return res.status(401).json({
        message: 'No token provided, Authentication denied',
      });
    }

    logger.info('[Middleware] Step 2 verifying token ');

    const verified = jwttoken.verify(token);
    if (!verified) {
      logger.error(
        '[middleware] Rejection: JWT verification algorithm failed.'
      );
      return res
        .status(401)
        .json({ message: 'Token verification failed, Authentication denied' });
    }

    logger.info('[middleware] Approval token verified and sent');
    req.user = {
      _id: verified._id,
      ...verified,
    };

    return next();
  } catch (err) {
    logger.error(err);
    logger.error(err.message);
    return res.status(401).json({
      message: 'Invalid token ',
      err,
    });
  }
};
