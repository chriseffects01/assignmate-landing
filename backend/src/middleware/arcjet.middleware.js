import { aj } from '#config/arcjet.js';
import logger from '#config/logger.js';

export const arcjetMiddleWare = async (req, res, next) => {
  try {
    logger.info('Arcjet middleware hit!!!!');
    const decision = await aj.protect(req, {
      requested: 1,
    });
    logger.info(JSON.stringify(decision, null, 2));

    if (decision.isDenied()) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests, try again later',
      });
    }
    next();
  } catch (e) {
    logger.error(`Error in arcjet middleware: ${e}`);
    logger.error(e.message);
    next();
  }
};
