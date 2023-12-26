const dummyDatBase = require("../db/dummy");

module.exports = {
  body: async (request, reply) => {
    if (!request.body || Object.keys(request.body).length === 0) {
      reply.code(400).send({
        status: "Bad Request",
        msg: "Request body is missing",
      });
    }

    if (Object.values(request.body).includes("")) {
      reply.code(400).send({
        status: "Bad Request",
        msg: "Empty input",
      });
    }
  },
  params: async (request, reply) => {
    if (!dummyDatBase.map((value) => value.id).includes(+request.params.id)) {
      reply.code(400).send({
        status: "Bad request",
        msg: "Request value path variable is not defined",
      });
    }
  },
};
