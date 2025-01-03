const express = require("express");
const app = express();
const router = require("../src/router/index");
const envConfig = require("../src/utils/environment");
const cors = require("cors");

const port = envConfig.PORT || 8000;

// Middleware declaration
app.use(express.json());
app.use(cors());

function logger(req, res, next) {
  console.log(req.originalUrl);
  next();
}

app.use(logger);

app.use(router);

app.listen(port, () => {
  console.log(`Server port:${port}`);
});
