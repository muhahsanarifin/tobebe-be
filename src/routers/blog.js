const controller = require("../controllers/blog");
const validate = require("../middlewares/validate");

module.exports = async (fastify) => {
  //@ Using register method without curly brace to use middleware.
  // fastify.register(
  //   (fastify) => fastify.use(validate.body),
  //   fastify.get("/blogs/:id", controller.getBlog)
  // );

  //@ Using register method with curly brace to use middleware.
  // fastify.register((fastify, _, done) => {
  //   fastify.use(validate.body);
  //   fastify.get("/blogs/:id", controller.getBlog)
  //   done()
  // }

  fastify.register((fastify, _, done) => {
    //@ preHandler with addHook similar to use .method("/path",{ preHandler: (request, reply, done) }, handler)
    //@ Do not need to use done callback because it has used async / await function

    fastify.addHook("preHandler", async (request, reply) => {
      await validate.params(request, reply);
    });
    fastify.get("/blogs/:id", controller.getBlog);
    done();
  });

  fastify.get("/blogs", controller.getBlogs);

  fastify.register((fastify, _, done) => {
    fastify.addHook("preHandler", async (request, reply) => {
      await validate.body(request, reply);
    });
    fastify.post("/blogs/create", controller.createBlog);
    done();
  });

  fastify.register((fastify, _, done) => {
    fastify.addHook("preHandler", async (request, reply) => {
      await validate.params(request, reply);
      await validate.body(request, reply);
    });

    fastify.patch("/blogs/update/:id", controller.updateBlog);
    done();
  });

  fastify.register((fastify, _, done) => {
    fastify.addHook("preHandler", async (request, reply) => {
      await validate.params(request, reply);
    });

    fastify.delete("/blogs/delete/:id", controller.deleteBlog);
    done();
  });
};
