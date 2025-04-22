import Booking from "../models/Booking.js";
import Service from "../models/Service.js";

export const bookService = async (req, res, next) => {
  try {
    const { serviceId } = req.body;

    const service = await Service.findById(serviceId);
    if (!service) {
      res.status(404);
      throw new Error("Service not found");
    }

    const booking = await Booking.create({
      service: serviceId,
      user: req.user._id,
    });

    res.status(201).json(booking);
  } catch (err) {
    next(err);
  }
};

export const getUserBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
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
