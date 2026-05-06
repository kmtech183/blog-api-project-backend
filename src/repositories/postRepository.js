// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();
const { prisma } = require("../config/prisma.js");

class PostRepository {
  async create(postData) {
    return await prisma.post.create({ data: postData });
  }

  async findAll(includeUnpublished = false) {
    const where = includeUnpublished ? {} : { published: true };
    return await prisma.post.findMany({
      where,
      include: { author: { select: { email: true } }, comments: true },
      orderBy: { createdAt: "desc" },
    });
  }

  async findById(id, includeUnpublished = false) {
    const where = { id };
    if (!includeUnpublished) where.published = true;

    return await prisma.post.findFirst({
      where,
      include: {
        author: { select: { email: true } },
        comments: { orderBy: { createdAt: "desc" } },
      },
    });
  }

  async update(id, postData) {
    return await prisma.post.update({
      where: { id },
      data: postData,
    });
  }

  async delete(id) {
    return await prisma.post.delete({ where: { id } });
  }

  async togglePublish(id) {
    const post = await prisma.post.findUnique({ where: { id } });
    return await prisma.post.update({
      where: { id },
      data: { published: !post.published },
    });
  }
}

module.exports = new PostRepository();
