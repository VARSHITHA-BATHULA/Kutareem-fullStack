import express from "express";
import {
  bookService,
  getUserBookings,
  updateBookingStatus,
} from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, bookService); // Book a service
router.get("/", protect, getUserBookings); // Fetch user bookings
router.put("/status", protect, updateBookingStatus); // Update booking status

export default router;
