require("dotenv").config();

const Fastify = require("fastify");
const router = require("./src/routers/index");

const server = Fastify({
  logger: {
    transport: {
      target: "@fastify/one-line-logger",
    },
  },
});

server.register(require("@fastify/cors"));
server.register(require("@fastify/formbody"));
server.register(require("@fastify/url-data"));

server.register(require("@fastify/middie")).register(router);

const start = async () => {
  try {
    const address = await server.listen({
      port: process.env.FASTIFY_PORT || 3000,
    });
    server.log.info(`server listening on ${address}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
