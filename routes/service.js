import express from "express";
import {
  createService,
  getAllServices,
} from "../controllers/serviceController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createService);

router.get("/", getAllServices);

export default router;
