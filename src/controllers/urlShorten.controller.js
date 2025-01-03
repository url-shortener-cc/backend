const crypto = require("crypto");
const envConfig = require("../utils/environment");

const domain = envConfig.FRONTEND_DOMAIN;

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

const createShortURL = (req, res) => {
  const { long_url } = req.body;

  if (!long_url) {
    return req
      .status(400)
      .json({ status: "false", error: "Long url is missing" });
  }

  const hash = crypto.createHash("sha1").update(long_url).digest("hex");
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
};

const redirectToURL = (req, res) => {
  const { s } = req.query;

  if (s.length !== 6) {
    return res.status(400).json("Entered url might be invalid");
  }

  const shortUrl = `${domain}/s/${s}`;
  const longUrl = dictObj[shortUrl];
  console.log(longUrl);

  if (!longUrl) {
    return res.status(400).json("Entered url might be invalid");
  } else {
    console.log(`Redirecting to ${longUrl}`);
    res.status(200).json({
      status: "true",
      msg: "Fetched Long URL",
      data: {
        longUrl: longUrl,
      },
    });
  }
};

const deleteShortURL = (req, res) => {
  res.status(200).json({
    status: "true",
    msg: "Deleted Short URL",
    data: {
      url: req.body.short_url ? req.body.short_url : "No url provided",
    },
  });
};

module.exports = { getShortURL, createShortURL, redirectToURL, deleteShortURL };
