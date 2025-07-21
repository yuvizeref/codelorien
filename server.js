import express from "express";
import dbConnection from "./database/mongodb.js";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import authRouter from "./routes/authRoutes.js";
import problemRouter from "./routes/problemRoutes.js";
import docsRouter from "./routes/docsRoutes.js";
import testCasesRouter from "./routes/testCasesRoutes.js";
import submissionRouter from "./routes/submissionRoutes.js";
import { createAdminUser } from "./utils/userUtils.js";
import judgeRouter from "./routes/judgeRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/problems", problemRouter);
app.use("/api/testcases", testCasesRouter);
app.use("/api/submissions", submissionRouter);
app.use("/api/judge", judgeRouter);
app.use("/api", docsRouter);

await dbConnection();

await createAdminUser();

app.listen(process.env.SERVER_PORT, () => {
  console.log(`✅ Server is running on port : ${process.env.SERVER_PORT}`);
});
