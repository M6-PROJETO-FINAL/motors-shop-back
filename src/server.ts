import app from "./app";
import dotenv from "dotenv";
import AppDataSource from "./data-source";
import "dotenv/config";

dotenv.config();

(async () => {
  await AppDataSource.initialize().catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

  app.listen(3000, () => {
    console.log("Server running");
  });
})();