const router = require("express").Router();
const urlShortenApi = require("./urlShortenApi");

router.use("/shortUrl", urlShortenApi);

// Test API
router.get("/test", (req, res) => {
  console.log(req);
  res.send("Api test successful");
});

module.exports = router;
