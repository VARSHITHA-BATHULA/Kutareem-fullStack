import express from "express";
import {
  createService,
  getAllServices,
} from "../controllers/serviceController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createService); // Create a service

router.get("/", getAllServices); // Fetch all services

export default router;
