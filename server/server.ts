import express, { Request, Response, NextFunction } from "express";
import router from "../src/router/index";
import envConfig from "../src/utils/environment";
import cors from "cors";

const app = express();
const port = envConfig.PORT || 8000;

// Middleware declaration
app.use(express.json());
app.use(cors());

function logger(req: Request, res: Response, next: NextFunction) {
  console.log(req.originalUrl);
  next();
}

app.use(logger);

app.use(router);

app.listen(port, () => {
  console.log(`Server port:${port}`);
});
