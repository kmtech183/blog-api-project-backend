const userRepository = require("../repositories/userRepository");
const { hashPassword, comparePassword } = require("../utils/password");
const { generateToken } = require("../utils/jwt");
const AppError = require("../utils/AppError");

class AuthService {
  async register(userData) {
    const existingUser = await userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new AppError("Email already registered", 400);
    }

    const hashedPassword = await hashPassword(userData.password);
    const user = await userRepository.create({
      email: userData.email,
      password: hashedPassword,
      role: userData.role || "READER",
    });

    const token = generateToken(user.id, user.email, user.role);
    return { token, user: { id: user.id, email: user.email, role: user.role } };
  }

  async login(email, password) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new AppError("Invalid credentials", 401);
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new AppError("Invalid credentials", 401);
    }

    const token = generateToken(user.id, user.email, user.role);
    return { token, user: { id: user.id, email: user.email, role: user.role } };
  }
}

module.exports = new AuthService();
