import express from "express";
import dotenv from "dotenv";
import executeRouter from "./routes/executeRoutes.js";
import corsConfig from "./middleware/corsConfig.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(corsConfig);

app.use("/api/execute", executeRouter);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`✅ Code Runner is running on port : ${process.env.SERVER_PORT}`);
});
