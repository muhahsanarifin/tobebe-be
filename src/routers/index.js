const blogRouter = require("./blog");

module.exports = async (fastify) => {
  fastify.register(blogRouter);
};
