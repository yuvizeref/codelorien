import express from "express";
import dbConnection from "./database/mongodb.js";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import authRouter from "./routes/authRoutes.js";
import problemRouter from "./routes/problemRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/problems", problemRouter);

await dbConnection();

app.listen(process.env.SERVER_PORT, () => {
  console.log(`✅ Server is running on port : ${process.env.SERVER_PORT}`);
});
