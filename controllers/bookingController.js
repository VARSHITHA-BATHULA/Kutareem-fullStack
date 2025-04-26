import Booking from "../models/Booking.js";
import Service from "../models/Service.js";
import mongoose from "mongoose";

export const bookService = async (req, res, next) => {
  try {
    const { service } = req.body; // <-- notice this is 'service', not 'serviceId'
    console.log("Service received from body:", service);

    // Validate the service ID
    if (!mongoose.Types.ObjectId.isValid(service)) {
      res.status(400);
      throw new Error("Invalid service ID format");
    }

    const foundService = await Service.findById(service);
    if (!foundService) {
      res.status(404);
      throw new Error("Service not found");
    }

    const booking = await Booking.create({
      service: service,
      user: req.user, // Assuming req.user is populated
    });

    res.status(201).json(booking);
  } catch (err) {
    next(err);
  }
};

export const getUserBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user }) // Use the userId from protect middleware
      .populate("service")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    next(err);
  }
};

export const updateBookingStatus = async (req, res, next) => {
  try {
    const { bookingId, status } = req.body;

    const allowedStatuses = ["pending", "confirmed", "completed"];
    if (!allowedStatuses.includes(status)) {
      res.status(400);
      throw new Error("Invalid status");
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      res.status(404);
      throw new Error("Booking not found");
    }

    booking.status = status;
    await booking.save();

    res.json(booking);
  } catch (err) {
    next(err);
  }
};
