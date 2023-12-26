const model = require("../models/blog");

module.exports = {
  createBlog: async (request, reply) => {
    try {
      const response = await model.createBlog(request.body);
      reply.code(201).send({ ...JSON.parse(response) });
    } catch (err) {
      reply.code(500).send({ msg: err.message });
    }
  },
  getBlogs: async (request, reply) => {
    try {
      const response = await model.getBlogs(request.query);
      reply.code(200).send({ ...JSON.parse(response) });
    } catch (err) {
      reply.code(500).send({ msg: err.message });
    }
  },
  getBlog: async (request, reply) => {
    try {
      const response = await model.getBlog(request.params);
      reply.code(200).send({ ...JSON.parse(response) });
    } catch (err) {
      reply.code(500).send({ msg: err.message });
    }
  },
  updateBlog: async (request, reply) => {
    try {
      const response = await model.updateBlog(request.body, request.params);
      reply.code(201).send({ ...JSON.parse(response) });
    } catch (err) {
      reply.code(500).send({ msg: err.message });
    }
  },
  deleteBlog: async (request, reply) => {
    try {
      const response = await model.deleteBlog(request.params);
      reply.code(201).send({ ...JSON.parse(response) });
    } catch (error) {
      reply.code(500).send({ msg: err.message });
    }
  },
};
