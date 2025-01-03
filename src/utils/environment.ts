import { config } from "dotenv";

config();

// To avoid re-calling env variables and to customize if necessary
let envConfig = process.env;

// To-do: Db credentials config and connection establishment

export default envConfig;
