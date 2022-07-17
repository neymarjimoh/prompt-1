import * as dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT || 8080,
  db: {
    uri: process.env.DB_URI || "mongodb://localhost:27017/techinnover",
  },
  host: process.env.HOST,
};
