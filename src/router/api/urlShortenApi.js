const router = require("express").Router();
const {
  getShortURL,
  createShortURL,
  deleteShortURL,
  redirectToURL,
} = require("../../controllers/urlShorten.controller");

router.get("/get", getShortURL);
router.delete("/delete", deleteShortURL);
router.get("/redirect", redirectToURL);
router.post("/create", createShortURL);

module.exports = router;
