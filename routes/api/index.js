const router = require("express").Router();

const { route } = require("..");
const thoughtsRoutes = require("./thought-routes");
const usersRoutes = require("./user-routes");

usersRoutes.use("/users", usersRoutes);

router.use("/thoughts", thoughtsRoutes);

module.exports = router;
