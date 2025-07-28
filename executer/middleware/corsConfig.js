import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const corsOptions = {
  origin: process.env.BACKEND_URL,
  methods: ["POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

export default cors(corsOptions);
