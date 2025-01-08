"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const router = require("express").Router();
const express_1 = require("express");
const urlShortenApi_1 = __importDefault(require("./urlShortenApi"));
const router = (0, express_1.Router)();
router.use("/shortUrl", urlShortenApi_1.default);
// Test API
router.get("/test", (req, res) => {
    console.log(req);
    res.send("Api test successful");
});
exports.default = router;
