import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

export default cors(corsOptions);
