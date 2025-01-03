import { Router } from "express";
const router = Router();

import {
  getShortURL,
  createShortURL,
  deleteShortURL,
  redirectToURL,
} from "../../controllers/urlShorten.controller";

router.get("/get", getShortURL);
router.delete("/delete", deleteShortURL);
router.get("/redirect", redirectToURL);
router.post("/create", createShortURL);

export default router;
