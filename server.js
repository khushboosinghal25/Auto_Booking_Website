import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import bodyParser from "body-parser";
import { startBookingScheduler } from "./bookingScheduler.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.options("*", cors());
// Increase the limit for JSON and URL-encoded data
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use("/api/v1/auth", authRoutes);

startBookingScheduler();

app.get("/", (req, res) => {
  res.send("<h1>Welcome to MERN STack Project</h1>");
});

//PORT
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server runnning on ${PORT}`.bgCyan.white);
});
