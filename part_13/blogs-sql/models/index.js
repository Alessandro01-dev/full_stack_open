const Blog = require("./blog");
const User = require("./user");

const syncModels = async () => {
  await Blog.sync();
  await User.sync();
};

module.exports = {
  Blog,
  User,
  syncModels,
};
