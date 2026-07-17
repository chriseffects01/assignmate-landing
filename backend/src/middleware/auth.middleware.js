import logger from '#config/logger.js';
import { jwttoken } from '#utils/jwt.js';
import { cookies } from '#utils/cookies.js';

export const authMiddleware = async (req, res, next) => {
  logger.info(
    '[MiddleWare]  verifying request for  protected route access ...'
  );

  try {
    const token = cookies.get(req, 'token');

    if (!token) {
      logger.error('[middleware] Rejection: No Token provided on request');
      return res.status(401).json({
        message: 'No token provided, Authentication denied',
      });
    }

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
    return res.status(401).json({
      message: 'Invalid token',
      err,
    });
  }
};
