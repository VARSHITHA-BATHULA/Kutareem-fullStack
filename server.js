import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import serviceRoutes from "./routes/service.js";
import bookingRoutes from "./routes/booking.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
import cors from "cors";
import cookieParser from "cookie-parser"; // Import cookie-parser

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser()); // Use cookie parser middleware

connectDB();
app.get("/", (req, res) => {
  res.send("Welcome to the API. Please refer to the documentation.");
});

app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

process.on("unhandledRejection", (err) => console.log(err));