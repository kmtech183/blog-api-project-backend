// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();
const { prisma } = require("../config/prisma.js");

class CommentRepository {
  async create(commentData) {
    return await prisma.comment.create({ data: commentData });
  }

  async findByPostId(postId) {
    return await prisma.comment.findMany({
      where: { postId },
      orderBy: { createdAt: "desc" },
    });
  }

  async delete(id) {
    return await prisma.comment.delete({ where: { id } });
  }

  async findById(id) {
    return await prisma.comment.findUnique({ where: { id } });
  }
}

module.exports = new CommentRepository();
