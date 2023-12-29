import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use('/api/v1/auth', authRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to MERN STack Project</h1>");
});

//PORT
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server runnning on ${PORT}`.bgCyan.white);
});
