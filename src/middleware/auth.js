const { verifyToken } = require("../utils/jwt");
const AppError = require("../utils/AppError");

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("Authentication required", 401);
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    req.user = decoded;
    next();
  } catch (error) {
    next(new AppError("Invalid or expired token", 401));
  }
};

const authorizeAuthor = (req, res, next) => {
  if (req.user.role !== "AUTHOR") {
    return next(new AppError("Author privileges required", 403));
  }
  next();
};

module.exports = { authenticate, authorizeAuthor };
