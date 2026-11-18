const router = require("express").Router();

const { Blog, User, ReadingList, Session } = require("../models");

router.post("/", async (req, res) => {
  const options = { truncate: true, cascade: true, restartIdentity: true };

  await ReadingList.destroy(options);
  await Session.destroy(options);
  await Blog.destroy(options);
  await User.destroy(options);

  res.status(204).end();
});

module.exports = router;
