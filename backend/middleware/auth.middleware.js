import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];
    // console.log("Extracted token", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.id || decoded._id,
      _id: decoded.id || decoded._id,
      ...decoded,
    };

    return next();
  } catch (err) {
    console.error(err);
    console.log(err.message);
    return res.status(401).json({
      message: "Invalid token ",
      err,
    });
  }
};
