"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redirectToURL = exports.deleteShortURL = exports.createShortURL = exports.getShortURL = void 0;
const crypto_1 = __importDefault(require("crypto"));
const environment_1 = __importDefault(require("../utils/environment"));
const domain = environment_1.default.FRONTEND_DOMAIN;
const dictObj = {};
const getShortURL = (req, res) => {
    res.status(200).json({
        status: "true",
        msg: "Retrieved short URL",
        data: {
            url: req.query.short_url ? req.query.short_url : "No url provided",
        },
    });
};
exports.getShortURL = getShortURL;
const createShortURL = (req, res) => {
    const { long_url } = req.body;
    if (!long_url) {
        res.status(400).json({ status: "false", error: "Long url is missing" });
    }
    else {
        const hash = crypto_1.default.createHash("sha1").update(long_url).digest("hex");
        const sixCharHash = hash.substring(0, 6);
        const short_url = `${domain}/s/${sixCharHash}`;
        dictObj[short_url] = long_url;
        console.log("dictObj:", dictObj);
        res.status(200).json({
            status: "true",
            msg: "Short URL created",
            data: {
                shortUrlSuffix: sixCharHash,
                shortUrl: short_url,
            },
        });
    }
};
exports.createShortURL = createShortURL;
const redirectToURL = (req, res) => {
    const { s } = req.query;
    if (!s || s.length !== 6) {
        res.status(400).json("Entered url might be invalid");
    }
    else {
        const shortUrl = `${domain}/s/${s}`;
        const longUrl = dictObj[shortUrl];
        console.log(longUrl);
        if (!longUrl) {
            res.status(400).json("Entered url might be invalid");
        }
        else {
            console.log(`Redirecting to ${longUrl}`);
            res.status(200).json({
                status: "true",
                msg: "Fetched Long URL",
                data: {
                    longUrl: longUrl,
                },
            });
        }
    }
};
exports.redirectToURL = redirectToURL;
const deleteShortURL = (req, res) => {
    res.status(200).json({
        status: "true",
        msg: "Deleted Short URL",
        data: {
            url: req.body.short_url ? req.body.short_url : "No url provided",
        },
    });
};
exports.deleteShortURL = deleteShortURL;
