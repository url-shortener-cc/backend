"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
// To avoid re-calling env variables and to customize if necessary
let envConfig = process.env;
// To-do: Db credentials config and connection establishment
exports.default = envConfig;
