import express from "express";
import db_connection from "./database/mongodb.js";
import dotenv from "dotenv";
import user_router from "./routes/user_routes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/users", user_router);

await db_connection();

app.listen(process.env.SERVER_PORT, () => {
  console.log(`✅ Server is running on port : ${process.env.SERVER_PORT}`);
});
