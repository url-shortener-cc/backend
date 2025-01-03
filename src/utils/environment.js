require("dotenv").config();

// To avoid re-calling env variables and to customize if necessary
const envConfig = process.env;

// To-do: Db credentials config and connection establishment

module.exports = envConfig;