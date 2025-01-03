const router = require("express").Router();
const ApiRouter = require("./api/index");

router.use("/api/v1", ApiRouter);

module.exports = router;