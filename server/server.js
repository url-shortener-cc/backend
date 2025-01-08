"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("../src/router/index"));
const environment_1 = __importDefault(require("../src/utils/environment"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = environment_1.default.PORT || 8000;
// Middleware declaration
app.use(express_1.default.json());
app.use((0, cors_1.default)());
function logger(req, res, next) {
    console.log(req.originalUrl);
    next();
}
app.use(logger);
app.use(index_1.default);
app.listen(port, () => {
    console.log(`Server port:${port}`);
});
