// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();
const { prisma } = require("../config/prisma.js");

class UserRepository {
  async create(userData) {
    return await prisma.user.create({ data: userData });
  }

  async findByEmail(email) {
    return await prisma.user.findUnique({ where: { email } });
  }

  async findById(id) {
    return await prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true, role: true, createdAt: true },
    });
  }
}

module.exports = new UserRepository();
