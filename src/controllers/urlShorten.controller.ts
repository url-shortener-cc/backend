import { Request, Response } from "express";
import crypto from "crypto";
import envConfig from "../utils/environment";

const domain = envConfig.FRONTEND_DOMAIN;

const dictObj: { [key: string]: string } = {};

const getShortURL = (req: Request, res: Response) => {
  res.status(200).json({
    status: "true",
    msg: "Retrieved short URL",
    data: {
      url: req.query.short_url ? req.query.short_url : "No url provided",
    },
  });
};

const createShortURL = (req: Request, res: Response) => {
  const { long_url } = req.body;

  if (!long_url) {
    res.status(400).json({ status: "false", error: "Long url is missing" });
  } else {
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
  }
};

const redirectToURL = (req: Request, res: Response) => {
  const { s } = req.query;

  if (!s || s.length !== 6) {
    res.status(400).json("Entered url might be invalid");
  } else {
    const shortUrl = `${domain}/s/${s}`;
    const longUrl = dictObj[shortUrl];
    console.log(longUrl);

    if (!longUrl) {
      res.status(400).json("Entered url might be invalid");
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
  }
};

const deleteShortURL = (req: Request, res: Response) => {
  res.status(200).json({
    status: "true",
    msg: "Deleted Short URL",
    data: {
      url: req.body.short_url ? req.body.short_url : "No url provided",
    },
  });
};

export { getShortURL, createShortURL, deleteShortURL, redirectToURL };
