// const router = require("express").Router();
import { Router } from "express";
import urlShortenApi from "./urlShortenApi";

const router = Router();

router.use("/shortUrl", urlShortenApi);

// Test API
router.get("/test", (req, res) => {
  console.log(req);
  res.send("Api test successful");
});

export default router;
