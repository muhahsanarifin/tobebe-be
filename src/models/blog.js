const dummyDataBase = require("../db/dummy");

module.exports = {
  createBlog: async (body) => {
    const { title, description, author } = body;
    const input = [
      {
        id: dummyDataBase[dummyDataBase.length - 1].id + 1,
        title,
        description,
        created_at: Date.now(),
        updated_at: "",
        author,
      },
    ];

    return new Promise((resolve, reject) => {
      const result = [...dummyDataBase, ...input];

      if (result.length > dummyDataBase.length) {
        return resolve(
          JSON.stringify({ status: "ok", msg: "Created.", data: result })
        );
      }
      return reject(new Error("Server Error"));
    });
  },
  getBlogs: async (query) => {
    const page = query.page || "";
    const limit = query.limit || "";


    return new Promise((resolve, reject) => {
      const result =
        !limit || !page
          ? dummyDataBase
          : dummyDataBase.slice(
              parseInt(page) === 1 ? 0 : (+page - 1) * +limit,
              parseInt(page) === 1 ? +limit : ((+page - 1) * (+limit)) + (+limit)
            );
      if (result.length === 0) {
        return resolve(JSON.stringify({ status: "ok", data: result }));
      }

      const metadata =
        limit && page
          ? {
              page: +page,
              limit: +limit,
              totalPages: Math.ceil(+dummyDataBase.length / +limit),
            }
          : null;

      if (result.length !== 0) {
        return resolve(
          JSON.stringify({
            status: "ok",
            data: result,
            metadata: metadata,
          })
        );
      }
      return reject(new Error("Server Error"));
    });
  },
  getBlog: async (params) => {
    return new Promise((resolve, reject) => {
      const result = dummyDataBase.filter((value) => value.id === +params.id);

      if (result.length === 0) {
        return resolve(
          JSON.stringify({ status: "ok", data: result, msg: "Data Not Found" })
        );
      }

      if (result.length > 0) {
        return resolve(JSON.stringify({ status: "ok", data: result }));
      }

      return reject(new Error("Server Error"));
    });
  },
  updateBlog: async (body, params) => {
    const { title, description, author } = body;

    // Input conditional
    const prevValue = (input, existValue) => (input ? input : existValue);

    return new Promise((resolve, reject) => {
      const result = dummyDataBase.map((value) => {
        if (value.id === +params.id) {
          value = {
            ...value,
            title: prevValue(title, value.title),
            description: prevValue(description, value.description),
            author: prevValue(author, value.author),
            updated_at: Date.now(),
          };
        }
        return value;
      });

      if (!result) {
        return reject(new Error("Server Error"));
      }

      return resolve(
        JSON.stringify({ status: "ok", msg: "Updated.", data: result })
      );
    });
  },
  deleteBlog: async (params) => {
    return new Promise((resolve, reject) => {
      const result = dummyDataBase.filter((value) => value.id !== +params.id);
      if (result.length < dummyDataBase.length) {
        return resolve(
          JSON.stringify({ status: "ok", msg: "Deleted.", data: result })
        );
      }
      return reject(new Error("Server Error"));
    });
  },
};
