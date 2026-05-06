const authService = require("../services/authService");
const AppError = require("../utils/AppError");

class AuthController {
  async register(req, res, next) {
    try {
      const { email, password, role } = req.body;
      const result = await authService.register({ email, password, role });
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
